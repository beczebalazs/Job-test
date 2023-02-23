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

const LoginForm = () => {
    return (
        <>
            <Grid container sx={{ height: "100vh" }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                >
                    <ImageScroller/>
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
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: "50%" }}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Grid container>
                                    <Grid item xs>
                                        <Link>Forgot password?</Link>
                                    </Grid>
                                    <Grid item>
                                        <Link>
                                            Don't have an account? Sign Up
                                        </Link>
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
