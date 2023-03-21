import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { ILoginRequest, ILoginResponse } from '../types/login.types';

export const userLogin = createAsyncThunk(
    "auth/login",
    async (data: ILoginRequest, thunkAPI) => {
        try {
            const response = await axios.post<ILoginResponse>(
                `${process.env.REACT_APP_API_URL}/log-in?apiKey=${process.env.REACT_APP_API_KEY}`,
                {
                    username: data.username,
                    password: data.password,
                }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
