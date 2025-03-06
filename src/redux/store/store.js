import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./../slices/productSlice";
import themeReducer from "./../slices/themeSlice";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import userReducer from "../slices/userSlice";
import adminDashboardReducer from "../slices/adminDashboardSlice";
import adminUserReducer from "../slices/adminUserSlice";
import adminProductReducer from "../slices/adminProductSlice";
import orderReducer from "../slices/orderSlice";
import reviewReducer from "../slices/reviewSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    order: orderReducer,
    adminDashboard: adminDashboardReducer,
    adminUserManage: adminUserReducer,
    adminProductManage: adminProductReducer,
    review: reviewReducer
  },
});

export default store;
