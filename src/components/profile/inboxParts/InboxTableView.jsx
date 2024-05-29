import {deleteInboxById} from "../../../http/docsApi.js";
import {useNavigate} from "react-router-dom";

const InboxTableView = ({inboxDocuments}) => {
  const navigate = useNavigate()

  const removeInbox = async (inboxId) => {
    const data = await deleteInboxById(inboxId)
    window.location.reload()
    console.log(data)
  }

  return (
    <table className="table table-light table-striped w-100 mt-3">
      <thead>
      <tr>
        <th scope="col" className="text-primary">Name</th>
        <th scope="col" className="text-primary">Sender</th>
        <th scope="col" className="text-primary">Created Date</th>
        <th scope="col" className="text-primary">Status</th>
        <th scope="col" className="text-primary">PDF</th>
        <th scope="col" className="text-primary"></th>
      </tr>
      </thead>
      <tbody>
      {inboxDocuments.map((inb, index) =>
        <tr key={index} className={"fw-medium small"}>
          <td className={""}>
            {inb.documentTitle}
          </td>
          <td className={""}>
            {inb.senderEmail}
          </td>
          <td className={""}>
            {inb.createdDate.split('T')[0]}
          </td>
          <td className={(inb.documentStatus === 'ACCEPTED') ? 'text-success' :
            (inb.documentStatus === 'REJECTED') ? 'text-danger' :
              (inb.documentStatus === 'OnPROCESS') && 'text-warning'}>
            {
              (inb.documentStatus === 'ACCEPTED') ? 'Accepted' :
                (inb.documentStatus === 'REJECTED') ? 'Rejected' :
                  (inb.documentStatus === 'OnPROCESS') && 'On process'
            }
          </td>
          <td className={""}>
            <button className="nav-link text-primary text-decoration-underline fw-medium px-0"
                    onClick={() => navigate(`/viewAndSign?id=${inb.inboxId}&status=${inb.documentStatus}`)}>
              view
            </button>
          </td>
          <td className="text-secondary">
            <button className="nav-link text-danger text-decoration-underline fw-medium px-0"
                    onClick={() => removeInbox(inb.inboxId)}
            >
              delete
            </button>
          </td>
        </tr>)
      }
      </tbody>
    </table>
  )
}

export default InboxTableView