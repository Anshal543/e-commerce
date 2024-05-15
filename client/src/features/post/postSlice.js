import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    posts: [],
    loading: false,
    error: null,
};

// Define the thunk for fetching posts from the API
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            //   Assuming each post object from the API has a quantity property
            const postsWithQuantity = response.data.map(post => ({ ...post, quantity: 1 }));
            return postsWithQuantity;
            // return response.data
        } catch (error) {
            throw error;
        }
    }
);

// Define the thunk for adding a post
export const addPost = createAsyncThunk(
    'posts/addPost',
    async (postData) => {
        try {
            const response = await axios.post('http://localhost:3000/posts', postData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Define the thunk for updating a post
export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, postData }) => {
        try {
            const response = await axios.put(`http://localhost:3000/posts/${id}`, postData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/posts/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const emptyCart = createAsyncThunk(
    'posts/emptyCart',
    async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/posts`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Create the posts slice
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to fetch posts";
            })

            .addCase(addPost.fulfilled, (state, action) => {
                // Check if the post already exists, and if so, increase its quantity
                const existingPostIndex = state.posts.findIndex(post => post.id === action.payload.id);
                if (existingPostIndex >= 0) {
                    // Increase the quantity of the existing post
                    state.posts[existingPostIndex].quantity += 1;
                } else {
                    // Otherwise, add the new post to the state with quantity 1
                    state.posts.push(action.payload );
                }
            })


            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                // Filter out the deleted post from the state
                state.posts = state.posts.filter(post => post.id !== action.payload.id);
            });

    },
});

// Export the actions and reducer
export const { } = postsSlice.actions;
export default postsSlice.reducer;