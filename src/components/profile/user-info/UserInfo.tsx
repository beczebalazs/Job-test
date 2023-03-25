import { FC } from "react";

import { ICurrentUserResponse } from "@customTypes/currentUser.types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Grid, Typography } from "@mui/material";

interface Props {
    currentData: ICurrentUserResponse;
}

const UserInfo: FC<Props> = (props) => {
    const genderEval = () => {
        if (props.currentData.gender === "MAN") {
            return (
                <MaleIcon sx={{ fontSize: "xxx-large", color: "#0089fb" }} />
            );
        } else if (props.currentData.gender === "WOMAN") {
            return (
                <FemaleIcon sx={{ fontSize: "xxx-large", color: "#ff0090" }} />
            );
        }
    };

    return (
        <>
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
                        {props.currentData.firstName}{" "}
                        {props.currentData.lastName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
                        age {props.currentData.age}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
                        Role: {props.currentData.role}
                    </Typography>
                </Grid>
                <Grid item>{genderEval()}</Grid>
            </Grid>
        </>
    );
};
export default UserInfo;
