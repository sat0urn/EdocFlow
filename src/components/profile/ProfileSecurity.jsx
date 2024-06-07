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
      alert('New password should contain at least 6 characters')
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
    return oldPassword >= 6 && (oldPassword !== newPassword)
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
                <p className={"text-secondary m-0"}>Last updated 1 month ago</p>
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
          <div className={"py-5 border-bottom border-2"}>
            <div className={"d-flex justify-content-between align-items-center"}>
              <div className={""}>
                <h6 className={"fw-bold"}>Restore password</h6>
                <p className={"text-secondary m-0"}>Last updated 1 month ago</p>
              </div>
              <button
                type={"button"}
                className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}
                data-bs-toggle="modal"
                data-bs-target="#restorePassword"
              >
                Restore password
              </button>
            </div>
          </div>
          {/*Change password modal*/}
          <div className="modal fade"
               id="changePassword"
               tabIndex="-1"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true">
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
                  ></button>
                </div>
                <form onSubmit={update}>
                  <div className="modal-body">
                    <div className="my-4 mx-auto w-75">
                      <label
                        htmlFor="exampleInputOldPassword"
                        className="form-label opacity-75"
                      >
                        Old password
                      </label>
                      <input
                        type="password"
                        className={`form-control p-3 ${validatePassword(oldPassword) && validatePassword() ? 'is-valid' : 'is-invalid'}`}
                        id="exampleInputOldPassword"
                        placeholder="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                      <div className={"invalid-feedback"}>
                        {validatePasswordEquals() ?
                          'Old password is the same with new one!'
                          :
                          'Old password should contain at least 6 characters'
                        }
                      </div>
                    </div>
                    <div className="mb-4 mx-auto w-75">
                      <label
                        htmlFor="exampleInputNewPassword"
                        className="form-label opacity-75"
                      >
                        New password
                      </label>
                      <input
                        type="password"
                        className={`form-control p-3 ${validatePassword(newPassword) ? 'is-valid' : 'is-invalid'}`}
                        id="exampleInputNewPassword"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <div className={"invalid-feedback"}>
                        New password should contain at least 6 characters
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button type={'submit'} className="btn btn-primary w-100 p-2">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/*Restore password modal*/}
          <div className="modal fade"
               id="restorePassword"
               tabIndex="-1"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true">
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
                  ></button>
                </div>
                <form onSubmit={() => {
                }}>
                  <div className="modal-body">
                    <div className="my-4 mx-auto w-75">
                      <label htmlFor="restoreEmail"
                             className="form-label opacity-75">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control p-3"
                        id="restoreEmail"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="mb-4 mx-auto w-75">
                      <label htmlFor="restoreNewPassword"
                             className="form-label opacity-75">
                        New password
                      </label>
                      <input
                        type="password"
                        className="form-control p-3"
                        id="restoreNewPassword"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="mb-4 mx-auto w-75">
                      <label htmlFor="restoreConfirmPassword"
                             className="form-label opacity-75">
                        Confirm New password
                      </label>
                      <input
                        type="password"
                        className="form-control p-3"
                        id="restoreConfirmPassword"
                        placeholder="Enter new password again"
                      />
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button type="submit" className="btn btn-primary w-100 p-2">
                      Restore
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