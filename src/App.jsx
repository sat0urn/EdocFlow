import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Layout from "./components/Layout.jsx";
import Main from "./components/Main.jsx";

const App = () => {
  return (
    <BrowserRouter basename={"/edoc_flow"}>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<Main/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
