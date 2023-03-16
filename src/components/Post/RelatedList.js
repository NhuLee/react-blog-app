import React from "react";
import { Navigation, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PostItem from "./Item";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const RelatedList = ({ relatedPosts, numberSlides, onSelectPostRelated }) => {
    if (!numberSlides && !onSelectPostRelated && !relatedPosts) return;
    const renderRecentPosts = () => (
        <div className="related-lists">
            <h3>Related Posts</h3>
            <Swiper
                modules={[Navigation, Scrollbar, Autoplay]}
                spaceBetween={10}
                slidesPerView={numberSlides}
                navigation
                autoplay
                loop={true}
                onSlideChange={(slide) => {
                    if (slide.width < 767) {
                    }
                }}
            >
                {[...relatedPosts].map((post) => (
                    <SwiperSlide key={post?.id}>
                        <PostItem
                            post={post}
                            selectRelated={onSelectPostRelated}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
    return <>{relatedPosts.length ? renderRecentPosts() : ""}</>;
};

export default RelatedList;
