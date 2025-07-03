import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'


const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    signOut(auth).then(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('userObj')
      navigate('/')
    })
  }, [navigate])

  return null
}

export default Logout
