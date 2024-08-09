import ProfileAuxWindow from "./commonParts/ProfileAuxWindow.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useMemo, useState} from "react";
import {addEmployee, updateEmployee} from "../../http/employeeApi.js";
import {allDepartments, positionsByDepartment} from "../../data/departmentPositionData.js";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";
import ProfilePagination from "./commonParts/ProfilePagination.jsx";
import PageTitle from "../PageTitle.jsx";
import {SIGNING} from "../../data/docStatusData.js";

const ProfileEmployeeList = observer(({title}) => {
  const {user, documents, fetchChanges} = useContext(AuthContext)

  const navigate = useNavigate()
  const [employeeData, setEmployeeData] = useState({
    name: '',
    surname: '',
    departmentId: '',
    iin: '',
    email: '',
    phoneNumber: '',
    position: ''
  })

  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({
    firstName: '',
    lastName: '',
    orgId: '',
    iin: '',
    phoneNumber: '',
    email: '',
    position: ''
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [pages, setPages] = useState(Math.ceil(user.employees.length / 4))
  const [currentPage, setCurrentPage] = useState(0)

  const getSearchedEmployees = useMemo(() => {
    let filteredEmployees = user.employees

    if (filteredEmployees) {
      filteredEmployees = filteredEmployees.filter(emp =>
        (emp.firstName + ' ' + emp.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )

      setPages(Math.ceil(filteredEmployees.length / 4))

      return filteredEmployees.slice(currentPage * 4, (currentPage + 1) * 4)
    }
  }, [currentPage, user.employees, searchQuery])

  const addNewEmployee = async (e) => {
    e.preventDefault()
    if (!validateEmail(employeeData.email)
      || !validatePhoneNumber(employeeData.phoneNumber)
      || !validateIin(employeeData.iin)
    ) {
      e.stopPropagation()
      return
    }

    try {
      await addEmployee(employeeData)
      alert('Employee was added successfully!')
      fetchChanges.toggleIsOtherChanged()
    } catch (e) {
      console.log(e)
      if (e.response.status === 409) {
        if (e.response.data === 'WARN_EMPLOYEE_EXISTS') {
          alert(`User already exists\nby email: ${employeeData.email} or\nby iin: ${employeeData.iin}`)
        } else if (e.response.data === 'WARN_DEPARTMENT_EXISTS') {
          alert('Error with department')
        }
      }
    }
  }

  const updateCurrentEmployee = async (e, employee) => {
    e.preventDefault()
    if (updatedEmployeeData.orgId && !updatedEmployeeData.position) {
      alert('Please, fill the position by your chosen department!')
      return
    }

    Object.keys(updatedEmployeeData).forEach(
      (key) => {
        if (updatedEmployeeData[key] === '') updatedEmployeeData[key] = employee[key]
      }
    )

    if (!validateEmail(updatedEmployeeData.email)
      || !validatePhoneNumber(updatedEmployeeData.phoneNumber)
      || !validateIin(updatedEmployeeData.iin)
    ) {
      e.stopPropagation()
      return
    }

    try {
      const data = await updateEmployee(updatedEmployeeData)
      fetchChanges.toggleIsOtherChanged()
      alert(data)
      setUpdatedEmployeeData({
        firstName: '',
        lastName: '',
        orgId: '',
        iin: '',
        phoneNumber: '',
        email: '',
        position: ''
      })
    } catch (e) {
      console.error(e)
      alert('Got an issue with updating this employee!')
    }
  }

  const validateIin = (iin) => {
    return iin.length === 12
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase())
  }

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^(?:\+77\d{2}\d{3}\d{4}|\+7 7\d{2} \d{3} \d{4}|87\d{2}\d{3}\d{4})$/;
    return re.test(String(phoneNumber));
  }

  return (
    <>
      <PageTitle title={title}/>
      <div className={"row"}>
        <div className={"col-lg-9"}>
          <div className={"row"}>
            <div className={"col-7"}>
              <div className={"d-flex bg-primary justify-content-between text-white rounded-pill py-3 px-4 mb-3"}>
                <div>Employee List</div>
                <div>{user.employees.length} in total</div>
              </div>
              <input
                type="text"
                className={"form-control shadow-sm rounded-pill mb-3"}
                placeholder="&#xF002;   Search for specific employee..."
                style={{fontFamily: 'Arial, FontAwesome'}}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <div className={"card p-2 bg-primary-subtle border-0 shadow-sm"}>
                {getSearchedEmployees.map((employee, index) =>
                  <div key={index}
                       className={`card p-3 d-flex flex-row justify-content-between ${!(index === getSearchedEmployees.length - 1) && 'mb-2'}`}>
                    <div className={"d-flex"}>
                      <div className={"border border-primary rounded-circle bg-light mt-1 me-3"}
                           style={{width: '25px', height: '25px'}}>
                      </div>
                      <div className={""}>
                        <div className={"fs-4 fw-semibold"}>{employee.firstName + ' ' + employee.lastName}</div>
                        <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                          Department - #{employee.orgId}
                        </div>
                        <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                          Position - {employee.position}
                        </div>
                      </div>
                    </div>
                    <div className={"d-flex flex-column justify-content-between text-end"}>
                      <div>
                        <button
                          type={'button'}
                          className={"btn btn-outline-primary px-4 py-1 me-2 rounded-3"}
                          onClick={() => navigate(`/employeeView/${employee.email}`)}
                        >
                          view
                        </button>
                        <button
                          type={'button'}
                          className={"btn btn-primary px-4 py-1 rounded-3"}
                          data-bs-toggle="modal"
                          data-bs-target={"#staticBackdrop_" + index}
                        >
                          edit
                        </button>

                        {/* Employee edit modal */}
                        <div
                          className="modal fade"
                          id={"staticBackdrop_" + index}
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby={"staticBackdropLabel_" + index}
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id={"staticBackdropLabel_" + index}>Update
                                  employee</h1>
                              </div>
                              <form onSubmit={(e) => updateCurrentEmployee(e, employee)}>
                                <div className="modal-body">
                                  <div className={"input-group mb-2"}>
                                    <input
                                      type="text"
                                      className={`form-control me-2 rounded-pill ${updatedEmployeeData.firstName ? 'is-valid' : 'is-invalid'}`}
                                      placeholder={employee.firstName}
                                      value={updatedEmployeeData.firstName}
                                      onChange={e =>
                                        setUpdatedEmployeeData({
                                          ...updatedEmployeeData,
                                          firstName: (e.target.value === employee.firstName) ? '' : e.target.value
                                        })}
                                    />
                                    <input
                                      type="text"
                                      className={`form-control rounded-pill ${updatedEmployeeData.lastName ? 'is-valid' : 'is-invalid'}`}
                                      placeholder={employee.lastName}
                                      value={updatedEmployeeData.lastName}
                                      onChange={e => setUpdatedEmployeeData({
                                        ...updatedEmployeeData,
                                        lastName: (e.target.value === employee.lastName) ? '' : e.target.value
                                      })}
                                    />
                                  </div>
                                  <div className={"input-group mb-2"}>
                                    <select
                                      className={`form-select me-2 rounded-pill ${updatedEmployeeData.orgId ? 'is-valid' : 'is-invalid'}`}
                                      value={updatedEmployeeData.orgId || employee.orgId}
                                      onChange={(e) => {
                                        setUpdatedEmployeeData({
                                          ...updatedEmployeeData,
                                          orgId: (e.target.value === employee.orgId) ? '' : e.target.value,
                                          position: ''
                                        })
                                      }}
                                    >
                                      <option value={''}>Department</option>
                                      {allDepartments.map((dep, index) =>
                                        <option key={index} value={dep}>{dep}</option>
                                      )}
                                    </select>
                                    <select
                                      className={`form-select rounded-pill ${updatedEmployeeData.position ? 'is-valid' : 'is-invalid'}`}
                                      value={updatedEmployeeData.position || employee.position}
                                      onChange={e => setUpdatedEmployeeData({
                                        ...updatedEmployeeData,
                                        position: (e.target.value === employee.position) ? '' : e.target.value
                                      })}
                                    >
                                      <option value={''}>Position</option>
                                      {(updatedEmployeeData.orgId || employee.orgId) &&
                                        positionsByDepartment
                                          .find(({department}) => department === (updatedEmployeeData.orgId || employee.orgId))['positions']
                                          .map((pos, index) => <option key={index} value={pos}>{pos}</option>)
                                      }
                                    </select>
                                  </div>
                                  <div className={"d-flex flex-row mb-2"}>
                                    <div className={"me-2"}>
                                      <input
                                        type="number"
                                        className={`form-control rounded-pill ${validateIin(updatedEmployeeData.iin) ? 'is-valid' : 'is-invalid'}`}
                                        placeholder={employee.iin}
                                        value={updatedEmployeeData.iin}
                                        onChange={e => setUpdatedEmployeeData({
                                          ...updatedEmployeeData,
                                          iin: (e.target.value === employee.iin) ? '' : e.target.value
                                        })}
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        className={`form-control rounded-pill ${validateEmail(updatedEmployeeData.email) ? 'is-valid' : 'is-invalid'}`}
                                        placeholder={employee.email}
                                        value={updatedEmployeeData.email}
                                        onChange={e => setUpdatedEmployeeData({
                                          ...updatedEmployeeData,
                                          email: (e.target.value === employee.email) ? '' : e.target.value
                                        })}
                                      />
                                    </div>
                                  </div>
                                  <input
                                    type="number"
                                    className={`form-control rounded-pill ${validatePhoneNumber(updatedEmployeeData.phoneNumber) ? 'is-valid' : 'is-invalid'}`}
                                    placeholder={employee.phoneNumber}
                                    value={updatedEmployeeData.phoneNumber}
                                    onChange={e => setUpdatedEmployeeData({
                                      ...updatedEmployeeData,
                                      phoneNumber: (e.target.value === employee.phoneNumber) ? '' : e.target.value
                                    })}
                                  />
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type={'submit'}
                                    className="btn btn-primary"
                                  >
                                    Update
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setUpdatedEmployeeData({
                                        firstName: '',
                                        lastName: '',
                                        orgId: '',
                                        iin: '',
                                        phoneNumber: '',
                                        email: '',
                                        position: ''
                                      })
                                    }
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        {/* Employee edit modal */}
                      </div>
                      <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                        <span className={"me-3"}>
                          {documents.history
                            .filter(({id, documentStatus}) =>
                              employee.documentIds.includes(id) && documentStatus === SIGNING).length} active documents
                        </span>
                        <span>
                          {documents.history
                            .filter(({id}) => employee.documentIds.includes(id)).length} in total
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={"d-flex mt-2"}>
                <ProfilePagination
                  pages={pages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
            <div className="col-5">
              <div className={"card bg-light rounded-5 py-4 px-3 border-0 shadow"}>
                <div className={"text-black fs-5 fw-semibold mb-3"}>
                  Add new employee
                </div>
                <form onSubmit={addNewEmployee}>
                  <div className={"input-group mb-2"}>
                    <input
                      type="text"
                      className={`form-control me-2 rounded-pill ${employeeData.name ? 'is-valid' : 'is-invalid'}`}
                      placeholder={"Name"}
                      value={employeeData.name}
                      onChange={e => setEmployeeData({...employeeData, name: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      className={`form-control rounded-pill ${employeeData.surname ? 'is-valid' : 'is-invalid'}`}
                      placeholder={"Surname"}
                      value={employeeData.surname}
                      onChange={e => setEmployeeData({...employeeData, surname: e.target.value})}
                      required
                    />
                  </div>
                  <div className={"input-group mb-2"}>
                    <select
                      className={`form-select me-2 rounded-pill ${employeeData.departmentId ? 'is-valid' : 'is-invalid'}`}
                      value={employeeData.departmentId}
                      onChange={(e) => setEmployeeData({
                        ...employeeData,
                        departmentId: e.target.value,
                        position: ''
                      })}
                      required
                    >
                      <option value={''}>Department</option>
                      {allDepartments.map((dep, index) =>
                        <option key={index} value={dep}>{dep}</option>
                      )}
                    </select>
                    <select
                      className={`form-select rounded-pill ${employeeData.position ? 'is-valid' : 'is-invalid'}`}
                      value={employeeData.position}
                      onChange={e => setEmployeeData({
                        ...employeeData,
                        position: e.target.value
                      })}
                      required
                    >
                      <option value={''}>Position</option>
                      {employeeData.departmentId &&
                        positionsByDepartment
                          .find(({department}) => department === employeeData.departmentId)['positions']
                          .map((pos, index) => <option key={index} value={pos}>{pos}</option>)
                      }
                    </select>
                  </div>
                  <div className={"d-flex flex-row mb-2"}>
                    <div className={"me-2"}>
                      <input
                        type="number"
                        className={`form-control rounded-pill ${validateIin(employeeData.iin) ? 'is-valid' : 'is-invalid'}`}
                        placeholder={"IIN"}
                        value={employeeData.iin}
                        onChange={e => setEmployeeData({...employeeData, iin: e.target.value})}
                        required
                      />
                      <div className={"invalid-feedback text-center"}>
                        IIN must contain 12 digits
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        className={`form-control rounded-pill ${validateEmail(employeeData.email) ? 'is-valid' : 'is-invalid'}`}
                        placeholder={"Email"}
                        value={employeeData.email}
                        onChange={e => setEmployeeData({...employeeData, email: e.target.value})}
                        required
                      />
                      <div className={"invalid-feedback text-center"}>
                        Email format is not correct
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    className={`form-control rounded-pill ${validatePhoneNumber(employeeData.phoneNumber) ? 'is-valid' : 'is-invalid'}`}
                    placeholder={"Phone Number"}
                    value={employeeData.phoneNumber}
                    onChange={e => setEmployeeData({...employeeData, phoneNumber: e.target.value})}
                    required
                  />
                  <div className={"invalid-feedback text-center"}>
                    Phone number format is not correct
                  </div>
                  <div className={"text-end"}>
                    <button type={'submit'} className={"btn btn-primary mt-4 w-50 rounded-pill"}>
                      Add employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={"col-lg-3"}>
          <ProfileAuxWindow/>
        </div>
      </div>
    </>
  )
})

export default ProfileEmployeeList