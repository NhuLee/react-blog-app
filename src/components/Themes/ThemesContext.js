import { useState, createContext } from "react";
import callApi from "../../utilities/CallApi";

const PostsTheme = createContext();

function PostsThemeProvider({ children }) {
    const [isBlogList, setIsBlogList] = useState(true);
    const [textOfTheme, setTextOfThemes] = useState("Go to blog list");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [hasOnFilter, setHasOnFilter] = useState("");

    const handleSelectTheme = (e) => {
        e.preventDefault();
        setIsBlogList(!isBlogList);
    };

    const handleChangeText = () => {
        isBlogList
            ? setTextOfThemes("Go to blog table")
            : setTextOfThemes("Go to blog list");
    };

    const handleLogin = (login) => {
        setIsLogin(login);
    };

    const handleFetchPost = () => {
        setLoading(true);
        callApi()
            .then((res) => {
                setPosts(res.data);
                setFilterPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleFilter = (dataFilter) => {
        let data = [...filterPosts];
        const { searchTitle, searchDate, searchAuthor } = dataFilter;

        if (searchTitle && searchTitle !== null) {
            data = data.filter((post) =>
                post?.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }
        if (searchDate && searchDate !== null) {
            data = data.filter((post) => post?.date.includes(searchDate));
        }
        if (searchAuthor && searchAuthor.length) {
            data = data.filter((post) =>
                searchAuthor.includes(post?.author?.name)
            );
        }
        setPosts(data);
    };

    const handleDelete = (dataDelete) => {
        const data = [...posts].filter((item) => item.id !== dataDelete.id);
        setPosts(data);
    };
    const handleUpdate = (dataUpdate) => {
        const data = [...posts].map((post) => {
            if (post.id === dataUpdate.id) {
                post = dataUpdate;
            }
            return post;
        });
        setFilterPosts(data);
        setPosts(data);
    };

    const handleCheckOnFilter = (val) => {
        setHasOnFilter(val);
    };

    const postsVal = {
        isBlogList,
        textOfTheme,
        loading,
        posts,
        filterPosts,
        isLogin,
        hasOnFilter,
        handleSelectTheme,
        handleChangeText,
        handleLogin,
        handleFetchPost,
        handleFilter,
        handleDelete,
        handleUpdate,
        handleCheckOnFilter,
    };

    return (
        <PostsTheme.Provider value={postsVal}>{children}</PostsTheme.Provider>
    );
}

export { PostsTheme, PostsThemeProvider };
