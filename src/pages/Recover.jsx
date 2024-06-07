import PageTitle from "../components/PageTitle.jsx";

const Recover = ({title}) => {
  return (
    <>
      <PageTitle title={title}/>
      <section className={"d-flex min-vh-100"}>
        <div className={"container my-auto"}>
          <div className={"d-flex justify-content-center"}>
            <form className={"card rounded-4 mx-auto p-md-5 p-3"}>
              <div className={"text-center mb-4"}>
                <h1 className={"mb-3 text-primary"}>
                  Forgot Password
                </h1>
                <p className={"small"}>
                  Please select option to send link reset password
                </p>
              </div>
              <div className={"card p-4 border-primary rounded-4 mb-3"}>
                <label htmlFor="exampleInputEmail1" className={"form-label opacity-75"}>
                  <div className={"d-flex flex-row mb-3 align-items-center"}>
                    <div className={"me-3"}>
                      <div
                        className={"rounded-circle d-flex align-items-center justify-content-center mx-auto bg-primary"}
                        style={{width: '60px', height: '60px'}}
                      >
                        <i className={"fa-solid fa-envelope fs-4 text-white"}></i>
                      </div>
                    </div>
                    <div className="">
                      <h5 className={"text-primary"}>
                        Reset via Email
                      </h5>
                      <p className="mb-0 small opacity-75">
                        We will send a link to reset your password
                      </p>
                    </div>
                  </div>
                </label>
                <input
                  type="email"
                  className="form-control bg-light p-3 rounded-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"/>
                <div id="emailHelp" className="form-text">
                  We&apos;ll never share your email with anyone else.
                </div>
              </div>
              <button type="submit" className="btn btn-primary p-3 rounded-4">
                Send Link Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Recover