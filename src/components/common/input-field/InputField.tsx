import React, { useEffect, useState } from "react";

import { Paper, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";

import { InputStatesEnum } from "../../../constants/InputStatesEnum";

export interface InputFieldProps {
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

const InputField = (props: InputFieldProps) => {
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
                    sx={{ ml: 2, flex: 1 }}
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </Paper>
            <Typography sx={{ color: "red", fontSize: "0.8rem", pt: "5px" }}>
                {error === InputStatesEnum.Invalid && helperText}
            </Typography>
        </>
    );
};

export default InputField;
