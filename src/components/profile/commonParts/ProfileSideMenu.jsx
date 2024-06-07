import Dashboard from '../../../assets/icons/dashboard.svg'
import History from '../../../assets/icons/history.svg'
import Inbox from '../../../assets/icons/inbox.svg'
import Logout from '../../../assets/icons/logout.svg'
import Outbox from '../../../assets/icons/outbox.svg'
import EmployeeList from '../../../assets/icons/employee_list.svg'
import DocumentList from '../../../assets/icons/document_list.svg'
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../../../context/index.js";
import {OFFICE_MANAGER} from "../../../data/userRolesData.js";

const ProfileSideMenu = observer(() => {
  const {user, fetchChanges} = useContext(AuthContext)
  const isOfficeManager = user.role === OFFICE_MANAGER

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false)
    fetchChanges.toggleIsChanged()
    localStorage.removeItem('token')
  }

  return (
    <div className={"sticky-top d-flex flex-column p-4 vh-100 border border-right"}>
      <Link to={'/'} className={"d-flex align-items-center text-decoration-none"}>
        <div className={"text-primary fs-2 fw-bold"}>EDMS</div>
        <div className={"text-black ms-2 fw-semibold"}
             style={{fontSize: '10px', width: '100px'}}>
          electronic document
          management system
        </div>
      </Link>
      <div className="d-flex flex-column h-100 justify-content-between mt-5">
        <div>
          <div className={"fw-bold text-primary fs-5"}>
            Services
          </div>
          <ul className={"nav nav-pills flex-column mt-3"}>
            {isOfficeManager ?
              <li className={"mb-1"}>
                <Link to={"/"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                  <img src={Dashboard} alt="dashboard" className={"img-fluid me-3"}/>
                  <span className={"small opacity-50 align-middle"}>
                    Dashboard
                  </span>
                </Link>
              </li>
              :
              <li className={"mb-1"}>
                <Link to={"/"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                  <img src={Dashboard} alt={"create / sign"} className={"img-fluid me-3"}/>
                  <span className={"small opacity-50 align-middle"}>
                    Create / Sign
                  </span>
                </Link>
              </li>
            }
            <li className={"mb-1"}>
              <Link to={"/inbox"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={Inbox} alt="dashboard" className={"img-fluid me-3"}/>
                <span className={"small opacity-50 align-middle"}>
                  Inbox
                </span>
              </Link>
            </li>
            <li className={"mb-1"}>
              <Link to={"/outbox"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={Outbox} alt="dashboard" className={"img-fluid me-3"}/>
                <span className={"small opacity-50 align-middle"}>
                  Outbox
                </span>
              </Link>
            </li>
            {!isOfficeManager &&
              <li className={"mb-1"}>
                <Link to={"/history"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                  <img src={History} alt="history" className={"img-fluid me-3"}/>
                  <span className={"small opacity-50 align-middle"}>
                    History
                  </span>
                </Link>
              </li>
            }
            {isOfficeManager &&
              <>
                <li className={"mb-1"}>
                  <Link to={"/employeeList"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                    <img src={EmployeeList} alt="employee list" className={"img-fluid me-3"}/>
                    <span className={"small opacity-50 align-middle"}>
                      Employee list
                    </span>
                  </Link>
                </li>
                <li className={"mb-1"}>
                  <Link to={"/documentList"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                    <img src={DocumentList} alt="document list" className={"img-fluid me-3"}/>
                    <span className={"small opacity-50 align-middle"}>
                      Document list
                    </span>
                  </Link>
                </li>
              </>
            }
          </ul>
          <hr/>
          {isOfficeManager &&
            <>
              <div className={"fw-bold text-primary fs-5"}>
                Company info
              </div>
              <ul className={"nav nav-pills flex-column mt-3"}>
                <li className={"mb-2 small"}>
                  <span className={"fw-semibold"}>Company </span>
                  &quot;<span className={"opacity-75"}>{user.user.companyName}</span>&quot;
                </li>
                <li className={"mt-2 small"}>
                  <span className={"fw-semibold"}>BIN </span>
                  #<span className={"opacity-75"}>{user.user.companyBin}</span>
                </li>
              </ul>
            </>
          }
        </div>
        <div>
          <hr/>
          <ul className={"nav nav-pills flex-column"}>
            <li>
              <button type={'button'}
                      onClick={logout}
                      className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={Logout}
                     alt="logout" width={'25px'} className={"img-fluid me-3"}/>
                <span className="small opacity-50 align-middle">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default ProfileSideMenu