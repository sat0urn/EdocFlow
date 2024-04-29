import {Route, Routes} from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../router/routes'
import {useContext} from 'react'
import {AuthContext} from '../context/index'
import Profile from '../pages/Profile'
import Layout from './Layout'
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(AuthContext)

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
                    {publicRoutes.map(({id, path, element}) =>
                        <Route
                            key={id}
                            path={path}
                            element={element}
                        />
                    )}
                </Route>}
        </Routes>
    )
})

export default AppRouter