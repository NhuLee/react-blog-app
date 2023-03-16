import React, { useState, useContext } from "react";
import { List, ListItem } from "@mui/material";
import PostItem from "./Item";
import Paginations from "../Paginations/Paginations";
import { PostsTheme } from "./../Themes/ThemesContext";

const PostList = () => {
    const postThemeContext = useContext(PostsTheme);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = [...postThemeContext.posts].slice(
        indexFirstPost,
        indexOfLastPost
    );
    const numberOfPage = Math.ceil(
        postThemeContext.posts.length / postsPerPage
    );
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
                        <PostItem post={post} />
                    </ListItem>
                ))}
            </List>
            {postThemeContext.posts.length > postsPerPage && renderPagination()}
        </>
    );
};

export default PostList;
