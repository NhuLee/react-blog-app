import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import PostList from "../Post/List";
import Search from "../Search/Search";

const Themes = () => {
    const [isBlogList, setIsBlogList] = useState(true);
    const [textOfTheme, setTextOfThemes] = useState("Go to blog list");
    const [loading, setLoading] = useState("Loading...");
    const [posts, setPost] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);

    const handleSelectTheme = (e) => {
        e.preventDefault();
        setIsBlogList(!isBlogList);
    };

    const handleChangeText = () => {
        if (isBlogList) setTextOfThemes("Go to blog table");
        else setTextOfThemes("Go to blog list");
    };

    const handleFetchPost = async () => {
        setLoading("Please wait for a minutes...");
        await axios
            .get("https://600e3bc23bb1d100179deb6c.mockapi.io/api/blog/news")
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

    useEffect(() => {
        handleChangeText();
    });

    useEffect(() => {
        handleFetchPost();
    }, []);
    return (
        <>
            <Button onClick={handleSelectTheme} variant="contained">
                {textOfTheme}
            </Button>
            <Search onFilter={handleFilter} filterPosts={filterPosts} />
            <div className="blog-list-wrapper">
                {isBlogList ? (
                    <PostList posts={posts} loading={loading} />
                ) : (
                    "Table"
                )}
            </div>
        </>
    );
};

export default Themes;
