import {useContext, useEffect, useMemo, useState} from "react"
import {fetchDocuments} from "../../http/docsApi.js";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";

const ProfileHistory = observer(() => {
    const {user} = useContext(AuthContext)
    const [documents, setDocuments] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await fetchDocuments()
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents', error);
            }
        };

        fetchDocs();
    }, []);

    const getSearchedDocuments = useMemo(() => {
        return documents.filter(doc => doc.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
    }, [documents, searchQuery])

    const openPdf = (fileData) => {
        // base64 (byte[]) -> buffer array
        const binaryString = atob(fileData);
        const binaryLen = binaryString.length
        const bytes = new Uint8Array(binaryLen)
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i)
        }

        // open pdf document
        const blob = new Blob([bytes], {type: "application/pdf"});
        const url = URL.createObjectURL(blob);
        window.open(url)
    }

    return (
        <div className="card m-5 p-4">
            <div className="row my-4">
                <div className="col-4">
                    <h1 style={{color: '#407BFF'}}>
                        Your documents
                    </h1>
                    <p className="text-secondary">
                        Select one or more that you want to review
                    </p>
                </div>
                <div className="col-8 mt-auto">
                    <div className="input-group mb-3 w-25">
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="&#xF002;   Search"
                            style={{fontFamily: 'Arial, FontAwesome'}}
                        />
                    </div>
                </div>
            </div>
            <div className="card">
                <table className="table table-bordered m-4 w-auto">
                    <thead className="text-center">
                    <tr>
                        <th scope="col" className="text-start text-primary">Name</th>
                        <th scope="col" className="text-primary">Date</th>
                        <th scope="col" className="text-primary">Responsible</th>
                        <th scope="col" className="text-primary">Status</th>
                        <th scope="col" className="text-primary">PDF</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {getSearchedDocuments.map((doc, index) => {
                        return (
                            <tr key={index} className={"align-middle"}>
                                <th className="text-secondary text-start" scope="row">
                                    {doc.name}
                                </th>
                                <td className="text-secondary">
                                    {doc.createdTime}
                                </td>
                                <td className="text-secondary">
                                    {user.user.firstName} {user.user.lastName}
                                </td>
                                <td className={
                                    (doc.status === 'pending') ? "text-warning" :
                                        (doc.status === 'checking') ? "text-info" :
                                            (doc.status === 'signed') && "text-success"
                                }>
                                    {doc.status}
                                </td>
                                <td className="text-secondary">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => openPdf(doc.fileData)}
                                    >
                                        open
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
})

export default ProfileHistory