import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ImageScroller from "../utils/imageScroller/ImageScroller";
import { userLogin } from "../../features/auth/authSlice";
import { LoginRequestType } from "../../types/login/LoginRequestType";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import React, { useState } from "react";

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const credentials: LoginRequestType = {
        username: username,
        password: password,
    };

    const testApiCall = () => {
        dispatch(userLogin(credentials));
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.currentTarget.value);
    }

    return (
        <>
            <style>
                {`
            html, body {
                overflow: hidden;
            }
        `}
            </style>
            <Grid container sx={{ height: "100vh" }}>
                <Grid item xs={false} sm={4} md={7}>
                    <ImageScroller />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "#6290C8" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={() => console.log("sumbitted")}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleUsernameChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handlePasswordChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" />}
                                label="Remember me"
                            />
                            <Box
                                sx={{
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: "50%" }}
                                    onClick={testApiCall}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Grid container>
                                <Grid item xs>
                                    <Link>Forgot password?</Link>
                                </Grid>
                                <Grid item>
                                    <Link>Don't have an account? Sign Up</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginForm;
