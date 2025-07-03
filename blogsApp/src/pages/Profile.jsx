import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Box, Stack, Typography, Paper, Avatar, Button, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'


const Profile = () => {
    const [user, setUser] = useState({
        fname: '',
        email: '',
        contactNbr: '',
        avatar: 'https://i.pravatar.cc/150?img=3'
    })

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("user")
            if (!userId) return
            const docRef = doc(db, "users", userId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data()
                setUser({
                    ...data,
                    avatar: data.avatar || 'https://i.pravatar.cc/150?img=3'
                })
            } else {
                // fallback dummy data if not found
                setUser({
                    fname: "John Doe",
                    email: "john@example.com",
                    contactNbr: "+1234567890",
                    avatar: 'https://i.pravatar.cc/150?img=3'
                })
            }
        }
        fetchUser()
    }, [])

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    minHeight: '90vh',
                    background: '#f5f6fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 2, md: 6 },
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 2, md: 4 },
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                            position: 'relative',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                position: 'absolute',
                                top: 24,
                                right: 24,
                                minWidth: 0,
                                borderRadius: '50%',
                                p: 1.2,
                            }}
                        >
                            <EditIcon />
                        </Button>
                        <Avatar
                            src={user.avatar}
                            alt={user.fname}
                            sx={{
                                width: { xs: 90, md: 120 },
                                height: { xs: 90, md: 120 },
                                mb: 2,
                            }}
                        />
                        <Typography variant="h4" fontWeight={700} textAlign="center">
                            {user.fname}
                        </Typography>
                        <Stack spacing={1} width="100%" alignItems="center">
                            <Typography variant="body1" color="text.secondary">
                                <strong>Email:</strong> {user.email}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                <strong>Contact:</strong> {user.contactNbr}
                            </Typography>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default Profile
