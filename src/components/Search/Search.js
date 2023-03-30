import React, { useState, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({});

    const postsThemeContext = useContext(PostsTheme);
    const { handleFilter, filterPosts, handleCheckOnFilter, ...args } =
        postsThemeContext;

    const [searchTitle, setSearchTitle] = useState(
        () => searchParams.get("title") || ""
    );
    const [searchDate, setSearchDate] = useState(
        () => null ?? searchParams.get("date")
    );
    const [searchAuthor, setSearchAuthor] = useState(() => {
        const authorList = searchParams.getAll("author") ?? [];
        const authorFilter =
            authorList &&
            authorList.map((author) => ({
                value: author,
                label: author,
            }));
        return authorFilter ?? [];
    });

    const inputTitleRef = useRef();

    const handleSetQuery = (val, key) => {
        const attributeObj = Object.assign({ ...query }, { [key]: val });
        cleanData(attributeObj);
        setQuery(attributeObj);
        setSearchParams(attributeObj);
    };

    const handleSearchTitle = (e) => {
        setSearchTitle(e.target.value);

        // Set title query param
        handleSetQuery(e.target.value, "title");
    };

    const handleSearchDate = (date) => {
        const dateFormatted = format(Date.parse(date), "MM/dd/yyyy");
        setSearchDate(dateFormatted);

        // Set date query param
        handleSetQuery(dateFormatted, "date");
    };

    const handleSelectAuth = (e) => {
        setSearchAuthor(e);

        // Set author query param
        if (!e.length) {
            for (var key in query) {
                if (key.startsWith("author")) {
                    delete query[key];
                    setSearchParams(query);
                }
            }
        }
        const authorFilter = [...e].reduce((accumulator, item) => {
            return accumulator.concat(item.value);
        }, []);
        handleSetQuery(authorFilter, "author");
    };

    const renderOptionAuthors = () => {
        if (!filterPosts) return;
        const data = [...filterPosts].map((post) => ({
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
        if (!handleFilter) return;
        e.preventDefault();
        const auth = searchAuthor?.map((item) => item?.value);
        const data = {
            searchTitle,
            searchDate,
            searchAuthor: auth,
        };
        cleanData(data);
        handleFilter(data);
        if (!handleCheckOnFilter.length) return;
        handleCheckOnFilter("on filter");
    };

    const handleReset = (e) => {
        if (!handleFilter) return;
        e.preventDefault();
        setSearchTitle("");
        setSearchDate(null);
        setSearchAuthor([]);
        handleFilter("");
        setQuery({});
        setSearchParams({});

        inputTitleRef.current.focus();
    };

    const cleanData = (obj) => {
        for (let propName in obj) {
            if (!obj[propName]) {
                delete obj[propName];
            }
        }
        return obj;
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
                            value={searchTitle}
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
