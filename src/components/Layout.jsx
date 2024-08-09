import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <>
      <h1>This must be rendered!</h1>
      <Outlet/>
    </>
  )
}

export default Layout