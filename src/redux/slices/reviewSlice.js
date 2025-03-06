import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching reviews for a product
export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/review/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      console.log("data : ", data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for posting a review
export const postProductReview = createAsyncThunk(
  "reviews/postProductReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/review/addReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post review");
      }

      const data = await response.json();
      return data.data; // Assuming response structure has review in 'data'
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  reviews: [],
  loadingReview: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetReviews: (state) => {
      console.log("Resetting reviews...");
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch product reviews
    builder.addCase(fetchProductReviews.pending, (state) => {
      state.loadingReview = true;
    });
    builder.addCase(fetchProductReviews.fulfilled, (state, action) => {
      state.loadingReview = false;
      state.reviews = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductReviews.rejected, (state, action) => {
      state.loadingReview = false;
      state.error = action.payload;
    });

    // Post a new product review
    builder.addCase(postProductReview.pending, (state) => {
      state.loadingReview = true;
    });
    builder.addCase(postProductReview.fulfilled, (state, action) => {
      state.loadingReview = false;
      state.reviews.push(action.payload);
      state.error = null;
    });
    builder.addCase(postProductReview.rejected, (state, action) => {
      state.loadingReview = false;
      state.error = action.payload;
    });
  },
});

export const { resetReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
