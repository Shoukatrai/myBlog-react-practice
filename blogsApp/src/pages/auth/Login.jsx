import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toastAlert } from '../../utils/toastAlert';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const loginHandler = async () => {
        if (!email || !password) {
            toastAlert({
                type: "warning",
                message: "Please enter email and password."
            });
            return;
        }
        try {
            setIsLoading(true)
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log("user", user.user.uid)
            localStorage.setItem("user", user.user.uid)
            setIsLoading(false)
            toastAlert({
                type: "success",
                message: "Login Successfull!"
            })
            navigate("/blogs")
        } catch (error) {
            setIsLoading(false)
            toastAlert({
                type: "error",
                message: error.message
            })
        }
    }


    return (
        <>
            <Stack gap={4} textAlign={"center"} margin={"30px auto"} sx={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                width: { xs: "90%", md: "50%" },
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
            }} >
                <Typography variant='h4'>Welcome Back!</Typography>

                <TextField
                    variant='outlined'
                    type='email'
                    label={"Email"}
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                ></TextField>
                <TextField
                    variant='outlined'
                    type='password'
                    label={"Password"}
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                ></TextField>
                <Typography variant='body1'
                    sx={{ display: "flex", gap: "7px", alignItems: " center", justifyContent: "center" }}
                > Don't have an Account!
                    <Link to={"/signup  "} >Create Account</Link>
                </Typography>
                <Button variant='contained' onClick={loginHandler} >
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </Stack >
        </>
    )
}

export default Login
