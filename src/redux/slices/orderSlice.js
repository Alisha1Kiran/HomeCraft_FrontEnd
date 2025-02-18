import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: null,
  status: 'idle', // can be 'pending', 'completed', etc.
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
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
});

export const { setOrderDetails, clearOrderDetails, setOrderStatus, setOrderError } = orderSlice.actions;
export default orderSlice.reducer;
