import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductToFavorite } from 'store/reducers/favoritesReducers';
import { AddFavoriteProduct, FavoriteProductData, FavoriteProduct } from "store/models/FavoriteTypes";

interface favoritesState {
    data: FavoriteProductData;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    selectedShop: FavoriteProduct | null;
    error: string | null;
    laoding: boolean
}

const initialState: favoritesState = {
    data: {
        count: 0,
        next: '',
        previous: null,
        results: []
    },
    status: 'idle',
    selectedShop: null,
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
            .addCase(fetchProductToFavorite.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProductToFavorite.fulfilled, (state) => {
                state.status = 'succeeded';
                state.laoding = false
            })
    },
});