import { FC } from "react";

import CircularProgress from "@mui/material/CircularProgress";

export const LoadingScreen: FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <CircularProgress
                sx={{
                    color: "gray",
                }}
            ></CircularProgress>
        </div>
    );
};
