import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import BlogCard from '../../components/Card'
import { Box, CircularProgress, Stack } from '@mui/material'
import { toastAlert } from '../../utils/toastAlert'

const Blogs = () => {
    const [loading , setLoading] = useState(false)
    const [data , setData] = useState([])
    const [refresh, setRefresh] = useState(false)

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await getDocs(collection(db, "blogs"))
            const tempArr = []
            response.forEach((doc) => {
                const obj = { ...doc.data(), id: doc.id }
                tempArr.push(obj)
            })
            setData(tempArr)
        } catch (error) {
            console.log("error", error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchBlogs()
    }, [refresh])

    const editBlogHandler = async (id) => {
        console.log("editBlogHandler", id)
        try {
          toastAlert({
            type: "success",
            message: "Working on Edit Blog Functionality!"
          })
        } catch (error) {
          toastAlert({
            type: "error",
            message: error.message
          })
        }
      }

    const deleteBlogHandler = async (id) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            toastAlert({ type: "success", message: "Blog Deleted!" })
            setRefresh(r => !r)
        } catch (error) {
            toastAlert({ type: "error", message: error.message })
        }
    }

    return (
        <div>
            <AdminLayout>
                {
                    loading ? (
                        <Box sx={{
                            minHeight: '60vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}>
                            <CircularProgress size={80} />
                        </Box>
                    ) : (
                        <Stack gap={10} sx={{
                            marginTop: "20px",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            margin: "25px"
                        }}>
                            {data.map(blog => (
                                <BlogCard key={blog.id} blog={blog} deleteBlogHandler={deleteBlogHandler} editBlogHandler={editBlogHandler} />
                            ))}
                        </Stack>
                    )
                }
            </AdminLayout>
        </div>
    )
}

export default Blogs
