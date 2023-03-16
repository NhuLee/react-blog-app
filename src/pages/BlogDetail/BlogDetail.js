import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../utilities/CallApi";
import Container from "@mui/material/Container";
import PostDetail from "./../../components/Post/Detail";
import RelatedList from "./../../components/Post/RelatedList";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const BlogDetail = () => {
    const [singlePost, setSinglePost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const [windowWidth, setWindowWidth] = useState(null);
    const [numberSlides, setNumberSlides] = useState(4);

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

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const getSlidesPerView = () => {
        switch (true) {
            case windowWidth > 1200:
                setNumberSlides(4);
                break;
            case windowWidth > 992:
                setNumberSlides(3);
                break;
            case windowWidth > 768:
                setNumberSlides(2);
                break;
            default:
                setNumberSlides(1);
                break;
        }
    };

    const relatedPosts = [...posts].filter(
        (post) =>
            post?.id !== singlePost?.id &&
            post?.author?.name.toLowerCase() ===
                singlePost?.author?.name.toLowerCase()
    );

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

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        getSlidesPerView();
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

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
                            margin: "0 0 80px",
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
