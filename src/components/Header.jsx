import Logo from "../pictures/logo.png"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="py-3 border-bottom">
      <div className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
        <Link
          to='/'
          className="d-flex align-items-end col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <img src={Logo} width="80px" />
          <h6>Electronic Document Management system</h6>
        </Link>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/#about" className="nav-link px-2 link-dark">
              About Us
            </a>
          </li>
          <li>
            <a href="/#service" className="nav-link px-2 link-dark">
              Services
            </a>
          </li>
          <li>
            <a href="/#advantage" className="nav-link px-2 link-dark">
              Advantages
            </a>
          </li>
          <li>
            <a href="/#contact" className="nav-link px-2 link-dark">
              Contact Us
            </a>
          </li>
        </ul>

        <div className="col-md-3">
          <Link to='/login'>
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              style={{ width: '120px' }}
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '120px' }}
            >
              Sign-up
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header