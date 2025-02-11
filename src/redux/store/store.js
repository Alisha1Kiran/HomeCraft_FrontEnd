import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./../slices/productSlice";
import themeReducer from "./../slices/themeSlice";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer
  },
});

export default store;
