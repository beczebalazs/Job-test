import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
    favorites: string[];
}

const initialState: FavoriteState = {
    favorites: [],
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<string>) {
            state.favorites.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(
                (favorite) => favorite !== action.payload
            );
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice;
