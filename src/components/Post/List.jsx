import React, { useState } from "react";
import { List, ListItem } from "@mui/material";
import PostItem from "./Item";
import Paginations from "../Paginations/Paginations";

const PostList = ({ posts, login, onDeleted, onUpdated }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = [...posts].slice(indexFirstPost, indexOfLastPost);
    const numberOfPage = Math.ceil(posts.length / postsPerPage);
    const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPagination = () => (
        <div className="block-pagination">
            <Paginations
                numberOfPage={numberOfPage}
                currentPage={currentPage}
                onPaginate={handlePaginate}
            />
        </div>
    );

    return (
        <>
            <List>
                {currentPosts.map((post, index) => (
                    <ListItem key={index} disablePadding={true} gutters={4}>
                        <PostItem
                            post={post}
                            checkLogin={login}
                            checkDelete={onDeleted}
                            checkUpdate={onUpdated}
                        />
                    </ListItem>
                ))}
            </List>
            {currentPosts.length ? renderPagination() : ""}
        </>
    );
};

export default PostList;
