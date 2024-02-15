import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductToFavoriteAdd,fetchProductToFavorite } from 'store/reducers/favoritesReducers';
import { AddFavoriteProduct, FavoriteProductData, FavoriteProduct } from "store/models/FavoriteTypes";

interface favoritesState {
    products:Array<object>
    data: FavoriteProductData;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    statusProduct:'idle' | 'pending' | 'succeeded' | 'failed';
    selectedShop: FavoriteProduct | null;
    error: string | null;
    laoding: boolean
}

const initialState: favoritesState = {
    products:[
        
    ],
    data: {
        count: 0,
        next: '',
        previous: null,
        results: []
    },
    status: 'idle',
    selectedShop: null,
    error: null,
    laoding: false,
    statusProduct:'idle'
};


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductToFavoriteAdd.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProductToFavoriteAdd.fulfilled, (state) => {
                state.status = 'succeeded';
                state.laoding = false
            })
            .addCase(fetchProductToFavorite.pending,(state)=>{
                state.statusProduct = 'pending'
            }).addCase(fetchProductToFavorite.fulfilled, (state, action) => {
                state.products = action.payload
                state.statusProduct = 'succeeded'
            }).addCase(fetchProductToFavorite.rejected, (state) => {
                state.error = "Произошла ошибка"
                state.statusProduct = 'failed'
            })
    },
});



export const { } = favoritesSlice.actions;


export default favoritesSlice.reducer;