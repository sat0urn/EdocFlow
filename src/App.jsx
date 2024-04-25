import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import SignIn from './components/SignPage/SignIn'
import SignUp from './components/SignPage/SignUp'
import Recover from './components/SignPage/Recover'
import Reset from './components/SignPage/Reset'
import Profile from './components/ProfilePage/Profile'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/recover' element={<Recover />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
