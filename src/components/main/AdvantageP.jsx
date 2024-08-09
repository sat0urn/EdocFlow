function AdvantageP(props) {
  return (
    <div className={"col-lg-4 col-md-6 my-3"}>
      <div
        className={props.borderOn ? "card border border-light" : "card"}
        style={{height: '270px', backgroundColor: props.bgColor, color: props.textColor}}
      >
        <div className="card-body d-flex align-items-end">
          <div className="d-inline-block p-2">
            <i className={`fa-solid ${props.icon} fs-3 mb-3`}></i>
            <h5 className="card-title">
              {props.title}
            </h5>
            <p className="card-text">
              {props.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvantageP