import { FC, useEffect, useState } from "react";

import { Paper, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";

import { InputStatesEnum } from "../../../constants/InputStatesEnum";

export interface Props {
    type?: string;
    placeholder?: string;
    onChange?: any;
    onKeyDown?: any;
    error?: InputStatesEnum;
    helperText?: any;
}

export const errorStyle = {
    border: "1px solid red",
    display: "flex",
    color: "red",
};

export const noErrorStyle = {
    display: "flex",
    color: "gray",
};

const InputField: FC<Props> = (props) => {
    const { type, placeholder, onChange, error, helperText, onKeyDown } = props;

    const [formStyle, setFormStyle] = useState<Object>({});

    useEffect(() => {
        setFormStyle(noErrorStyle);
    }, []);

    useEffect(() => {
        if (error === InputStatesEnum.Invalid) {
            setFormStyle(errorStyle);
        } else {
            setFormStyle(noErrorStyle);
        }
    }, [error]);

    return (
        <>
            <Paper
                component="form"
                sx={{ ...formStyle, height: "3rem" }}
                elevation={3}
            >
                <InputBase
                    sx={{ flex: 1, ml: 2 }}
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </Paper>
            <Typography sx={{ pt: "5px", color: "red", fontSize: "0.8rem" }}>
                {error === InputStatesEnum.Invalid && helperText}
            </Typography>
        </>
    );
};

export default InputField;
