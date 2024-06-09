import {useNavigate} from "react-router-dom";

const ServiceP = ({img, title, desc, btnText}) => {
  const navigate = useNavigate()
  return (
    <div className={"col-lg-3 col-md-6 my-3"}>
      <div className={"card mx-auto shadow p-4"}>
        <div className={"card mb-4"}>
          <img className={"card-img"} src={img} alt=""/>
          <div className={"card-img-overlay pb-1"}>
            <div className={"d-flex align-items-end h-100"}>
              <h5 className={"card-title"}>
                {title}
              </h5>
            </div>
          </div>
        </div>
        <p>
          {desc}
        </p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => navigate('/register')}
        >
          {btnText}
        </button>
      </div>
    </div>
  )
}

export default ServiceP