import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const realEstatesSlice = createSlice({
    name: "real-estates",
    initialState,
    reducers: {
        getRealEstatesStart(state) {
            state.loading = true;
            state.error = null;
        },
        getRealEstatesSuccess(state, action: PayloadAction<RealEstates[]>) {
            state.loading = false;
            state.realEstates = action.payload;
        },
        getRealEstatesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getRealEstatesStart,
    getRealEstatesSuccess,
    getRealEstatesFailure,
} = realEstatesSlice.actions;

export default realEstatesSlice.reducer;
