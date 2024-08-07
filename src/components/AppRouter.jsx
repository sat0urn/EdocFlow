import {Route, Routes} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import Layout from "./Layout.jsx";
import {publicRoutes} from "../router/routes.jsx";

const AppRouter = observer(() => {
  // const {user} = useContext(AuthContext)

  return (
    <Routes>
      {/*{RenderRoutes({user})}*/}
      <Route path={'/'} element={<Layout/>}>
        {publicRoutes.map(({id, path, element}) =>
          <Route key={id} path={path} element={element}/>
        )}
      </Route>
    </Routes>
  )
})

export default AppRouter