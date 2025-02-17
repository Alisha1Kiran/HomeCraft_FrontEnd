// src/slices/adminDashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// src/slices/adminDashboardSlice.js
export const fetchTotalUsers = createAsyncThunk(
    'adminDashboard/fetchTotalUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/totalUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies (token) are included in the request
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch total users");
        return data.data.totalUsers;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchTotalProducts = createAsyncThunk(
    'adminDashboard/fetchTotalProducts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/totalProduct`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies (token) are included in the request
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch total products");
        return data.data.totalCount;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchTotalOrders = createAsyncThunk(
    'adminDashboard/fetchTotalOrders',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/order/totalOrder`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies (token) are included in the request
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch total orders");
        return data.data.totalOrders;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


// Fetch User Growth (user statistics)
export const fetchUserGrowth = createAsyncThunk(
    'adminDashboard/fetchUserGrowth',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/statistics/user-growth`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies (token) are included in the request
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch user growth data');
        return data.data; // Assuming 'data' contains the actual data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Fetch Sales Trend (order statistics)
export const fetchSalesTrend = createAsyncThunk(
    'adminDashboard/fetchSalesTrend',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/statistics/sales-trend`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies (token) are included in the request
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch sales trend data');
        return data.data; // Assuming 'data' contains the actual data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

// Create the adminDashboard slice
const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    userGrowth: [],
    salesTrend: [],
    loading: false,
    error: {
        users: null,
        products: null,
        orders: null,
        userGrowth: null,
        salesTrend: null,
      }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload;
        state.error.users = null;
      })
      .addCase(fetchTotalUsers.rejected, (state, action) => {
        state.loading = false;
        state.error.users = action.payload || 'Failed to fetch total users';
      })
      .addCase(fetchTotalProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload;
        state.error.products = null;
      })
      .addCase(fetchTotalProducts.rejected, (state, action) => {
        state.loading = false;
        state.error.products = action.payload || 'Failed to fetch total products';
      })
      .addCase(fetchTotalOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrders = action.payload;
        state.error.orders = null;
      })
      .addCase(fetchTotalOrders.rejected, (state, action) => {
        state.loading = false;
        state.error.orders = action.payload || 'Failed to fetch total orders';
      }).addCase(fetchUserGrowth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserGrowth.fulfilled, (state, action) => {
        state.loading = false;
        state.userGrowth = action.payload;
        state.error.userGrowth = null;
      })
      .addCase(fetchUserGrowth.rejected, (state, action) => {
        state.loading = false;
        state.error.userGrowth = action.payload || 'Failed to fetch user growth data';
      })
      .addCase(fetchSalesTrend.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.salesTrend = action.payload;
        state.error.salesTrend = null;
      })
      .addCase(fetchSalesTrend.rejected, (state, action) => {
        state.loading = false;
        state.error.salesTrend = action.payload || 'Failed to fetch sales trend data';
      });
  },
});

export default adminDashboardSlice.reducer;
