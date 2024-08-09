import About from "../components/main/About.jsx";
import Advantage from "../components/main/Advantage.jsx";
import Contact from "../components/main/Contact.jsx";
import Service from "../components/main/Service.jsx";
import PageTitle from "../components/PageTitle.jsx";

const Main = ({title}) => {
  return (
    <>
      <PageTitle title={title}/>
      <About/>
      <Service/>
      <Advantage/>
      <Contact/>
    </>
  )
}

export default Main