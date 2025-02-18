import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ user_id, product_id, quantity, guest_id }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/cart/addToCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, product_id, quantity, guest_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to add item to cart.");
    }
  }
);

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ user_id, guest_id }) => {
    try {
      let url = user_id ? `${import.meta.env.VITE_API_BASE_URL}/user/cart/${user_id}` : `${import.meta.env.VITE_API_BASE_URL}/user/cart/guest/${guest_id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to fetch cart.");
    }
  }
);

// Async thunk for deleting a cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ user_id, product_id, guest_id }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/cart/deleteCartItem`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, product_id, guest_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from cart");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to delete item from cart.");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total_price: 0,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Clear cart action
    clearCart: (state) => {
      state.cartItems = [];
      state.total_price = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.data.items;
        state.total_price = action.payload.data.total_price;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch cart cases
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.data.items;
        state.total_price = action.payload.data.total_price;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete cart item cases
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.data.items;
        state.total_price = action.payload.data.total_price;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
