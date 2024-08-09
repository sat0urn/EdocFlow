import {useState} from "react";

const Contact = () => {
  const [contactRequest, setContactRequest] = useState({
    senderName: '',
    senderEmail: '',
    phoneNumber: '',
    question: ''
  })

  const handleRequestSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(contactRequest.senderEmail)
    || !validatePhoneNumber(contactRequest.phoneNumber)) {
      e.stopPropagation()
      alert('Wrong format of email or phone number!')
      return
    }

    let data
    try {
      data = "whooray"
      alert(data)
    } catch (e) {
      if (e.response.status === 400) {
        alert(e.response.data)
      }
      console.error(e)
    }
  }

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^(?:\+77\d{2}\d{3}\d{4}|\+7 7\d{2} \d{3} \d{4}|87\d{2}\d{3}\d{4})$/;
    return re.test(String(phoneNumber));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase())
  };

  return (
    <section id="contact" className="d-flex align-items-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="text-md-start text-center m-md-0 mx-auto w-75">
              <h1 className="fw-bold mb-4">
                Question left?
              </h1>
              <p className="small opacity-75">
                Leave your contact information and your question in the form and submit it.
                Our manager will contact you soon.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleRequestSubmit}>
              <div className="row mb-3">
                <div className="col-lg-4 col-md-12 mb-2">
                  <input
                    type="name"
                    className="form-control text-center"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    placeholder="Your name"
                    value={contactRequest.senderName}
                    onChange={(e) => setContactRequest({...contactRequest, senderName: e.target.value})}
                    required
                  />
                </div>
                <div className="col-lg-4 col-md-12 mb-2">
                  <input
                    type="email"
                    className={`form-control text-center ${validateEmail(contactRequest.senderEmail) ? 'is-valid' : 'is-invalid'}`}
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Email address"
                    value={contactRequest.senderEmail}
                    onChange={(e) => setContactRequest({...contactRequest, senderEmail: e.target.value})}
                    required
                  />
                  <div className={"invalid-feedback"}>
                    Invalid email format
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <input
                    type="number"
                    className={`form-control text-center ${validatePhoneNumber(contactRequest.phoneNumber) ? 'is-valid' : 'is-invalid'}`}
                    id="exampleInputNumber"
                    aria-describedby="phoneHelp"
                    placeholder="Phone number"
                    value={contactRequest.phoneNumber}
                    onChange={(e) => setContactRequest({...contactRequest, phoneNumber: e.target.value})}
                    required
                  />
                  <div className={"invalid-feedback"}>
                    Invalid phone number format
                  </div>
                </div>
              </div>
              <textarea
                className="form-control text-center mb-3"
                placeholder="Your question"
                value={contactRequest.question}
                onChange={(e) => setContactRequest({...contactRequest, question: e.target.value})}
                required
              />
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Leave a request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Contact