import React from "react";
import Pagination from "@mui/material/Pagination";

const Paginations = ({ numberOfPage, currentPage, onPaginate }) => {
    const handleChange = (event, value) => {
        if (!onPaginate) return;
        onPaginate(value);
    };
    return (
        <>
            <Pagination
                count={numberOfPage}
                page={currentPage}
                onChange={handleChange}
            />
        </>
    );
};

export default Paginations;
