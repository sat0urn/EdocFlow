import {OFFICE_MANAGER} from "../../../data/userRolesData.js";

const HistoryTableView = ({openPdf, getSearchedDocuments}) => {
  return (
    <table className="table table-hover m-4 w-auto">
      <thead className="text-center">
      <tr>
        <th scope="col" className="text-primary text-start">Name</th>
        <th scope="col" className="text-primary">Date</th>
        <th scope="col" className="text-primary">Responsible</th>
        <th scope="col" className="text-primary">Status</th>
        <th scope="col" className="text-primary">PDF</th>
      </tr>
      </thead>
      <tbody className="text-center">
      {getSearchedDocuments.map((doc, index) => (
        <tr key={index}>
          <td className={"text-secondary text-start"}>
            {doc.name}
          </td>
          <td className="text-secondary">
            {doc.createdTime.split('T')[0]}
          </td>
          <td className="text-secondary">
            {OFFICE_MANAGER}
          </td>
          <td className={'fw-semibold text-success'}>
            {doc.status}
          </td>
          <td className="text-secondary text-center">
            <button className="d-inline nav-link link-body-emphasis text-primary text-decoration-underline"
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

export default HistoryTableView