import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RealEstates } from "./realEstates.slice";
import {
    getRealEstatesStart,
    getRealEstatesSuccess,
    getRealEstatesFailure,
} from "./realEstates.slice";

export const fetchRealEstates = createAsyncThunk(
    "real-estates/fetchRealEstates",
    async (_, { dispatch }) => {
        try {
            dispatch(getRealEstatesStart());
            const response = await axios.get<RealEstates[]>(
                "http://localhost:3001/real-estates"
            );
            dispatch(getRealEstatesSuccess(response.data));
        } catch (error: any) {
            dispatch(getRealEstatesFailure(error.message));
        }
    }
);
