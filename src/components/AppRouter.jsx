import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Main.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter