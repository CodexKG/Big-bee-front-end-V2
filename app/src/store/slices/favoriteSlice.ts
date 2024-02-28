import { createSlice } from '@reduxjs/toolkit';
import { addProductToFavorite, getFavoriteProducts, delFavoriteProducts } from 'store/reducers/favoritesReducers';
import {FavoriteProductData } from "store/models/FavoriteTypes";

interface favoritesState {
    data: FavoriteProductData[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: favoritesState = {
    data: [],
    status: 'idle',
    error: null,
    laoding: false
};


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(getFavoriteProducts.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(getFavoriteProducts.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })

            .addCase(delFavoriteProducts.pending, (state) => {
            })
            .addCase(delFavoriteProducts.fulfilled, (state,action) => {
                state.data = state.data.filter(item => item.id !== action.payload);
            })
    },
});
export default favoritesSlice.reducer;
