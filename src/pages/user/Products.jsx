import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchFilteredProducts,
} from "../../redux/slices/productSlice";
import ProductCard from "../../components/productComponents/ProductCard";
import Loading from "../../components/sharedComponents/Loading";

const Products = () => {
  const { searchTerm1, searchTerm2 } = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const theme = useSelector((state) => state.theme.theme);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    console.log(`${searchTerm1} and ${searchTerm2}`)
    if (searchTerm1 || searchTerm2) {
      dispatch(fetchFilteredProducts({ searchTerm1, searchTerm2 }));
    }
  }, [dispatch, searchTerm1, searchTerm2]);

  return (
    <div className="mx-auto p-4">
      {/* Loading State */}
      {status === "loading" && (
        <Loading />
      )}

      {/* Error State */}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      {/* Success State */}
      {status === "succeeded" && items?.products?.length > 0 ? (
        <>
          {/* Heading */}
          <div className="flex justify-center mb-6">
            <h1 className="border-t-4 border-b-4 px-4 py-1 text-2xl font-semibold capitalize">
              {searchTerm2}
            </h1>
          </div>

          {/* Layout for Medium to Large Screens */}
          <div className="hidden md:flex gap-6">
            {/* Left Side - Filters */}
            <div className={`w-1/4 p-4 rounded-md ${theme === "dark" ? "glass" : "bg-gray-100"}`}>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <p>Filter options go here...</p>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-300"></div>

            {/* Right Side - Products */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.products.map((productData) => (
                <ProductCard key={productData._id} productData={productData} />
              ))}
            </div>
          </div>

          {/* Layout for Small Screens */}
          <div className="md:hidden flex flex-col items-center">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Show Filters
            </button>

            {/* Filter Popup */}
            {showFilter && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-md w-3/4">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <p>Filter options go here...</p>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-stretch">
              {items.products.map((productData) => (
                <ProductCard key={productData._id} productData={productData} />
              ))}
            </div>
          </div>
        </>
      ) : (
        status === "succeeded" && (
          <p className="text-center text-gray-500">No products found</p>
        )
      )}
    </div>
  );
};

export default Products;
