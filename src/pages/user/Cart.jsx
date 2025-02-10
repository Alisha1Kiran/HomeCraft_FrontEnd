import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteCartItem } from "../../redux/slices/cartSlice";

const getGuestId = () => {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = crypto.randomUUID(); // Generate unique guest_id
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems = [], total_price = 0 } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;

    dispatch(fetchCart({ user_id, guest_id }));
  }, [dispatch, user]);

  const handleRemove = (product_id) => {
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;

    dispatch(deleteCartItem({ user_id, product_id, guest_id }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product_id?._id}>
                  <td className="flex flex-col justify-center items-center w-50">
                    {item.product_id?.images?.length > 0 && (
                      <img
                        src={item.product_id.images[0]?.url}
                        className="w-30 h-30 m-2"
                        alt={item.product_id?.name || "Product image"}
                      />
                    )}
                    <div>{item.product_id?.name || "Unknown Product"}</div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.product_id?.price || 0}/-</td>
                  <td>{(item.product_id?.price || 0) * item.quantity}/-</td>
                  <td>
                    <button onClick={() => handleRemove(item.product_id?._id)} className="text-red-500">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 font-bold">Order Total: {total_price} /-</p>
    </div>
  );
};

export default Cart;
