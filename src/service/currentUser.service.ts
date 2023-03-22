import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import {
    ICurrentUserResponse,
    IUpdateCurrentUserRequest,
    IUpdateCurrentUserResponse,
} from "../types/currentUser.types";

export const getCurrentUser = createAsyncThunk(
    "currentUser/getUser",
    async (_, thunkAPI) => {
        try {
            const state = store.getState();
            const authToken = state.auth.userToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response = await axios.get<ICurrentUserResponse>(
                `${process.env.REACT_APP_API_URL}/currentUser?apiKey=${process.env.REACT_APP_API_KEY}`,
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
    async (data: IUpdateCurrentUserRequest, thunkAPI) => {
        try {
            const state = store.getState();
            const authToken = state.auth.userToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response = await axios.patch<IUpdateCurrentUserResponse>(
                `${process.env.API_URL}/currentUser?apiKey=${process.env.REACT_APP_API_KEY}`,
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
