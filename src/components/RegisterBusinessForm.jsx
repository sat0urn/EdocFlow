import {citiesOfKazakhstan} from "../data/citiesOfKazakhstanData.js";

const RegisterBusinessForm = ({businessForm, setBusinessForm}) => {
  return (
    <>
      <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
        <div className="w-100 me-4 mb-sm-0 mb-2">
          <label htmlFor="companyName" className="form-label opacity-75">
            Company name
          </label>
          <input
            type="text"
            className={`form-control p-3 rounded-4 ${businessForm.companyName ? 'is-valid' : 'is-invalid'}`}
            id="companyName"
            placeholder="Enter company name"
            value={businessForm.companyName}
            onChange={(e) => setBusinessForm({...businessForm, companyName: e.target.value})}
            required
          />
        </div>
        <div className="w-100 position-relative">
          <label htmlFor="companyBin" className="form-label opacity-75">
            BIN
          </label>
          <input
            type="number"
            className={`form-control p-3 rounded-4 ${businessForm.companyBin.length === 12 ? 'is-valid' : 'is-invalid'}`}
            id="companyBin"
            placeholder="Enter company BIN"
            value={businessForm.companyBin}
            onChange={(e) => setBusinessForm({...businessForm, companyBin: e.target.value})}
            required
          />
          <div className={"invalid-feedback"}>
            BIN should contain 12 digits
          </div>
        </div>
      </div>
      <div className="d-flex flex-sm-row flex-column justify-content-between mb-2">
        <div className="w-100 me-4 mb-sm-0 mb-2">
          <label htmlFor="companyCountry" className="form-label opacity-75">
            Country
          </label>
          <input
            type="text"
            className={`form-control p-3 rounded-4 is-valid`}
            id="companyCountry"
            placeholder={businessForm.companyCountry}
            value={businessForm.companyCountry}
            onChange={(e) => setBusinessForm({...businessForm, companyCountry: e.target.value})}
            disabled
            required
          />
        </div>
        <div className="w-100">
          <label htmlFor="companyCity" className="form-label opacity-75">
            City
          </label>
          <select
            className={`form-select p-3 rounded-4 ${businessForm.companyCity ? 'is-valid' : 'is-invalid'}`}
            id="exampleInputCity"
            value={businessForm.companyCity}
            onChange={e => setBusinessForm({...businessForm, companyCity: e.target.value})}
            required
          >
            <option value={''}>Choose...</option>
            {citiesOfKazakhstan.map((city, index) =>
              <option key={index} value={city}>{city}</option>
            )}
          </select>
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="companyAddress" className="form-label opacity-75">
          Address
        </label>
        <input
          type="text"
          className={`form-control p-3 rounded-4 ${businessForm.companyAddress ? 'is-valid' : 'is-invalid'}`}
          id="companyAddress"
          placeholder="Enter company address"
          value={businessForm.companyAddress}
          onChange={(e) => setBusinessForm({...businessForm, companyAddress: e.target.value})}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="companyManagerIIN" className="form-label opacity-75">
          Manager&apos;s IIN (optional)
        </label>
        <input
          type="number"
          className={`form-control p-3 rounded-4 ${businessForm.companyManagerIIN.length === 12 ? 'is-valid' : 'is-invalid'}`}
          id="companyManagerIIN"
          placeholder="Enter manager IIN"
          value={businessForm.companyManagerIIN}
          onChange={(e) => setBusinessForm({...businessForm, companyManagerIIN: e.target.value})}
        />
        <div className="invalid-feedback">
          Manager IIN should contain 12 digits
        </div>
      </div>
    </>
  )
}

export default RegisterBusinessForm