import ServiceP from "./ServiceP.jsx"
import { serviceData } from "../../data/data.js"

function Service() {

  const services = serviceData.map(item => {
    return (
      <ServiceP
        key={item.id}
        {...item}
      />
    )
  })

  return (
    <section
      id="service"
      className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="text-start mb-4">
          <h1 className="fw-bold">
            Our <span style={{ color: '#407BFF' }}>Services</span>
          </h1>
        </div>
        <div className="row">
          {services}
        </div>
      </div>
    </section >
  )
}

export default Service