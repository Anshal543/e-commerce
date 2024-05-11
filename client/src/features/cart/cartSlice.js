// productSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  cart: []
};



// Create the product slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCart(state, action) {
      const { quantity } = action.payload
      const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity = quantity;
      }
    }
  },
  // 
});

// Export the actions and reducer
export const { addCart, removeCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;

