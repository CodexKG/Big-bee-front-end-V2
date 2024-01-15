import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import productsReducer from './slices/ProductSlice';
import cartReducer from './slices/cartSlice'
import shopReduser from './slices/shopSlice'
import categoryReducer from './slices/categorySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    produckt: productsReducer,
    cart: cartReducer,
    shop: shopReduser,
    category: categoryReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



