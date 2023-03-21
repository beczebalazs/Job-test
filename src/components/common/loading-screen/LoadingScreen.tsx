import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

export const LoadingScreen = () => {
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
