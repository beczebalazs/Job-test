import { ChangeEvent, FC } from "react";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder: string;
}

export const PropertySearchbar: FC<Props> = (props) => {
    const { placeholder, onChange, value } = props;
    return (
        <Paper
            component="form"
            sx={{ width: 350, display: "flex", color: "grey" }}
            elevation={5}
        >
            <InputBase
                sx={{ flex: 1, ml: 2 }}
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
