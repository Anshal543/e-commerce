// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  userInfo:{}
};

// Define the thunk for fetching products from the API
export const loginInfo = createAsyncThunk(
  'userInfo/loginInfo',
  async ({email, password}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth`, {email, password});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// export const signUp = createAsyncThunk(
//   'userInfo/signUp',
//   async (search) => {
//     try {
//       const response = await axios.get('https://dummyjson.com/products/search?q=' + search);
//       const data = response.data;
//       return data.products

//     } catch (error) {
//       throw error;
//     }
//   }
// );





// Create the product slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInfo.pending, (state) => {
        state.loading = true;
      });
    
      
    

  },
});

// Export the actions and reducer
export const {login } = authSlice.actions;
export default authSlice.reducer;