import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { Product, ProductData, ProductPopular, SingleProduct } from "../../types/types";
import { api } from "../../api";
import { FilterParams } from "store/models/WindowTypes";



export const fetchProducts = createAsyncThunk<ProductData, { cancelToken?: CancelToken, shop?: string, limit?: number, offset?: number, search?: string }, { rejectValue?: string }>(
    'products/fetchProducts',
    async ({ cancelToken, limit, offset, search, shop }, { rejectWithValue }) => {
        try {
            const response = await api.getProducts(shop, search, limit, offset, cancelToken);
            return response.data as ProductData;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);
export const fetchFilterProducts = createAsyncThunk<ProductData, { cancelToken: CancelToken, filters: string }, { rejectValue?: string }>(
    'products/fetchFilterProducts',
    async ({ cancelToken, filters }, { rejectWithValue }) => {
        try {
            const response = await api.getFilteredProducts(filters, cancelToken);
            return response.data as ProductData;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk<SingleProduct, { id: number; cancelToken?: CancelToken }, { rejectValue?: string }>(
    'products/fetchProductById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getProductsById(id);
            return response.data as SingleProduct;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);

export const fetchProductOfDay = createAsyncThunk<ProductPopular, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'products/fetchProductOfDay',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getProductsofDay();
            return response.data as ProductPopular;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);
