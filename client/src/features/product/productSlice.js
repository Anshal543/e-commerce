// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  totalProducts: 0,
  error: null,
  selectedProduct: null
};

// Define the thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products');
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
      const response = await axios.get('http://localhost:5000/api/v1/products/search?q=' + search);
      const data = response.data;
      return data

    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products/' + id);
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
       // console.log(qs);
//       const response = await axios.get('http://localhost:8800/products?' + qs);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   });

export const fetchProductByFilter = createAsyncThunk(
  "products/fetchProductByFilter",
  async ({ filter, sort, page }) => {
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

      // console.log(queryParams);
      queryParams += `_page=${page}&_limit=10`;


      const response = await axios.get(`http://localhost:5000/api/v1/products?${queryParams}` + queryParams);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const  createProductAsync = createAsyncThunk(
  'products/createProductAsync',
  async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/products', product);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProductAsync',
  async (product) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/products/${product.id}`, product);
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
        // state.totalProducts = action.payload.total;
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
        // state.totalProducts = action.payload.total;
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
        // state.totalProducts = action.payload.total
        state.error = null;
      });

  },
});

// Export the actions and reducer
export const { } = productSlice.actions;
export default productSlice.reducer;