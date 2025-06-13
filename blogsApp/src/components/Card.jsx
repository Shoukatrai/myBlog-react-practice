import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BlogCard = ({ blog }) => {
    const [isLogin, setIsLogin] = React.useState(false)

    React.useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setIsLogin(true)
        }
    }, [])

    return (
        <Card sx={{
            maxWidth: 345,
            maxHeight: 345
        }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog?.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog?.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
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
            {isLogin && <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            }

        </Card>
    );
}

export default BlogCard