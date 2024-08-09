import {Outlet} from "react-router-dom"
import {useEffect} from "react";

const Layout = () => {
  useEffect(() => {
    console.log('layout')
  }, [])
  return (
    <>
      <Outlet/>
    </>
  )
}

export default Layout