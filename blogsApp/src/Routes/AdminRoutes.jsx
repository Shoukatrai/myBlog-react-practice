import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const user = localStorage.getItem("user")
    const userData = JSON.parse(localStorage.getItem("userObj"))?.type


    console.log("userRole" , userData)
  
  return(
    user ? 
    userData === "admin"? 
     <Outlet /> : 
     <Navigate to={"/blogs"}  />
    : <Navigate to={"/"}/>
    )
}

export default AdminRoutes
