import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const PageNotFound = () => {
    return (
        <div>
            <Container maxWidth="sm">
                <Typography gutterBottom>
                    <img
                        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                        alt="not-found"
                    />
                </Typography>
                <Typography gutterBottom>
                    <Link to="/" className="link-home">
                        Go Home
                    </Link>
                </Typography>
            </Container>
        </div>
    );
};

export default PageNotFound;
