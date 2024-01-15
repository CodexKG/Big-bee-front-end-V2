import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { Shop, ShopData } from "../../types/types";
import { api } from "../../api";


export const fetchShops = createAsyncThunk<ShopData, { cancelToken?: CancelToken, limit?: number, offset?: number, search?: string }, { rejectValue?: string }>(
    'shop/fetchShops',
    async ({ cancelToken, limit, offset, search }, { rejectWithValue }) => {
        try {
            const response = await api.getShops(search, limit, offset, cancelToken);
            return response.data as ShopData;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);
export const fetchFilterShops = createAsyncThunk<ShopData, { cancelToken?: CancelToken, limit?: number, offset?: number, search?: string }, { rejectValue?: string }>(
    'shop/fetchFilterShops',
    async ({ cancelToken, limit, offset, search }, { rejectWithValue }) => {
        try {
            const response = await api.getFilteredShops(search, limit, offset, cancelToken);
            return response.data as ShopData;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchShopById = createAsyncThunk<Shop, { id: number; cancelToken?: CancelToken }, { rejectValue?: string }>(
    'shop/fetchShopById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getShopById(id);
            return response.data as Shop;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);