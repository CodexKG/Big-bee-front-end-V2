import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { Product, ProductData, ProductPopular } from "../../types/types";
import { api } from "../../api";



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
export const fetchFilterProducts = createAsyncThunk<ProductData, { cancelToken?: CancelToken, shop?: string, limit?: number, offset?: number, search?: string, category?: string }, { rejectValue?: string }>(
    'products/fetchFilterProducts',
    async ({ cancelToken, limit, offset, search, category, shop }, { rejectWithValue }) => {
        try {
            const response = await api.getFilteredProducts(shop, category, search, limit, offset, cancelToken);
            return response.data as ProductData;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk<Product, { id: number; cancelToken?: CancelToken }, { rejectValue?: string }>(
    'products/fetchProductById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getProductsById(id);
            return response.data as Product;
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
