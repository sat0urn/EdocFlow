import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import AppRouter from './components/AppRouter'
import {AuthContext} from './context/index'
import {useContext, useEffect, useState} from 'react'
import Loader from './components/Loader'
import {observer} from "mobx-react-lite";
import {check} from "./http/userApi.js"

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
    <BrowserRouter>
      {!user.isAuth && <Header/>}
      <AppRouter/>
      {!user.isAuth && <Footer/>}
    </BrowserRouter>
  )
})

export default App
