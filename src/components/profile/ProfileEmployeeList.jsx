import ProfileAuxWindow from "./ProfileAuxWindow.jsx";
import {useNavigate} from "react-router-dom";

const ProfileEmployeeList = () => {
  const navigate = useNavigate()

  return (
    <div className={"row"}>
      <div className={"col-lg-9"}>
        <div className={"row"}>
          <div className={"col-7"}>
            <div className={"d-flex bg-primary justify-content-between text-white rounded-pill py-3 px-4 mb-3"}>
              <div>Employee List</div>
              <div>{3} in total</div>
            </div>
            <input type="text"
                   className={"form-control shadow-sm rounded-pill mb-3"}
                   placeholder="&#xF002;   Search for specific employee by name or ID"
                   style={{fontFamily: 'Arial, FontAwesome'}}
            />
            <div className={"card p-4 bg-primary-subtle border-0 shadow-sm"}>
              <div className={"card p-3 d-flex flex-row justify-content-between mb-2"}>
                <div className={"d-flex"}>
                  <div className={"border border-primary rounded-circle bg-light mt-1 me-3"}
                       style={{width: '25px', height: '25px'}}>
                  </div>
                  <div className={""}>
                    <div className={"fs-4 fw-semibold"}>Kusainov Aslan</div>
                    <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                      Employee ID: {213213}
                    </div>
                    <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                      Department - {'Back-end developer'}
                    </div>
                  </div>
                </div>
                <div className={"d-flex flex-column justify-content-between text-end"}>
                  <div>
                    <button type={'button'}
                            className={"btn btn-outline-primary px-4 py-1 me-2 rounded-3"}
                            onClick={() => navigate('/employeeView')}
                    >
                      view
                    </button>
                    <button type={'button'} className={"btn btn-primary px-4 py-1 rounded-3"}>
                      edit
                    </button>
                  </div>
                  <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                    <span className={"me-3"}>{15} active documents</span>
                    <span>{50} in total</span>
                  </div>
                </div>
              </div>
              <div className={"card p-3 d-flex flex-row justify-content-between mb-2"}>
                <div className={"d-flex"}>
                  <div className={"border border-primary rounded-circle bg-light mt-1 me-3"}
                       style={{width: '25px', height: '25px'}}>
                  </div>
                  <div className={""}>
                    <div className={"fs-4 fw-semibold"}>Kusainov Aslan</div>
                    <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                      Employee ID: {213213}
                    </div>
                    <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                      Department - {'Back-end developer'}
                    </div>
                  </div>
                </div>
                <div className={"d-flex flex-column justify-content-between text-end"}>
                  <div>
                    <button type={'button'}
                            className={"btn btn-outline-primary px-4 py-1 me-2 rounded-3"}
                            onClick={() => navigate('/employeeView')}
                    >
                      view
                    </button>
                    <button type={'button'} className={"btn btn-primary px-4 py-1 rounded-3"}>
                      edit
                    </button>
                  </div>
                  <div className={"small opacity-50"} style={{fontSize: '12px'}}>
                    <span className={"me-3"}>{15} active documents</span>
                    <span>{50} in total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className={"card bg-light rounded-5 py-4 px-3 border-0 shadow"}>
              <div className={"text-black fs-5 fw-semibold mb-3"}>
                Add new employee
              </div>
              <form onSubmit={"#"}>
                <div className={"input-group mb-2"}>
                  <input type="text"
                         className={"form-control me-2 rounded-pill"}
                         placeholder={"Name"}
                  />
                  <input type="text"
                         className={"form-control rounded-pill"}
                         placeholder={"Surname"}
                  />
                </div>
                <div className={"input-group mb-2"}>
                  <input type="number"
                         className={"form-control me-2 rounded-pill"}
                         placeholder={"Department ID"}
                  />
                  <input type="number"
                         className={"form-control rounded-pill"}
                         placeholder={"IIN"}
                  />
                </div>
                <div className={"input-group mb-2"}>
                  <input type="text"
                         className={"form-control me-2 rounded-pill"}
                         placeholder={"Position"}
                  />
                  <input type="text"
                         className={"form-control rounded-pill"}
                         placeholder={"Email"}
                  />
                </div>
                <input type="number"
                       className={"form-control rounded-pill"}
                       placeholder={"Place Number"}
                />
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
  )
}

export default ProfileEmployeeList