import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
    Button,
} from "@mui/material";
import FormUpdatePostItem from "../Form/FormUpdatePostItem";
import FormDeletePostItem from "../Form/FormDeletePostItem";
import { format } from "date-fns";

const PostItem = ({ post, checkLogin, checkDelete, checkUpdate }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    const handleOpenFormEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseFormEdit = () => {
        setOpenEdit(false);
    };

    const handleOpenFormDel = () => {
        setOpenDel(true);
    };

    const handleCloseFormDel = () => {
        setOpenDel(false);
    };

    const renderButtonEdit = () => (
        <div className="block-updated">
            <div>
                <Button variant="outlined" onClick={handleOpenFormEdit}>
                    Edit
                </Button>
            </div>
            <div>
                <Button
                    variant="outlined"
                    onClick={handleOpenFormDel}
                    style={{ borderColor: "#d3232f", color: "#d3232f" }}
                >
                    Delete
                </Button>
            </div>
        </div>
    );

    return (
        <Card>
            <Link to={`/blog/${post?.id}`}>
                <CardMedia
                    component="img"
                    image={
                        post?.thumbnail?.file
                            ? post?.thumbnail?.file
                            : post?.thumbnail?.url
                    }
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
                    <div className="card-bottom__date">
                        {format(Date.parse(post?.date), "MMM do, yyyy")}
                    </div>
                </div>
                {checkLogin ? renderButtonEdit() : ""}
                <FormUpdatePostItem
                    post={post}
                    open={openEdit}
                    onClose={handleCloseFormEdit}
                    onUpdate={checkUpdate}
                />
                <FormDeletePostItem
                    post={post}
                    open={openDel}
                    onClose={handleCloseFormDel}
                    onDelete={checkDelete}
                />
            </CardContent>
        </Card>
    );
};

export default PostItem;
