import {Navigate} from "react-router-dom"
import Main from "../pages/Main"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Recover from "../pages/Recover"
import ProfileHistory from "../components/profile/ProfileHistory.jsx"
import ProfileCreateDocument from "../components/profile/ProfileCreateDocument.jsx"
import ProfileSecurity from "../components/profile/ProfileSecurity.jsx";
import ProfileInbox from "../components/profile/ProfileInbox.jsx";
import RegisterBusiness from "../pages/RegisterBusiness.jsx";
import ProfileDocViewSign from "../components/profile/ProfileDocViewSign.jsx";
import ProfileDashboard from "../components/profile/ProfileDashboard.jsx";
import ProfileEmployeeList from "../components/profile/ProfileEmployeeList.jsx";
import ProfileEmployeeDocsView from "../components/profile/ProfileEmployeeDocsView.jsx";

export const publicRoutes = [
  {
    id: 0,
    path: '',
    element: <Main title={"Home"}/>,
  },
  {
    id: 1,
    path: 'login',
    element: <SignIn title={"Login"}/>
  },
  {
    id: 2,
    path: 'register',
    element: <SignUp title={"Registration"}/>
  },
  {
    id: 3,
    path: 'registerBusiness',
    element: <RegisterBusiness title={"Business"}/>
  },
  {
    id: 4,
    path: 'recover',
    element: <Recover title={"Recover"}/>
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
    path: '',
    element: <ProfileCreateDocument title={"Create document"}/>
  },
  {
    id: 1,
    path: 'history',
    element: <ProfileHistory title={"History"}/>
  },
  {
    id: 2,
    path: 'security',
    element: <ProfileSecurity title={"Security"}/>
  },
  {
    id: 3,
    path: 'inbox',
    element: <ProfileInbox title={"Inbox"}/>
  },
  {
    id: 4,
    path: 'outbox',
    element: <ProfileInbox title={"Outbox"}/>
  },
  {
    id: 5,
    path: 'viewAndSign/:id',
    element: <ProfileDocViewSign title={"View document"}/>
  },
  {
    id: 6,
    path: '*',
    element: <Navigate to="/"/>
  }
]

export const officeManagerRoutes = [
  {
    id: 0,
    path: '',
    element: <ProfileDashboard title={"Dashboard"}/>
  },
  {
    id: 1,
    path: 'createDocument',
    element: <ProfileCreateDocument title={"Create document"}/>
  },
  {
    id: 2,
    path: 'employeeList',
    element: <ProfileEmployeeList title={"Employee list"}/>
  },
  {
    id: 3,
    path: 'employeeView/:email',
    element: <ProfileEmployeeDocsView title={"Employee document"}/>
  },
  {
    id: 4,
    path: 'documentList',
    element: <ProfileHistory title={"Document list"}/>
  },
  {
    id: 5,
    path: 'security',
    element: <ProfileSecurity title={"Security"}/>
  },
  {
    id: 6,
    path: 'inbox',
    element: <ProfileInbox title={"Inbox"}/>
  },
  {
    id: 7,
    path: 'outbox',
    element: <ProfileInbox title={"Outbox"}/>
  },
  {
    id: 8,
    path: 'viewAndSign/:id',
    element: <ProfileDocViewSign title={"View document"}/>
  },
  {
    id: 9,
    path: '*',
    element: <Navigate to="/"/>
  }
]

export const employeeRoutes = [
  {
    id: 0,
    path: '',
    element: <ProfileCreateDocument title={"Create document"}/>
  },
  {
    id: 1,
    path: 'history',
    element: <ProfileHistory title={"History"}/>
  },
  {
    id: 2,
    path: 'security',
    element: <ProfileSecurity title={"Security"}/>
  },
  {
    id: 3,
    path: 'inbox',
    element: <ProfileInbox title={"Inbox"}/>
  },
  {
    id: 4,
    path: 'outbox',
    element: <ProfileInbox title={"Outbox"}/>
  },
  {
    id: 5,
    path: 'viewAndSign/:id',
    element: <ProfileDocViewSign title={"View document"}/>
  },
  {
    id: 6,
    path: '*',
    element: <Navigate to="/"/>
  }
]

export const adminRoutes = [
  {
    id: 0,
    path: '',
    element: <ProfileCreateDocument title={"Create document"}/>
  },
  {
    id: 1,
    path: '*',
    element: <Navigate to="/"/>
  }
]