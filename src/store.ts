import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import authSlice from "./features/auth/authSlice";
import realEstatesSlice from "./real-estates-store/realEstates.slice";
import favoriteSlice from "./features/favorite/favoriteSlice";

export const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: [authSlice.name, favoriteSlice.name],
};

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [realEstatesSlice.name]: realEstatesSlice.reducer,
    [favoriteSlice.name]: favoriteSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = ThunkDispatch<RootState, void, Action>;
