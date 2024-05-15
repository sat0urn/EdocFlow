import AdvantageP from "./AdvantageP.jsx"
import { advantageData } from "../../data/mainPageData.js"

function Advantage() {

  const advantages = advantageData.map((item) => {
    return (
      <AdvantageP
        key={item.id}
        {...item}
      />
    )
  })

  return (
    <section
      id="advantage"
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="fw-bold text-white">
            Our <span style={{ color: '#407BFF' }}>Advantages</span>
          </h1>
        </div>
        <div className="row mb-4">
          {advantages.slice(0, 3)}
        </div>
        <div className="row">
          {advantages.slice(3)}
        </div>
      </div>
    </section>
  )
}

export default Advantage