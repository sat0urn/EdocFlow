import {useContext, useEffect, useMemo, useState} from "react"
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";
import {fetchDocuments} from "../../http/docsApi.js";

const ProfileHistory = observer(() => {
    const {user} = useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [documents, setDocuments] = useState([])

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
        <div className={"container w-75"}>
            <div className={"card mb-5 p-4"}>
                <div className={"input-group mb-3"}>
                    <div className={"d-flex align-items-center me-3"} style={{fontFamily: 'Arial, FontAwesome'}}>
                        <div className={"fs-5"}>
                            &#xF002;
                        </div>
                    </div>
                    <input
                        type="text"
                        className={"form-control shadow-sm"}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by document name"
                        style={{fontFamily: 'Arial, FontAwesome'}}
                    />
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
                                        {user._user.firstName} {user._user.lastName}
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
        </div>
    )
})

export default ProfileHistory