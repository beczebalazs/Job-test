import { grey } from "@mui/material/colors";

export const isEmail = (email: string): RegExpMatchArray | null => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const checkboxStyle = {
    "&.Mui-checked": {
        color: grey[600],
    },
    my: -1,
};
