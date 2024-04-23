import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import SignIn from './components/SignPage/SignIn'
import SignUp from './components/SignPage/SignUp'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/recover' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
