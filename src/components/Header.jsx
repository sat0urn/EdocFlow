import Logo from "../pictures/logo.png"
import "./Header.css"

function Header() {
  return (
    <div className="header--container container">
      <header className="header--content d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
        <a href="/" className="header--logo d-flex align-items-end col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <img src={Logo} width="80px" />
          <h6>Electronic Document Management system</h6>
        </a>

        <ul className="header--links nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="#about" className="nav-link px-2 link-dark">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Advantages
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Contact Us
            </a>
          </li>
        </ul>

        <div className="header--btns col-md-3">
          <button
            type="button"
            className="btn btn-outline-primary me-2">
            Login
          </button>
          <button
            type="button"
            className="btn btn-primary">
            Sign-up
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header