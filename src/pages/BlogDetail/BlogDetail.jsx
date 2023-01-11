import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import PostDetail from "./../../components/Post/Detail";

const BlogDetail = () => {
    const [singlePost, setSinglePost] = useState([]);
    const [isLoading, setIsLoading] = useState("Loading...");
    const { id } = useParams();

    const fetchPostDetail = async () => {
        setIsLoading("Loading data...");
        await axios
            .get(
                `https://600e3bc23bb1d100179deb6c.mockapi.io/api/blog/news/${id}`
            )
            .then((res) => {
                setSinglePost(res.data);
                setIsLoading("");
            })
            .catch((err) => {
                setIsLoading("");
            });
    };

    useEffect(() => {
        fetchPostDetail();
    }, []);

    return (
        <Container maxWidth="lg">
            {isLoading.length ? (
                isLoading
            ) : (
                <PostDetail singlePost={singlePost} />
            )}
        </Container>
    );
};

export default BlogDetail;
