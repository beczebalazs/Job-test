import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../../store";

import axios from "axios";

import constants from "../../constants/constants";

interface RealEstatesState {
    realEstates: RealEstates[];
    loading: boolean;
    error: string | null;
}

export interface RealEstates {
    id: string;
    image?: string;
    title: string;
    description: string;
    price: number;
    region: string;
    city: string;
    address: string;
    comission?: number;
    phone?: number;
    email?: string;
}

const initialState: RealEstatesState = {
    realEstates: [],
    loading: false,
    error: null,
};

export const fetchRealEstates = createAsyncThunk(
    "real-estates/fetchRealEstates",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<RealEstates[]>(
                `${constants.API_URL}/real-estates?apiKey=${process.env.REACT_APP_API_KEY}`
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const realEstatesSlice = createSlice({
    name: "real-estates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRealEstates.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRealEstates.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.realEstates = payload;
            state.error = null;
        });
        builder.addCase(fetchRealEstates.rejected, (state, { payload }) => {
            state.loading = false;
            state.realEstates = [];
            state.error = null;
        });
    },
});

export default realEstatesSlice;

export const realEstatesSelector = (state: RootState) =>
    state["real-estates"].realEstates;

export const selectAllRealEstates = createSelector(
    realEstatesSelector,
    (realEstates: RealEstates[]) => realEstates
);
