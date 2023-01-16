import React, { useState, useEffect, useMemo } from "react";
import callApi from "../../utilities/CallApi";
import { HeadTitleTable } from "../../utilities/Constants";
import Button from "@mui/material/Button";
import PostList from "../Post/List";
import Search from "../Search/Search";
import ListTable from "../Post/ListTable";

const Themes = () => {
    const [isBlogList, setIsBlogList] = useState(true);
    const [textOfTheme, setTextOfThemes] = useState("Go to blog list");
    const [loading, setLoading] = useState("Loading...");
    const [posts, setPost] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);

    const headTitle = useMemo(() => HeadTitleTable, []);

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

            {isBlogList ? (
                <>
                    <Search onFilter={handleFilter} filterPosts={filterPosts} />
                    <div className="blog-list-wrapper">
                        <PostList posts={posts} loading={loading} />
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
