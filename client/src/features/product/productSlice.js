// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null
};

// Define the thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('http://localhost:8800/products');
      const data = response.data;
      return data

    } catch (error) {
      throw error;
    }
  }
);
export const fetchProductsBySearch = createAsyncThunk(
  'products/fetchProductsBySearch',
  async (search) => {
    try {
      const response = await axios.get('https://dummyjson.com/products/search?q=' + search);
      const data = response.data;
      return data.products

    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id) => {
    try {
      const response = await axios.get('http://localhost:8800/products/' + id);
      const data = response.data;
      return data

    } catch (error) {
      throw error;
    }
  }
);

// export const fetchProductByFilter = createAsyncThunk(
//   "products/fetchProductByFilter",
//   async (filter) => {
//     try {
//       let qs = ''
//       for (let key in filter) {
//         qs += `${key}=${filter[key]}&`
//       }
//       // console.log(qs);
//       const response = await axios.get('http://localhost:8800/products?' + qs);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   });

export const fetchProductByFilter = createAsyncThunk(
  "products/fetchProductByFilter",
  async ({ filter, sort }) => {
    try {
      let queryParams = '';

      // Add sort parameter first
      if (sort) {
        queryParams += `_sort=${sort}&`;
      }
      
      // Add filter parameters
      for (let key in filter) {
        queryParams += `${key}=${filter[key]}&`;
      }

      console.log(queryParams);


      const response = await axios.get('http://localhost:8800/products?' + queryParams);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      .addCase(fetchProductByFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      });

  },
});

// Export the actions and reducer
export const { } = productSlice.actions;
export default productSlice.reducer;