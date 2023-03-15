import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";
import constants from "../../constants/constants";
import store from "../../store";
import { CurrentUserType } from "../../types/currentUser/CurrentUserType";
import { CurrentUserResponseType } from "./../../types/currentUser/CurrentUserResponseType";
import { UpdateCurrentUserRequestType } from "./../../types/currentUser/UpdateCurrentUserRequestType";
import { UpdateCurrentUserResponseType } from "./../../types/currentUser/UpdateCurrentUserResponseType";

interface CurrentUserState {
    currentUser: CurrentUserType | null;
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

export const getCurrentUser = createAsyncThunk(
    "currentUser/getUser",
    async (_, thunkAPI) => {
        try {
            const state = store.getState();
            const authToken = state.auth.userToken;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response = await axios.get<CurrentUserResponseType>(
                `${constants.API_URL}/currentUser?apiKey=${constants.API_KEY}`,
                config
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateCurrentUser = createAsyncThunk(
    "currentUser/updateUser",
    async (data: UpdateCurrentUserRequestType, thunkAPI) => {
        try {
            const state = store.getState();
            const authToken = state.auth.userToken;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response = await axios.patch<UpdateCurrentUserResponseType>(
                `${constants.API_URL}/currentUser?apiKey=${constants.API_KEY}`,
                {
                    email: data.email,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    age: data.age,
                    role: data.role,
                },
                config
            );

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

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

export default currentUserSlice.reducer;
