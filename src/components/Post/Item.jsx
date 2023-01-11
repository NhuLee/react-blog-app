import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
} from "@mui/material";

const PostItem = ({ post }) => {
    return (
        <Card>
            <Link to={`/blog/${post?.id}`}>
                <CardMedia
                    component="img"
                    image={post?.thumbnail?.url}
                    alt={post?.title}
                ></CardMedia>
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    <Link to={`/blog/${post?.id}`}>
                        <h3>{post?.title}</h3>
                    </Link>
                </Typography>
                <div className="card-bottom">
                    <div className="card-bottom__avatar avatar">
                        <Avatar
                            alt={post?.author?.name}
                            src={post?.author?.image}
                        />
                        <div className="avatar__name">{post?.author?.name}</div>
                    </div>
                    <div className="card-bottom__date">{post?.date}</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PostItem;
