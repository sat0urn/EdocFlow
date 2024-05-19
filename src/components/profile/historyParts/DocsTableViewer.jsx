const DocsTableViewer = ({userFullName, openPdf, getSearchedDocuments}) => {
    return (
        <table className="table table-borderless m-4 w-auto">
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
            {getSearchedDocuments.map((doc, index) => (
                    <tr key={index} className={"align-middle"}>
                        <th className="text-secondary text-start" scope="row">
                            {doc.name}
                        </th>
                        <td className="text-secondary">
                            {doc.createdTime}
                        </td>
                        <td className="text-secondary">
                            {userFullName[0]} {userFullName[1]}
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
            )}
            </tbody>
        </table>
    )
}

export default DocsTableViewer