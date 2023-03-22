import React, { FC } from "react";

import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const FilterSearchbar: FC<Props> = (props) => {
    const { onChange, value } = props;
    return (
        <Paper
            component="form"
            sx={{ display: "flex", color: "grey" }}
            elevation={5}
        >
            <InputBase
                sx={{ flex: 1, ml: 2 }}
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
        </Paper>
    );
};
