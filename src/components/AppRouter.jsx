import {Routes, useLocation} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import {AuthContext} from '../context/index'
import {observer} from "mobx-react-lite";
import RenderRoutes from "./RenderRoutes.jsx";
import {OFFICE_MANAGER} from "../data/userRolesData.js";

const AppRouter = observer(() => {
  const {user} = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/')
      document.title = user.isAuth ? (user.role === OFFICE_MANAGER ? 'Dashboard' : 'Create Document') : 'Home'
    else if (location.pathname === '/createDocument')
      document.title = 'Create Document'
    else
      document.title = location.pathname.charAt(1).toUpperCase() + location.pathname.substring(2)
  }, [user.isAuth, location.pathname])

  return (
    <Routes>
      {RenderRoutes({user})}
    </Routes>
  )
})

export default AppRouter