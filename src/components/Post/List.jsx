import React, { useState } from "react";
import { List, ListItem } from "@mui/material";
import PostItem from "./Item";
import Paginations from "../Paginations/Paginations";
import BackToList from "../BackToList/BackToList";
const PostList = ({ posts, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = [...posts].slice(indexFirstPost, indexOfLastPost);
    const numberOfPage = Math.ceil(posts.length / postsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading.length) return loading;

    if (!currentPosts || !currentPosts.length) {
        return (
            <div style={{ textAlign: "center" }}>
                <h2>No Result...</h2>
                <BackToList />
            </div>
        );
    }
    return (
        <>
            <List>
                {currentPosts.map((post, index) => (
                    <ListItem key={index} disablePadding={true} gutters={4}>
                        <PostItem post={post} />
                    </ListItem>
                ))}
            </List>
            <div className="block-pagination">
                <Paginations
                    numberOfPage={numberOfPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

export default PostList;
