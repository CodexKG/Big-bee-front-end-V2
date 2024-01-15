import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductToFavorite } from 'store/reducers/favoritesReducers';
import { AddFavoriteProduct, FavoriteProductData, FavoriteProduct } from "store/models/FavoriteTypes";

interface favoritesState {
    data: FavoriteProductData;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    selectedShop: FavoriteProduct | null;
    error: string | null;
}

const initialState: favoritesState = {
    data: {
        count: 0,
        next: '',
        previous: null,
        results: []
    },
    loading: 'idle',
    selectedShop: null,
    error: null,
};


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductToFavorite.pending, (state) => {
                state.loading = 'pending';
            })
    },
});