import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCartItems, loadCartFromLocalStorage, saveCartToLocalStorage } from 'store/reducers/cartRedusers';
import { CartData, localCartItem } from 'types/types';

interface CartState {
    data: CartData;
    localData: localCartItem[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: CartState = {
    data: {
        id: 0,
        session_key: '',
        cart_items: [],
    },
    localData: loadCartFromLocalStorage(),
    status: 'idle',
    error: null,
    laoding: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<localCartItem>) => {
            const existingItem = state.localData.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.localData.push({ ...action.payload, quantity: 1 });
            }

            saveCartToLocalStorage(state.localData);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.laoding = false
            });
    },
});
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
