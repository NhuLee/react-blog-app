import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../utilities/CallApi";
import Container from "@mui/material/Container";
import PostDetail from "./../../components/Post/Detail";
import RelatedList from "./../../components/Post/RelatedList";
import BackToList from "./../../components/BackToList/BackToList";
import Loading from "../../components/Loading/Loading";

const BlogDetail = () => {
    const [singlePost, setSinglePost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const [windowWidth, setWindowWidth] = useState(null);
    const [numberSlides, setNumberSlides] = useState(4);

    const handleFetchPostDetail = () => {
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

    useEffect(() => {
        handleFetchPostDetail();
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
                        posts={posts}
                        singlePost={singlePost}
                        numberSlides={numberSlides}
                    />
                    <BackToList />
                </div>
            )}
        </Container>
    );
};

export default BlogDetail;
