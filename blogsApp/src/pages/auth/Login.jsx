import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signUpHandler = async () => {
        try {
            console.log(fname, contactNbr, email, password)
        } catch (error) {

        }
    }


    return (
        <>
            <Stack padding={5} borderRadius={5} margin={"20px auto"} gap={4} width={"50%"} textAlign={"center"} sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px" }} >
                <Typography variant='h4' >Welcome Back!</Typography>

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
                <Button variant='contained' onClick={signUpHandler} >Login</Button>
            </Stack>
        </>
    )
}

export default Login
