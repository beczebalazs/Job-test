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
        const response = await axios.get("http://localhost:3001/real-estates");
        dispatch(getRealEstatesSuccess(response.data));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(getRealEstatesFailure(error.message));
        }
    }
};
