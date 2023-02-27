import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface PropertySearchbarProps {
    placeholder: string;
    onChange?: any;
    value?: string;
}

const PropertySearchbar = (props: PropertySearchbarProps) => {
    const { placeholder, onChange, value } = props;
    return (
        <Paper
            component="form"
            sx={{ display: "flex", width: 350, color: "grey" }}
            elevation={5}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default PropertySearchbar;
