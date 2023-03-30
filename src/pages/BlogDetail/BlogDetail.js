import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../utilities/CallApi";
import Container from "@mui/material/Container";
import PostDetail from "./../../components/Post/Detail";
import RelatedList from "./../../components/Post/RelatedList";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useSlidesResponsive } from "../../hooks";

const BlogDetail = () => {
    const [singlePost, setSinglePost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const handleFetchPostDetail = (postID) => {
        setIsLoading(true);
        callApi(`${postID}`, "GET", null, null)
            .then((res) => {
                setSinglePost(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const handleFetchPosts = () => {
        setIsLoading(true);
        callApi()
            .then((res) => {
                setPosts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const relatedPosts = [...posts].filter(
        (post) =>
            post?.id !== singlePost?.id &&
            post?.author?.name.toLowerCase() ===
                singlePost?.author?.name.toLowerCase()
    );

    const numberSlides = useSlidesResponsive(4);

    const handleSelectRelated = (val) => {
        // setSinglePost(val);
        handleFetchPostDetail(val?.id);
    };

    useEffect(() => {
        handleFetchPostDetail(id);
    }, [id]);

    useEffect(() => {
        handleFetchPosts();
    }, []);

    return (
        <Container maxWidth="lg">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="blog-detail">
                    <PostDetail singlePost={singlePost} />
                    <RelatedList
                        relatedPosts={relatedPosts}
                        numberSlides={numberSlides}
                        onSelectPostRelated={handleSelectRelated}
                    />
                    <Link
                        to="/"
                        style={{
                            background: "#1976d2",
                            minWidth: "64px",
                            padding: "6px 16px",
                            borderRadius: "4px",
                            color: "#fff",
                            margin: "80px 0",
                            display: "inline-block",
                            textTransform: "uppercase",
                        }}
                    >
                        Back to posts list
                    </Link>
                </div>
            )}
        </Container>
    );
};

export default BlogDetail;
