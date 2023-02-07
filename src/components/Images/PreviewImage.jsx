import React, { useState } from "react";
import Loading from "../Loading/Loading";

const PreviewImage = ({ file }) => {
    const [previewImg, setPreviewImg] = useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreviewImg(reader.result);
    };

    return (
        <div className="preview-image">
            {previewImg ? (
                <img src={previewImg} alt={file.name} />
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default PreviewImage;
