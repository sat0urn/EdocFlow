import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import AppRouter from "./components/AppRouter.jsx";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/index.js";
import {check} from "./http/userApi.js";
import Loader from "./components/Loader.jsx";

const App = observer(() => {
  const {user} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check()
      .then(userData => {
        console.log('user')
        user.setUser(userData)
        user.setRole(userData.role)
        user.setIsAuth(true)
      })
      .catch(() => {
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Loader/>
  }

  return (
    <BrowserRouter basename={"/edoc_flow/"}>
      {!user.isAuth && <Header/>}
      <AppRouter/>
      {!user.isAuth && <Footer/>}
    </BrowserRouter>
  )
})

export default App
