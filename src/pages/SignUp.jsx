import {useContext, useState} from "react"
import {registration} from "../http/userApi"
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/index.js";
import {observer} from "mobx-react-lite";

const SignUp = observer(() => {
  const {user} = useContext(AuthContext)
  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    country: '',
    city: ''
  })

  const signUp = async (event) => {
    event.preventDefault()
    let data
    if (userForm.password.length >= 6) {
      try {
        data = await registration(userForm)
      } catch (e) {
        if (e.response.status === 409) {
          alert("User already exists by email: " + userForm.email)
        } else {
          console.log(e)
        }
        return
      }
      user.setIsAuth(true)
      user.setUser(data)
    } else {
      alert('Password should contain at least 6 characters')
    }
  }

  return (
    <section className="d-flex min-vh-100">
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col-lg-6 col-12 my-auto py-5">
            <div className="w-75 mx-auto">
              <div className="text-primary mb-4 fs-1 fw-bolder">
                Get started
              </div>
              <form onSubmit={signUp}>
                <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
                  <div className="w-100 me-4 mb-sm-0 mb-2">
                    <label
                      htmlFor="exampleInputFirstName"
                      className="form-label opacity-75"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control p-3 rounded-4"
                      id="exampleInputFirstName"
                      placeholder="First Name"
                      value={userForm.firstName}
                      onChange={e => setUserForm({...userForm, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="w-100">
                    <label
                      htmlFor="exampleInputLastName1"
                      className="form-label opacity-75"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control p-3 rounded-4"
                      id="exampleInputLastName1"
                      placeholder="Last Name"
                      value={userForm.lastName}
                      onChange={e => setUserForm({...userForm, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputEmail"
                    className="form-label opacity-75"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control p-3 rounded-4"
                    id="exampleInputEmail"
                    placeholder="Email Address"
                    value={userForm.email}
                    onChange={e => setUserForm({...userForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputPhone"
                    className="form-label opacity-75"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control p-3 rounded-4"
                    id="exampleInputPhone"
                    placeholder="Phone Number"
                    value={userForm.phoneNumber}
                    onChange={e => setUserForm({...userForm, phoneNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="d-flex flex-sm-row flex-column mb-2">
                  <div className="w-100 me-4 mb-sm-0 mb-2">
                    <label
                      htmlFor="exampleInputCountry"
                      className="form-label opacity-75"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control p-3 rounded-4"
                      id="exampleInputCountry"
                      placeholder="Country"
                      value={userForm.country}
                      onChange={e => setUserForm({...userForm, country: e.target.value})}
                      required
                    />
                  </div>
                  <div className="w-100">
                    <label
                      htmlFor="exampleInputCity"
                      className="form-label opacity-75"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control p-3 rounded-4"
                      id="exampleInputCity"
                      placeholder="City"
                      value={userForm.city}
                      onChange={e => setUserForm({...userForm, city: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleInputPassword"
                    className="form-label opacity-75"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control p-3 rounded-4"
                    id="exampleInputPassword"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={e => setUserForm({...userForm, password: e.target.value})}
                    required
                  />
                </div>

                <button type={"submit"} className="btn btn-primary w-100 p-3 rounded-4">
                  Sign Up
                </button>
                <div className={"text-center mt-4"}>
                  <span className={"opacity-75"}>
                    You already Have an Account?
                  </span>
                  {' '}
                  <span>
                    <Link to='/login'>
                      Sign In
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex d-none bg-primary">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center text-white w-75">
                <h1>Getting Easier to manage your documents online</h1>
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
})

export default SignUp