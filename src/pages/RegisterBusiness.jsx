import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {AuthContext} from "../context/index.js";
import {useNavigate} from "react-router-dom";

const RegisterBusiness = observer(() => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [businessForm, setBusinessForm] = useState({
    companyName: '',
    companyBin: '',
    companyCountry: '',
    companyCity: '',
    companyAddress: '',
    companyManagerIIN: ''
  })

  const registerBusiness = async (e) => {
    e.preventDefault()

    try {
      if (businessForm.companyBin.length === 12 &&
        (!businessForm.companyManagerIIN ? true :
          businessForm.companyManagerIIN.length === 12)
      ) {
        alert('registered')
      } else {
        alert('BIN or IIN numbers length is wrong')
      }
    } catch (e) {
      alert('Error in business registering')
    }
  }

  return (
    <section className="d-flex min-vh-100 bg-light">
      <div className="container shadow border rounded-5 w-md-50 w-75 my-5 p-5">
        <div className="text-primary fs-1 fw-bolder mb-4 text-center">
          For Business
        </div>
        <form onSubmit={registerBusiness}>
          <div className="d-flex flex-sm-row flex-column justify-content-between mb-4">
            <div className="w-100 me-4 mb-sm-0 mb-2">
              <label
                htmlFor="companyName"
                className="form-label opacity-75"
              >
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
          <div className="d-flex flex-sm-row flex-column justify-content-between mb-4">
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
          <div className="mb-4">
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

          <button type={"submit"}
                  className="btn btn-primary w-100 p-3 rounded-4 mt-2">
            Register Business
          </button>
        </form>
      </div>
    </section>
  )
})

export default RegisterBusiness