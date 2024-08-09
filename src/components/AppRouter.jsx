import {Route, Routes} from 'react-router-dom'
import Layout from "./Layout.jsx";
import Main from "./pages/Main.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import {useEffect} from "react";

const AppRouter = () => {
  useEffect(() => {
    console.log('approuter')
  }, [])
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path={'login'} element={<SignIn/>}/>
        <Route path={'register'} element={<SignUp/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter