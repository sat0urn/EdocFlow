import ProfileLogo from '../../assets/icons/profile_photo.svg'
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AuthContext} from "../../context/index.js";
import {useNavigate} from "react-router-dom";

const ProfileAuxWindow = observer(() => {
  const {user, documents} = useContext(AuthContext)
  const historyDocsLength = documents.history.length
  const navigate = useNavigate()

  return (
    <div className={"card h-100 p-4 rounded-5"}>
      <div className={"fs-5 fw-medium"}>
        User profile
      </div>

      <div className={"text-center"}>
        <img src={ProfileLogo} alt="" className={"my-4 card-img rounded-circle w-50"}/>
        <div className={"fw-bold"}>
          Welcome back, {user._user.firstName}
        </div>
        <div className={"fw-light text-secondary small"}>
          Enjoy your document work today too!
        </div>
        <hr/>
        {(historyDocsLength <= 100) ?
          <>
            <div className={"fw-light text-secondary small d-flex justify-content-between mb-2"}>
              <div>Storage capacity</div>
              <div>{historyDocsLength}%</div>
            </div>
            <div className="progress rounded-3 mb-5"
                 role="progressbar"
                 aria-valuenow={historyDocsLength}
                 aria-valuemin="0"
                 aria-valuemax="100"
                 style={{height: '40px'}}>
              <div className="progress-bar bg-success rounded-end-3" style={{width: historyDocsLength + '%'}}></div>
            </div>
            <button type={'button'}
                    className={'btn btn-primary w-100 rounded-4'}
                    onClick={() => navigate('/')}
            >
              Create new document
            </button>
          </>
          :
          <div className={"text-danger small mb-2"}>
            Documents number are exceed!
          </div>
        }
      </div>
    </div>
  )
})

export default ProfileAuxWindow