import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { CartData, CartItem, localCartItem } from "../models/CartTypes";
import { api } from "../../api";



export const fetchCartItems = createAsyncThunk<CartData, { cancelToken?: CancelToken, id: number }, { rejectValue?: string }>(
    'cart/fetchCartItems',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getOwnCartItems(id); 
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);

export const addCartItem = createAsyncThunk<CartItem, { cancelToken?: CancelToken, cart: number, product_id: number, quantity: number }, { rejectValue?: string }>(
    'cart/addCartItem',
    async ({ cart, product_id, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.addToCart(cart,product_id,quantity ); 
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);

export const updateCartItem = createAsyncThunk<CartItem, { cancelToken?: CancelToken,id:number, quantity: number }, { rejectValue?: string }>(
    'cart/updateCartItem',
    async ({id, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.updateCartItem(id,quantity ); 
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);

// Local cart
export function loadCartFromLocalStorage(): localCartItem[] {
    const storedData = localStorage.getItem("cartItems");
    return storedData ? JSON.parse(storedData) : [];
}

export function saveCartToLocalStorage(cartItem: localCartItem): void {
    let list: localCartItem[] = [];

    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        try {
            list = JSON.parse(storedItems) as localCartItem[];
        } catch (error) {
            console.error('Error parsing cart items from localStorage:', error);
        }
    }

    let existingItem = list.find(item => item.id === cartItem.id);
    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        list.push(cartItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(list));
}
export function updateCartToLocalStorage(id: number, action:string, value?:any): any {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        try {
            const list: localCartItem[] = JSON.parse(storedItems) as localCartItem[];
            const updatedList = list.map(item => {
                if (item.id === id ) {
                    switch(action){
                        case 'check':
                            item.is_selected = value? value: !item.is_selected;
                            break;
                        case 'count':
                            item.quantity = value? value: item.quantity;
                            break;
                    }
                }
                return item;
            });
            let updatedListd = []
            if(action=='delete'){
                updatedListd =  list.filter(item => item.id !== id);
                localStorage.setItem('cartItems', JSON.stringify(updatedListd));
                return updatedListd
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedList));
            return updatedList
        } catch (error) {
            console.error('Error parsing or updating cart items:', error);
        }
    }
}
export function deleteCheckedCartToLocalStorage(): any {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        try {
            const list: localCartItem[] = JSON.parse(storedItems) as localCartItem[];
            const updatedList = list.filter(item => item.is_selected == false);
            localStorage.setItem('cartItems', JSON.stringify(updatedList));
            return updatedList
        } catch (error) {
            console.error('Error parsing or updating cart items:', error);
        }
    }
}
