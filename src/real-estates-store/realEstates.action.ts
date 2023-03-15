import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RealEstates } from "./realEstates.slice";
import {
    getRealEstatesStart,
    getRealEstatesSuccess,
    getRealEstatesFailure,
} from "./realEstates.slice";

import constants from "../constants/constants";

export const fetchRealEstates = createAsyncThunk(
    "real-estates/fetchRealEstates",
    async (_, { dispatch }) => {
        try {
            dispatch(getRealEstatesStart());
            const response = await axios.get<RealEstates[]>(
                `${constants.API_URL}/real-estates?apiKey=${constants.API_KEY}`
            );
            dispatch(getRealEstatesSuccess(response.data));
        } catch (error: any) {
            dispatch(getRealEstatesFailure(error.message));
        }
    }
);
