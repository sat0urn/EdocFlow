import {Navigate} from "react-router-dom"
import Main from "../pages/Main"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Recover from "../pages/Recover"
import Reset from "../pages/Reset"
import ProfileHistory from "../components/profile/ProfileHistory.jsx"
import ProfileDash from "../components/profile/ProfileDash.jsx"
import ProfileSecurity from "../components/profile/ProfileSecurity.jsx";
import ProfileInbox from "../components/profile/ProfileInbox.jsx";
import ProfileSupport from "../components/profile/ProfileSupport.jsx";
import RegisterBusiness from "../pages/RegisterBusiness.jsx";
import ProfileDocViewSign from "../components/profile/ProfileDocViewSign.jsx";

export const publicRoutes = [
  {
    id: 0,
    path: '/',
    element: < Main/>,
    medium: 0
  },
  {
    id: 1,
    path: '/login',
    element: < SignIn/>,
    medium: 768
  },
  {
    id: 2,
    path: '/register',
    element: < SignUp/>,
    medium: 768
  },
  {
    id: 3,
    path: '/registerBusiness',
    element: <RegisterBusiness/>,
    medium: 768
  },
  {
    id: 4,
    path: '/recover',
    element: < Recover/>,
    medium: 768
  },
  {
    id: 5,
    path: '*',
    element: <Navigate to='/'/>,
    medium: 0
  }
]

export const privateRoutes = [
  {
    id: 0,
    path: '/reset',
    element: < Reset/>
  },
  {
    id: 1,
    path: '/',
    element: < ProfileDash/>
  },
  {
    id: 2,
    path: '/history',
    element: < ProfileHistory/>
  },
  {
    id: 3,
    path: '/security',
    element: < ProfileSecurity/>
  },
  {
    id: 4,
    path: '/inbox',
    element: <ProfileInbox/>
  },
  {
    id: 5,
    path: '/support',
    element: <ProfileSupport/>
  },
  {
    id: 6,
    path: '/viewAndSign/:id',
    element: <ProfileDocViewSign/>
  },
  {
    id: 7,
    path: '*',
    element: <Navigate to='/'/>
  }
]