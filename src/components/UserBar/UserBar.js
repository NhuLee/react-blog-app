import React, { useContext } from "react";
import LoginToBlog from "../LoginToBlog/LoginToBlog";
import { PostsTheme } from "./../Themes/ThemesContext";
import Container from "@mui/material/Container";

const UserBar = () => {
    const postsThemeContext = useContext(PostsTheme);
    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "flex-end",
            }}
        >
            <LoginToBlog checkLogin={postsThemeContext.handleLogin} />
        </Container>
    );
};

export default UserBar;
