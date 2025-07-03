import { Box, Stack, Typography, Paper, Container } from '@mui/material'
import React from 'react'

const FullBlogCard = ({ blog }) => {
    if (!blog) return null

    return (
        <Box
            sx={{
                minHeight: '80vh',
                background: '#f5f6fa',
                py: { xs: 2, md: 6 },
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, md: 4 },
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Box
                        component="img"
                        src={blog?.image}
                        alt={blog?.title}
                        sx={{
                            width: '100%',
                            maxHeight: 400,
                            objectFit: 'cover',
                            borderRadius: 2,
                            mb: 2,
                        }}
                    />
                    <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
                        {blog?.title}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: { xs: 16, md: 18 } }}>
                        {blog?.desc}
                    </Typography>
                </Paper>
            </Container>
        </Box>
    )
}

export default FullBlogCard
