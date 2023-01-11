import React from "react";
import Pagination from "@mui/material/Pagination";

const Paginations = ({ numberOfPage, currentPage, paginate }) => {
    const handleChange = (event, value) => {
        if (!paginate) return;
        paginate(value);
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
