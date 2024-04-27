import { useContext } from "react"
import Logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context"

function Header() {
  const navigate = useNavigate()
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <header className="py-3 border-bottom">
      <div className="container d-flex flex-wrap align-items-center justify-content-md-between">
        <Link
          to='/'
          className="d-flex align-items-end col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <img src={Logo} width="80px" />
          <h6>Electronic Document Management system</h6>
        </Link>

        {!isAuth
          &&
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
        }

        {!isAuth
          ?
          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              style={{ width: '120px' }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '120px' }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </button>
          </div>
          :
          <div className="col-3 text-end">
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ width: '120px' }}
              onClick={logout}
            >
              Log Out
            </button>
          </div>}
      </div>
    </header>
  )
}

export default Header