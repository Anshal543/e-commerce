
import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/product/productSlice"
import cartReducer from "./features/cart/cartSlice"
import postReducer from "./features/post/postSlice"
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    posts: postReducer,
    auth: authReducer
  },
});

export default store;