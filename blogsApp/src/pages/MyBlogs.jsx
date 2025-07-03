import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/Card'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Box, CircularProgress, Stack } from '@mui/material'
import { toastAlert } from '../utils/toastAlert'

const MyBlogs = () => {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      const tempArray = []
      setLoading(true)
      const response = await getDocs(collection(db, "blogs"))
      setLoading(false)
      response.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id }
        tempArray.push(data)
      })
      setData(tempArray)

    } catch (error) {
      setLoading(false)
      toastAlert({
        type: "error",
        message: error.message || "Something went wrong!"
      })
      console.log("error", error)
    }
  }
  const deleteBlogHandler = async (id) => {
    console.log("deleteBlogHandler")


    try {
      await deleteDoc(doc(db, "blogs", id));
      toastAlert({
        type: "success",
        message: "Blog Deleted!"
      })
      setRefresh(!refresh)
    } catch (error) {
      console.log("error", error)
      toastAlert({
        type: "error",
        message: error.message
      })
    }
  }

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



  useEffect(() => {
    fetchBlogs()
  }, [refresh])


  return (
    <>
      <Navbar />
      {
        loading ? (<Box sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
          <CircularProgress size={80} sx={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto"
          }} />
        </Box>) : (
          <Stack gap={10} sx={{
            marginTop: "20px",
            flexDirection: "row",
            flexWrap: "wrap",
            margin: "25px"
          }}>
            {data.map(blog => (
              blog.userId === localStorage.getItem("user") &&
              <BlogCard key={blog.id} blog={blog} deleteBlogHandler={deleteBlogHandler} editBlogHandler={editBlogHandler} />
            ))}
          </Stack>
        )

      }
    </>
  )
}

export default MyBlogs
