import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/productComponents/ProductCard";
import NoProducts from "./NoProducts";
import Loading from "../../components/sharedComponents/Loading";
import { resetProductState } from "../../redux/slices/productSlice";

const Products = () => {
  const { searchTerm1, searchTerm2 } = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [sortOrder, setSortOrder] = useState(""); // State for sorting
  const theme = useSelector((state) => state.theme.theme);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (searchTerm1 || searchTerm2) {
      dispatch(fetchFilteredProducts({ searchTerm1, searchTerm2 }));
      setVisibleCount(8);
    }

    return () => {
      dispatch(resetProductState()); // 👈 this will run when component unmounts
    };
  }, [dispatch, searchTerm1, searchTerm2]);

  // Sorting Logic
  const sortedProducts = [...(items?.products || [])]
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    })
    .slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="mx-auto px-4 pb-10 pt-50">
      {/* Loading State */}
      {status === "loading" && <Loading />}

      {/* Error State */}
      {status === "failed" ? (
        error === "No products found" ? (
          <NoProducts />
        ) : (
          <p className="text-red-500">Error: {error}</p>
        )
      ) : null}

      {/* Success State */}
      {status === "succeeded" && items?.products?.length > 0 ? (
        <>
          {/* Heading */}
          <div className="flex justify-between items-center mb-6">
            {(searchTerm1 || searchTerm2) && (
              <h1
                className={`border-t-4 border-b-4 px-4 py-1 text-2xl font-semibold capitalize ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {searchTerm2 ? searchTerm2 : searchTerm1}
              </h1>
            )}

            {/* Sort Dropdown */}
            <select
              className={`border p-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
            {sortedProducts.map((productData) => (
              <ProductCard key={productData._id} productData={productData} />
            ))}
          </div>

          {items?.products?.length > visibleCount && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 btn btn-primary text-white rounded hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        status === "succeeded" && <NoProducts />
      )}
    </div>
  );
};

export default Products;
