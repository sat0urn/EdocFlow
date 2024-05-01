import { Link, Outlet } from "react-router-dom"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../context/index.js";

const Profile = observer(() => {
  const {user} = useContext(AuthContext)

  return (
    <section className="container-fluid">
      <div className="row h-100">
        <div className="col-2">
          <div
              className="d-flex flex-column flex-shrink-0 vh-100 p-4"
              style={{ width: '250px', marginTop: '40%' }}
          >
            <h6 className="fw-bold text-primary ps-3">
              General
            </h6>
            <ul className="nav nav-pills flex-column my-3">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link link-body-emphasis opacity-25 fw-bold"
                >
                  <i className="fa-solid fa-house pe-none me-3"></i>
                  <span className="small">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="nav-link link-body-emphasis opacity-25 fw-bold"
                >
                  <i className="fa-solid fa-clock-rotate-left pe-none me-3"></i>
                  <span className="small">
                    History
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/inbox"
                  className="nav-link link-body-emphasis opacity-25 fw-bold"
                >
                  <i className="fa-solid fa-envelope pe-none me-3"></i>
                  <span className="small">
                    Inbox
                  </span>
                </Link>
              </li>
            </ul>
            <hr />
            <h6 className="fw-bold text-primary ps-3 mt-4">
              Other
            </h6>
            <ul className="nav nav-pills flex-column my-3">
              <li>
                <Link
                    to="/#"
                    className="nav-link link-body-emphasis opacity-25 fw-bold"
                >
                  <i className="fa-solid fa-circle-exclamation pe-none me-3"></i>
                  <span className="small">
                    Help & Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-10 bg-light">
          <div className="d-flex flex-row align-items-center justify-content-end m-5">
            <span className="me-4 fw-bold">
              {user.user.sub} / {user.user.firstName} {user.user.lastName}
            </span>
            <Link
              to=""
              className="bg-white rounded-circle shadow-lg me-2"
              style={{ padding: '5px 11px' }}
            >
              <i className="fa-regular fa-bell small text-black"></i>
            </Link>
            <Link
              to=""
              className="bg-white rounded-circle shadow-lg"
              style={{ padding: '5px 11px' }}
            >
              <i className="fa-regular fa-user small text-black"></i>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </section >
  )
})

export default Profile