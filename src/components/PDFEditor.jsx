function PDFEditor({ formData, handleInputChange }) {
  return (
    <>
      {
        Object.entries(formData).map(([key, value]) => {
          return (
            <div key={key}>
              <label
                className="form-label opacity-75"
              >
                {key}
              </label>
              <input
                type="text"
                name={key}
                className="form-control form-control-sm rounded-4"
                value={value}
                onChange={handleInputChange}
              />
            </div>
          )
        })
      }
    </>
  )
}

export default PDFEditor