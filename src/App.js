import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import PageNotFound from "./pages/404/404";
import UserBar from "./components/UserBar/UserBar";
import "./App.css";

function App() {
    return (
        <>
            <UserBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
