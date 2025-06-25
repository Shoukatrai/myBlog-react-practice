import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoute = () => {
  const user = localStorage.getItem("user")
    return (
    user ? <Outlet /> : <Navigate to={"/"}/>  
  )
}

export default UserPrivateRoute
