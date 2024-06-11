// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  userInfo: null,
  loading: false,
  error: null
};

// Define the thunk for fetching products from the API
export const loginInfo = createAsyncThunk(
  'auth/loginInfo',
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/auth`, { email, password });
      console.log(response.data,"loginINfo");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/sign-up`, { name, email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUserAsync',
  async (updated) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/user`, updated);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
