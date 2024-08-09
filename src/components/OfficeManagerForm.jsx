const OfficeManagerForm = (
  {
    userForm, setUserForm,
    validateEmail, validatePhoneNumber,
    confirmPassword, setConfirmPassword
  }
) => {

  return (
    <>
      <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
        <div className="w-100 me-4 mb-sm-0 mb-2">
          <label htmlFor="firstName" className="form-label opacity-75">
            First Name
          </label>
          <input
            type="text"
            className={`form-control p-3 rounded-4 ${userForm.firstName ? 'is-valid' : 'is-invalid'}`}
            id="firstName"
            placeholder="First Name"
            value={userForm.firstName}
            onChange={e => setUserForm({...userForm, firstName: e.target.value})}
            required
          />
        </div>
        <div className="w-100">
          <label htmlFor="lastName" className="form-label opacity-75">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control p-3 rounded-4 ${userForm.lastName ? 'is-valid' : 'is-invalid'}`}
            id="lastName"
            placeholder="Last Name"
            value={userForm.lastName}
            onChange={e => setUserForm({...userForm, lastName: e.target.value})}
            required
          />
        </div>
      </div>
      <div className="d-flex flex-sm-row flex-column mb-2">
        <div className="w-100 me-4 mb-sm-0 mb-2">
          <label htmlFor="email" className="form-label opacity-75">
            Email Address
          </label>
          <input
            type="email"
            className={`form-control p-3 rounded-4 ${validateEmail(userForm.email) ? 'is-valid' : 'is-invalid'}`}
            id="email"
            placeholder="Email Address"
            value={userForm.email}
            onChange={e => setUserForm({...userForm, email: e.target.value})}
            required
          />
          <div className={"invalid-feedback"}>
            Invalid email format
          </div>
        </div>
        <div className="w-100">
          <label htmlFor="phoneNumber" className="form-label opacity-75">
            Phone Number
          </label>
          <input
            type="number"
            className={`form-control p-3 rounded-4 ${validatePhoneNumber(userForm.phoneNumber) ? 'is-valid' : 'is-invalid'}`}
            id="phoneNumber"
            placeholder="Phone Number"
            value={userForm.phoneNumber}
            onChange={e => setUserForm({...userForm, phoneNumber: e.target.value})}
            required
          />
          <div className="invalid-feedback">
            Invalid phone number format
          </div>
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label opacity-75">
          Password
        </label>
        <input
          type="password"
          className={`form-control p-3 rounded-4 ${userForm.password.length >= 6 ? 'is-valid' : 'is-invalid'}`}
          id="password"
          placeholder="Password"
          value={userForm.password}
          onChange={e => setUserForm({...userForm, password: e.target.value})}
          required
        />
        <div className="invalid-feedback">
          Password should contain at least 6 characters
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label opacity-75">
          Confirm Password
        </label>
        <input
          type="password"
          className={`form-control p-3 rounded-4 ${confirmPassword && userForm.password === confirmPassword ? 'is-valid' : 'is-invalid'}`}
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <div className="invalid-feedback">
          Confirm password should be the same
        </div>
      </div>
    </>
  )
}

export default OfficeManagerForm