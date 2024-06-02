import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {AuthContext} from "../context/index.js";
import {registerBusiness} from "../http/departmentApi.js";

const RegisterBusiness = observer(() => {
  const {user} = useContext(AuthContext)
  const [isNextStep, setIsNextStep] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [businessForm, setBusinessForm] = useState({
    companyName: '',
    companyBin: '',
    companyCountry: '',
    companyCity: '',
    companyAddress: '',
    companyManagerIIN: ''
  })
  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    country: '',
    city: ''
  })

  const register = async (e) => {
    e.preventDefault()

    try {
      if (businessForm.companyBin.length === 12 ||
        (businessForm.companyManagerIIN &&
          businessForm.companyManagerIIN.length === 12)
      ) {
        if (userForm.password.length >= 6) {
          let data
          try {
            data = await registerBusiness(businessForm, userForm)
          } catch (e) {
            if (e.response.data === 'WARN_USER_EXISTS') {
              alert("User already exists by email: " + userForm.email)
            } else if (e.response.data === 'WARN_COMPANY_EXISTS') {
              alert("Company already exists by BIN: " + businessForm.companyBin)
            }
            return
          }
          setIsRegistered(true)
          user.setIsAuth(true)
          user.setUser(data)
        } else alert('Password should contain at least 6 characters')
      } else alert('BIN or IIN numbers length is wrong')
    } catch (e) {
      alert('Error in business registering')
    }
  }

  return (
    <section className="d-flex min-vh-100 bg-primary-subtle">
      <div className="container bg-white shadow-sm w-md-50 w-75 my-5 p-5">
        <div className="progress fw-semibold" style={{height: '25px'}}>
          <div className="progress-bar"
               role="progressbar"
               style={{width: '33%'}}
               aria-valuenow="33.3"
               aria-valuemin="0"
               aria-valuemax="100">B u s i n e s s
          </div>
          <div className={`progress-bar ${!isNextStep && 'd-none'}`}
               role="progressbar"
               style={{width: '33.3%'}}
               aria-valuenow="33"
               aria-valuemin="0"
               aria-valuemax="100">M a n a g e r
          </div>
          <div className={`progress-bar ${!isRegistered && 'd-none'}`}
               role="progressbar"
               style={{width: '33.4%'}}
               aria-valuenow="33"
               aria-valuemin="0"
               aria-valuemax="100">R e g i s t e r e d
          </div>
        </div>
        <div className="text-primary fs-1 fw-bolder my-4 text-center">
          {isNextStep ? 'Office Manager' : 'Company Registration'}
        </div>
        <form onSubmit={register}>
          {isNextStep ?
            <>
              <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
                <div className="w-100 me-4 mb-sm-0 mb-2">
                  <label htmlFor="exampleInputFirstName" className="form-label opacity-75">
                    First Name
                  </label>
                  <input type="text"
                         className="form-control p-3 rounded-4"
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
                    className="form-control p-3 rounded-4"
                    id="exampleInputLastName1"
                    placeholder="Last Name"
                    value={userForm.lastName}
                    onChange={e => setUserForm({...userForm, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-sm-row flex-column mb-2">
                <div className="w-100 me-4 mb-sm-0 mb-2">
                  <label htmlFor="exampleInputEmail" className="form-label opacity-75">
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
                <div className="w-100">
                  <label htmlFor="exampleInputPhone" className="form-label opacity-75">
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
              </div>
              <div className="d-flex flex-sm-row flex-column mb-2">
                <div className="w-100 me-4 mb-sm-0 mb-2">
                  <label htmlFor="exampleInputCountry" className="form-label opacity-75">
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
                  <label htmlFor="exampleInputCity" className="form-label opacity-75">
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
                <label htmlFor="exampleInputPassword" className="form-label opacity-75">
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
            </>
            :
            <>
              <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
                <div className="w-100 me-4 mb-sm-0 mb-2">
                  <label htmlFor="companyName" className="form-label opacity-75">
                    Company name
                  </label>
                  <input
                    type="text"
                    className="form-control p-3 rounded-4"
                    id="companyName"
                    placeholder="Enter company name"
                    value={businessForm.companyName}
                    onChange={(e) => setBusinessForm({...businessForm, companyName: e.target.value})}
                    required
                  />
                </div>
                <div className="w-100">
                  <label
                    htmlFor="companyBin"
                    className="form-label opacity-75"
                  >
                    BIN
                  </label>
                  <input
                    type="text"
                    className="form-control p-3 rounded-4"
                    id="companyBin"
                    placeholder="Enter company BIN"
                    value={businessForm.companyBin}
                    onChange={(e) => setBusinessForm({...businessForm, companyBin: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
                <div className="w-100 me-4 mb-sm-0 mb-2">
                  <label
                    htmlFor="companyCountry"
                    className="form-label opacity-75"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control p-3 rounded-4"
                    id="companyCountry"
                    placeholder="Enter company country"
                    value={businessForm.companyCountry}
                    onChange={(e) => setBusinessForm({...businessForm, companyCountry: e.target.value})}
                    required
                  />
                </div>
                <div className="w-100">
                  <label
                    htmlFor="companyCity"
                    className="form-label opacity-75"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control p-3 rounded-4"
                    id="companyCity"
                    placeholder="Enter company city"
                    value={businessForm.companyCity}
                    onChange={(e) => setBusinessForm({...businessForm, companyCity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="companyAddress"
                  className="form-label opacity-75"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control p-3 rounded-4"
                  id="companyAddress"
                  placeholder="Enter company address"
                  value={businessForm.companyAddress}
                  onChange={(e) => setBusinessForm({...businessForm, companyAddress: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyManagerIIN"
                  className="form-label opacity-75"
                >
                  Manager&apos;s IIN (optional)
                </label>
                <input
                  type="text"
                  className="form-control p-3 rounded-4"
                  id="companyManagerIIN"
                  placeholder="Enter manager IIN"
                  value={businessForm.companyManagerIIN}
                  onChange={(e) => setBusinessForm({...businessForm, companyManagerIIN: e.target.value})}
                />
              </div>
            </>
          }
          <div className={"btn-group w-100"}>
            {isNextStep ?
              <>
                <button type={"button"}
                        className="btn btn-outline-primary w-50 p-3 mt-2"
                        onClick={() => setIsNextStep(false)}>
                  Previous step
                </button>
                <button type={"submit"} className="btn btn-primary w-100 p-3 mt-2">
                  Register
                </button>
              </>
              :
              <button type={"button"}
                      className="btn btn-primary w-100 p-3 mt-2"
                      onClick={() => setIsNextStep(true)}>
                Next step
              </button>
            }
          </div>
        </form>
      </div>
    </section>
  )
})

export default RegisterBusiness