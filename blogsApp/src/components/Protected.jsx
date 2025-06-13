import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ Component }) => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     const user = localStorage.getItem("user")
    //     if (!user) {
    //         navigate("/")
    //     }
    // }, [])
    return (
        <>
            <Component />
        </>
    )
}

export default Protected
{ component }