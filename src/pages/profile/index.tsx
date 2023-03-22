import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

import Navbar from "../../components/common/navbar";
import { MAIN_COLOR } from "../../constants";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import {
    getCurrentUser,
    updateCurrentUser,
} from "../../service/currentUser.service";
import { logout } from "../../store/auth/auth.slice";
import { currentUser } from "../../store/current-user/currentUser.selector";
import { ICurrentUserResponse } from "../../types/currentUser.types";
import { isEmail } from "../../utils/commonFunctions";

export const generalStyle = {
    width: "100%",
    pt: 3,
};

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUserState = useSelector(currentUser);

    const [isEditable, setIsEditable] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailError, setEmailError] = useState(false);

    let currentData: ICurrentUserResponse = {
        _id: "",
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        gender: "",
        age: 0,
        role: "",
    };

    if (currentUserState !== null) {
        currentData = currentUserState;
    } else {
        // TODO: Error handling -- Scheresh
        console.log("Error occured");
    }

    const setFields = () => {
        setEmail(currentData.email);
        setUsername(currentData.username);
        setFirstName(currentData.firstName);
        setLastName(currentData.lastName);
    };

    useEffect(() => {
        dispatch(getCurrentUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserState]);

    const genderEval = () => {
        if (currentData.gender === "MAN") {
            return (
                <MaleIcon sx={{ fontSize: "xxx-large", color: "#0089fb" }} />
            );
        } else if (currentData.gender === "WOMAN") {
            return (
                <FemaleIcon sx={{ fontSize: "xxx-large", color: "#ff0090" }} />
            );
        }
    };

    const handleButtonClick = (type: string) => {
        switch (type) {
            case "edit":
                setIsEditable(true);
                setReadOnly(false);
                break;
            case "discard":
                setIsEditable(false);
                setReadOnly(true);
                setEmailError(false);
                setFields();
                break;
            case "save":
                if (isEmail(email) === null) {
                    setEmailError(true);
                } else {
                    setEmailError(false);
                    setIsEditable(false);
                    setReadOnly(true);
                    dispatch(
                        updateCurrentUser({
                            email: email,
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            gender: currentUserState?.gender,
                            age: currentUserState?.age,
                            role: currentUserState?.role,
                        })
                    );
                }

                break;
            default:
                break;
        }
    };

    const handleLogoutClick = () => {
        dispatch(logout());
        navigate("/rent");
    };

    return (
        // TODO: Set textfield to disabled when not in edit mode
        <div className="flex items-center justify-center h-screen max-sm:mt-40">
            <Navbar />
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
                <Grid
                    container
                    sx={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                    direction="column"
                >
                    <Grid item>
                        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                            {currentData.firstName} {currentData.lastName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
                            age {currentData.age}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
                            Role: {currentData.role}
                        </Typography>
                    </Grid>
                    <Grid item>{genderEval()}</Grid>
                </Grid>
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
                            value={email}
                            error={emailError}
                            helperText={
                                emailError ? "Invalid email format" : ""
                            }
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={generalStyle}>
                        <TextField
                            id="username"
                            label="Username"
                            value={username}
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            fullWidth
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={generalStyle}>
                        <TextField
                            id="firstName"
                            label="First name"
                            value={firstName}
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            fullWidth
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={generalStyle}>
                        <TextField
                            id="lastName"
                            label="Last name"
                            value={lastName}
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        pt: 5,
                    }}
                >
                    {!isEditable ? (
                        <Button
                            variant="contained"
                            sx={{ bgcolor: MAIN_COLOR }}
                            onClick={() => handleButtonClick("edit")}
                        >
                            EDIT
                        </Button>
                    ) : (
                        <Grid
                            container
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ width: "40%" }}
                                onClick={() => handleButtonClick("save")}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ bgcolor: "red", width: "40%" }}
                                onClick={() => handleButtonClick("discard")}
                            >
                                Discard
                            </Button>
                        </Grid>
                    )}
                </Grid>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        pt: 2,
                    }}
                >
                    <Button variant="contained" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </Grid>
            </Paper>
        </div>
    );
};

export default ProfilePage;
