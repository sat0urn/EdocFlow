import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from "./Layout.jsx";
import Main from "../pages/Main.jsx";
import Recover from "../pages/Recover.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path={'recover'} element={<Recover/>}/>
        <Route path={'*'} element={<Navigate to={'/'}/>}/>
      </Route>
      {/*{RenderRoutes({user})}*/}
    </Routes>
  )
}

export default AppRouter