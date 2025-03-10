import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: null, // For order confirmation page
  userOrders: [], // Orders for logged-in user
  allOrders: [], // All orders for admin)
  pagination: {
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
  },
  status: "idle", // 'pending', 'completed'
  loading: false,
  error: null,
};

// Fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${userId}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch user orders");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all orders (Admin) with pagination
export const fetchAllOrders = createAsyncThunk(
    "order/fetchAllOrders",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/orders?page=${page}&limit=${limit}`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch all orders");
  
        const data = await response.json();
        return {
          orders: data.data.orders, // Orders data
          totalOrders: data.data.pagination.totalOrders, // Total number of orders
          totalPages: data.data.pagination.totalPages, // Total pages
          currentPage: data.data.pagination.currentPage, // Current page
        };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to update order status");
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
    setOrderStatus: (state, action) => {
      state.status = action.payload;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Orders (Admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload.orders;
        state.pagination = {
          totalOrders: action.payload.totalOrders,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
        };
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status (Admin)
      .addCase(updateOrderStatus.fulfilled, (state, action) => { 
        state.allOrders = state.allOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      });
  },
});

export const { setOrderDetails, clearOrderDetails, setOrderStatus, setOrderError } = orderSlice.actions;
export default orderSlice.reducer;
