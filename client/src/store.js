
import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/product/productSlice"
import cartReducer from "./features/cart/cartSlice"
import postReducer from "./features/post/postSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    posts: postReducer
  },
});

export default store;