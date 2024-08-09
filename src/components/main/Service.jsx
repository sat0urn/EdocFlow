import ServiceP from "./ServiceP.jsx"
import {serviceData} from "../../data/mainPageData.js"

const Service = () => {

    const services = serviceData.map(item => {
        return (
            <ServiceP
                key={item.id}
                {...item}
            />
        )
    })

    return (
        <section id="service" className={"min-vh-100 py-5"}>
            <div className={"container justify-content-center"}>
                <div className={"text-start fs-1 fw-bold"}>
                    Our <span className={"text-primary"}>Services</span>
                </div>
                <div className="row">
                    {services}
                </div>
            </div>
        </section>
    )
}

export default Service