import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import CustomizedTables from '../../components/Table'

const Users = () => {
    const [refresh , setRefresh] = useState(true)
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false)
    const fetchBlogs = async () => {
            setLoading(true)
            try {
                const response = await getDocs(collection(db, "users"))
                const tempArr = []
                response.forEach((doc) => {
                    const obj = { ...doc.data(), id: doc.id }
                    tempArr.push(obj)
                })
                setData(tempArr)
                console.log("data" , data)
            } catch (error) {
                console.log("error", error.message)
            }
            setLoading(false)
        }

        useEffect(() => {
                fetchBlogs()
            }, [])

    return (
        <div>
            <AdminLayout>
                <CustomizedTables data = {data} key={data.email}/>
            </AdminLayout>
        </div>
    )
}

export default Users
