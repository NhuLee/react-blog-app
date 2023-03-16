import React, { useState } from "react";
import { Button } from "@mui/material";

const LoginToBlog = ({ checkLogin }) => {
    const [isLogin, setIsLogin] = useState(false);
    const handleLogin = (e) => {
        if (!checkLogin) return;
        e.preventDefault();
        setIsLogin(!isLogin);
        checkLogin(!isLogin);
    };
    return (
        <Button variant="contained" onClick={handleLogin}>
            {isLogin ? "Logout" : "Login"}
        </Button>
    );
};

export default LoginToBlog;
