import News from '../../assets/icons/news.svg'
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../../context/index.js";

const ProfileAuxWindow = observer(() => {
  const {user} = useContext(AuthContext)

  return (
    <div className={"card p-4 rounded-5"}>
      <div className={"fs-5 fw-medium"}>
        User profile
      </div>

      <div className={"text-center"}>
        <img src={News} alt="" className={"card-img rounded-circle w-75"}/>
        <div className={"fw-bold"}>
          Welcome back, {user._user.firstName}
        </div>
        <div className={"fw-light text-secondary small"}>
          Enjoy your document work today too!
        </div>
        <hr/>
        <div className={"fw-light text-secondary small d-flex justify-content-between mb-2"}>
          <div>Storage capacity</div>
          <div>{25}%</div>
        </div>
        <div className="progress rounded-3 mb-5"
             role="progressbar"
             aria-valuenow="25"
             aria-valuemin="0"
             aria-valuemax="100"
             style={{height: '40px'}}>
          <div className="progress-bar bg-success" style={{width: '25%'}}></div>
        </div>
        <button type={'button'}
                className={'btn btn-primary w-100 rounded-4'}>
          Create new document
        </button>
      </div>
    </div>
  )
})

export default ProfileAuxWindow