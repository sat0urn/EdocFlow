import AdvantageP from "./AdvantageP.jsx"
import {advantageData} from "../../data/mainPageData.js"

const Advantage = () => {

  const advantages = advantageData.map((item) => {
    return (
      <AdvantageP
        key={item.id}
        {...item}
      />
    )
  })

  return (
    <section id="advantage" className="min-vh-100 py-5 bg-dark">
      <div className="container justify-content-center">
        <div className="text-center fs-1 fw-bold text-white">
          Our <span className={"text-primary"}>Advantages</span>
        </div>
        <div className="row">
          {advantages}
        </div>
      </div>
    </section>
  )
}

export default Advantage