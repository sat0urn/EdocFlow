import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import AppRouter from "./components/AppRouter.jsx";

const App = () => {
  return (
    <BrowserRouter basename={"/edoc_flow"}>
      <Header/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
