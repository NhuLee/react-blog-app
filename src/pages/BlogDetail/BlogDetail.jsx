import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../utilities/CallApi";
import Container from "@mui/material/Container";
import PostDetail from "./../../components/Post/Detail";
import Loading from "../../components/Loading/Loading";

const BlogDetail = () => {
    const [singlePost, setSinglePost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const fetchPostDetail = async () => {
        setIsLoading(true);
        callApi(`${id}`, "GET", null, null)
            .then((res) => {
                setSinglePost(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchPostDetail();
    }, []);

    return (
        <Container maxWidth="lg">
            {isLoading ? <Loading /> : <PostDetail singlePost={singlePost} />}
        </Container>
    );
};

export default BlogDetail;
