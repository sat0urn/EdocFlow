import ProfileAuxWindow from "./ProfileAuxWindow.jsx";
import {Link} from "react-router-dom";

const ProfileEmployeeDocsView = () => {
  return (
    <div className={"row"}>
      <div className={"col-lg-9"}>
        <div className={"mb-4"}>
          <Link to={'/employeeList'}
                className={"rounded-pill bg-primary d-inline-flex align-items-center py-2 px-3 text-decoration-none"}>
            <div className={"bg-white shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
                 style={{width: '25px', height: '25px'}}>
              <i className={"fa-solid fa-arrow-left"}></i>
            </div>
            <div className={"text-white mx-2"}>
              Return to Employee List page!
            </div>
          </Link>
        </div>
        <div className={"card d-inline-flex align-items-center rounded-4 flex-row px-3 py-4 mb-4"}>
          <div className={"border border-3 border-primary rounded-circle bg-light mt-1 me-4"}
               style={{width: '70px', height: '70px'}}>
          </div>
          <div>
            <div className={"fs-5 fw-semibold mb-1"}>Kusainov Aslan</div>
            <div className={"small fst-italic mb-1"}>
              Employee ID - <span className={"text-decoration-underline opacity-50"}>{321321}</span>
            </div>
            <div className={"small fst-italic"}>
              Department - <span className={"text-decoration-underline opacity-50"}>{'Back-end developer'}</span>
            </div>
          </div>
        </div>
        <div className={"card p-3 rounded-4"}>
          <table className="table table-hover">
            <thead className="text-center">
            <tr>
              <th scope="col" className="text-primary">#ID</th>
              <th scope="col" className="text-primary">Name</th>
              <th scope="col" className="text-primary">Status</th>
              <th scope="col" className="text-primary">Created Date</th>
              <th scope="col" className="text-primary">Receiver</th>
              <th scope="col" className="text-primary">PDF</th>
            </tr>
            </thead>
            <tbody className="text-center">
            <tr>
              <td className={"text-secondary"}>
                {32132132}
              </td>
              <td className={"text-secondary"}>
                {'Employee Contract'}
              </td>
              <td className={'fw-semibold text-success'}>
                {'status'}
              </td>
              <td className="text-secondary">
                {'22-06-2024'}
              </td>
              <td className="text-secondary">
                {'Kusainov Aslan'}
              </td>
              <td className="text-secondary text-center">
                <button className="d-inline nav-link link-body-emphasis text-primary text-decoration-underline">
                  view
                </button>
              </td>
            </tr>
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
  )
}

export default ProfileEmployeeDocsView