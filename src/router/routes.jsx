import { Navigate } from "react-router-dom"
import Main from "../pages/Main"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Recover from "../pages/Recover"
import Reset from "../pages/Reset"
import ProfileHistory from "../components/profile/ProfileHistory.jsx"
import ProfileDash from "../components/profile/ProfileDash.jsx"

export const publicRoutes = [
  {
    id: 0,
    path: '/',
    element: < Main />
  },
  {
    id: 1,
    path: '/login',
    element: < SignIn />
  },
  {
    id: 2,
    path: '/register',
    element: < SignUp />
  },
  {
    id: 3,
    path: '/recover',
    element: < Recover />
  },
  {
    id: 4,
    path: '*',
    element: <Navigate to='/' />
  }
]

export const privateRoutes = [
  {
    id: 0,
    path: '/reset',
    element: < Reset />
  },
  {
    id: 1,
    path: '/',
    element: < ProfileDash />
  },
  {
    id: 2,
    path: '/history',
    element: < ProfileHistory />
  },
  {
    id: 3,
    path: '/inbox',
    element: <h1>inbox</h1>
  },
  {
    id: 4,
    path: '*',
    element: <Navigate to='/' />
  }
]