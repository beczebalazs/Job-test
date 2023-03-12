import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import BasicInput from "../inputField/basicInput/BasicInput";
import Button from "@mui/material/Button";
import React, { ChangeEvent, useState } from "react";
import constants from "../../constants/constants";
import { userLogin } from "../../features/auth/authSlice";
import { LoginRequestType } from "../../types/login/LoginRequestType";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { RootState } from "../../store";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { InputStatesEnum } from "../../enums/InputStatesEnum";

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state: RootState) => state.auth.loading);
    const errorMessage = useAppSelector((state: RootState) => state.auth.error);
    const userToken = useAppSelector(
        (state: RootState) => state.auth.userToken
    );

    const [usernameError, setUsernameError] = useState<InputStatesEnum>(
        InputStatesEnum.Initial
    );
    const [passwordError, setPasswordError] = useState<InputStatesEnum>(
        InputStatesEnum.Initial
    );

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let credentials: LoginRequestType = {
        username: "",
        password: "",
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        username === ""
            ? setUsernameError(InputStatesEnum.Invalid)
            : setUsernameError(InputStatesEnum.Valid);
        password === ""
            ? setPasswordError(InputStatesEnum.Invalid)
            : setPasswordError(InputStatesEnum.Valid);

        if (
            usernameError === InputStatesEnum.Valid &&
            passwordError === InputStatesEnum.Valid
        ) {
            credentials.username = username;
            credentials.password = password;
            dispatch(userLogin(credentials));
        }
    };

    let errorAlert;

    if (errorMessage === "Request failed with status code 401") {
        errorAlert = (
            <Alert severity="error" sx={{ mb: 2 }}>
                Username or password is incorrect
            </Alert>
        );
    } else if (
        errorMessage !== null &&
        errorMessage !== "Request failed with status code 401"
    ) {
        errorAlert = (
            <Alert severity="error" sx={{ mb: 2 }}>
                An unknown error occured
            </Alert>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Paper
                elevation={8}
                sx={{
                    width: "fit-content",
                    py: 3,
                    px: 5,
                    borderRadius: 2,
                    marginBottom: "150px",
                    minWidth: "20%",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: "xx-large",
                        display: "flex",
                        justifyContent: "center",
                        pb: 2,
                    }}
                >
                    Login
                </Typography>
                {userToken !== null && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Login successful
                    </Alert>
                )}
                {errorAlert}
                <div className="pb-5">
                    <BasicInput
                        type="username"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        error={usernameError}
                        helperText="Username is required"
                    />
                </div>
                <div className="pb-8">
                    <BasicInput
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText="Password is required"
                    />
                </div>
                <div className="flex justify-center">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: constants.MAIN_COLOR }}
                        onClick={handleSubmit}
                        // when pressing enter prevent default and handle submit needs to be implemented
                    >
                        {!isLoading ? "Login" : <CircularProgress />}
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default LoginForm;
