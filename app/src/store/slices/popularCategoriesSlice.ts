import { PayloadAction, createSlice, } from '@reduxjs/toolkit';
import { fetchPopularCategories } from 'store/reducers/popularCategoryRedusers';
import { Categories } from 'types/types';
interface PopularCategoriesState {
    data: any[];
    children: { [key: string]: Categories };
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: PopularCategoriesState = {
    data: [],
    children: {

    },
    status: 'idle',
    error: null,
    laoding: false
};


const popularCategorySlice = createSlice({
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
            .addCase(fetchPopularCategories.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchPopularCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchPopularCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch popular categoies' : 'Failed to popular categoies';
                state.laoding = false
            })


    },
});

export const { setHoveredItem } = popularCategorySlice.actions;
export default popularCategorySlice.reducer;
