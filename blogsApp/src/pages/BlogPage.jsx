import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/Card'
import { Stack } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'





const BlogPage = () => {
  const [data , setData] = useState([])

  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(blogs);
    } catch (error) {
      console.log("error", error)
    }
  


  }
  


  useEffect(() => {
    fetchBlogs()
  }, [])



  return (
    <>
      <Navbar />
      <Stack gap={10} sx={{
        marginTop: "20px",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "25px"
      }}>
        {data.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Stack>
    </>
  )
}

export default BlogPage
