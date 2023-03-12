import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const FilterSearchbar = () => {
    return (
        <Paper
            component="form"
            sx={{ display: "flex", color: "grey"}}
            elevation={5}
        >
            <InputBase sx={{ ml: 2  , flex: 1}} placeholder="Search..." />
        </Paper>
    );
};

export default FilterSearchbar;
