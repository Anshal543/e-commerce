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
            state.cart.push(action.payload);
        },
        removeCart(state, action) {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
    },
    // 
});

// Export the actions and reducer
export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;