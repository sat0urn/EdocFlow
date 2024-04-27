function Recover() {
  return (
    <section className="container-fluid vh-100">
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-md-6">
          <form className="card rounded-4 mx-auto p-5 w-75">
            <div className="text-center mb-4">
              <h1 className="mb-3" style={{ color: '#407BFF' }}>
                Forgot Password
              </h1>
              <p className="small">
                Please select option to send link reset password
              </p>
            </div>
            <div className="card p-4 border-primary rounded-4 mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label opacity-75"
              >
                <div className="row mb-3 align-items-center">
                  <div className="col-md-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                      style={{
                        backgroundColor: '#407BFF',
                        width: '60px',
                        height: '60px'
                      }}>
                      <i className="fa-solid fa-envelope fs-4 text-white"></i>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h5 style={{ color: '#407BFF' }}>
                      Reset via Email
                    </h5>
                    <p className="m-0 small opacity-75">
                      We will send a link to reset your passwordo
                    </p>
                  </div>
                </div>
              </label>
              <input
                type="email"
                className="form-control bg-light p-3 rounded-4"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address" />
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>
            <button type="submit" className="btn btn-primary p-3 rounded-4">
              Send Link Reset Password
            </button>
          </form>
        </div>
      </div >
    </section >
  )
}

export default Recover