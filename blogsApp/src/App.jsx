import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import BlogPage from './pages/BlogPage'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/blogpage' element={<BlogPage />} />
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
