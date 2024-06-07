import PageTitle from "../components/PageTitle.jsx";

const Reset = ({title}) => {
  return (
    <>
      <PageTitle title={title}/>
      <section className="container min-vh-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <form className="card rounded-4 mx-auto p-5 w-75">
              <div className="text-center mb-4">
                <h1 className="mb-4" style={{color: '#407BFF'}}>
                  Reset Password
                </h1>
                <p className="small">
                  Create your new password
                </p>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label opacity-75"
                >
                  <p className="mb-1 small opacity-75">
                    Email
                  </p>
                </label>
                <input
                  type="email"
                  className="form-control bg-light p-3 rounded-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"/>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label opacity-75"
                >
                  <p className="mb-1 small opacity-75">
                    New Password
                  </p>
                </label>
                <input
                  type="password"
                  className="form-control bg-light p-3 rounded-4"
                  id="exampleInputPassword1"
                  aria-describedby="emailHelp"
                  placeholder="New Password"/>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label opacity-75"
                >
                  <p className="mb-1 small opacity-75">
                    Confirm New Password
                  </p>
                </label>
                <input
                  type="email"
                  className="form-control bg-light p-3 rounded-4"
                  id="exampleInputPassword1"
                  aria-describedby="emailHelp"
                  placeholder="Confirm New Password"/>
              </div>
              <button type="submit" className="btn btn-primary p-3 rounded-4">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Reset