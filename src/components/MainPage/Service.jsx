import ServiceP from "./ServiceP"
import serviceData from "./data/serviceData"

function Service() {

  const services = serviceData.map(service => {
    return <ServiceP
      key={service.id}
      img={service.img}
      title={service.title}
      desc={service.desc}
      btnText={service.btnText}
    />
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