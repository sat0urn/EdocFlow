import {deleteInboxById, deleteOutboxById} from "../../../http/docsApi.js";
import {useNavigate} from "react-router-dom";
import {ACCEPTED, COMPLETED, REJECTED, SIGNING, WAITING} from "../../../data/docStatusData.js";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../../../context/index.js";

const InboxTableView = observer(({searchedDocuments, isInboxPath}) => {
  const {fetchChanges} = useContext(AuthContext)
  const navigate = useNavigate()

  const removeInbox = (boxId) => {
    if (isInboxPath) {
      deleteInboxById(boxId)
        .then(() => {
          alert('Inbox with id: ' + boxId + ' has been removed!')
          fetchChanges.toggleIsChanged()
        })
        .catch((e) => console.error(e))
    } else {
      deleteOutboxById(boxId)
        .then(() => {
          alert('Outbox with id: ' + boxId + ' has been removed!')
          fetchChanges.toggleIsChanged()
        })
        .catch((e) => console.error(e))
    }
  }

  return (
    <table className="table table-light table-striped w-100 mt-3">
      <thead>
      <tr>
        <th scope="col" className="text-primary">Name</th>
        <th scope="col" className="text-primary">{!isInboxPath ? 'Receiver' : 'Sender'}</th>
        <th scope="col" className="text-primary">Created Date</th>
        <th scope="col" className="text-primary">Document Status</th>
        <th scope="col" className="text-primary"></th>
        <th scope="col" className="text-primary"></th>
      </tr>
      </thead>
      <tbody>
      {searchedDocuments.map((inb, index) =>
        <tr key={index} className={"fw-medium small align-middle"}>
          <td className={""}>
            {inb.documentTitle}
          </td>
          <td className={""}>
            {isInboxPath ? inb.senderEmail : (inb.receivers.length > 0 ?
              (inb.receivers.map((r, index) =>
                <div key={index} className={"d-flex"}>
                  <div className={"flex-fill"}>{r.userEmail}</div>
                  <div className={"flex-fill"}>
                    {r.date.split('T')[0]}
                  </div>
                  <div className={"flex-fill"}>
                    <span className={
                      r.documentStatus === WAITING ? 'text-warning' :
                        r.documentStatus === SIGNING ? 'text-info' :
                          r.documentStatus === COMPLETED ? 'text-primary' :
                            r.documentStatus === ACCEPTED ? 'text-success' :
                              r.documentStatus === REJECTED && 'text-danger'
                    }>
                      {r.documentStatus}
                    </span>
                  </div>
                </div>
              ))
              :
              'Deleted by receiver')
            }
          </td>
          <td className={""}>
            {inb.createdDate.split('T')[0] + ' / ' + inb.createdDate.split('T')[1].substring(0, 8)}
          </td>
          <td className={
            inb.documentStatus === WAITING ? 'text-warning' :
              inb.documentStatus === SIGNING ? 'text-info' :
                inb.documentStatus === COMPLETED ? 'text-primary' :
                  inb.documentStatus === ACCEPTED ? 'text-success' :
                    inb.documentStatus === REJECTED && 'text-danger'
          }>
            {inb.documentStatus}
          </td>
          {(isInboxPath && inb.documentStatus === SIGNING) ?
            <td className={""}>
              <button className="nav-link text-primary text-decoration-underline fw-medium px-0"
                      onClick={() => navigate(`/viewAndSign/${inb.inboxId}`)}>
                view
              </button>
            </td>
            :
            (inb.documentStatus === REJECTED &&
              <td className={""}>
                <input type="text" className={"form-control-sm w-100"} placeholder={inb.rejectReason} disabled/>
              </td>
            )
          }
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
})

export default InboxTableView