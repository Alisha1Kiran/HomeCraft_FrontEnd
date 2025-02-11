import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch user data
export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getUserData/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        return await response.json();
    }
);

// Update user data
export const updateUserData = createAsyncThunk(
    "user/updateUserData",
    async ({ id, userData }) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateUserData/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Failed to update user data");
        }
        return await response.json();
    }
);

// Delete user account
export const deleteUserAccount = createAsyncThunk(
    "user/deleteUserAccount",
    async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/deleteAccount/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error("Failed to delete account");
        }
        return await response.json();
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        resetUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteUserAccount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null; // User is deleted, so clear the user data
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
