import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

import InputField from "../../components/common/input-field/InputField";
import Navbar from "../../components/common/navbar";
import { MAIN_COLOR } from "../../constants";
import { InputStatesEnum } from "../../constants/InputStatesEnum";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { userLogin } from "../../service/auth.service";
import {
    authErrorMessage,
    authLoading,
    authTokenSelect,
} from "../../store/auth/auth.selector";
import { ILoginRequest } from "../../types/login.types";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(authLoading);
    const errorMessage = useSelector(authErrorMessage);
    const userToken = useSelector(authTokenSelect);

    useEffect(() => {
        if (userToken !== null) {
            navigate("/rent");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [usernameError, setUsernameError] = useState<InputStatesEnum>(
        InputStatesEnum.Initial
    );
    const [passwordError, setPasswordError] = useState<InputStatesEnum>(
        InputStatesEnum.Initial
    );

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let credentials: ILoginRequest = {
        username: "",
        password: "",
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

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
            dispatch(userLogin(credentials))
                .unwrap()
                .then(() => {
                    setTimeout(() => {
                        navigate("/rent");
                    }, 1500);
                });
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
            <Navbar />
            {/* TODO: When user is logged in and tries to reach this page redirect to /rent */}
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
                                <InputField
                                    type="email"
                                    placeholder="Username"
                                    onChange={handleUsernameChange}
                                    error={usernameError}
                                    helperText="This field is required!"
                                    onKeyDown={(e: any) =>
                                        e.key === "Enter" && handleSubmit(e)
                                    }
                                />
                            </div>
                            <div>
                                <InputField
                                    type="password"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                    error={passwordError}
                                    helperText="Password is required"
                                    onKeyDown={(e: any) =>
                                        e.key === "Enter" && handleSubmit(e)
                                    }
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: MAIN_COLOR,
                                mt: 3,
                                mb: 2,
                            }}
                            fullWidth
                        >
                            {!isLoading ? "Login" : <CircularProgress />}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
