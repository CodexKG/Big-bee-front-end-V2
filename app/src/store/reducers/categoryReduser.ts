import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { Categories } from "../../types/types";
import { api } from "../../api";
import { PopularCategories } from "store/models/CategoriesType";


export const fetchCategories = createAsyncThunk<Categories[], { cancelToken?: CancelToken, }, { rejectValue?: string }>(
    'category/fetchCategories',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getCategories(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch categories');
        }
    }
);
export const fetchPopularCategories = createAsyncThunk<PopularCategories[], { cancelToken?: CancelToken, }, { rejectValue?: string }>(
    'category/fetchPopularCategories',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getPopularCategories(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch categories');
        }
    }
);
export const fetchCategoriesById = createAsyncThunk<Categories, { id: number, cancelToken?: CancelToken, }, { rejectValue?: string }>(
    'category/fetchCategoriesById',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getCategoriesById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch categories');
        }
    }
);