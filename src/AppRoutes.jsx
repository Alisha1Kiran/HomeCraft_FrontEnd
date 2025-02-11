import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./redux/slices/authSlice";
import { v4 as uuidv4 } from 'uuid';
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
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

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
      const guestId = localStorage.getItem('guest_id') || uuidv4();
      if (!localStorage.getItem('guest_id')) {
        localStorage.setItem('guest_id', guestId);
      }
    } else {
      // Optionally remove guest ID after user is authenticated (if you don't want to keep it)
      localStorage.removeItem('guest_id');
    }
  }, [dispatch, isAuthenticated]);

//   if (status === "loading") {
//     return (
//       <div>
//         <Loading />
//       </div>
//     ); // Show loading screen while checking authentication
//   }

  return (
    <Router>
        <Toaster position="top-right"
  reverseOrder={false}/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<ProtectedRoute element={<Wishlist />} />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/shope-all" element={<ShopeAll />} /> */}
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
        <Route path="/my-profile" element={<ProtectedRoute element={<Profile />} />} />
        {/* <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
