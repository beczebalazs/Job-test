import Background from "@components/login/background";
import LoginForm from "@components/login/login-form";
import { Grid } from "@mui/material";

import Navbar from "../../components/common/navbar";

const LoginPage = () => {
    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <Navbar />
            <Background />
            <LoginForm />
        </Grid>
    );
};

export default LoginPage;
