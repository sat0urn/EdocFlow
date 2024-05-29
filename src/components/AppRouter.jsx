import {Route, Routes, useLocation} from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../router/routes'
import {useContext, useEffect} from 'react'
import {AuthContext} from '../context/index'
import Profile from '../pages/Profile'
import Layout from './Layout'
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(AuthContext)
    const location = useLocation()

    useEffect(() => {
        console.log(window.innerWidth)
        if (location.pathname === '/') {
            document.title = user.isAuth ? (document.title = 'Dashboard') : (document.title = 'Home')
        } else {
            document.title = location.pathname.substring(1, 2).toUpperCase() + location.pathname.substring(2)
        }
    }, [user.isAuth, location.pathname])

    return (
        <Routes>
            {user.isAuth
                ?
                <Route path='/' element={<Profile/>}>
                    {privateRoutes.map(({id, path, element}) =>
                        <Route
                            key={id}
                            path={path}
                            element={element}
                        />
                    )}
                    <Route/>
                </Route>
                :
                <Route path='/' element={<Layout/>}>
                    {publicRoutes.map(({id, path, element, medium}) =>
                        (
                            medium <= window.innerWidth &&
                            <Route
                                key={id}
                                path={path}
                                element={element}
                            />
                        )
                    )}
                </Route>
            }
        </Routes>
    )
})

export default AppRouter