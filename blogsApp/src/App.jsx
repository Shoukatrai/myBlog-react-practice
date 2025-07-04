import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import BlogPage from './pages/BlogPage'
import { Bounce, ToastContainer } from 'react-toastify'
import CreateBlog from './pages/CreateBlog'
import MyBlogs from './pages/MyBlogs'
import UserPrivateRoute from './Routes/userPrivateRoute'
import AuthRoute from './Routes/AuthRoute'
import AdminDash from './pages/Admin/AdminDash'
import AdminProfile from './pages/Admin/AdminProfile'
import AdminRoutes from './Routes/AdminRoutes'
import FullBlog from './pages/FullBlog'
import Profile from './pages/Profile'
import Logout from './pages/Logout'
import Blogs from './pages/Admin/Blogs'
import Users from './pages/Admin/Users'


function App() {

  return (
    <>
      <Routes>

        <Route element ={<AuthRoute />} >
          <Route index element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        <Route element={<UserPrivateRoute />}>
          <Route path='/blogs' element={<BlogPage />} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='/myblogs' element={<MyBlogs />} />
          <Route path='/blog/:id' element={<FullBlog />} /> 
          <Route path='/profile' element={<Profile />} /> 
          <Route path='/logout' element={<Logout />} /> 
        </Route>

        <Route element ={<AdminRoutes />}>
          <Route path='/admin/dash' element={<AdminDash />} />
          <Route path='/admin/profile' element={<AdminProfile />} />
          <Route path='/admin/blogs' element={<Blogs />} />
          <Route path='/admin/users' element={<Users />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
