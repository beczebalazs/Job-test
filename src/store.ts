import { configureStore } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import realEstatesSlice from "./real-estates-store/realEstates.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        realEstates: realEstatesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = ThunkDispatch<RootState, void, Action>;
