import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Fetch Wishlist
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch wishlist");
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Add to Wishlist
export const addToWishlist = createAsyncThunk("wishlist/addToWishlist", async (productId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlist/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
            credentials: "include",
          });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to add to wishlist");
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk("wishlist/removeFromWishlist", async (productId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlist/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ productId }),
              credentials: "include",
            });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to remove from wishlist");
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Wishlist Slice
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.meta.arg);
            });
    },
});

export default wishlistSlice.reducer;
