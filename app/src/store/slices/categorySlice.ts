import { PayloadAction, createSlice, } from '@reduxjs/toolkit';
import { fetchCategories, fetchCategoriesById } from 'store/reducers/categoryReduser';
import { Categories } from 'types/types';
interface CategoryState {
    data: any[];
    children: { [key: string]: Categories };
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoryState = {
    data: [],
    children: {
        '0': {
            id: 0,
            title: "",
            slug: '',
            subcategories: []
        }
    },
    loading: 'idle',
    error: null,
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
            .addCase(fetchCategoriesById.fulfilled, (state, action) => {
                const { id } = action.meta.arg;
                const data = action.payload;
                state.children[id] = data;
            })

    },
});

export const { setHoveredItem } = categorySlice.actions;
export default categorySlice.reducer;
