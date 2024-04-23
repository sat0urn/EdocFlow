import "./About.css"
import AboutPic from "../../pictures/about_pic.png"

export default function About() {
  return (
    <section id="about" className="d-flex justify-content-center align-items-center vh-100">
      <div className="about--container container">
        <div className="about--row row">
          <div className="about--col_1 col-md-6">
            <h1 className="about--col_1_title fw-bold">
              Digital solutions<br />
              to manage, sign and<br />
              exchange documents online
            </h1>
            <p className="about--col_1_desc small">
              Digital solutions to manage, sign and exchange documents online. jdfnjdn dnvjidfngji gndjifgndfg dfgjd fgndjong gdnjig
            </p>
            <div className="about--col_1_btns btn-group">
              <button
                type="button"
                className="btn btn-outline-primary me-4">
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary">
                Sign-up
              </button>
            </div>
          </div>
          <div className="about--col_2 col-md-6">
            <img src={AboutPic} alt="About Picture" />
          </div>
        </div>
      </div>
    </section>
  )
}