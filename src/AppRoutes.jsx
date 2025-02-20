import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./redux/slices/authSlice";
import { v4 as uuidv4 } from "uuid";
import Header from "./pages/common/Header";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/user/Cart";
import ShopeAll from "./pages/user/ShopeAll";
import Products from "./pages/user/Products";
import ProductDetails from "./components/productComponents/ProductDetails";
import Profile from "./pages/common/Profile";
import Loading from "./components/sharedComponents/Loading";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import OrderConfirmationPage from "./pages/user/OrderConfirmationPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import UserOrders from "./pages/user/UserOrders";
import ManageOrders from "./pages/admin/ManageOrders";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector((state) => state.auth);
  const isAdmin = isAuthenticated && user?.role === "admin";

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Set the theme immediately on page load
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Dispatch authentication check when the app loads
  useEffect(() => {
    // If not authenticated, generate guest ID
    if (!isAuthenticated) {
      dispatch(checkAuthStatus());
      const guestId = localStorage.getItem("guest_id") || uuidv4();
      if (!localStorage.getItem("guest_id")) {
        localStorage.setItem("guest_id", guestId);
      }
    } else {
      // Optionally remove guest ID after user is authenticated (if you don't want to keep it)
      localStorage.removeItem("guest_id");
    }
  }, [dispatch, isAuthenticated]);
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/wishlist"
          element={<ProtectedRoute element={<Wishlist />} />}
        />
        <Route path="/orders" element={<ProtectedRoute element={<UserOrders />} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/items" element={<Products />} />
        <Route path="/furniture" element={<Products />} />
        <Route path="/accessories" element={<Products />} />
        <Route path="/furniture/:searchTerm1" element={<Products />} />
        <Route
          path="/furniture/:searchTerm1/:searchTerm2"
          element={<Products />}
        />
        <Route path="/accessories/:searchTerm1" element={<Products />} />
        <Route
          path="/accessories/:searchTerm1/:searchTerm2"
          element={<Products />}
        />
        <Route path="/view-product/:productName" element={<ProductDetails />} />
        <Route
          path="/my-profile"
          element={<ProtectedRoute element={<Profile />} />}
        />

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<AdminProtectedRoute element={<AdminLayout />} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
