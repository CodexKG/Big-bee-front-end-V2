import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchFilterShops, fetchShopById, fetchShops } from 'store/reducers/shopReduser';
import { Shop, ShopData } from 'types/types';

interface shopState {
    data: ShopData;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    selectedShop: Shop | null;
    error: string | null;
}

const initialState: shopState = {
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


const productsSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterShops.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchFilterShops.fulfilled, (state, action: PayloadAction<ShopData>) => {
                state.loading = 'succeeded';
                state.data = {
                    ...action.payload,
                    results: [...state.data.results, ...action.payload.results]
                };
            })
            .addCase(fetchFilterShops.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
            })

            .addCase(fetchShops.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchShops.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
            })

            .addCase(fetchShopById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchShopById.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.selectedShop = action.payload;
            })
            .addCase(fetchShopById.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch product' : 'Failed to fetch product';
            });
    },
});

// export const { } = productsSlice.actions;
export const selectProducts = (state: { products: shopState }) => state.products;

export default productsSlice.reducer;
