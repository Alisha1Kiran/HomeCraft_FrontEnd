import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "./../../redux/slices/orderSlice"; // Adjust path accordingly

const UserOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userOrders, loading, error } = useSelector((state) => state.order);
  const theme = useSelector((state) => state.theme.theme);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserOrders(user._id));
    }
  }, [dispatch, user]);

  // Open modal with selected order details
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className={`container mx-auto p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container mx-auto p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <h2 className="text-3xl font-semibold text-center mb-6">Your Orders</h2>

      {userOrders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <span className={`badge ${order.status === "Processing" ? "badge-warning" : "badge-success"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(order)}
                      className={`btn ${theme === "dark" ? "btn-primary" : "btn-secondary"}`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DaisyUI Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
            <div className="space-y-4">
              <div>
                <strong>Order ID:</strong> {selectedOrder._id}
              </div>
              <div>
                <strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Status:</strong>
                <span className={`badge ${selectedOrder.status === "Processing" ? "badge-warning" : "badge-success"}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div>
                <strong>Total Amount:</strong> ${selectedOrder.totalPrice}
              </div>
              <div>
                <strong>Ordered Items</strong>
                {selectedOrder.items.map((item) => (
                <div key={item._id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product_id.images[0].url}
                      alt={item.product_id.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{item.product_id.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Price: ₹{item.price_at_purchase}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
            <div className="modal-action">
              <button
                onClick={closeModal}
                className={`btn ${theme === "dark" ? "btn-secondary" : "btn-primary"}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
