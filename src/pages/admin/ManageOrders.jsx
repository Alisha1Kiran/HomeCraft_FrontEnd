import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import Pagination from "./../common/Pagination";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
// import EditOrderModal from "./EditOrderModal";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { allOrders, pagination, loading, error } = useSelector((state) => state.order);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // To manage the selected order for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [orderToUpdate, setOrderToUpdate] = useState(null); // To store the order for updating status
  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState(false); // To control status update modal visibility

  useEffect(() => {
    dispatch(fetchAllOrders({ search: searchQuery, page: pagination.currentPage }));
  }, [dispatch, searchQuery, pagination.currentPage]);

  const handleUpdateOrderStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }))
      .then(() => {
        toast.success("Order status updated successfully");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleStatusUpdate = (orderId) => {
    const order = allOrders.find((order) => order._id === orderId);
    setOrderToUpdate(order);
    setIsStatusUpdateModalOpen(true);
  };

  const cancelStatusUpdate = () => {
    setIsStatusUpdateModalOpen(false); // Close status update modal without action
    setOrderToUpdate(null); // Reset the order to update
  };

  const handleSearch = useCallback(
    debounce((value) => setSearchQuery(value), 500),
    []
  );

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
      <h2 className="text-2xl text-cyan-50 font-bold mb-4">Manage Orders</h2>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="input input-bordered w-full max-w-md"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-cyan-50 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id} className="border-b text-gray-700">
                <td className="py-3 px-4">{order._id}</td>
                <td className="py-3 px-4">{order.user_id?.fullName || "Guest"}</td>
                <td className="py-3 px-4">{order.totalPrice}</td>
                <td className="py-3 px-4">{order.status}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => handleStatusUpdate(order._id)}
                  >
                    Update Status
                  </button>
                  {/* <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleUpdateOrderStatus(order._id, 'Shipped')}
                  >
                    Mark as Shipped
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => handleUpdateOrderStatus(order._id, 'Delivered')}
                  >
                    Mark as Delivered
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => dispatch(fetchAllOrders({ searchQuery, page }))}
      />

      {/* Edit Order Modal */}
      {/* {isModalOpen && selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}

      {/* Status Update Modal */}
      {isStatusUpdateModalOpen && orderToUpdate && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Update Order Status</h2>
            <div className="mb-4">
              <p>Current Status: {orderToUpdate.status}</p>
              <div className="space-x-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleUpdateOrderStatus(orderToUpdate._id, 'Shipped')}
                >
                  Mark as Shipped
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleUpdateOrderStatus(orderToUpdate._id, 'Delivered')}
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={cancelStatusUpdate}
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

export default ManageOrders;
