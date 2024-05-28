const DocsTableViewer = ({userFullName, openPdf, getSearchedDocuments}) => {
  return (
    <table className="table table-borderless m-4 w-auto">
      <thead className="text-center">
      <tr>
        <th scope="col" className="text-start text-primary">#ID</th>
        <th scope="col" className="text-primary">Name</th>
        <th scope="col" className="text-primary">Date</th>
        <th scope="col" className="text-primary">Responsible</th>
        <th scope="col" className="text-primary">Status</th>
        <th scope="col" className="text-primary">PDF</th>
      </tr>
      </thead>
      <tbody className="text-center">
      {getSearchedDocuments.map((doc, index) => (
        <tr key={index}>
          <th className="text-secondary text-start" scope="row">
            {doc.id}
          </th>
          <td className={"text-secondary"}>
            {doc.name}
          </td>
          <td className="text-secondary">
            {doc.createdTime.split('T')[0]}
          </td>
          <td className="text-secondary">
            {userFullName[0]} {userFullName[1]}
          </td>
          <td className={'fw-semibold ' +
            ((doc.status === 'ACCEPTED') ? 'text-success' :
              (doc.status === 'REJECTED') ? 'text-danger' :
                (doc.status === 'OnPROCESS') && 'text-warning')}
          >
            {doc.status}
          </td>
          <td className="text-secondary">
            <button className="nav-link link-body-emphasis text-primary text-decoration-underline"
                    onClick={() => openPdf(doc.fileData)}>
              view
            </button>
          </td>
        </tr>)
      )}
      </tbody>
    </table>
  )
}

export default DocsTableViewer