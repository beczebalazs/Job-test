import { createSlice } from "@reduxjs/toolkit";

import { fetchRealEstates } from "../../service/realEstates.service";
import { IRealEstates } from "../../types/realEstates.type";

interface RealEstatesState {
    realEstates: IRealEstates[];
    loading: boolean;
    error: string | null;
}

const initialState: RealEstatesState = {
    realEstates: [],
    loading: false,
    error: null,
};

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
