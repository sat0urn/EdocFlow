import ProfileAuxWindow from "./ProfileAuxWindow.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/index.js";
import {getAllInboxes} from "../../http/docsApi.js";

const ProfileInbox = observer(() => {
  const navigate = useNavigate()
  const {documents} = useContext(AuthContext)

  const location = useLocation()
  useEffect(() => {
    getAllInboxes()
      .then((data) => {
        documents.setInbox(data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [location.key, documents])

  return (
    <div className={"row"}>
      <div className={"col-lg-9"}>
        <div className={"rounded-pill bg-primary text-white d-flex justify-content-between w-50 p-3"}>
          <div>New and Active documents</div>
          <div>{documents.inbox.length} in total</div>
        </div>

        <input type="text"
               className={"form-control shadow-sm rounded-pill my-3"}
               placeholder="&#xF002;   Search for specific document by name or ID. . ."
               style={{fontFamily: 'Arial, FontAwesome'}}
        />

        <div className={"d-flex flex-row"}>
          <button className={"btn btn-outline-primary rounded-3 me-3 px-4"}>
            All new
          </button>
          <button className={"btn btn-primary rounded-3 me-3 px-4"}>
            Requested to sign
          </button>
          <button className={"btn btn-outline-primary rounded-3 me-3 px-4"}>
            Rejected to signer
          </button>
          <button className={"btn btn-primary rounded-3 px-4"}>
            Viewed
          </button>
        </div>

        <table className="table table-light table-striped w-100 mt-3">
          <thead>
          <tr>
            <th scope="col" className="text-primary">#ID</th>
            <th scope="col" className="text-primary">Name</th>
            <th scope="col" className="text-primary">Sender</th>
            <th scope="col" className="text-primary">Created Date</th>
            <th scope="col" className="text-primary">PDF</th>
            <th scope="col" className="text-primary"></th>
          </tr>
          </thead>
          <tbody>
          {documents.inbox &&
            documents.inbox.map((inb, index) => (
              <tr key={index} className={"fw-medium small"}>
                <th className="fw-semibold" scope="row">
                  {inb.inboxId}
                </th>
                <td className={""}>
                  {inb.documentTitle}
                </td>
                <td className={""}>
                  {inb.senderEmail}
                </td>
                <td className={""}>
                  {inb.createdDate.split('T')[0]}
                </td>
                <td className={""}>
                  <button className="nav-link text-primary text-decoration-underline fw-medium px-0"
                          onClick={() => navigate(`/viewAndSign/${inb.inboxId}`)} formTarget={"_blank"}>
                    view
                  </button>
                </td>
                <td className="text-secondary">
                  <button className="nav-link text-danger text-decoration-underline fw-medium px-0">
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={"col-lg-3"}>
        <ProfileAuxWindow/>
      </div>
    </div>
  )
})

export default ProfileInbox