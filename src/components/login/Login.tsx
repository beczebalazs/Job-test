import { Avatar, Box, Grid, Typography } from "@mui/material";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#014783" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1, width: "100%" }}
                    >
                        <div className="pt-5">
                            {errorAlert}
                            {userToken !== null && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    Login successful
                                </Alert>
                            )}
                            <div className="pb-3">
                                <BasicInput
                                    type="email"
                                    placeholder="Username"
                                    onChange={handleUsernameChange}
                                    error={usernameError}
                                    helperText="This field is required!"
                                />
                            </div>
                            <div>
                                <BasicInput
                                    type="password"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                    error={passwordError}
                                    helperText="Password is required"
                                />
                            </div>
                        </div>

                        <Button
                        variant="contained"
                        sx={{ backgroundColor: constants.MAIN_COLOR, mt: 3, mb: 2, }}
                        onClick={handleSubmit}
                        fullWidth
                        // when pressing enter prevent default and handle submit needs to be implemented
                    >
                        {!isLoading ? "Login" : <CircularProgress />}
                    </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginForm;