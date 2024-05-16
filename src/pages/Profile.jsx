import {Link, Outlet, useLocation} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../context/index.js";

const Profile = observer(() => {
    const {user} = useContext(AuthContext)
    const location = useLocation()
    const notificationArray = [
        "Notification #1",
        "Notification #2",
        "Notification #3",
        "Notification #4",
        "Notification #5",
        "Notification #6"
    ]

    return (
        <section className="container-fluid">
            <div className="row h-100">
                <div className="col-2">
                    <div
                        className="d-flex flex-column flex-shrink-0 vh-100 p-4"
                        style={{width: '250px', marginTop: '40%'}}
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
                        <hr/>
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
                    <div className={"container w-75"}>
                        <div className="d-flex flex-row align-items-center justify-content-between my-5">
                            {location.pathname === '/' &&
                                <div className={"text-primary"}>
                                    <h1 className={"fw-bolder"}>
                                        Dashboard
                                    </h1>
                                </div>
                            }
                            {location.pathname === '/history' &&
                                <div className={"text-primary"}>
                                    <h1 className={"fw-bolder"}>
                                        Your documents
                                    </h1>
                                </div>
                            }
                            {location.pathname === '/security' &&
                                <div className={"text-primary"}>
                                    <h1 className={"fw-bolder"}>
                                        Login and Security
                                    </h1>
                                </div>
                            }
                            {location.pathname === '/inbox' &&
                                <div className={"text-primary"}>
                                    <h1 className={"fw-bolder"}>
                                        Inbox
                                    </h1>
                                </div>
                            }
                            <div className={"d-flex flex-row justify-content-end align-items-center"}>
                                <span className="me-4 fw-bold">
                                    {user.user.sub} / {user.user.firstName} {user.user.lastName}
                                </span>
                                <div className="dropdown">
                                    <Link
                                        to=""
                                        className="bg-white shadow me-2 py-2 px-3 rounded-start-circle"
                                        role="button"
                                        id="dropdownMenuLink"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa-regular fa-bell small text-black"></i>
                                    </Link>

                                    <ul className="dropdown-menu text-center mt-2">
                                        <div className={"mt-2"}></div>
                                        {notificationArray.map((not, index) =>
                                            <li key={index} className={"mb-2 px-2 text-primary"}>{not}</li>
                                        )}
                                        <div className={"mb-2"}></div>
                                    </ul>

                                    <Link to="/security" className="bg-white shadow py-2 px-3 rounded-end-circle">
                                        <i className="fa-regular fa-user small text-black"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </section>
    )
})

export default Profile