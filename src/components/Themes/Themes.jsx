import React, { useState, useEffect, useMemo } from "react";
import callApi from "../../utilities/CallApi";
import { HeadTitleTable } from "../../utilities/Constants";
import Button from "@mui/material/Button";
import PostList from "../Post/List";
import Search from "../Search/Search";
import ListTable from "../Post/ListTable";
import LoginToBlog from "../LoginToBlog/LoginToBlog";

const Themes = () => {
    const [isBlogList, setIsBlogList] = useState(true);
    const [textOfTheme, setTextOfThemes] = useState("Go to blog list");
    const [loading, setLoading] = useState("Loading...");
    const [posts, setPost] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const headTitle = useMemo(() => HeadTitleTable, []);

    const handleSelectTheme = (e) => {
        e.preventDefault();
        setIsBlogList(!isBlogList);
    };

    const handleChangeText = () => {
        if (isBlogList) setTextOfThemes("Go to blog table");
        else setTextOfThemes("Go to blog list");
    };

    const handleLogin = (login) => {
        setIsLogin(login);
    };

    const handleFetchPost = () => {
        setLoading("Please wait for a minutes...");
        callApi()
            .then((res) => {
                setPost(res.data);
                setFilterPosts(res.data);
                setLoading("");
            })
            .catch((err) => {
                setLoading("");
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
            data = data.filter((post) =>
                post?.date.toLowerCase().includes(searchDate.toLowerCase())
            );
        }
        if (searchAuthor && searchAuthor.length) {
            data = data.filter((post) =>
                searchAuthor.includes(post?.author?.name)
            );
        }
        setPost([...data]);
    };

    const handleDelete = (dataDelete) => {
        const data = [...posts].filter((item) => item.id !== dataDelete.id);
        setPost([...data]);
    };
    const handleUpdate = (dataUpdate) => {
        const data = [...posts].map((post) => {
            if (post.id === dataUpdate.id) {
                post = dataUpdate;
            }
            return post;
        });
        setPost([...data]);
    };

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
            {isBlogList ? (
                <>
                    <Search onFilter={handleFilter} filterPosts={filterPosts} />
                    <div className="blog-list-wrapper">
                        <PostList
                            posts={posts}
                            loading={loading}
                            login={isLogin}
                            onDeleted={handleDelete}
                            onUpdated={handleUpdate}
                        />
                    </div>
                </>
            ) : (
                <ListTable
                    posts={posts}
                    loading={loading}
                    columns={headTitle}
                />
            )}
        </>
    );
};

export default Themes;
