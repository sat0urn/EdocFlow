import ProfileAuxWindow from "./commonParts/ProfileAuxWindow.jsx";
import {Link, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../../context/index.js";
import PageTitle from "../PageTitle.jsx";

const ProfileEmployeeDocsView = observer(({title}) => {
  const {user, documents} = useContext(AuthContext)

  const {email} = useParams()
  const exactEmployee = user.findEmployeeByEmail(email)

  const exactEmployeeDocuments = documents.history.filter(({id}) => exactEmployee.documentIds.includes(id))

  console.log(exactEmployeeDocuments)

  return (
    <>
      <PageTitle title={title}/>
      <div className={"row"}>
        <div className={"col-lg-9"}>
          <div className={"mb-4"}>
            <Link to={'/employeeList'}
                  className={"rounded-pill bg-primary d-inline-flex align-items-center p-2 text-decoration-none"}>
              <div className={"bg-white shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
                   style={{width: '40px', height: '40px'}}>
                <i className={"fa-solid fa-arrow-left"}></i>
              </div>
              <div className={"text-white mx-4"}>
                Return to list
              </div>
            </Link>
          </div>
          <div className={"card d-inline-flex align-items-center rounded-4 flex-row px-3 py-4 mb-4"}>
            <div className={"border border-3 border-primary rounded-circle bg-light mt-1 me-4"}
                 style={{width: '70px', height: '70px'}}>
            </div>
            <div>
              <div className={"fs-5 fw-semibold mb-1"}>{exactEmployee.firstName + ' ' + exactEmployee.lastName}</div>
              <div className={"small fst-italic mb-1"}>
                Department - <span className={"text-decoration-underline opacity-50"}>#{exactEmployee.orgId}</span>
              </div>
              <div className={"small fst-italic"}>
                Position - <span className={"text-decoration-underline opacity-50"}>{exactEmployee.position}</span>
              </div>
            </div>
          </div>
          <div className={"card p-3 rounded-4"}>
            <table className={"table table-hover"}>
              <thead>
              <tr>
                <th scope="col" className="text-primary">Name</th>
                <th scope="col" className="text-primary">Status</th>
                <th scope="col" className="text-primary">Created Date</th>
              </tr>
              </thead>
              <tbody>
              {exactEmployeeDocuments.map(({name, status, createdTime}, index) =>
                <tr key={index}>
                  <td className={"text-secondary"}>
                    {name}
                  </td>
                  <td className={'fw-semibold text-success'}>
                    {status}
                  </td>
                  <td className="text-secondary">
                    {createdTime.split('T')[0] + ' / ' + createdTime.split('T')[1].substring(0, 8)}
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div>

          </div>
        </div>
        <div className="col-lg-3">
          <ProfileAuxWindow/>
        </div>
      </div>
    </>
  )
})

export default ProfileEmployeeDocsView