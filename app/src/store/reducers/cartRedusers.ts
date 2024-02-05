import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { CancelToken } from "axios";
import { CartData, CartItem, localCartItem, localCartProduct, user } from "../models/CartTypes";
import { api } from "../../api";
import { getCookie } from "helpers/cookies";


export const fetchCartItems = createAsyncThunk<any, { cancelToken?: CancelToken, id: number }, { rejectValue?: string }>(
    'cart/fetchCartItems',
    async ({ id }, { rejectWithValue }) => {
        try {
            const access_token = getCookie('access_token')
            if (access_token){
                const response = await api.getOwnCartItems(id); 
                return response.data;
            }
            else{
                const storedData = localStorage.getItem("cart");
                return storedData ? JSON.parse(storedData) : [];
            }
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export const createCart = createAsyncThunk(
    'cart/createCart',
    async ({ user_id }: { user_id: number;}, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createCart(user_id, source.token);
        return response.data;
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
export function loadCartFromLocalStorage(): CartItem[] {
    const storedData = localStorage.getItem("cart");
    return storedData ? JSON.parse(storedData) : [];
}

export function saveCartToLocalStorage(cartItem: localCartProduct): void {
    let list: localCartItem[]=[]
    
    let cart_item:localCartItem = {
        id:cartItem.id,
        cart:1,
        product:cartItem,
        quantity:1,
        is_selected:false
    }
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
        try {
            list = JSON.parse(storedItems) as localCartItem[];
        } catch (error) {
            console.error('Error parsing cart items from localStorage:', error);
        }
    }

    let existingItem = list.find(item => item.id === cart_item.id);
    if (existingItem) {
        existingItem.quantity += cart_item.quantity;
    } else {
        list.push(cart_item);
    }
    localStorage.setItem('cart', JSON.stringify(list));
}
export function updateCartToLocalStorage(id: number, action:string, value?:any): any {
    const storedItems = localStorage.getItem('cart');
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
                localStorage.setItem('cart', JSON.stringify(updatedListd));
                return updatedListd
            }
            localStorage.setItem('cart', JSON.stringify(updatedList));
            return updatedList
        } catch (error) {
            console.error('Error parsing or updating cart items:', error);
        }
    }
}
export function deleteCheckedCartToLocalStorage(): any {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
        try {
            const list: localCartItem[] = JSON.parse(storedItems) as localCartItem[];
            const updatedList = list.filter(item => item.is_selected == false);
            localStorage.setItem('cart', JSON.stringify(updatedList));
            return updatedList
        } catch (error) {
            console.error('Error parsing or updating cart items:', error);
        }
    }
}
