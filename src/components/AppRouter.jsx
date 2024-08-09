import {Route, Routes} from 'react-router-dom'
import Layout from "./Layout.jsx";
import Main from "./pages/Main.jsx";
import {useEffect} from "react";

const AppRouter = () => {
  useEffect(() => {
    console.log("it did something")
  }, [])
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter