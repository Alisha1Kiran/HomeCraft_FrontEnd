import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Async thunk Fetching all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/viewAllProducts`
      );

      if (!response) {
        throw new Error("No items found");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to fetch all products.";
    }
  }
);

// Fetch Product By Name
export const fetchProductByName = createAsyncThunk(
  "products/fetchProductByName",
  async (name) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/viewProduct/${encodeURIComponent(name)}`
      );

      const data = await response.json();

      if (!(data.message && data.message === "Product found successfully")) {
        throw new Error("Failed to fetch product data.");
      }
      return data.product;
    } catch (error) {
      return error.message || "Failed to fetch product data.";
    }
  }
);


// Fetching filtered products based on category, sub-category, etc.
export const fetchFilteredProducts = createAsyncThunk(
    "products/fetchFilteredProducts",
    async ({ searchTerm1, searchTerm2 }) => {
      try {
        let url = `${import.meta.env.VITE_API_BASE_URL}/search`;
  
        // Append parameters dynamically
        if (searchTerm1) url += `/${searchTerm1}`;
        if (searchTerm2) url += `/${searchTerm2}`;
  
        const response = await fetch(url);
        if (!response.ok) throw new Error("No products found");
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message || "Failed to fetch products.");
      }
    }
  );

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Store fetched products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    //   ---------------
    .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //  ---------------
      .addCase(fetchProductByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
