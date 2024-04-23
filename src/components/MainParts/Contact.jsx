function Contact() {
  return (
    <section
      id="contact"
      className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="text-start w-75 mb-4">
              <h1 className="fw-bold mb-4">
                Question left?
              </h1>
              <p>
                Leave your contact information and your question in the form and submit it. Our manager will contact you soon.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <form>
              <div className="row mb-3">
                <div className="col-md-4">
                  <input
                    type="name"
                    className="form-control text-center"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    placeholder="Your name" />
                </div>
                <div className="col-md-4">
                  <input
                    type="email"
                    className="form-control text-center"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Email address" />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control text-center"
                    id="exampleInputNumber"
                    aria-describedby="phoneHelp"
                    placeholder="Phone number" />
                </div>
              </div>
              <textarea
                className="form-control text-center mb-3"
                placeholder="Your question" />
              <button
                type="submit"
                className="btn btn-primary w-100">
                Leave a request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section >
  )
}
export default Contact