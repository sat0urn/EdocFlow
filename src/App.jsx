import { BrowserRouter } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import AppRouter from './components/AppRouter'
import { AuthContext } from './context/index'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  console.log(isLoading)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
