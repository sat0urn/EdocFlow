function Advantage() {
  return (
    <section
      id="advantage"
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="fw-bold text-white">
            Our <span style={{ color: '#407BFF' }}>Advantages</span>
          </h1>
        </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <div
              className="card border border-light"
              style={
                {
                  height: '270px',
                  backgroundColor: '#151516',
                  color: 'white'
                }
              }
            >
              <div className="card-body d-flex align-items-end">
                <div className="d-inline-block p-2">
                  <i className="fa-solid fa-magnifying-glass fs-3 mb-3"></i>
                  <h5 className="card-title">
                    Searchability
                  </h5>
                  <p className="card-text">
                    You can easily find your document by using keywords or metadata
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{ height: '270px' }}
            >
              <div className="card-body d-flex align-items-end">
                <div className="d-inline-block p-2">
                  <i className="fa-solid fa-rocket fs-3 mb-3"></i>
                  <h5 className="card-title">
                    Efficiency
                  </h5>
                  <p className="card-text">
                    Say goodbye to paperwork hassles and hello to streamlined processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={
                {
                  height: '270px',
                  backgroundColor: '#407BFF',
                  color: 'white'
                }
              }
            >
              <div className="card-body d-flex align-items-end">
                <div className="d-inline-block p-2">
                  <i className="fa-solid fa-chart-simple fs-3 mb-3"></i>
                  <h5 className="card-title">
                    Scalability
                  </h5>
                  <p className="card-text">
                    Grow confidently knowing our system adapts to your changing needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div
              className="card"
              style={{ height: '270px' }}
            >
              <div className="card-body d-flex align-items-end">
                <div className="d-inline-block p-2">
                  <i className="fa-solid fa-gear fs-3 mb-3"></i>
                  <h5 className="card-title">
                    Automated Workflows
                  </h5>
                  <p className="card-text">
                    Automate document routing and approval processes for increased efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{ height: '270px' }}
            >
              <div className="card-body d-flex align-items-end">
                <div className="d-inline-block p-2">
                  <i className="fa-solid fa-clock-rotate-left fs-3 mb-3"></i>
                  <h5 className="card-title">
                    Version Control
                  </h5>
                  <p className="card-text">
                    Ensure everyone has the latest document version, enhancing collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card border border-light"
              style={
                {
                  height: '270px',
                  backgroundColor: '#151516',
                  color: 'white'
                }
              }
            >
              <div className="card-body d-flex align-items-end">
                <div className="d-inline-block p-2">
                  <i className="fa-solid fa-people-arrows fs-3 mb-3"></i>
                  <h5 className="card-title">
                    Collaboration
                  </h5>
                  <p className="card-text">
                    Foster teamwork with real-time editing and commenting features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantage