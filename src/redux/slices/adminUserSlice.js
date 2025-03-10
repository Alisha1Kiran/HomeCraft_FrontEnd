import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users for admin with pagination and search
export const fetchAllUsers = createAsyncThunk(
  "adminUser/fetchAllUsers",
  async ({ page = 1, limit = 10, search }) => {
    let query = `page=${page}&limit=${limit}`;
    if (search) query += `&search=${encodeURIComponent(search)}`; // Add search only if it exists
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/viewAllUsers?${query}`,    
      {
        method: "GET",
        credentials: "include", // Ensures cookies (JWT token) are sent
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  }
);

// Update user data (including promoting/demoting roles)
export const updateUserDetails = createAsyncThunk(
  "adminUser/updateUserDetails",
  async ({ id, userData }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/updateUserData/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include"
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
    let data = await response.json();
    return data.data;
  }
);

// Delete user account
export const deleteUser = createAsyncThunk(
  "adminUser/deleteUser",
  async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/deleteAccount/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    let data = await response.json();
    return data.data;
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    users: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
    },
    status: "idle",
    error: null,
    totalUsers: 0,
  },
  reducers: {
    resetAdminUsers: (state) => {
      state.users = [];
      state.pagination = { currentPage: 1, totalPages: 1 };  // Reset pagination state
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.data.usersList;
        state.totalUsers = action.payload.data.totalUsers;
        state.pagination = {
          currentPage: action.payload.data.currentPage,  // Set currentPage from API response
          totalPages: action.payload.data.totalPages,    // Set totalPages from API response
        };
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // const updatedUserIndex = state.users.findIndex(
        //   (user) => user.id === action.payload.id
        // );
        // if (updatedUserIndex !== -1) {
        //   state.users[updatedUserIndex] = action.payload;
        // }
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetAdminUsers } = adminUserSlice.actions;
export default adminUserSlice.reducer;
