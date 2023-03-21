import { createSlice } from "@reduxjs/toolkit";

import { userLogin } from "../../service/auth.service";

interface AuthState {
    loading: boolean;
    userToken: string | null;
    error: any;
}

const initialState: AuthState = {
    loading: false,
    userToken: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.error = null;
            state.userToken = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.userToken = payload.access_token;
        });
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.userToken = null;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice;
