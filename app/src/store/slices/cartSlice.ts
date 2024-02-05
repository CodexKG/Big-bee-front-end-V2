import { createSlice } from '@reduxjs/toolkit';
import { addCartItem, addLocalCartItem, deleteCartItem, deleteCheckedCartItems, fetchCartItems, loadCartFromLocalStorage, updateCartToLocalStorage, updateQuantityCartItem, updateSelectedCartItem } from 'store/reducers/cartRedusers';
import { CartData } from '../models/CartTypes';
import { getCookie } from 'helpers/cookies';
const is_auth = getCookie('access_token')


interface CartState {
    data: CartData;
    localData: CartData
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    loading: boolean
}

const initialState: CartState = {
    data: {
        id: 0,
        user_id: 1,
        cart_items: [],
        total_cost: 0
    },
    localData: loadCartFromLocalStorage(),
    status: 'idle',
    error: null,
    loading: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(is_auth){
                    state.data = action.payload
                } else {
                    state.data.cart_items = action.payload

                }
                state.loading = false
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(updateSelectedCartItem.pending, (state) => {
                state.loading = true
            })
            .addCase(updateSelectedCartItem.fulfilled, (state, action) => {
                state.data.cart_items = state.data.cart_items.map(item => {
                    if (item.id === action.payload.id) {

                        return action.payload;
                    }
                    return item;
                });
                state.loading = false
            })
            .addCase(updateSelectedCartItem.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(updateQuantityCartItem.pending, (state) => {
                state.loading = true
            })
            .addCase(updateQuantityCartItem.fulfilled, (state, action) => {
                state.data.cart_items = state.data.cart_items.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
                state.loading = false
            })
            .addCase(updateQuantityCartItem.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.data.cart_items = state.data.cart_items.filter(item => item.id !== action.payload);
                state.loading = false
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(deleteCheckedCartItems.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCheckedCartItems.fulfilled, (state, action) => {
                const updatedItems = action.payload;
                state.data.cart_items = state.data.cart_items.filter(item => {
                    return !updatedItems.some(updatedItem => updatedItem.id === item.id);
                });
                state.loading = false
            })
            .addCase(deleteCheckedCartItems.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(addCartItem.pending, (state) => {
                state.loading = true
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.data.cart_items.push(action.payload)
                state.loading = false
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(addLocalCartItem.pending, (state) => {
                state.loading = true
            })
            .addCase(addLocalCartItem.fulfilled, (state, action) => {
                state.data.cart_items = action.payload
                state.loading = false
            })
            .addCase(addLocalCartItem.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

            .addCase(updateCartToLocalStorage.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCartToLocalStorage.fulfilled, (state, action) => {
                state.data.cart_items = action.payload
                state.loading = false
            })
            .addCase(updateCartToLocalStorage.rejected, (state, action) => {
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })

    },
});
export default cartSlice.reducer;
