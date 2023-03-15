import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import authReducer from "./features/auth/authSlice";
import currentUserSlice from "./features/currentUser/currentUserSlice";
import realEstatesSlice from "./real-estates-store/realEstates.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        realEstates: realEstatesSlice,
        currentUser: currentUserSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = ThunkDispatch<RootState, void, Action>;
