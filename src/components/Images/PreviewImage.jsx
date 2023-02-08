import React from "react";

const PreviewImage = (props) => {
    const { urlImage, currentImg } = { ...props };
    return (
        <div className="preview-image">
            {urlImage && urlImage.length ? (
                <img src={urlImage} alt="Preview image" />
            ) : (
                <img src={currentImg} alt="Preview image" />
            )}
        </div>
    );
};

export default PreviewImage;
