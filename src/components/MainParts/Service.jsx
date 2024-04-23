import ServicePic1 from "../../pictures/service_pics/service1.png"
import ServicePic2 from "../../pictures/service_pics/service2.png"
import ServicePic3 from "../../pictures/service_pics/service3.png"
import ServicePic4 from "../../pictures/service_pics/service4.png"

function Service() {
  return (
    <section
      id="service"
      className="d-flex justify-content-center align-items-center vh-100">
      <div className="service--container container">
        <div className="text-start mb-4">
          <h1 className="fw-bold">
            Our <span style={{ color: '#407BFF' }}>Services</span>
          </h1>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="card mx-auto shadow p-4">
              <div className="card mb-4">
                <img className="card-img" src={ServicePic1} alt="" />
                <div className="card-img-overlay pb-1">
                  <div className="d-flex align-items-end h-100">
                    <h5 className="card-title">
                      Creating Electronic Documents
                    </h5>
                  </div>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius
              </p>
              <button
                type="button"
                className="btn btn-outline-primary">
                create a document
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mx-auto shadow p-4">
              <div className="card mb-4">
                <img className="card-img" src={ServicePic2} alt="" />
                <div className="card-img-overlay pb-1">
                  <div className="d-flex align-items-end h-100">
                    <h5 className="card-title">
                      Signing Electronic Documents
                    </h5>
                  </div>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius
              </p>
              <button
                type="button"
                className="btn btn-outline-primary">
                sign a document
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mx-auto shadow p-4">
              <div className="card mb-4">
                <img className="card-img" src={ServicePic3} alt="" />
                <div className="card-img-overlay pb-1">
                  <div className="d-flex align-items-end h-100">
                    <h5 className="card-title">
                      Storing Electronic Documents
                    </h5>
                  </div>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius
              </p>
              <button
                type="button"
                className="btn btn-outline-primary">
                store documents
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card mx-auto shadow p-4">
              <div className="card mb-4">
                <img className="card-img" src={ServicePic4} alt="" />
                <div className="card-img-overlay pb-1">
                  <div className="d-flex align-items-end h-100">
                    <h5 className="card-title">
                      Managing Electronic Documents
                    </h5>
                  </div>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius
              </p>
              <button
                type="button"
                className="btn btn-outline-primary">
                manage documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Service