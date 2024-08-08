import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from "./Layout.jsx";
import Main from "../pages/Main.jsx";
import Recover from "../pages/Recover.jsx";
import {useEffect} from "react";

const AppRouter = () => {
  useEffect(() => {
    console.log("it did something")
  }, [])
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main title={"Main"}/>}/>
        <Route path={'recover'} element={<Recover title={"Recover"}/>}/>
        <Route path={'*'} element={<Navigate to={'/'}/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter