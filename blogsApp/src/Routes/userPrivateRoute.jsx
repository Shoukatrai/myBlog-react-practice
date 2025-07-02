import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoute = () => {
  const user = localStorage.getItem("user")
  const role = JSON.parse(localStorage.getItem("userObj"))?.type
    return (
    user ?
    role === "user" ?
     <Outlet /> :
     <Navigate to={"/admin/dash"} />
     : <Navigate to={"/"}/>  
  )
}

export default UserPrivateRoute
