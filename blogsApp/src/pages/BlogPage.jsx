import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/Card'
import { Box, CircularProgress, Stack } from '@mui/material'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { toastAlert } from '../utils/toastAlert'






const BlogPage = () => {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const res = await getDocs(collection(db, "blogs"))
      setLoading(false)
      const tempArr = []
      res.forEach((doc) => {
        console.log("doc", doc.data().private, doc.id)
        if(!doc.data().private ){
          const obj = { ...doc.data(), id: doc.id }
          tempArr.push(obj)
        }
      })
      setData(tempArr)
    } catch (error) {
      setLoading(false)
      toastAlert({
        type: "error",
        message: error.message || "Something went wrong!"
      })
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [refresh])

  useEffect(() => {
    if (data.length > 0) {
      console.log("data", data[0].userId)
    }
  }, [data])


  const deleteBlogHandler = async (id) => {
    console.log("deleteBlogHandler", id)

    try {
      await deleteDoc(doc(db, "blogs", id));
      toastAlert({
        type: "success",
        message: "Blog Deleted!"
      })
      setRefresh(!refresh)
    } catch (error) {
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
              <BlogCard key={blog.id} blog={blog} deleteBlogHandler={deleteBlogHandler} editBlogHandler={editBlogHandler} />
            ))}
          </Stack>
        )

      }
    </>
  )
}

export default BlogPage
