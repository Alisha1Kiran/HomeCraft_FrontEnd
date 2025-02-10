import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "./../../redux/slices/productSlice"; // Update the import path accordingly

const HeaderSearch = ({ className, inputClassName, ...props }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);

  // Flag to track if navigation is allowed
  const [isNavigated, setIsNavigated] = useState(false);

  useEffect(() => {
    // Navigate only after the products are successfully fetched
    if (status === "succeeded" && !isNavigated) {
      navigate("/items");
      setIsNavigated(true); // Set the flag to true so we don't navigate repeatedly
      setSearchValue(""); // Clear the search input value
    }
  }, [status, navigate, isNavigated]); // The effect depends on `status` and `isNavigated`

  const handleSearch = () => {
    if (searchValue.trim()) {
      setIsNavigated(false); // Reset navigation flag before making the request
      dispatch(fetchFilteredProducts({ searchTerm1: searchValue.trim() }));
    }
  };

  return (
    <div className={`form-control ${className}`}>
      <div className="flex items-center">
        <input
          type="text"
          className={`input input-bordered ${inputClassName}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          {...props}
        />
        <button
          type="button"
          className="btn btn-square"
          onClick={handleSearch}
        >
          <Search />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
