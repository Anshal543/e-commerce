import React from 'react'
import {Navbar,Footer} from './index'
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout