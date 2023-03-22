import { createSlice, Slice } from "@reduxjs/toolkit";

import {
    getCurrentUser,
    updateCurrentUser,
} from "../../service/currentUser.service";
import { ICurrentUser } from "../../types/currentUser.types";

interface CurrentUserState {
    currentUser: ICurrentUser | null;
    loading: boolean;
    error: any;
}

const initialState: CurrentUserState = {
    currentUser: {
        _id: "",
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        gender: "",
        age: 0,
        role: "",
    },
    loading: false,
    error: null,
};

const currentUserSlice: Slice<CurrentUserState, {}, "currentUser"> =
    createSlice({
        name: "currentUser",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            // getCurrentUser builders
            builder.addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.currentUser = payload;
            });
            builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.currentUser = null;
            });

            // updateCurrentUser builders
            builder.addCase(updateCurrentUser.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(
                updateCurrentUser.fulfilled,
                (state, { payload }) => {
                    state.loading = false;
                    state.error = null;
                    state.currentUser = payload;
                }
            );
            builder.addCase(
                updateCurrentUser.rejected,
                (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                    state.currentUser = null;
                }
            );
        },
    });

export default currentUserSlice;
