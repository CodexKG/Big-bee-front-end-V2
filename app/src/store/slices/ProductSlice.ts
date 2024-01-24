import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFilterProducts, fetchProductById, fetchProducts } from 'store/reducers/producRedusers';
import { Product, ProductData } from 'types/types';

interface ProductsState {
    data: ProductData;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    selectedProduct: Product | null;
    error: string | null;
    laoding: boolean
}

const initialState: ProductsState = {
    data: {
        count: 0,
        next: '',
        previous: null,
        results: []
    },
    status: 'idle',
    selectedProduct: null,
    error: null,
    laoding: false
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
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchFilterProducts.fulfilled, (state, action: PayloadAction<ProductData>) => {
                state.status = 'succeeded';
                state.data = {
                    ...action.payload,
                    results: [...state.data.results, ...action.payload.results]

                };
                state.laoding = false
            })
            .addCase(fetchFilterProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

            .addCase(fetchProducts.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

            .addCase(fetchProductById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedProduct = action.payload;
                state.laoding = false
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch product' : 'Failed to fetch product';
                state.laoding = false
            });
    },
});

export const { clearProducts, replaceProducts } = productsSlice.actions;
export const selectProducts = (state: { products: ProductsState }) => state.products;

export default productsSlice.reducer;
