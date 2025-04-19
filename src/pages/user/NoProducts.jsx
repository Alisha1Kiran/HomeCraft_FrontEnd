import React from "react";
import { Link } from "react-router-dom";

const NoProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No Products"
        className="w-40 h-40 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        No Products Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        We couldn’t find any products matching your search.
      </p>
      {/* <Link to="/">
        <button className="btn btn-primary">Go Back Home</button>
      </Link> */}
    </div>
  );
};

export default NoProducts;
