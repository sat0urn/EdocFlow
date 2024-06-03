import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import AppRouter from './components/AppRouter'
import {AuthContext} from './context/index'
import {useContext, useEffect, useState} from 'react'
import Loader from './components/Loader'
import {observer} from "mobx-react-lite";
import {check, getAllEmails} from "./http/userApi.js"
import {getAllHistory, getAllInboxes, getAllOutboxes} from "./http/docsApi.js";

const App = observer(() => {
  const {user, documents, searchData} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check()
      .then(userData => {
        user.setUser(userData)
        user.setIsAuth(true)
        getAllEmails()
          .then(data => searchData.setEmails(data))
          .catch((e) => console.error(e))
        getAllInboxes()
          .then(data => documents.setInbox(data))
          .catch((e) => console.error(e))
        getAllOutboxes()
          .then(data => documents.setOutbox(data))
          .catch((e) => console.error(e))
        getAllHistory()
          .then(data => documents.setHistory(data))
          .catch((e) => console.error(e))
      })
      .catch(() => {
      })
      .finally(() => setIsLoading(false))
  }, [user.isAuth, user, documents, searchData])

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
