import ProfileAuxWindow from "./commonParts/ProfileAuxWindow.jsx";
import {Link} from "react-router-dom";
import PageTitle from "../PageTitle.jsx";

const ProfileDashboard = ({title}) => {
  return (
    <>
      <PageTitle title={title}/>
      <div className={"row"}>
        <div className={"col-lg-9"}>
          <div className={"card bg-primary rounded-4 text-white px-5 py-4 border-0 shadow-sm w-100"}>
            <div className={"fs-3 w-75"}>
              READ A HELPFUL GUIDE TO LEARN HOW TO USE
              ALL THE FEATURES OF SYSTEM
            </div>
            <div className={"mt-4"}>
              <Link to={'#'}
                    className={"rounded-pill bg-dark d-inline-flex align-items-center py-1 px-2 text-decoration-none"}>
                <div className={"text-white mx-4"}>
                  Learn now!
                </div>
                <div
                  className={"bg-primary shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
                  style={{width: '40px', height: '40px'}}>
                  <i className={"fa-solid fa-arrow-right text-white"}></i>
                </div>
              </Link>
            </div>
          </div>
          <div className={"row mt-3"}>
            <div className={"col-6"}>
              <div className={"card bg-white p-4 rounded-4 border-0 shadow-sm h-100"}>
                <div className={"fs-4 fw-bold mb-2"}>Employee List</div>
                <div className={"w-75 mb-4"}>
                  Add new employee, track their documents and edit their information
                </div>
                <div className={"mt-auto"}>
                  <Link to={'/employeeList'}
                        className={"rounded-pill bg-primary d-inline-flex align-items-center py-1 px-2 text-decoration-none"}>
                    <div className={"text-white mx-3"}>
                      Edit now
                    </div>
                    <div
                      className={"bg-white shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
                      style={{width: '40px', height: '40px'}}>
                      <i className={"fa-solid fa-arrow-right"}></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className={"col-6"}>
              <div className={"card bg-white p-4 rounded-4 border-0 shadow-sm h-100"}>
                <div className={"fs-4 fw-bold mb-2"}>All document list</div>
                <div className={"w-75 mb-4"}>
                  Check out the list of documents received or sent by you. There, you can find documents deleted from
                  inbox
                </div>
                <div className={"mt-auto"}>
                  <Link to={'/documentList'}
                        className={"rounded-pill bg-primary d-inline-flex align-items-center py-1 px-2 text-decoration-none"}>
                    <div className={"text-white mx-3"}>
                      Edit now
                    </div>
                    <div
                      className={"bg-white shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
                      style={{width: '40px', height: '40px'}}>
                      <i className={"fa-solid fa-arrow-right"}></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <ProfileAuxWindow/>
        </div>
      </div>
    </>
  )
}

export default ProfileDashboard