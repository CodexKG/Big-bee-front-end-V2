import { PayloadAction, createSlice, } from '@reduxjs/toolkit';
import { PopularCategories } from 'store/models/CategoriesType';
import { fetchCategories, fetchCategoriesById, fetchPopularCategories } from 'store/reducers/categoryReduser';
import { Categories } from 'types/types';
interface CategoryState {
    data: any[];
    popular: PopularCategories[];
    children: { [key: string]: Categories };
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: CategoryState = {
    data: [],
    popular: [],
    children: {

    },
    status: 'idle',
    error: null,
    laoding: false
};


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setHoveredItem: (state, action: PayloadAction<{ key: string; value: Categories }>) => {
            const { key, value } = action.payload;
            state.children[key] = value;
        },
        clearHoveredItem: (state) => {
            state.children = {}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
            .addCase(fetchCategoriesById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchCategoriesById.fulfilled, (state, action) => {
                const { id } = action.meta.arg;
                const data = action.payload;
                state.children[id] = data;
                state.status = 'succeeded'
                state.laoding = false
            })
            .addCase(fetchCategoriesById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
            .addCase(fetchPopularCategories.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchPopularCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.popular = action.payload;
                state.laoding = false
            })
            .addCase(fetchPopularCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

    },
});

export const { setHoveredItem } = categorySlice.actions;
export default categorySlice.reducer;
