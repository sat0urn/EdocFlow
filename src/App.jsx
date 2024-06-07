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
import {INDEPENDENT_USER, OFFICE_MANAGER} from "./data/userRolesData.js";
import {getAllEmployees} from "./http/employeeApi.js";

const App = observer(() => {
  const {user, documents, searchData, fetchChanges} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    check()
      .then(userData => {
        console.log('ok')
        user.setUser(userData)
        user.setRole(userData.role)
        user.setIsAuth(true)
        getAllInboxes()
          .then(data => documents.setInbox(data))
          .catch((e) => console.error(e))
        getAllOutboxes()
          .then(data => documents.setOutbox(data))
          .catch((e) => console.error(e))
        getAllHistory()
          .then(data => documents.setHistory(data))
          .catch((e) => console.error(e))
        switch (userData.role) {
          case OFFICE_MANAGER:
            getAllEmployees()
              .then(data => user.setEmployees(data))
              .catch((e) => console.error(e))
            break
          case INDEPENDENT_USER:
            getAllEmails()
              .then(data => searchData.setEmails(data))
              .catch((e) => console.error(e))
            break
        }
      })
      .catch(() => {
      })
      .finally(() => setIsLoading(false))
  }, [fetchChanges.isChanged, user, documents, searchData])

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
