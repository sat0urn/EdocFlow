import {Outlet} from "react-router-dom";

const Layout = () => {
  console.log("layout")
  return (
    <>
      <Outlet/>
    </>
  )
}

export default Layout