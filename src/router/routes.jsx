import {Navigate} from "react-router-dom"
import Main from "../components/pages/Main"
import SignIn from "../components/pages/SignIn"
import SignUp from "../components/pages/SignUp"
import Recover from "../components/pages/Recover"
import RegisterBusiness from "../components/pages/RegisterBusiness.jsx";

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