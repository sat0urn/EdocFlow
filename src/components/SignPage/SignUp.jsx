import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <section className="d-flex justify-content-center vh-100">
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col-md-6 my-auto">
            <div className="w-75 mx-auto">
              <div className="text-primary mb-4">
                <h1 className="fw-bolder">
                  Get started
                </h1>
              </div>
              <form>
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputFullName1"
                    className="form-label opacity-75"
                  >
                    Full Name
                  </label>
                  <input
                    className="form-control p-3 rounded-4"
                    id="exampleInputFullName1"
                    aria-describedby="emailHelp"
                    placeholder="Full Name" />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label opacity-75"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control p-3 rounded-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email Address" />
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="exampleInputBirth1"
                      className="form-label opacity-75"
                    >
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="form-control p-3 rounded-4"
                      id="exampleInputBirth1"
                      aria-describedby="emailHelp"
                      placeholder="Birth Date" />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="exampleInputPhone1"
                      className="form-label opacity-75"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control p-3 rounded-4"
                      id="exampleInputPhone1"
                      aria-describedby="emailHelp"
                      placeholder="Phone Number" />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="exampleInputProvince1"
                      className="form-label opacity-75"
                    >
                      Province
                    </label>
                    <input
                      type="name"
                      className="form-control p-3 rounded-4"
                      id="exampleInputProvince1"
                      aria-describedby="emailHelp"
                      placeholder="Province" />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="exampleInputCity1"
                      className="form-label opacity-75"
                    >
                      City
                    </label>
                    <input
                      type="number"
                      className="form-control p-3 rounded-4"
                      id="exampleInputCity1"
                      aria-describedby="emailHelp"
                      placeholder="City" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label opacity-75"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control p-3 rounded-4"
                      id="exampleInputPassword1"
                      aria-describedby="emailHelp"
                      placeholder="Password" />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label opacity-75"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control p-3 rounded-4"
                      id="exampleInputPassword1"
                      aria-describedby="emailHelp"
                      placeholder="Confirm Password" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 p-3 rounded-4"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div
            className="col-md-6"
            style={{ backgroundColor: '#407BFF' }}
          >
            <div className="d-flex align-items-center justify-content-center h-100 my-auto">
              <div className="text-start text-white w-50">
                <h1>Getting Easier to manage your documents onlines</h1>
                <p className="small opacity-75 mt-5">
                  Sign up and discover the world of digital documents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp