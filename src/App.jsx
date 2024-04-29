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
        check().then(data => {
            console.log("check")
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() =>
            setIsLoading(false)
        )
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    )
})

export default App
