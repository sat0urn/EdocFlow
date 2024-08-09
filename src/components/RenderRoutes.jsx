import {Navigate, Route} from "react-router-dom";
import {
  adminRoutes,
  employeeRoutes,
  independentUserRoutes,
  officeManagerRoutes,
  publicRoutes
} from "../router/routes.jsx";
import Profile from "../pages/Profile.jsx";
import {ADMIN, EMPLOYEE, INDEPENDENT_USER, OFFICE_MANAGER} from "../data/userRolesData.js";
import Layout from "./Layout.jsx";

const RenderRoutes = ({user}) => {
  if (!user.isAuth) {
    return (
      <Route element={<Layout/>}>
        {publicRoutes.map(({id, path, element}) =>
          <Route key={id} path={path} element={element}/>
        )}
      </Route>
    )
  }

  switch (user.role) {
    case INDEPENDENT_USER:
      return (
        <Route path={'/'} element={<Profile/>}>
          {independentUserRoutes.map(({id, path, element}) =>
            <Route key={id} path={path} element={element}/>
          )}
        </Route>
      )
    case OFFICE_MANAGER:
      return (
        <Route path={'/'} element={<Profile/>}>
          {officeManagerRoutes.map(({id, path, element}) =>
            <Route key={id} path={path} element={element}/>
          )}
        </Route>
      )
    case EMPLOYEE:
      return (
        <Route path={'/'} element={<Profile/>}>
          {employeeRoutes.map(({id, path, element}) =>
            <Route key={id} path={path} element={element}/>
          )}
        </Route>
      )
    case ADMIN:
      return (
        <Route path={'/'} element={<Profile/>}>
          {adminRoutes.map(({id, path, element}) =>
            <Route key={id} path={path} element={element}/>
          )}
        </Route>
      )
    default:
      return <Route path='*' element={<Navigate to="/"/>}/>
  }
}

export default RenderRoutes