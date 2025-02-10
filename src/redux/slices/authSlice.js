import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async function to check authentication
export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/checkAuth`, { 
        method: "GET", 
        credentials: "include", 
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) throw new Error("Not authenticated");
    return await response.json();  // { isAuthenticated: false, message: "Guest user" }
});

// Async function for user login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/login`, {
                method: "POST",
                credentials: "include", // To include cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            return await response.json(); // Returns user data if successful
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async function for user logout
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {
                method: "POST",
                credentials: "include", // To ensure cookies are cleared
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Logout failed");
            }

            return await response.json(); // { message: "Logout successful." }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Register user and auto-login
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ fullName, email, password, address, contactNumber }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/register`, {
                method: "POST",
                credentials: "include", // Include cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password, address, contactNumber }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            return await response.json(); // Returns user data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, isAuthenticated: false, status: "idle", error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => { state.status = "loading"; })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (action.payload.isAuthenticated) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                }
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.status = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload.data; // Set user from response
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            });
    }
});

export const { logout, setGuestId } = authSlice.actions;
export default authSlice.reducer;
