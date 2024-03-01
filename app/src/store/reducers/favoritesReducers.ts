import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import {
  AddFavoriteProduct,
  FavoriteProductData,
  FavoriteProductPost
} from "../../store/models/FavoriteTypes";
import { api } from "../../api";

export const addProductToFavorite = createAsyncThunk<
  FavoriteProductPost,
  { user_id: number; product_id: number; cancelToken?: CancelToken },
  { rejectValue?: string }
>(
  "favorites/addProductToFavorite",
  async ({ cancelToken, user_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await api.addProductToFavorite(
        user_id,
        product_id,
        cancelToken
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : "Failed to fetch products"
      );
    }
  }
);
export const getFavoriteProducts = createAsyncThunk<FavoriteProductData[], { cancelToken?: CancelToken }, { rejectValue?: string } >(
  "favorites/getFavoriteProducts",
  async ({ cancelToken }, { rejectWithValue }) => {
    try {
      const response = await api.getProductsFromFavorite(cancelToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : "Failed to fetch products"
      );
    }
  }
);

export const delFavoriteProducts = createAsyncThunk<number, {id:number, cancelToken?: CancelToken }, { rejectValue?: string } >(
  "favorites/delFavoriteProducts",
  async ({id, cancelToken }, { rejectWithValue }) => {
    try {
      const response = await api.delProductFromFavorite(id,cancelToken);
      response.data = id
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : "Failed to fetch products"
      );
    }
  }
);
