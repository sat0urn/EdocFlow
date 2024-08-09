import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Main from "./components/pages/Main.jsx";

const App = () => {
  return (
    <BrowserRouter basename={"/edoc_flow"}>
      <Header/>
      <Main/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
