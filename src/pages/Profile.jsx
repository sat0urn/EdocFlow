import { Link, Outlet } from "react-router-dom"

function Profile() {
  return (
    <section className="vh-100 container-fluid">
      <div className="row h-100">
        <div className="col-2">
          <div className="d-flex flex-column flex-shrink-0 p-4" style={{ width: '250px' }}>
            <h6
              className="fw-bold ps-3"
              style={
                {
                  color: '#407BFF',
                  marginTop: '40%'
                }
              }>
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
            <h6
              className="fw-bold ps-3 mt-4"
              style={
                {
                  color: '#407BFF',
                }
              }>
              Other
            </h6>
            <ul className="nav nav-pills flex-column my-3">
              <li>
                <a href="#" className="nav-link link-body-emphasis opacity-25 fw-bold">
                  <i className="fa-solid fa-circle-exclamation pe-none me-3"></i>
                  <span className="small">
                    Help & Support
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-10 bg-light">
          <div className="d-flex flex-row justify-content-end mt-4 me-5">
            <a
              href=""
              className="bg-white rounded-circle shadow-lg me-2"
              style={{ padding: '5px 11px' }}
            >
              <i className="fa-regular fa-bell small text-black"></i>
            </a>
            <a
              href=""
              className="bg-white rounded-circle shadow-lg"
              style={{ padding: '5px 11px' }}
            >
              <i className="fa-regular fa-user small text-black"></i>
            </a>
          </div>
          <Outlet />
        </div>
      </div>
    </section >
  )
}

export default Profile