import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { CartData, localCartItem } from "../../types/types";
import { api } from "../../api";



export const fetchCartItems = createAsyncThunk<CartData, { cancelToken?: CancelToken, id: number }, { rejectValue?: string }>(
    'cart/fetchCartItems',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getOwnCartItems(id); // Replace with your API call
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export function loadCartFromLocalStorage(): localCartItem[] {
    const storedData = localStorage.getItem("cartItems");
    return storedData ? JSON.parse(storedData) : [];
}

export function saveCartToLocalStorage(cartItems: localCartItem[]): void {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}