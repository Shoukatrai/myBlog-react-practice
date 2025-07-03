import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { toastAlert } from '../utils/toastAlert';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [blogTitle, setBlogTitle] = useState("")
    const [blogSubject, setBlogSubject] = useState("")
    const [blogDesc, setBlogDesc] = useState("")
    const [blogIsPrivate, setBlogIsPrivate] = useState(false)
    const [blogImage, setBlogImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const ref = useRef()
    const API_SECRET = 'ru2hETg3uOEGfsFg4Sfyxi_WSdk'
    const CLOUD_NAME = "dsk0ukkps"

    const createBlogHandler = async () => {
        setIsLoading(true)
        let url;
        if (blogImage) {
            try {
                const formData = new FormData()
                formData.append("file", blogImage)
                formData.append("upload_preset", "blogsapp")
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData)
                url = res.data.secure_url
            } catch (error) {
                console.log("error", error)
            }
        }

        const blogObj = {
            title: blogTitle,
            subject: blogSubject,
            desc: blogDesc,
            private: blogIsPrivate,
            image: url,
            userId: localStorage.getItem("user")
        }

        try {
            const blogRes = await addDoc(collection(db, "blogs"), blogObj)
            console.log("blogRes", blogRes)
            setIsLoading(false)
            toastAlert({
                type: "success",
                message: "Blog Created successfully!"
            })
            navigate("/myblogs")
        } catch (error) {
            setIsLoading(false)
            toastAlert({
                type: "error",
                message: error.message
            })
        }
    }


    const imageFileHandler = () => {
        console.log('imageFileHandler', ref.current)
        ref.current.click()
    }

    return (
        <>
            <Navbar />
            <Stack gap={4} margin={"20px auto"} width={"50%"} sx={{
                width: { xs: "95%", md: "50%" }
            }} textAlign={"center"}  >
                <Typography variant='h4' >Create Blog</Typography>
                <TextField variant='outlined' label={"Blog Title"}
                    onChange={(e) => {
                        setBlogTitle(e.target.value)
                    }}
                ></TextField>

                <TextField variant='outlined' label={"Blog Subject"}
                    onChange={(e) => {
                        setBlogSubject(e.target.value)
                    }}
                ></TextField>

                <TextField multiline rows={5} variant='outlined' label={"Blog Description"}
                    onChange={(e) => {
                        setBlogDesc(e.target.value)
                    }}
                ></TextField>

                <Stack justifyContent={"space-between"} flexDirection={"row"} >
                    <FormControlLabel control={<Checkbox
                        onChange={(e) => {
                            setBlogIsPrivate(e.target.checked)
                        }}
                    />} label="Private" />
                    <FormControlLabel sx={{ display: "flex", gap: "7px", alignItems: "center" }} onClick={imageFileHandler} control={<DriveFolderUploadIcon />} label="Upload Image" />
                </Stack>

                <input type="file" hidden ref={ref}
                    onChange={(e) => {
                        setBlogImage(e.target.files[0])
                    }} />
                <Button variant='contained' onClick={createBlogHandler}>
                    {isLoading ? "Creating Blog..." : "Create Blog"}
                </Button>
            </Stack>
        </>
    )
}

export default CreateBlog
