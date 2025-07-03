import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const BlogCard = ({ blog , deleteBlogHandler , editBlogHandler }) => {
    const [isLogin, setIsLogin] = React.useState(false)
    const navigate = useNavigate()
    const moreBlogHandler = (id) => {
        console.log("id", id)
        navigate(`/blog/${id}`) // <-- Corrected path
    }

    

    React.useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setIsLogin(true)
        }
    }, [])

    return (
        <Card
            sx={{
                width: { xs: '100%', sm: 320, md: 345 },
                maxWidth: 1, // 100% of parent
                minWidth: { xs: '90%', sm: 250 },
                m: 'auto',
                maxHeight: 345,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                sx={{
                    height: { xs: 160, sm: 140 },
                    objectFit: 'cover'
                }}
                image={blog?.image}
                title={blog?.title || "Blog image"}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {blog?.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {blog?.subject}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {blog?.desc}
                </Typography>
            </CardContent>
            {isLogin && (
                <CardActions>
                    <Button size="small" onClick={() => editBlogHandler(blog.id)}>Edit</Button>
                    <Button size="small" onClick={() => deleteBlogHandler(blog.id)}>Delete</Button>
                    <Button size="small" onClick={() => moreBlogHandler(blog.id)}>Learn More</Button>
                </CardActions>
            )}
        </Card>
    );
}

export default BlogCard