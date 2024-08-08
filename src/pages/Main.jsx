import About from "../components/main/About.jsx";
import Advantage from "../components/main/Advantage.jsx";
import Contact from "../components/main/Contact.jsx";
import Service from "../components/main/Service.jsx";
import {useEffect} from "react";

const Main = () => {
  useEffect(() => {
    console.log("hello i am working!!!")
  }, []);
  return (
    <>
      {/*<PageTitle title={title}/>*/}
      <About/>
      <Service/>
      <Advantage/>
      <Contact/>
    </>
  )
}

export default Main