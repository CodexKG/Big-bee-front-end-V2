import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import {
  AddFavoriteProduct,
  FavoriteProduct,
} from "../../store/models/FavoriteTypes";
import { api } from "../../api";

export const fetchProductToFavorite = createAsyncThunk<
  AddFavoriteProduct,
  { user_id?: number; product_id?: number; cancelToken?: CancelToken },
  { rejectValue?: string }
>(
  "favorites/fetchProductToFavorite",
  async ({ cancelToken, user_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await api.addProductToFavorite(
        Number(user_id),
        Number(product_id),
        cancelToken
      );
      return response.data as AddFavoriteProduct;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : "Failed to fetch products"
      );
    }
  }
);
