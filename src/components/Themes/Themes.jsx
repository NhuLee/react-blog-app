import React, { useState, useEffect, useMemo } from "react";
import callApi from "../../utilities/CallApi";
import { HeadTitleTable } from "../../utilities/Constants";
import Button from "@mui/material/Button";
import PostList from "../Post/List";
import Search from "../Search/Search";
import ListTable from "../Post/ListTable";
import LoginToBlog from "../LoginToBlog/LoginToBlog";
import { format } from "date-fns";
import Loading from "../Loading/Loading";
import BackToList from "../BackToList/BackToList";

const Themes = () => {
    const [isBlogList, setIsBlogList] = useState(true);
    const [textOfTheme, setTextOfThemes] = useState("Go to blog list");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [hasOnFilter, setHasOnFilter] = useState("");

    const headTitle = useMemo(() => HeadTitleTable, []);

    const handleSelectTheme = (e) => {
        e.preventDefault();
        setIsBlogList(!isBlogList);
    };

    const handleChangeText = () => {
        isBlogList
            ? setTextOfThemes("Go to blog table")
            : setTextOfThemes("Go to blog list");
    };

    const handleLogin = (login) => {
        setIsLogin(login);
    };

    const handleFetchPost = () => {
        setLoading(true);
        callApi()
            .then((res) => {
                setPosts(res.data);
                setFilterPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleFilter = (dataFilter) => {
        let data = [...filterPosts];
        const { searchTitle, searchDate, searchAuthor } = dataFilter;

        if (searchTitle && searchTitle !== null) {
            data = data.filter((post) =>
                post?.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }
        if (searchDate && searchDate !== null) {
            data = data.filter((post) => post?.date.includes(searchDate));
        }
        if (searchAuthor && searchAuthor.length) {
            data = data.filter((post) =>
                searchAuthor.includes(post?.author?.name)
            );
        }
        setPosts(data);
    };

    const handleDelete = (dataDelete) => {
        const data = [...posts].filter((item) => item.id !== dataDelete.id);
        setPosts(data);
    };
    const handleUpdate = (dataUpdate) => {
        const data = [...posts].map((post) => {
            if (post.id === dataUpdate.id) {
                post = dataUpdate;
            }
            return post;
        });
        setFilterPosts(data);
        setPosts(data);
    };

    const renderBlogList = () => (
        <div className="blog-list-wrapper">
            <PostList
                posts={posts}
                login={isLogin}
                onDeleted={handleDelete}
                onUpdated={handleUpdate}
            />
        </div>
    );

    const handleCheckOnFilter = (val) => {
        setHasOnFilter(val);
    };

    const renderSearchForm = () => (
        <Search
            onFilter={handleFilter}
            filterPosts={filterPosts}
            checkOnFilter={handleCheckOnFilter}
        />
    );

    const renderBlogTable = () => (
        <ListTable posts={posts} columns={headTitle} />
    );

    const renderNoResult = () => (
        <div style={{ textAlign: "center" }}>
            <h2>No Result...</h2>
            <BackToList />
        </div>
    );

    useEffect(() => {
        handleChangeText();
    });

    useEffect(() => {
        handleFetchPost();
    }, []);
    return (
        <>
            <div className="userbar">
                <div>
                    <Button onClick={handleSelectTheme} variant="contained">
                        {textOfTheme}
                    </Button>
                </div>
                <div>
                    <LoginToBlog checkLogin={handleLogin} />
                </div>
            </div>
            {isBlogList ? renderSearchForm() : ""}
            {loading ? (
                <Loading />
            ) : isBlogList ? (
                !posts.length && hasOnFilter.length ? (
                    renderNoResult()
                ) : (
                    renderBlogList()
                )
            ) : (
                renderBlogTable()
            )}
        </>
    );
};

export default Themes;
