import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {AuthContext} from "../context/index.js";
import {registerBusiness} from "../http/departmentApi.js";
import RegisterBusinessForm from "./RegisterBusinessForm.jsx";
import OfficeManagerForm from "./OfficeManagerForm.jsx";
import PageTitle from "./PageTitle.jsx";

const RegisterBusiness = observer(({title}) => {
  const {user} = useContext(AuthContext)
  const [isNextStep, setIsNextStep] = useState(false)
  const [businessForm, setBusinessForm] = useState({
    companyName: '',
    companyBin: '',
    companyCountry: 'Kazakhstan',
    companyCity: '',
    companyAddress: '',
    companyManagerIIN: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: ''
  })

  const register = async (e) => {
    e.preventDefault()

    if (!validateBinAndManagerIIN(businessForm.companyBin, businessForm.companyManagerIIN)
      || !validatePassword(userForm.password)
      || !validateEmail(userForm.email)
      || !validatePhoneNumber(userForm.phoneNumber)
    ) {
      e.stopPropagation()
      return
    }

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
    user.setUser(data)
    user.setIsAuth(true)
    user.setEmployees([])
    user.setRole(data.role)
  }

  const validateBinAndManagerIIN = (bin, managerIIN) => {
    return bin.length === 12
      || (managerIIN && managerIIN.length === 12)
  }

  const validatePassword = (password) => {
    return password.length >= 6
      || password === confirmPassword
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase())
  }

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^(?:\+77\d{2}\d{3}\d{4}|\+7 7\d{2} \d{3} \d{4}|87\d{2}\d{3}\d{4})$/;
    return re.test(String(phoneNumber));
  }

  return (
    <>
      <PageTitle title={title}/>
      <section className="d-flex min-vh-100 bg-primary-subtle">
        <div className="container bg-white shadow-sm w-md-50 w-75 my-5 p-5">
          <div className="progress fw-semibold" style={{height: '25px'}}>
            <div className={"progress-bar border-end"}
                 role="progressbar"
                 style={{width: '50%'}}
                 aria-valuenow="50"
                 aria-valuemin="0"
                 aria-valuemax="100">B u s i n e s s
            </div>
            <div className={`progress-bar ${!isNextStep && 'd-none'}`}
                 role="progressbar"
                 style={{width: '50%'}}
                 aria-valuenow="50"
                 aria-valuemin="0"
                 aria-valuemax="100">M a n a g e r
            </div>
          </div>
          <div className="text-primary fs-1 fw-bolder mt-4 mb-3 text-center">
            {!isNextStep ? 'Company Registration' : 'Office Manager'}
          </div>
          <form onSubmit={register} className={"border-top pt-4"}>
            {!isNextStep ?
              <>
                <RegisterBusinessForm
                  businessForm={businessForm}
                  setBusinessForm={setBusinessForm}
                />
                <div className={"text-center mb-3"}>
                  <div className={"d-inline-flex"}>
                    <div className={"rounded-circle border border-info text-info text-center"}
                         style={{width: '25px', height: '25px'}}>
                      !
                    </div>
                    <span className={"text-info px-2"}>
                      You must fill all the information about the company
                    </span>
                  </div>
                </div>
              </>
              :
              <OfficeManagerForm
                userForm={userForm}
                setUserForm={setUserForm}
                validateEmail={validateEmail}
                validatePhoneNumber={validatePhoneNumber}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            }
            <div className={"btn-group w-100"}>
              {!isNextStep ?
                <>
                  <button type={"button"}
                          className={"btn btn-primary w-100 p-3 mt-2"}
                          onClick={() => setIsNextStep(Object.entries(businessForm).every(
                            ([key, value]) => {
                              if (key === 'companyBin')
                                return value.length === 12
                              else if (key === 'companyManagerIIN')
                                return (value.length === 12 || value.length === 0)
                              else
                                return value !== ''
                            })
                          )}>
                    Next step
                  </button>
                </>
                :
                <>
                  <button type={"button"}
                          className={"btn btn-outline-primary w-50 p-3 mt-2"}
                          onClick={() => setIsNextStep(false)}>
                    Previous step
                  </button>
                  <button type={"submit"} className={"btn btn-primary w-100 p-3 mt-2"}>
                    Register
                  </button>
                </>
              }
            </div>
          </form>
        </div>
      </section>
    </>
  )
})

export default RegisterBusiness