import {useContext, useEffect, useMemo, useState} from "react"
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";
import {fetchDocuments} from "../../http/docsApi.js";
import DocsTableViewer from "./historyParts/DocsTableViewer.jsx";

const ProfileHistory = observer(() => {
    const {user} = useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [documents, setDocuments] = useState([])
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await fetchDocuments()
                setDocuments(response.data);
                setPages(Math.ceil(response.data.length / 6))
            } catch (error) {
                console.error('Error fetching documents', error);
            }
        };

        fetchDocs();
    }, []);

    const getSearchedDocuments = useMemo(() => {
        const filteredDocuments = documents.filter(doc => doc.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )

        setPages(Math.ceil(filteredDocuments.length / 6))

        return filteredDocuments.slice(currentPage * 6, (currentPage + 1) * 6)
    }, [currentPage, documents, searchQuery])

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
        <div className={"container-md w-md-75 w-100"}>
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
                    <DocsTableViewer
                        userFullName={[user._user.firstName, user._user.lastName]}
                        openPdf={openPdf}
                        getSearchedDocuments={getSearchedDocuments}
                    />
                    {pages > 1 &&
                        <>
                            <div className={"fs-6 mx-auto border rounded-3 px-3 py-1 mb-4"}>
                                Page {currentPage + 1}
                            </div>
                            <nav className={"mx-auto"}>
                                <ul className={"pagination"}>
                                    {currentPage !== 0 &&
                                        <li className="page-item">
                                            <button className="btn btn-outline-secondary me-3"
                                                    aria-label="Previous"
                                                    onClick={() => setCurrentPage(currentPage - 1)}
                                            >
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </button>
                                        </li>
                                    }
                                    {Array.from(
                                        new Array(pages),
                                        (el, index) =>
                                            (<li key={'doc_' + index} className={"page-item"}>
                                                <button
                                                    type={"button"}
                                                    onClick={() => setCurrentPage(index)}
                                                    className={
                                                        "btn btn-outline-secondary rounded-3 me-2 " +
                                                        (currentPage)
                                                    }
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>)
                                    )}
                                    {currentPage !== (pages - 1) &&
                                        <li className="page-item">
                                            <button className="btn btn-outline-secondary ms-2"
                                                    aria-label="Previous"
                                                    onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </button>
                                        </li>
                                    }
                                </ul>
                            </nav>
                        </>
                    }
                </div>
            </div>
        </div>
    )
})

export default ProfileHistory