import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterParams } from 'store/models/WindowTypes';
interface windowState {
    user: any
    filters: FilterParams;
}

const initialState: windowState = {
    user: {},
    filters: {

        limit: 20,
        offset: 0,
        category: 0,
        attribute: {}
    }
};


const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FilterParams>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setAtribute: (state, action: PayloadAction<FilterParams>) => {
            state.filters.attribute = { ...state.filters.attribute, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {}
        },
        setOffset: (state) => {
            state.filters.offset += 10
        }
    },

});

export const { setFilters, clearFilters, setOffset, setAtribute } = windowSlice.actions;


export default windowSlice.reducer;
