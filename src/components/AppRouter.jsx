import {Navigate, Route, Routes} from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../context/index.js";
import Layout from "./Layout.jsx";
import Main from "../pages/Main.jsx";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import RegisterBusiness from "../pages/RegisterBusiness.jsx";
import Recover from "../pages/Recover.jsx";

const AppRouter = () => {
  const {user} = useContext(AuthContext)

  console.log(user)

  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path={'login'} element={<SignIn/>}/>
        <Route path={'register'} element={<SignUp/>}/>
        <Route path={'registerBusiness'} element={<RegisterBusiness/>}/>
        <Route path={'recover'} element={<Recover/>}/>
        <Route path={'*'} element={<Navigate to={'/'}/>}/>
      </Route>
      {/*{RenderRoutes({user})}*/}
    </Routes>
  )
}

export default AppRouter