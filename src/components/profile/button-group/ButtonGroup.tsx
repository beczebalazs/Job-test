import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MAIN_COLOR } from "@constants/index";
import { useAppDispatch } from "@hooks/useTypedSelector";
import { Button, Grid } from "@mui/material";
import { updateCurrentUser } from "@service/currentUser.service";
import { logout } from "@store/auth/auth.slice";
import { currentUser } from "@store/current-user/currentUser.selector";
import { isEmail } from "@utils/commonFunctions";

interface Props {
    isEditable: boolean;
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
    setReadOnly: React.Dispatch<React.SetStateAction<boolean>>;
    setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
    setFields: () => void;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

const ButtonGroup: FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUserState = useSelector(currentUser);

    const handleEditClick = () => {
        props.setIsEditable(true);
        props.setReadOnly(false);
    };

    const handleDiscardClick = () => {
        props.setIsEditable(false);
        props.setReadOnly(true);
        props.setEmailError(false);
        props.setFields();
    };

    const handleSaveClick = () => {
        if (isEmail(props.email) === null) {
            props.setEmailError(true);
        } else {
            props.setEmailError(false);
            props.setIsEditable(false);
            props.setReadOnly(true);
            dispatch(
                updateCurrentUser({
                    email: props.email,
                    username: props.username,
                    firstName: props.firstName,
                    lastName: props.lastName,
                    gender: currentUserState?.gender,
                    age: currentUserState?.age,
                    role: currentUserState?.role,
                })
            );
        }
    };

    const handleLogoutClick = () => {
        dispatch(logout());
        navigate("/rent");
    };

    return (
        <>
            <Grid
                container
                sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    pt: 5,
                }}
            >
                {!props.isEditable ? (
                    <Button
                        variant="contained"
                        sx={{ bgcolor: MAIN_COLOR }}
                        onClick={handleEditClick}
                    >
                        EDIT
                    </Button>
                ) : (
                    <Grid container sx={{ justifyContent: "space-between" }}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ width: "40%" }}
                            onClick={handleSaveClick}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ bgcolor: "red", width: "40%" }}
                            onClick={handleDiscardClick}
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
        </>
    );
};

export default ButtonGroup;
