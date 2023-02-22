import { Container, createTheme, ThemeProvider } from "@mui/system";

const LoginForm = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                
            </Container>
        </ThemeProvider>            
    );
};

export default LoginForm;
