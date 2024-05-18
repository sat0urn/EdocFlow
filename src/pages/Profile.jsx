import {Link, Outlet, useLocation} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../context/index.js";
import {profilePathNames} from "../data/profilePageData.js";

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
        <section className={"container-fluid"}>
            <div className={"row row-cols-2 min-vh-100"}>
                <div className={"col-xl-2 d-xl-flex d-none flex-column mt-5 p-4"}>
                    <h6 className={"fw-bold text-primary ps-3"}>
                        General
                    </h6>
                    <ul className={"nav nav-pills flex-column my-3"}>
                        <li>
                            <Link to="/" className="nav-link link-body-emphasis opacity-25 fw-bold">
                                <i className={"fa-solid fa-house pe-none me-3"}></i>
                                <span className={"small"}>
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/history" className={"nav-link link-body-emphasis opacity-25 fw-bold"}>
                                <i className={"fa-solid fa-clock-rotate-left pe-none me-3"}></i>
                                <span className={"small"}>
                                    History
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/inbox" className={"nav-link link-body-emphasis opacity-25 fw-bold"}>
                                <i className={"fa-solid fa-envelope pe-none me-3"}></i>
                                <span className={"small"}>
                                      Inbox
                                    </span>
                            </Link>
                        </li>
                    </ul>
                    <hr/>
                    <h6 className={"fw-bold text-primary ps-3 mt-4"}>
                        Other
                    </h6>
                    <ul className={"nav nav-pills flex-column my-3"}>
                        <li>
                            <Link to="/support" className="nav-link link-body-emphasis opacity-25 fw-bold">
                                <i className="fa-solid fa-circle-exclamation pe-none me-3"></i>
                                <span className="small">
                                        Help & Support
                                    </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={"col-xl-10 col-12 bg-light"}>
                    <div className={"container-md w-md-75 w-100"}>
                        <div className={"d-flex justify-content-between align-items-center my-5"}>
                            {profilePathNames.map((p) => {
                                if (p.path === location.pathname) {
                                    return (
                                        <div key={p.id} className={"flex-column text-primary"}>
                                            <h1 className={"fw-bolder"}>
                                                {p.title}
                                            </h1>
                                        </div>)
                                }
                            })}
                            <div className={"d-flex"}>
                                <div className={"flex-column dropdown"}>
                                    <div className={"d-inline-block border-bottom border-top border-dark p-1 fw-semibold me-3 fst-italic"}>
                                        {user._user.firstName + ' ' + user._user.lastName + ' / ' + user._user.sub}
                                    </div>
                                    <Link
                                        to=""
                                        className={"bg-white shadow me-2 py-2 px-3 rounded-start-circle"}
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