import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFilterProducts, fetchProductById, fetchProducts } from 'store/reducers/producRedusers';
import { Product, ProductData } from 'types/types';

interface ProductsState {
    data: ProductData;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    selectedProduct: Product | null;
    error: string | null;
}

const initialState: ProductsState = {
    data: {
        count: 0,
        next: '',
        previous: null,
        results: []
    },
    loading: 'idle',
    selectedProduct: null,
    error: null,
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts: (state,) => {
            state.data = {
                count: 0,
                next: '',
                previous: null,
                results: []
            };
        },
        replaceProducts: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterProducts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchFilterProducts.fulfilled, (state, action: PayloadAction<ProductData>) => {
                state.loading = 'succeeded';
                state.data = {
                    ...action.payload,
                    results: [...state.data.results, ...action.payload.results]
                };
            })
            .addCase(fetchFilterProducts.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
            })

            .addCase(fetchProducts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
            })

            .addCase(fetchProductById.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch product' : 'Failed to fetch product';
            });
    },
});

export const { clearProducts, replaceProducts } = productsSlice.actions;
export const selectProducts = (state: { products: ProductsState }) => state.products;

export default productsSlice.reducer;
