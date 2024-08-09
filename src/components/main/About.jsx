import AboutPic from "../../assets/about_pic.png"
import {useNavigate} from 'react-router-dom'
import {useEffect} from "react";

const About = () => {
  const navigate = useNavigate()

  return (
    <section id="about" className="d-flex align-items-center min-vh-100 bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 my-lg-auto my-5 text-lg-start text-center text-white">
            <h1 className="fw-bold">
              Digital solutions<br/>
              to manage, sign and<br/>
              exchange documents online
            </h1>
            <p className="small">
              Our comprehensive suite of digital solutions is designed to streamline your document workflows, enhance
              productivity, and ensure the highest levels of security and compliance.
            </p>
            <div className="d-xxl-inline-flex d-none btn-group w-75 mt-3" role="group">
              <button
                type="button"
                className="btn btn-outline-primary rounded-pill me-3"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </div>
            <div className={"d-xxl-none d-block fs-5 text-warning"}>
              To use our system you need to be authorized on your personal computer!
            </div>
          </div>
          <div className="col-lg-6 text-lg-end text-center my-lg-0 my-5">
            <img
              src={AboutPic}
              alt="About Picture"
              className={"img-fluid"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About