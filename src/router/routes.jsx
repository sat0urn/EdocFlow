import {Navigate} from "react-router-dom"
import Main from "../components/Main.jsx"
import SignIn from "../components/SignIn.jsx"
import SignUp from "../components/SignUp.jsx"
import Recover from "../components/Recover.jsx"
import RegisterBusiness from "../components/RegisterBusiness.jsx";

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