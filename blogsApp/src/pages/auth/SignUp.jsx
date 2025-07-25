import Button from '@mui/material/Button';
import { Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { toastAlert } from '../../utils/toastAlert';
import { useState } from "react"

const SignUp = () => {
    const [fname, setFname] = useState("")
    const [contactNbr, setContactNbr] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()




    const signUpHandler = async () => {
        try {
            if (!email || !password || !fname || !contactNbr) {
                toastAlert({
                    type: "warning",
                    message: "Fill All the Fields!"
                })
                return
            }
            setIsLoading(true)
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log("user", user.user)

            const userId = user.user.uid


            if (user) {
                try {
                    
                    const obj = {
                        fname,
                        contactNbr,
                        email,
                        userId,
                        type: "user",
                        isActive: true,
                    }
                    const userInfo = await setDoc(doc(db, "users", userId), obj)
                    console.log("userInfo" , userInfo)
                } catch (error) {
                    console.log("error", error)
                }
            }
            toastAlert({
                type: "success",
                message: "Signuped Successfully!"
            })
            setIsLoading(false)
            navigate("/")
        } catch (error) {
            console.log("error", error)
            toastAlert({
                type: "error",
                message: error.message
            })
            setIsLoading(false)
        }
    }


    return (
        <>
            <Stack padding={5} borderRadius={5} margin={"20px auto"} gap={4} width={"50%"} textAlign={"center"} sx={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                width: { xs: "90%", md: "50%" },
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
            }} >
                <Typography variant='h4' >Create Account</Typography>
                <TextField
                    variant='outlined'
                    type="text"
                    label={"Full Name"}
                    required
                    onChange={(e) => { setFname(e.target.value) }}
                ></TextField>

                <TextField
                    variant='outlined'
                    type="tel"
                    label={"Contact Nbr"}
                    required
                    onChange={(e) => { setContactNbr(e.target.value) }}
                ></TextField>

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
                    sx={{ display: "flex", gap: "3px", alignItems: " center", justifyContent: "center" }}
                >Have an Account!
                    <Link to={"/"} className='login-Link'>Login</Link>
                </Typography>
                <Button variant='contained' onClick={signUpHandler}>
                    {isLoading ? "Creating Account..." : "Create Account "}
                </Button>
            </Stack>
        </>
    )
}

export default SignUp
