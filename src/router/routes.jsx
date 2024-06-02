import {Navigate} from "react-router-dom"
import Main from "../pages/Main"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Recover from "../pages/Recover"
import Reset from "../pages/Reset"
import ProfileHistory from "../components/profile/ProfileHistory.jsx"
import ProfileCreateDocument from "../components/profile/ProfileCreateDocument.jsx"
import ProfileSecurity from "../components/profile/ProfileSecurity.jsx";
import ProfileInbox from "../components/profile/ProfileInbox.jsx";
import ProfileSupport from "../components/profile/ProfileSupport.jsx";
import RegisterBusiness from "../pages/RegisterBusiness.jsx";
import ProfileDocViewSign from "../components/profile/ProfileDocViewSign.jsx";
import ProfileDashboard from "../components/profile/ProfileDashboard.jsx";
import ProfileEmployeeList from "../components/profile/ProfileEmployeeList.jsx";
import ProfileEmployeeDocsView from "../components/profile/ProfileEmployeeDocsView.jsx";

export const publicRoutes = [
  {
    id: 0,
    path: '/',
    element: <Main/>,
  },
  {
    id: 1,
    path: '/login',
    element: <SignIn/>
  },
  {
    id: 2,
    path: '/register',
    element: <SignUp/>
  },
  {
    id: 3,
    path: '/registerBusiness',
    element: <RegisterBusiness/>
  },
  {
    id: 4,
    path: '/recover',
    element: <Recover/>
  },
  {
    id: 5,
    path: '*',
    element: <Navigate to='/'/>
  }
]

export const independentUserRoutes = [
  {
    id: 0,
    path: '/',
    element: <ProfileCreateDocument/>
  },
  {
    id: 1,
    path: '/history',
    element: <ProfileHistory/>
  },
  {
    id: 2,
    path: '/security',
    element: <ProfileSecurity/>
  },
  {
    id: 3,
    path: '/inbox',
    element: <ProfileInbox/>
  },
  {
    id: 4,
    path: '/outbox',
    element: <ProfileInbox/>
  },
  {
    id: 5,
    path: '/support',
    element: <ProfileSupport/>
  },
  {
    id: 6,
    path: '/viewAndSign',
    element: <ProfileDocViewSign/>
  },
  {
    id: 7,
    path: '/reset',
    element: <Reset/>
  },
  {
    id: 8,
    path: '*',
    element: <Navigate to="/"/>
  }
]

export const officeManagerRoutes = [
  {
    id: 0,
    path: '/',
    element: <ProfileDashboard/>
  },
  {
    id: 1,
    path: '/createDocument',
    element: <ProfileCreateDocument/>
  },
  {
    id: 2,
    path: '/employeeList',
    element: <ProfileEmployeeList/>
  },
  {
    id: 3,
    path: '/employeeView',
    element: <ProfileEmployeeDocsView/>
  },
  {
    id: 4,
    path: '*',
    element: <Navigate to="/"/>
  }
]

export const employeeRoutes = [
  {
    id: 0,
    path: '/',
    element: <ProfileCreateDocument/>
  },
  {
    id: 1,
    path: '*',
    element: <Navigate to="/"/>
  }
]

export const adminRoutes = [
  {
    id: 0,
    path: '/',
    element: <ProfileCreateDocument/>
  },
  {
    id: 1,
    path: '*',
    element: <Navigate to="/"/>
  }
]