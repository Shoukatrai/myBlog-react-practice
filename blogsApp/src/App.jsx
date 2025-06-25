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
