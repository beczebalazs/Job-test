import React from "react";

import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

interface FilterSearchbarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterSearchbar = (props: FilterSearchbarProps) => {
    const { value, onChange } = props;
    return (
        <Paper
            component="form"
            sx={{ display: "flex", color: "grey" }}
            elevation={5}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
        </Paper>
    );
};

export default FilterSearchbar;
