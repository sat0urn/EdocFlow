function ServiceP(props) {
  return (
    <div className="col-md-3">
      <div className="card mx-auto shadow p-4">
        <div className="card mb-4">
          <img className="card-img" src={props.img} alt="" />
          <div className="card-img-overlay pb-1">
            <div className="d-flex align-items-end h-100">
              <h5 className="card-title">
                {props.title}
              </h5>
            </div>
          </div>
        </div>
        <p>
          {props.desc}
        </p>
        <button
          type="button"
          className="btn btn-outline-primary">
          {props.btnText}
        </button>
      </div>
    </div>
  )
}

export default ServiceP