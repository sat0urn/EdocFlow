import logo from "../assets/logo.png"
import {Link, useLocation} from 'react-router-dom'

const Header = () => {
  const location = useLocation()

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
          <div className="dropstart d-md-block d-none text-lg-end text-center">

            <a className="btn btn-outline-primary px-4"
               href="#"
               role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false">
              O u r &nbsp; S o l u t i o n s
            </a>

            <ul className={"dropdown-menu me-3 px-2 bg-dark bg-gradient bg-opacity-10"}
                style={{minWidth: '200px'}}
            >
              <li className={"text-center"}>
                <Link to={'/login'}
                      className={"btn btn-outline-primary w-100 mb-2"}>
                  For personal
                </Link>
              </li>
              <li className={"text-center"}>
                <Link to={'/registerBusiness'}
                      className={"btn " +
                        (location.pathname === '/login' ||
                        location.pathname === '/register' ?
                          'btn-dark' : 'btn-primary')
                        +
                        " w-100"}>
                  For business
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header