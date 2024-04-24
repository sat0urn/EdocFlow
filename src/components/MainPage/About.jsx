import AboutPic from "../../assets/about_pic.png"
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section
      id="about"
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div className="container">
        <div className="row">
          <div
            className="col-md-6 my-auto"
            style={{ color: 'white' }}
          >
            <h1 className="fw-bold">
              Digital solutions<br />
              to manage, sign and<br />
              exchange documents online
            </h1>
            <p className="small">
              Digital solutions to manage, sign and exchange documents online. jdfnjdn dnvjidfngji gndjifgndfg dfgjd fgndjong gdnjig
            </p>
            <div className="btn-group w-75 mt-3" role="group">
              <Link to='/login' className="w-100 me-3">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100">
                  Login
                </button>
              </Link>
              <Link to='/register' className="w-100">
                <button
                  type="button"
                  className="btn btn-primary w-100">
                  Sign-up
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <img src={AboutPic} alt="About Picture" />
          </div>
        </div>
      </div>
    </section >
  )
}