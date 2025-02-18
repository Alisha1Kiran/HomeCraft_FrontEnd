import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Update with your actual API endpoint

// Helper function to handle fetch requests
const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async ({ page = 1, limit = 10, search = "", category = "" }, { rejectWithValue }) => {
    try {
      const data = await fetchData(
        `${API_URL}/products/viewAllProducts?page=${page}&limit=${limit}&search=${search}&category=${category}`,
        { credentials: "include" }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const data = await fetchData(`${API_URL}/products/addProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newProduct),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const data = await fetchData(`${API_URL}/products/editProductDetails/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await fetchData(`${API_URL}/products/deleteProduct/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      return id; // Return the deleted product's ID to remove from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    totalProducts: 0,
    pagination: { currentPage: 1, totalPages: 1 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.pagination = action.payload.pagination || { currentPage: 1, totalPages: 1 };
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
