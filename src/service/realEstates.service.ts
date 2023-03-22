import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IRealEstates } from "../types/realEstates.type";

export const fetchRealEstates = createAsyncThunk(
    "real-estates/fetchRealEstates",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IRealEstates[]>(
                `${process.env.REACT_APP_API_URL}/real-estates?apiKey=${process.env.REACT_APP_API_KEY}`
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
