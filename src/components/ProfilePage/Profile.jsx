function Profile() {
  return (
    <section className="vh-100">
      <div className="row h-100">
        <div className="col-2">
          <div className="d-flex h-100 flex-column flex-shrink-0 p-4" style={{ width: '250px' }}>
            <h6
              className="fw-bold ps-3"
              style={
                {
                  color: '#407BFF',
                  marginTop: '40%'
                }
              }>
              General
            </h6>
            <ul className="nav nav-pills flex-column my-3">
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link link-body-emphasis opacity-25 fw-bold"
                  aria-current="page"
                >
                  <i className="fa-solid fa-house pe-none me-3"></i>
                  <span className="small">
                    Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link link-body-emphasis opacity-25 fw-bold">
                  <i className="fa-solid fa-clock-rotate-left pe-none me-3"></i>
                  <span className="small">
                    History
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link link-body-emphasis opacity-25 fw-bold"
                >
                  <i className="fa-solid fa-envelope pe-none me-3"></i>
                  <span className="small">
                    Inbox
                  </span>
                </a>
              </li>
            </ul>
            <hr />
            <h6
              className="fw-bold ps-3 mt-4"
              style={
                {
                  color: '#407BFF',
                }
              }>
              Other
            </h6>
            <ul className="nav nav-pills flex-column my-3">
              <li>
                <a href="#" className="nav-link link-body-emphasis opacity-25 fw-bold">
                  <i className="fa-solid fa-circle-exclamation pe-none me-3"></i>
                  <span className="small">
                    Help & Support
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-10 bg-light">

          <div className="d-flex flex-row justify-content-end mt-4 me-4">
            <a
              href=""
              className="bg-white rounded-circle shadow-lg me-2"
              style={{ padding: '5px 11px' }}
            >
              <i className="fa-regular fa-bell small text-black"></i>
            </a>
            <a
              href=""
              className="bg-white rounded-circle shadow-lg"
              style={{ padding: '5px 11px' }}
            >
              <i className="fa-regular fa-user small text-black"></i>
            </a>
          </div>

          <div className="card m-5 p-4">
            <div className="row my-4">
              <div className="col-4">
                <h1 style={
                  {
                    color: '#407BFF',
                  }
                }>
                  Your documents
                </h1>
                <p className="text-secondary">Select one or more that you want to review</p>
              </div>
              <div className="col-8 mt-auto">
                <div className="input-group mb-3 w-25">
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="&#xF002;   Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    style={
                      {
                        fontFamily: 'Arial, FontAwesome'
                      }
                    }
                  />
                </div>
              </div>
            </div>
            <div className="card">
              <table className="table table-borderless m-4 w-auto">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={
                        {
                          color: '#407BFF',
                        }
                      }
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      style={
                        {
                          color: '#407BFF',
                        }
                      }
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      style={
                        {
                          color: '#407BFF',
                        }
                      }
                    >
                      Responsible
                    </th>
                    <th
                      scope="col"
                      style={
                        {
                          color: '#407BFF',
                        }
                      }
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-secondary" scope="row">
                      Contract - 1
                    </th>
                    <td className="text-secondary">
                      20.01.2024
                    </td>
                    <td className="text-secondary">
                      Aruzhan
                    </td>
                    <td className="text-secondary">
                      Waiiting for signing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Profile