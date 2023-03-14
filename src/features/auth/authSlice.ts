import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import constants from "../../constants/constants";
import { LoginRequestType } from "../../types/login/LoginRequestType";
import { LoginResponseType } from "../../types/login/LoginResponseType";

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

export const userLogin = createAsyncThunk(
    "auth/login",
    async (data: LoginRequestType, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.post<LoginResponseType>(
                `${constants.API_URL}/log-in?apiKey=${constants.API_KEY}`,
                {
                    username: data.username,
                    password: data.password,
                },
                config
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
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

export default authSlice.reducer;
