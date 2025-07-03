import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'
import FullBlogCard from '../components/FullBlogCard'

const FullBlog = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)

    const fetchBlog = async () => {
        if (!id) {
            console.log("No id in params");
            return;
        }
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
            console.log("No such blog found for id:", id);
        }
    }
    console.log("blog" , blog)
    useEffect(() => {
        fetchBlog()
    }, [id])

    return (
        <>
            <Navbar />
            {blog && <FullBlogCard blog={blog} />}
        </>
    )
}

export default FullBlog
