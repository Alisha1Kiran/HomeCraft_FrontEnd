import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { User } from "lucide-react";

const HeaderMenue = ({ isMobile, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [activeMenu, setActiveMenu] = useState(null);

  const menuBackgroundColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const menuHoverBackgroundColor =
    theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const menuItems = [
    {
      label: "Bed Room",
      path: "/furniture/bed room",
      subItems: [
        { label: "Beds", path: "/furniture/bed room/beds" },
        { label: "Mattress", path: "/furniture/bed room/mattress" },
        { label: "Wardrobes", path: "/furniture/bed room/wardrobes" },
        { label: "Dressers", path: "/furniture/bed room/dressers" },
        // { label: "Bathroom add ons", path: "/products/accessories/bathroom-add-ons" },
      ],
    },
    {
      label: "Living Room",
      path: "/furniture/living room",
      subItems: [
        { label: "Sofa", path: "/furniture/living room/sofas" },
        { label: "Tv Unit", path: "/furniture/living room/tv-unit" },
        { label: "Coffee Table", path: "/furniture/living room/coffee-tables" },
      ],
    },
    {
      label: "Dining Room",
      path: "/furniture/dining room",
      subItems: [
        { label: "Dining Set", path: "/furniture/living room/dining-set" },
        { label: "Tables", path: "/furniture/living room/tables" },
        { label: "Chairs", path: "/furniture/living room/chairs" },
      ],
    },
    {
      label: "Utility & Storage",
      path: "/furniture/utility storage",
      subItems: [
        { label: "Shoe Rack", path: "/furniture/utility-storage/shoe-rack" },
        {
          label: "Chest of Drawers",
          path: "/furniture/utility-storage/chest-drawers",
        },
        {
          label: "Kitchen Cabnets",
          path: "/furniture/utility-storage/kitchen-cabnets",
        },
      ],
    },
    {
      label: "Kids & Teens",
      path: "/furniture/kids and teens",
      subItems: [
        { label: "Beds", path: "/furniture/kids-and-teens/beds" },
        { label: "Desks", path: "/furniture/kids-and-teens/desks" },
        { label: "Storage", path: "/furniture/kids-and-teens/storage" },
      ],
    },
    {
      label: "Home Decor",
      path: "/accessories/home decor",
      subItems: [
        { label: "Mirrors", path: "/accessories/home-decor/mirrors" },
        { label: "Wall Decor", path: "/accessories/home-decor/wall-decor" },
        {
          label: "Floor Covering",
          path: "/accessories/home-decor/floor-covering",
        },
        { label: "Lighting", path: "/accessories/home-decor/lighting" },
      ],
    },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // Redirect to homepage or login page
  };

  return (
    <div className={`font-medium ${isMobile ? "flex flex-col p-4" : ""}`}>
      {isMobile ? (
        <>
          {user ? (
            <details className="collapse collapse-plus">
              <summary className="collapse-title text-lg font-semibold">
                {user.fullName} logged in
              </summary>
              <div className="collapse-content">
                <ul className="ml-4 list-disc text-sm">
                  <li>
                    <Link to="/my-profile">View profile</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sign out</button>
                  </li>
                </ul>
              </div>
            </details>
          ) : (
            <div className="ml-4 flex text-lg">
              <Link to="/login">
                <User />
              </Link>
              <Link to="/login" className="font-semibold">
                Login
              </Link>
            </div>
          )}

          {menuItems.map((item, index) => (
            <details key={index} className="collapse collapse-plus">
              <summary className="collapse-title text-lg font-semibold">
                {item.label}
              </summary>
              <div className="collapse-content">
                <ul className="ml-4 list-disc text-sm">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.path}>{subItem.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </>
      ) : (
        /* Desktop View - Hover Dropdown */
        <div className="flex justify-around gap-6 m-2">
          {/* <Link to="/shop-all" className="text-lg font-semibold">
            Shop all
          </Link> */}

          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              {/* Main Menu Item */}
              <Link
                to={item.path}
                className="text-lg font-semibold block px-2 py-2"
                onMouseEnter={() => setActiveMenu(index)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.label}
              </Link>

              {/* Submenu (Hidden by Default, Visible on Hover) */}
              {activeMenu === index && (
                <div
                  className={`absolute left-0 top-full shadow-lg z-50 p-2 rounded-md w-48 ${menuBackgroundColor}`}
                  onMouseEnter={() => setActiveMenu(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <ul className="flex flex-col space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className={`block px-3 py-1 hover:${menuHoverBackgroundColor}`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderMenue;
