import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  deleteProduct,
} from "../../redux/slices/adminProductSlice";
import Pagination from "../common/Pagination";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import EditProductModal from "./EditProductModal";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const {
    products,
    pagination = { currentPage: 1, totalPages: 1 },
    loading,
    error,
  } = useSelector((state) => state.adminProductManage);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  console.log("hfewebhj products : ", products);

  useEffect(() => {
    dispatch(
      fetchAllProducts({ search: searchQuery, page: pagination.currentPage })
    );

  }, [dispatch, searchQuery, pagination.currentPage]);

  const handleUpdateProduct = (productId) => {
    const product = products.find((product) => product._id === productId);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = () => {
    dispatch(deleteProduct(productToDelete))
      .then(() => {
        toast.success("Product deleted successfully");
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
      })
      .catch((err) => toast.error(`Error: ${err.message}`));
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleSearch = useCallback(
    debounce((value) => setSearchQuery(value), 500),
    []
  );

  const handleAddNewProduct = () => {
    setSelectedProduct(null); // Reset selected product to add a new one
    setIsModalOpen(true); // Open the modal
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-cyan-50 font-bold mb-4">Manage Products</h2>

      {/* Search Box and Add New Product Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-full max-w-md"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary ml-4" onClick={handleAddNewProduct}>
          Add New Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-cyan-50 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b text-gray-700">
                  <td className="py-3 px-4">
                    {product.images ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category_id.name}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => handleUpdateProduct(product._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) =>
          dispatch(fetchAllProducts({ searchQuery, page }))
        }
      />

      {/* Edit Product Modal */}
      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p>
              Do you really want to delete this product? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-error"
                onClick={confirmDeleteProduct}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
