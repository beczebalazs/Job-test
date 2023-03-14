import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";

import {
    getRealEstatesStart,
    getRealEstatesSuccess,
    getRealEstatesFailure,
} from "./realEstates.slice";

import axios from "axios";

export const fetchRealEstates = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(getRealEstatesStart());
        const response = await axios.get("http://localhost:3001/real-estates", {
            headers: {
                API_KEY:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicHJvamVjdCI6InJlYWwtZXN0YXRlLXdlYiIsImlhdCI6MTUxNjIzOTAyMn0.CLcp9GYYCftz3TJf2JHs6-jPlUSmaSPsUsVFbp2c3Ss",
            },
        });
        dispatch(getRealEstatesSuccess(response.data));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(getRealEstatesFailure(error.message));
        }
    }
};
