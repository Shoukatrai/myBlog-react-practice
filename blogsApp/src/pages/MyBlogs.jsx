import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/Card'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Stack } from '@mui/material'

const MyBlogs = () => {
  const [data, setData] = useState([])

  const fetchBlogs = async () => {
    try {
      const uid = localStorage.getItem("user")
      const q = query(collection(db, "blogs"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
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

export default MyBlogs
