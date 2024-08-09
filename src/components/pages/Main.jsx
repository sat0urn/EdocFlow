import About from "../main/About.jsx";
import Advantage from "../main/Advantage.jsx";
import Contact from "../main/Contact.jsx";
import Service from "../main/Service.jsx";
import {useEffect} from "react";

const Main = () => {
  useEffect(() => {
    console.log("main")
  }, []);
  return (
    <>
      <About/>
      <Service/>
      <Advantage/>
      <Contact/>
    </>
  )
}

export default Main