import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkDispatch } from "redux-thunk";

import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth.slice";
import currentUserSlice from "./current-user/currentUser.slice";
import favoriteSlice from "./favourites/favourites.slice";
import realEstatesSlice from "./real-estates/realEstates.slice";

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
    [currentUserSlice.name]: currentUserSlice.reducer,
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

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = ThunkDispatch<RootState, void, Action>;
