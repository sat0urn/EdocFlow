import {useContext, useState} from "react";
import {updatePassword} from "../../http/userApi.js";
import ProfileAuxWindow from "./commonParts/ProfileAuxWindow.jsx";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";
import PageTitle from "../PageTitle.jsx";

const ProfileSecurity = observer(({title}) => {
  const {user} = useContext(AuthContext)
  const currentEmail = user.user.sub

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const update = async (e) => {
    e.preventDefault()
    if (!validatePassword(newPassword)
      || !validatePassword(oldPassword)) {
      e.stopPropagation()
      alert('Password should contain at least 6 characters')
      return
    }

    if (!validatePasswordEquals()) {
      e.stopPropagation()
      alert('Passwords should not be the same!')
      return
    }

    try {
      const data = await updatePassword(oldPassword, newPassword)
      alert(data)
      setNewPassword('')
      setOldPassword('')
    } catch (e) {
      if (e.response.status === 403) {
        alert(e.response.data)
      }
    }
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validatePasswordEquals = () => {
    return oldPassword !== newPassword
  }

  return (
    <>
      <PageTitle title={title}/>
      <div className={"row"}>
        <div className={"col-lg-9"}>
          <div className={"py-5 border-bottom border-2"}>
            <h6 className={"fw-bold"}>Email</h6>
            <p className={"text-secondary m-0"}>{currentEmail}</p>
          </div>
          <div className={"py-5 border-bottom border-2"}>
            <div className={"d-flex justify-content-between align-items-center"}>
              <div className={""}>
                <h6 className={"fw-bold"}>Password</h6>
                <p className={"text-secondary m-0"}>Setting new password panel</p>
              </div>
              <button
                type={"button"}
                className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}
                data-bs-toggle="modal"
                data-bs-target="#changePassword"
              >
                Update password
              </button>
            </div>
          </div>
          {/*Change password modal*/}
          <div
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            id="changePassword"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Update password
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setNewPassword('')
                      setOldPassword('')
                    }}
                  ></button>
                </div>
                <form onSubmit={update}>
                  <div className="modal-body">
                    <div className="mb-2">
                      <label htmlFor="exampleInputOldPassword" className="form-label opacity-75">
                        Old password
                      </label>
                      <input
                        type="password"
                        className={`form-control p-3 ${validatePassword(oldPassword) ? 'is-valid' : 'is-invalid'}`}
                        id="exampleInputOldPassword"
                        placeholder="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                      <div className={"invalid-feedback"}>
                        Old password should contain at least 6 characters
                      </div>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="exampleInputNewPassword" className="form-label opacity-75">
                        New password
                      </label>
                      <input
                        type="password"
                        className={`form-control p-3 ${validatePassword(newPassword) && validatePasswordEquals() ? 'is-valid' : 'is-invalid'}`}
                        id="exampleInputNewPassword"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <div className={"invalid-feedback"}>
                        {validatePasswordEquals() ?
                          'New password should contain at least 6 characters'
                          :
                          'New password is the same with old one!'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button
                      type={'submit'}
                      className="btn btn-primary w-100 p-2"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={"col-lg-3"}>
          <ProfileAuxWindow/>
        </div>
      </div>
    </>
  )
})

export default ProfileSecurity