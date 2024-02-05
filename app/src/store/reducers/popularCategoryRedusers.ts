import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { Categories } from "../../types/types";
import { api } from "../../api";


export const fetchPopularCategories = createAsyncThunk<Categories[], { cancelToken?: CancelToken, }, { rejectValue?: string }>(
    '/categories/popular/',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getPopularCategories(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch popular categories');
        }
    }
);
