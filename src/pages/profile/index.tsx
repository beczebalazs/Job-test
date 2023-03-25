import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "@components/common/navbar";
import ButtonGroup from "@components/profile/button-group";
import InputGroup from "@components/profile/input-group";
import UserInfo from "@components/profile/user-info";
import { ICurrentUserResponse } from "@customTypes/currentUser.types";
import { useAppDispatch } from "@hooks/useTypedSelector";
import { Paper } from "@mui/material";
import { getCurrentUser } from "@service/currentUser.service";
import { currentUser } from "@store/current-user/currentUser.selector";

const ProfilePage = () => {
    const dispatch = useAppDispatch();

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

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex items-center justify-center h-screen pt-28 max-sm:mt-40">
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
                    <UserInfo currentData={currentData} />
                    <InputGroup
                        email={email}
                        emailError={emailError}
                        readOnly={readOnly}
                        setEmail={setEmail}
                        username={username}
                        setUsername={setUsername}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                    />
                    <ButtonGroup
                        isEditable={isEditable}
                        setIsEditable={setIsEditable}
                        setReadOnly={setReadOnly}
                        setEmailError={setEmailError}
                        setFields={setFields}
                        email={email}
                        username={username}
                        firstName={firstName}
                        lastName={lastName}
                    />
                </Paper>
            </div>
        </>
    );
};

export default ProfilePage;
