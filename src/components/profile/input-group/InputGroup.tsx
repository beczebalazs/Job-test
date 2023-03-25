import { Grid, TextField } from "@mui/material";
import { FC, useEffect } from "react";

interface Props {
    email: string;
    emailError: boolean;
    readOnly: boolean;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
}

export const generalStyle = {
    width: "100%",
    pt: 3,
};

const InputGroup: FC<Props> = (props) => {
    useEffect(() => {
        console.log("changed");
    }, [props.readOnly]);

    return (
        <>
            <Grid
                container
                direction="column"
                sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    pt: 5,
                }}
            >
                <Grid item sx={{ ...generalStyle, pt: 0 }}>
                    <TextField
                        id="email"
                        label="Email"
                        value={props.email}
                        error={props.emailError}
                        helperText={
                            props.emailError ? "Invalid email format" : ""
                        }
                        InputProps={{
                            readOnly: props.readOnly,
                        }}
                        fullWidth
                        onChange={(e) => props.setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item sx={generalStyle}>
                    <TextField
                        id="username"
                        label="Username"
                        value={props.username}
                        InputProps={{
                            readOnly: props.readOnly,
                        }}
                        fullWidth
                        onChange={(e) => props.setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item sx={generalStyle}>
                    <TextField
                        id="firstName"
                        label="First name"
                        value={props.firstName}
                        InputProps={{
                            readOnly: props.readOnly,
                        }}
                        fullWidth
                        onChange={(e) => props.setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item sx={generalStyle}>
                    <TextField
                        id="lastName"
                        label="Last name"
                        value={props.lastName}
                        InputProps={{
                            readOnly: props.readOnly,
                        }}
                        fullWidth
                        onChange={(e) => props.setLastName(e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default InputGroup;
