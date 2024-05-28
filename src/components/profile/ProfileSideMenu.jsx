import {Link} from "react-router-dom";
import Dashboard from '../../assets/icons/dashboard.svg'
import History from '../../assets/icons/history.svg'
import Inbox from '../../assets/icons/inbox.svg'
import Settings from '../../assets/icons/settings.svg'
import Logout from '../../assets/icons/logout.svg'
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../../context/index.js";

const ProfileSideMenu = observer(() => {
  const {user} = useContext(AuthContext)

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
  }

  return (
    <div className={"sticky-top p-4 vh-100"}>
      <Link to='/' className={"d-flex align-items-center text-decoration-none"}>
        <div className={"text-primary fs-2 fw-bold"}>EDMS</div>
        <div className={"text-black ms-2 fw-semibold"}
             style={{fontSize: '10px', width: '100px'}}>
          electronic document
          management system
        </div>
      </Link>
      <div className="d-flex flex-column h-100 justify-content-between">
        <div>
          <div className={"fw-bold text-primary fs-5 mt-5"}>
            Services
          </div>
          <ul className={"nav nav-pills flex-column mt-3"}>
            <li className={"mb-1"}>
              <Link to={"/"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={Dashboard}
                     alt="dashboard"
                     className={"img-fluid me-3"}
                />
                <span className={"small opacity-50 align-middle"}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li className={"mb-1"}>
              <Link to={"/inbox"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={Inbox}
                     alt="dashboard"
                     className={"img-fluid me-3"}
                />
                <span className={"small opacity-50 align-middle"}>
                  Inbox
                </span>
              </Link>
            </li>
            <li className={"mb-1"}>
              <Link to={"/history"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={History}
                     alt="history"
                     className={"img-fluid me-3"}
                />
                <span className={"small opacity-50 align-middle"}>
                  History
                </span>
              </Link>
            </li>
          </ul>
          <hr/>
        </div>
        <div className={"mb-5"}>
          <hr/>
          <ul className={"nav nav-pills flex-column"}>
            <li>
              <Link to={"/support"} className={"nav-link link-body-emphasis fw-medium px-0"}>
                <img src={Settings}
                     alt="settings"
                     width={'25px'}
                     className={"img-fluid me-3"}
                />
                <span className="small opacity-50 align-middle">
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <button type={'button'}
                      onClick={logout}
                      className={"nav-link link-body-emphasis fw-medium px-0"}
              >
                <img src={Logout}
                     alt="logout"
                     width={'25px'}
                     className={"img-fluid me-3"}
                />
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