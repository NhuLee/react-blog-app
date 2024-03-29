import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
    Button,
} from "@mui/material";
import FormUpdatePostItem from "../Form/UpdatePostItem";
import FormDeletePostItem from "../Form/DeletePostItem";
import { format } from "date-fns";
import { PostsTheme } from "../Themes/ThemesContext";

const PostItem = ({ post, selectRelated }) => {
    const postsThemeContext = useContext(PostsTheme);

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

    const handleSelectItem = () => {
        if (!selectRelated) return;
        selectRelated(post);
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
                    onClick={handleSelectItem}
                ></CardMedia>
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    <Link to={`/blog/${post?.id}`}>
                        <h3 onClick={handleSelectItem}>{post?.title}</h3>
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
                {postsThemeContext.isLogin && renderButtonEdit()}
                <FormUpdatePostItem
                    post={post}
                    open={openEdit}
                    onClose={handleCloseFormEdit}
                />
                <FormDeletePostItem
                    post={post}
                    open={openDel}
                    onClose={handleCloseFormDel}
                />
            </CardContent>
        </Card>
    );
};

export default PostItem;
