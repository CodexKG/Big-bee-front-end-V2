import { createSlice, } from '@reduxjs/toolkit';
import { fetchCategories } from 'store/reducers/categoryReduser';
interface CategoryState {
    data: any[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoryState = {
    data: [],
    loading: 'idle',
    error: null,
};


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
            })
    },
});

// export const { } = categorySlice.actions;
export default categorySlice.reducer;
