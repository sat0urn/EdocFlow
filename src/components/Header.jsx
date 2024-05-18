import {useContext} from "react"
import logo from "../assets/logo.png"
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from "../context"
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <nav className={"navbar navbar-expand-lg border-bottom"}>
            <div className={"container-md"}>
                <Link to='/' className={"navbar-brand"}>
                    <img src={logo} width="80px" alt=""/>
                    <div className={"d-sm-inline-flex d-none flex-column align-middle fw-bold"}>
                        <span style={{fontSize: '14px'}}>Electronic Document</span>
                        <span style={{fontSize: '14px'}}>Management system</span>
                    </div>
                </Link>
                <button
                    className={"navbar-toggler"}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className={"navbar-toggler-icon"}></span>
                </button>
                <div className={"collapse navbar-collapse justify-content-end"} id={"navbarSupportedContent"}>
                    {!user.isAuth
                        ?
                        <ul className={"navbar-nav mx-lg-auto mx-0 align-items-center mb-2 mb-lg-0"}>
                            <li className={"nav-item"}>
                                <a href="/#about" className={"nav-link px-3 link-dark"}>
                                    About Us
                                </a>
                            </li>
                            <li className={"nav-item"}>
                                <a href="/#service" className={"nav-link px-3 link-dark"}>
                                    Services
                                </a>
                            </li>
                            <li className={"nav-item"}>
                                <a href="/#advantage" className={"nav-link px-3 link-dark"}>
                                    Advantages
                                </a>
                            </li>
                            <li className={"nav-item"}>
                                <a href="/#contact" className={"nav-link px-3 link-dark"}>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                        :
                        <div className={"d-xl-none d-flex flex-lg-row flex-column mx-lg-auto align-items-center"}>
                            <div className={"dropdown me-lg-2 mb-lg-0 mb-2"}>
                                <a className={"btn btn-outline-secondary dropdown-toggle-split px-3"}
                                   href="#"
                                   role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    General
                                </a>

                                <ul className={"dropdown-menu"}>
                                    <li className={"opacity-50"}>
                                        <Link to="/" className="dropdown-item">
                                            <i className={"fa-solid fa-house pe-none me-2"}></i>
                                            <span className="small fw-semibold">
                                                Dashboard
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li className={"opacity-50"}>
                                        <Link to="/history" className="dropdown-item">
                                            <i className="fa-solid fa-clock-rotate-left pe-none me-2"></i>
                                            <span className="small fw-semibold">
                                                History
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li className={"opacity-50"}>
                                        <Link to="/inbox" className="dropdown-item">
                                            <i className="fa-solid fa-envelope pe-none me-2"></i>
                                            <span className="small fw-semibold">
                                              Inbox
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown mb-lg-0 mb-2">
                                <a className={"btn btn-outline-secondary dropdown-toggle-split px-3"}
                                   href="#"
                                   role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Other
                                </a>

                                <ul className="dropdown-menu">
                                    <li className={"opacity-50"}>
                                        <Link to="/support" className="dropdown-item">
                                            <i className="fa-solid fa-circle-exclamation pe-none me-2"></i>
                                            <span className="small fw-semibold">
                                                Help & Support
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }

                    {!user.isAuth
                        ?
                        <div className="d-md-block d-none text-lg-end text-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary me-2"
                                style={{width: '120px'}}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{width: '120px'}}
                                onClick={() => navigate('/register')}
                            >
                                Sign Up
                            </button>
                        </div>
                        :
                        <div className="text-lg-end text-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                style={{width: '120px'}}
                                onClick={logout}
                            >
                                Log Out
                            </button>
                        </div>}
                </div>
            </div>
        </nav>
    )
})

export default Header