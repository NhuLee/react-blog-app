import React from "react";
import { Typography, Avatar } from "@mui/material";
import { format } from "date-fns";

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
                    <p>
                        {format(Date.parse(singlePost?.date), "MMM do, yyyy")}
                    </p>
                </div>
            </div>
            <Typography mt={4} gutterBottom>
                <img
                    src={
                        singlePost?.thumbnail?.file
                            ? singlePost?.thumbnail?.file
                            : singlePost?.thumbnail?.url
                    }
                    alt={singlePost?.thumbnail?.title}
                    loading="lazy"
                />
            </Typography>
            <div className="blog-detail__content">{singlePost?.content}</div>
        </div>
    );
};

export default PostDetail;
