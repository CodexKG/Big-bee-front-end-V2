import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchFilterShops, fetchShopById, fetchShops } from 'store/reducers/shopReduser';
import { Shop, ShopData } from 'types/types';

interface shopState {
    data: ShopData;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    selectedShop: Shop | null;
    error: string | null;
    laoding: boolean
}

const initialState: shopState = {
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


const productsSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterShops.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchFilterShops.fulfilled, (state, action: PayloadAction<ShopData>) => {
                state.status = 'succeeded';
                state.data = {
                    ...action.payload,
                    results: [...state.data.results, ...action.payload.results]
                };
                state.laoding = false
            })
            .addCase(fetchFilterShops.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

            .addCase(fetchShops.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchShops.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

            .addCase(fetchShopById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchShopById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedShop = action.payload;
                state.laoding = false
            })
            .addCase(fetchShopById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch product' : 'Failed to fetch product';
                state.laoding = false
            });
    },
});

// export const { } = productsSlice.actions;
export const selectProducts = (state: { products: shopState }) => state.products;

export default productsSlice.reducer;
