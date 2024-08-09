import PageTitle from "./PageTitle.jsx";
import {useState} from "react";
import {forgetPasswordUpdate, validateEmailToSend, verifyCodeToEnter} from "../http/userApi.js";
import {useNavigate} from "react-router-dom";

const Recover = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const [isNextStep, setIsNextStep] = useState(false)
  const [checkIsValidated, setCheckIsValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      e.stopPropagation()
      return
    }

    setIsLoading(true)
    let data

    if (checkIsValidated) {
      if (!validatePassword(newPassword)
        || !validatePassword(confirmNewPassword)) {
        e.stopPropagation()
        alert('New password should contain at least 6 characters')
        setIsLoading(false)
        return
      }

      if (!validatePasswordEquals()) {
        console.log(newPassword, confirmNewPassword)
        e.stopPropagation()
        alert('Passwords should be the same!')
        setIsLoading(false)
        return
      }

      try {
        data = await forgetPasswordUpdate({
          gmail: email,
          password: newPassword
        })
        alert(data)
        navigate('/login')
      } catch (e) {
        alert(e)
      } finally {
        setIsLoading(false)
      }
      return
    }

    if (!isNextStep) {
      try {
        data = await validateEmailToSend({
          email: email,
          isExists: true
        })
        setIsNextStep(true)
        alert(data)
      } catch (e) {
        if (e.response.status > 200) {
          alert(e.response.data)
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      if (verificationCode.length !== 4) {
        e.stopPropagation()
        alert('Write the verification code with 4 digits!')
        return
      }

      try {
        data = await verifyCodeToEnter({
          email: email,
          code: verificationCode
        })
        setCheckIsValidated(true)
        alert(data)
      } catch (e) {
        if (e.response.status === 400) {
          alert(e.response.data)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validatePasswordEquals = () => {
    return confirmNewPassword === newPassword
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase())
  };

  return (
    <>
      {/*<PageTitle title={title}/>*/}
      <section className={"d-flex min-vh-100"}>
        <div className={"container my-auto"}>
          <div className={"d-flex justify-content-center"}>
            <form onSubmit={handleForgotPassword} className={"card rounded-4 mx-auto p-md-5 p-3"}>
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
                {!isNextStep ?
                  <input
                    type="email"
                    className="form-control bg-light p-3 rounded-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  :
                  (checkIsValidated ?
                      <>
                        <div className="mb-2">
                          <label htmlFor="restoreNewPassword" className="form-label opacity-75">
                            New password
                          </label>
                          <input
                            type="password"
                            className="form-control p-3"
                            id="restoreNewPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="restoreConfirmPassword" className="form-label opacity-75">
                            Confirm New password
                          </label>
                          <input
                            type="password"
                            className={`form-control p-3 ${validatePassword(confirmNewPassword) && validatePasswordEquals() ? 'is-valid' : 'is-invalid'}`}
                            id="restoreConfirmPassword"
                            placeholder="Enter new password again"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                          />
                          <div className={"invalid-feedback"}>
                            {!validatePasswordEquals() ?
                              'Passwords should be the same'
                              :
                              'New password should contain at least 6 characters'
                            }
                          </div>
                        </div>
                      </>
                      :
                      <input
                        type="text"
                        className="form-control bg-light p-3 rounded-4"
                        id="verificatioCode"
                        aria-describedby="emailHelp"
                        placeholder="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                  )
                }
                <div id="emailHelp" className="form-text">
                  We&apos;ll never share your email with anyone else.
                </div>
              </div>
              {isLoading ?
                <button type={'button'} className="btn btn-primary w-100 p-3 rounded-4" disabled>
                  <span className={"spinner-border spinner-border-sm"}></span>
                </button>
                :
                <button type={"submit"} className="btn btn-primary w-100 p-3 rounded-4">
                  {isNextStep ? (checkIsValidated ? 'Update password' : 'Verify code') : 'Send Link Reset Password'}
                </button>
              }
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Recover