import {Routes} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import RenderRoutes from "./RenderRoutes.jsx";
import {useContext} from "react";
import {AuthContext} from "../context/index.js";

const AppRouter = observer(() => {
  const {user} = useContext(AuthContext)

  console.log(RenderRoutes({user}))

  return (
    <Routes>
      {RenderRoutes({user})}
    </Routes>
  )
})

export default AppRouter