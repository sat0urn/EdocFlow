import About from "./About.jsx";
import Advantage from "./Advantage.jsx";
import Contact from "./Contact.jsx";
import Service from "./Service.jsx";
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