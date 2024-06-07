import ProfilePagination from "./ProfilePagination.jsx";
import {useMemo, useState} from "react";

const ProfileListEmployeeCheckbox = ({senderEmail, employees, receiversEmail, setReceiversEmail}) => {
  const totalNumberOfPages = 8
  const [searchQuery, setSearchQuery] = useState('')
  const [pages, setPages] = useState(Math.ceil(employees.length / totalNumberOfPages))
  const [currentPage, setCurrentPage] = useState(0)

  const getSearchedEmployees = useMemo(() => {
    let filteredEmployees = employees

    if (filteredEmployees) {
      filteredEmployees = filteredEmployees.filter(emp =>
        (emp.firstName + ' ' + emp.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        && emp.email !== senderEmail
      )

      setPages(Math.ceil(filteredEmployees.length / totalNumberOfPages))

      return filteredEmployees.slice(currentPage * totalNumberOfPages, (currentPage + 1) * totalNumberOfPages)
    }
  }, [currentPage, employees, searchQuery])

  return (
    <>
      <input
        type="text"
        className={"form-control shadow-sm rounded-pill"}
        placeholder="&#xF002;   Search for specific employee..."
        style={{fontFamily: 'Arial, FontAwesome'}}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <div className={"text-dark fw-semibold my-3"}>
        Choose responsible employees by selecting checkboxes
      </div>
      <div className={"row w-100 mx-auto mb-3"}>
        {getSearchedEmployees.map((employee, index) =>
          <div key={index} className={"col-6 px-0"}>
            <div className={`card p-3 ${index % 2 === 0 && 'me-2'} 
                ${!(index === getSearchedEmployees.length - 1) && 'mb-2'}`}>
              <div className={"d-flex justify-content-between"}>
                <div className={""}>
                  <div className={"fs-4 fw-semibold"}>{employee.firstName + ' ' + employee.lastName}</div>
                  <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                    Department - #{employee.orgId}
                  </div>
                  <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                    Position - {employee.position}
                  </div>
                </div>
                <div className={"align-self-center"}>
                  <input
                    type="checkbox"
                    className={"btn-check"}
                    id={"btnCheck_" + index}
                    autoComplete={"off"}
                    value={employee.email}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!receiversEmail.includes(e.target.value))
                          setReceiversEmail([...receiversEmail, e.target.value])
                      } else
                        setReceiversEmail(receiversEmail.filter(email => email !== e.target.value))
                    }}
                  />
                  <label
                    className={"btn btn-outline-success"}
                    htmlFor={"btnCheck_" + index}
                    style={{height: '40px', width: '40px'}}
                  ></label>
                </div>
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
    </>
  )
}

export default ProfileListEmployeeCheckbox