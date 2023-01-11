import React from "react";
import { Typography, Avatar } from "@mui/material";
import BackToList from "../BackToList/BackToList";
const PostDetail = ({ singlePost }) => {
    return (
        <div className="blog-detail">
            <Typography variant="h1" gutterBottom>
                {singlePost?.title}
            </Typography>
            <div className="blog-detail__author">
                <Avatar
                    alt={singlePost?.author?.name}
                    src={singlePost?.author?.image}
                />
                <div className="info">
                    <p>{singlePost?.author?.name}</p>
                    <p>{singlePost?.date}</p>
                </div>
            </div>
            <Typography mt={4} gutterBottom>
                <img
                    src={singlePost?.thumbnail?.url}
                    alt={singlePost?.thumbnail?.alt}
                    loading="lazy"
                />
            </Typography>
            <div className="blog-detail__content">{singlePost?.content}</div>
            <BackToList />
        </div>
    );
};

export default PostDetail;
