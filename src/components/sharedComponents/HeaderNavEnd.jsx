import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

const HeaderNavEnd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total_price } = useSelector((state) => state.cart);
  // Calculate total quantity
  const totalQuantity = cartItems?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const [showIndicator, setShowIndicator] = useState(false);
  useEffect(() => {
    setShowIndicator(totalQuantity > 0);
  }, [totalQuantity]);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate("/login"); // Redirect to homepage or login page
  };

  return (
    <div className="navbar-end">
      <div className="hidden md:px-3 md:flex flex-col justify-center items-center">
        {!user ? (
          <>
            <Link to="/login">
              <User />
            </Link>
            <Link to="/login" className="font-light">
              Login
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex flex-col items-center cursor-pointer"
            >
              <User />
              <span className="ml-2 tabIndex={0}">{user.fullName}</span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/my-profile">Profile</Link>
              </li>
              <li>
                <a>Orders</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex px-3 flex-col justify-center items-center">
        <Link to="/wishlist">
          <Heart />
        </Link>
        <Link to="/wishlist" className="hidden font-light md:block">
          Wishlist
        </Link>
      </div>
      <button className="btn btn-ghost btn-circle">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <div className="flex flex-col justify-center items-center">
                <ShoppingCart />
                <div className="hidden font-light md:block">Cart</div>
              </div>
              {showIndicator && (
                <span className="badge badge-sm indicator-item">
                  {totalQuantity}
                </span>
              )}
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{totalQuantity} Items</span>
              <span className="text-info">Subtotal: {total_price}/-</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default HeaderNavEnd;
