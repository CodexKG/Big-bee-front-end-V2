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
        attribute: []
    }
};


const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<FilterParams>) => {
            state.filters = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterParams>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setAtribute: (state, action: PayloadAction<FilterParams>) => {
            state.filters.attribute = { ...state.filters.attribute, ...action.payload };
        },
        addAttribute: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const isDuplicate = state.filters.attribute.some((item: any) =>
                item.key === action.payload.key && item.value === action.payload.value
            );
            if (!isDuplicate) {
                state.filters.attribute.push(action.payload);
            }
        },
        removeValue: (state, action: PayloadAction<{ key: string; value: string }>) => {
            // Фильтруем массив, удаляя только тот атрибут, который полностью соответствует ключу и значению
            state.filters.attribute = state.filters.attribute.filter((item: any) =>
                item.key !== action.payload.key || item.value !== action.payload.value
            );
        },
        clearFilters: (state, action: PayloadAction<{ id: number }>) => {
            state.filters = {
                limit: 20,
                offset: 0,
                category: action.payload.id,
                attribute: []
            }
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.filters.offset = action.payload
        }
    },

});

export const { setFilters, clearFilters, setOffset, setAtribute, addAttribute, removeValue, setParams } = windowSlice.actions;


export default windowSlice.reducer;
