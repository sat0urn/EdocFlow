import {Route, Routes} from 'react-router-dom'
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";
import {useEffect} from "react";

const AppRouter = () => {
  useEffect(() => {
    console.log('approuter')
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