import React, { useEffect, useContext } from "react";
import { PostsTheme } from "./ThemesContext";
import Button from "@mui/material/Button";
import PostList from "../Post/List";
import Search from "../Search/Search";
import ListTable from "../Post/ListTable";
import Loading from "../Loading/Loading";

const Themes = () => {
    const postsThemeContext = useContext(PostsTheme);

    const renderBlogList = () => (
        <div className="blog-list-wrapper">
            <PostList />
        </div>
    );

    const renderNoResult = () => (
        <div style={{ textAlign: "center" }}>
            <h2>No Result...</h2>
        </div>
    );

    useEffect(() => {
        postsThemeContext.handleChangeText();
    });

    useEffect(() => {
        postsThemeContext.handleFetchPost();
    }, []);
    return (
        <>
            <div className="select-theme">
                <Button
                    onClick={postsThemeContext.handleSelectTheme}
                    variant="contained"
                >
                    {postsThemeContext.textOfTheme}
                </Button>
            </div>
            {postsThemeContext.isBlogList && <Search />}
            {postsThemeContext.loading ? (
                <Loading />
            ) : postsThemeContext.isBlogList ? (
                !postsThemeContext.posts.length &&
                postsThemeContext.hasOnFilter.length ? (
                    renderNoResult()
                ) : (
                    renderBlogList()
                )
            ) : (
                <ListTable />
            )}
        </>
    );
};

export default Themes;
