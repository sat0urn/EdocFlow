import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/index.js";
import {observer} from "mobx-react-lite";

const ProfileSearchAndAccount = observer(() => {
  const {user} = useContext(AuthContext)

  return (
    <div className={"container my-4"}>
      <div className={"row row-cols-2"}>
        <div className={"col-9"}>
          <input type="text"
                 className={"form-control shadow-sm rounded-pill"}
                 placeholder="&#xF002;   Search your documents. . ."
                 style={{fontFamily: 'Arial, FontAwesome'}}
          />
        </div>
        <div className={"col-3 d-flex"}>
          <div className={"me-3"}>
            <Link to=""
                  className={"bg-white shadow rounded-circle text-decoration-none d-inline-flex align-items-center justify-content-center"}
                  style={{width: '40px', height: '40px'}}>
              <i className={"fa-regular fa-bell"}
              ></i>
            </Link>
          </div>
          <div className={"border-start border-2 ps-3"}>
            <Link to="/security"
                  className={"bg-white shadow rounded-circle text-decoration-none d-inline-flex align-items-center justify-content-center me-3"}
                  style={{width: '40px', height: '40px'}}
            >
              <i className="fa-regular fa-user"></i>
            </Link>
            <Link to={'/security'} className={"text-decoration-none link-body-emphasis"}>
              <span className={"fw-bold"}>
                {user._user.firstName + ' ' + user._user.lastName}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProfileSearchAndAccount