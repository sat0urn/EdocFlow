import {Route, Routes} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import Layout from "./Layout.jsx";
import Main from "../pages/Main.jsx";
import SignIn from "../pages/SignIn.jsx";

const AppRouter = observer(() => {
  // const {user} = useContext(AuthContext)

  return (
    <Routes>
      {/*{RenderRoutes({user})}*/}
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path={'login'} element={<SignIn/>}/>
        {/*{publicRoutes.map(({id, path, element}) =>*/}
        {/*  <Route key={id} path={path} element={element}/>*/}
        {/*)}*/}
      </Route>
    </Routes>
  )
})

export default AppRouter