import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
    return (
        <div className="loading">
            <CircularProgress size={80} />
        </div>
    );
};

export default Loading;
