import {useContext, useState} from "react"
import {registration} from "../http/userApi"
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/index.js";
import {observer} from "mobx-react-lite";
import {citiesOfKazakhstan} from "../data/citiesOfKazakhstanData.js";

const SignUp = observer(() => {
  const {user} = useContext(AuthContext)
  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    country: 'Kazakhstan',
    city: ''
  })

  const signUp = async (e) => {
    e.preventDefault()
    if (!validateEmail(userForm.email)
      || !validatePhoneNumber(userForm.phoneNumber)
      || !validatePassword(userForm.password)
    ) {
      e.stopPropagation()
      return
    }

    let data
    try {
      data = await registration(userForm)
    } catch (e) {
      if (e.response.status === 409) {
        alert("User already exists by email: " + userForm.email)
      }
      return
    }
    user.setUser(data)
    user.setIsAuth(true)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase())
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^(?:\+77\d{2}\d{3}\d{4}|\+7 7\d{2} \d{3} \d{4}|87\d{2}\d{3}\d{4})$/;
    return re.test(String(phoneNumber));
  };

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
                  <div className="w-100 me-4">
                    <label htmlFor="exampleInputFirstName" className="form-label opacity-75">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control p-3 rounded-4 ${userForm.firstName ? 'is-valid' : 'is-invalid'}`}
                      id="exampleInputFirstName"
                      placeholder="First Name"
                      value={userForm.firstName}
                      onChange={e => setUserForm({...userForm, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="w-100">
                    <label htmlFor="exampleInputLastName1" className="form-label opacity-75">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control p-3 rounded-4 ${userForm.lastName ? 'is-valid' : 'is-invalid'}`}
                      id="exampleInputLastName1"
                      placeholder="Last Name"
                      value={userForm.lastName}
                      onChange={e => setUserForm({...userForm, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail" className="form-label opacity-75">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control p-3 rounded-4 ${validateEmail(userForm.email) ? 'is-valid' : 'is-invalid'}`}
                    id="exampleInputEmail"
                    placeholder="Email Address"
                    value={userForm.email}
                    onChange={e => setUserForm({...userForm, email: e.target.value})}
                    required
                  />
                  <div className="invalid-feedback">
                    Invalid email format
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputPhone" className="form-label opacity-75">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={`form-control p-3 rounded-4 ${validatePhoneNumber(userForm.phoneNumber) ? 'is-valid' : 'is-invalid'}`}
                    id="exampleInputPhone"
                    placeholder="Phone Number +7 or 8"
                    value={userForm.phoneNumber}
                    onChange={e => setUserForm({...userForm, phoneNumber: e.target.value})}
                    required
                  />
                  <div className="invalid-feedback">
                    Invalid phone number format
                  </div>
                </div>
                <div className="d-flex flex-sm-row flex-column mb-2">
                  <div className="w-100 me-4 mb-sm-0 mb-2">
                    <label htmlFor="exampleInputCountry" className="form-label opacity-75">
                      Country
                    </label>
                    <input
                      type="text"
                      disabled
                      className={`form-control p-3 rounded-4 is-valid`}
                      id="exampleInputCountry"
                      placeholder={userForm.country}
                      value={userForm.country}
                      onChange={e => setUserForm({...userForm, country: e.target.value})}
                      required
                    />
                  </div>
                  <div className="w-100">
                    <label htmlFor="exampleInputCity" className="form-label opacity-75">
                      City
                    </label>
                    <select
                      className={`form-select p-3 rounded-4 ${userForm.city ? 'is-valid' : 'is-invalid'}`}
                      id="exampleInputCity"
                      value={userForm.city}
                      onChange={e => setUserForm({...userForm, city: e.target.value})}
                      required
                    >
                      <option value={''}>Choose...</option>
                      {citiesOfKazakhstan.map((city, index) =>
                        <option key={index} value={city}>{city}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword" className="form-label opacity-75">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control p-3 rounded-4 ${userForm.password.length >= 6 ? 'is-valid' : 'is-invalid'}`}
                    id="exampleInputPassword"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={e => setUserForm({...userForm, password: e.target.value})}
                    required
                  />
                  <div className="invalid-feedback">
                    Password should contain at least 6 characters
                  </div>
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