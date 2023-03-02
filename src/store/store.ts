import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import realEstatesSlice from "./realEstates.slice";

const store = configureStore({
    reducer: {
        realEstates: realEstatesSlice,
    },
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = ThunkDispatch<RootState, void, Action>;

export default store;
