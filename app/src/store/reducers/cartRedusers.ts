import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { CancelToken } from "axios";
import { CartData, CartItem, localCartItem,CartProduct  } from "../models/CartTypes";
import { api } from "../../api";
import { getCookie, setCookie } from "helpers/cookies";


const access_token = getCookie('access_token')
export const fetchCartItems = createAsyncThunk<any, { cancelToken?: CancelToken, id?: number }, { rejectValue?: string }>(
    'cart/fetchCartItems',
    async ({ id }, { rejectWithValue }) => {
        try {
            if (access_token) {
                const response = await api.getOwnCartItems(id);
                setCookie('cart_id', response.data[0].id, 30)
                return response.data[0];

            }
            else {
                const storedData = localStorage.getItem("cart");
                return storedData ? JSON.parse(storedData) : {};
            }
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export const createCart = createAsyncThunk(
    'cart/createCart',
    async ({ user_id }: { user_id: number; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createCart(user_id, source.token);
        return response.data;
    }
);
export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ id }: { id: number; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        await api.deleteCartItem(id, access_token, source.token);
        return id
    }
);
export const deleteCheckedCartItems = createAsyncThunk(
    'cart/deleteCheckedCartItems',
    async ({ cart_items }: { cart_items: CartItem[]; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        cart_items.map(e => {
            api.deleteCartItem(e.id, access_token, source.token);
        })
        return cart_items
    }
);

export const addCartItem = createAsyncThunk<CartItem, { cancelToken?: CancelToken, cart: number, product_id: number, quantity: number }, { rejectValue?: string }>(
    'cart/addCartItem',
    async ({ cart, product_id, quantity }, { rejectWithValue }) => {
        try {
            if (cart !-=0) {
                const response = await api.addToCart(cart, product_id, quantity);
                return response.data;
            }
            else{
                return rejectWithValue('Ошибка корзинки');
            }
            
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);

export const updateQuantityCartItem = createAsyncThunk<CartItem, { cancelToken?: CancelToken, id: number, quantity: number }, { rejectValue?: string }>(
    'cart/updateQuantityCartItem',
    async ({ id, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.updateQuantityCartItem(id, quantity, access_token);
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);
export const updateSelectedCartItem = createAsyncThunk<CartItem, { cancelToken?: CancelToken, id: number, is_selected: boolean }, { rejectValue?: string }>(
    'cart/updateSelectedCartItem',
    async ({ id, is_selected }, { rejectWithValue }) => {
        try {
            const response = await api.updateSelectedCartItem(id, is_selected, access_token);

            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);
// Local cart
export function loadCartFromLocalStorage(): CartData {
    const storedData = localStorage.getItem("cart");
    return storedData ? JSON.parse(storedData) : {};
}


export const addLocalCartItem = createAsyncThunk<CartItem[], { cancelToken?: CancelToken, cartItem: CartProduct }, { rejectValue?: string }>(
    'cart/addLocalCartItem',
    async ({ cartItem }, { rejectWithValue }) => {
        try {
            let list: CartItem[] = []

            let cart_item: CartItem = {
                id: cartItem.id,
                cart: 1,
                product: cartItem,
                quantity: 1,
                is_selected: false
            }
            const storedItems = localStorage.getItem('cart');
            if (storedItems) {
                try {
                    list = JSON.parse(storedItems) as CartItem[];
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
            return list;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);

export const updateCartToLocalStorage = createAsyncThunk<CartItem[], { cancelToken?: CancelToken, id: number, action: string, value?: any }, { rejectValue?: string }>(
    'cart/updateCartToLocalStorage',
    async ({ id, action, value }, { rejectWithValue }) => {
        try {
            const storedItems = localStorage.getItem('cart');
            
            let updatedList: CartItem[] = []
            if (storedItems) {
                const list: CartItem[] = JSON.parse(storedItems) as CartItem[];
                updatedList = list.map(item => {
                    if (item.id === id) {
                        switch (action) {
                            case 'check':
                                item.is_selected = value ? value : !item.is_selected;
                                break;
                            case 'count':
                                item.quantity = value ? value : item.quantity;
                                break;
                        }
                    }
                    return item;
                });
                if (action === 'delete') {
                    updatedList = list.filter(item => item.id !== id);
                }
                localStorage.setItem('cart', JSON.stringify(updatedList));
            }
            return updatedList;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Ошибка корзинки');
        }
    }
);

export const deleteCheckedCartToLocalStorage = createAsyncThunk(
    'cart/deleteCheckedCartToLocalStorage',
    async () => {
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
);