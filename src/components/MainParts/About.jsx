import AboutPic from "../../pictures/about_pic.png"

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
            <div className="btn-group mt-3 w-75">
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
          <div className="col-md-6 text-end">
            <img src={AboutPic} alt="About Picture" />
          </div>
        </div>
      </div>
    </section>
  )
}