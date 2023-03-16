import React, { useState, useRef, useContext } from "react";
import Select from "react-select";
import {
    List,
    ListItem,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Button,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { PostsTheme } from "./../Themes/ThemesContext";

const Search = () => {
    const postsThemeContext = useContext(PostsTheme);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchDate, setSearchDate] = useState(null);
    const [searchAuthor, setSearchAuthor] = useState([]);
    const inputTitleRef = useRef(null);
    const inputAuthRef = useRef(null);

    const handleSearchTitle = () => {
        setSearchTitle(inputTitleRef.current.value);
    };

    const handleSearchDate = (date) => {
        setSearchDate(date);
    };

    const handleSelectAuth = (e) => {
        setSearchAuthor(e);
    };

    const renderOptionAuthors = () => {
        if (!postsThemeContext.filterPosts) return;
        let data = [...postsThemeContext.filterPosts].map((post) => ({
            value: post?.author?.name,
            label: post?.author?.name,
        }));
        return collectAuthors(data);
    };

    const collectAuthors = (arr) => {
        let authorArr = [];
        arr.forEach((item) => {
            if (
                !authorArr.length ||
                !authorArr.find(
                    (el) => el.value === item.value && el.label === item.label
                )
            )
                authorArr.push(item);
        });
        return authorArr;
    };

    const handleSearch = (e) => {
        if (!postsThemeContext.handleFilter) return;
        e.preventDefault();
        const auth = searchAuthor?.map((item) => item?.value);
        const date = searchDate
            ? format(Date.parse(searchDate), "MM/dd/yyyy")
            : "";
        const data = {
            searchTitle,
            searchDate: date,
            searchAuthor: auth,
        };
        postsThemeContext.handleFilter(data);
        if (!postsThemeContext.handleCheckOnFilter.length) return;
        postsThemeContext.handleCheckOnFilter("on filter");
    };

    const handleReset = (e) => {
        if (!postsThemeContext.handleFilter) return;
        e.preventDefault();
        inputTitleRef.current.value = "";
        inputAuthRef.current.value = null;
        setSearchTitle("");
        setSearchDate(null);
        setSearchAuthor(null);
        postsThemeContext.handleFilter("");
    };
    return (
        <>
            <List className="block-search">
                <ListItem>
                    <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Search by post title
                        </InputLabel>
                        <Input
                            inputRef={inputTitleRef}
                            id="search-title"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            onChange={handleSearchTitle}
                        />
                    </FormControl>
                </ListItem>
                <ListItem>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Search by date"
                            value={searchDate}
                            onChange={handleSearchDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </ListItem>
                <ListItem>
                    <Select
                        ref={inputAuthRef}
                        id="select-author"
                        name="select-author"
                        placeholder={"Author"}
                        value={searchAuthor}
                        closeMenuOnSelect={false}
                        isMulti
                        options={renderOptionAuthors()}
                        onChange={handleSelectAuth}
                    />
                </ListItem>
                <ListItem>
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button variant="contained" onClick={handleReset}>
                        Reset
                    </Button>
                </ListItem>
            </List>
        </>
    );
};

export default Search;
