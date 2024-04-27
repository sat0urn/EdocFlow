import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router/routes'
import { useContext } from 'react'
import { AuthContext } from '../context/index'
import Profile from '../pages/Profile'
import Layout from './Layout'

function AppRouter() {
  const { isAuth } = useContext(AuthContext)

  return (
    isAuth
      ?
      <Routes>
        <Route path='/' element={<Profile />} >
          {privateRoutes.map(route =>
            <Route
              key={route.id}
              path={route.path}
              element={route.element}
            />
          )}
          <Route />
        </Route>
      </Routes>
      :
      <Routes>
        <Route path='/' element={<Layout />} >
          {publicRoutes.map(route =>
            <Route
              key={route.id}
              path={route.path}
              element={route.element}
            />
          )}
        </Route>
      </Routes>
  )
}

export default AppRouter