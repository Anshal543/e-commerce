
import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/product/productSlice"
import cartReducer from "./features/cart/cartSlice"
import postReducer from "./features/post/postSlice"
import authReducer from './features/auth/authSlice';
import orderReducer from './features/order/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    posts: postReducer,
    auth: authReducer,
    order: orderReducer
  },
});

export default store;