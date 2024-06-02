import {Routes, useLocation} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import {AuthContext} from '../context/index'
import {observer} from "mobx-react-lite";
import RenderRoutes from "./RenderRoutes.jsx";

const AppRouter = observer(() => {
  const {user} = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = user.isAuth ? 'Dashboard' : 'Home'
    } else {
      document.title = location.pathname.substring(1, 2).toUpperCase() + location.pathname.substring(2)
    }
  }, [user.isAuth, location.pathname])

  return (
    <Routes>
      {RenderRoutes({user})}
    </Routes>
  )
})

export default AppRouter