import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteCartItem } from "../../redux/slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const getGuestId = () => {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
};

const Cart = () => {
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);
  const dispatch = useDispatch();
  const { cartItems = [], total_price = 0 } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    emirate: "",
    zip: "",
    country: "India",
  });

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

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
      alert("Please fill out all shipping details.");
      return;
    }
    setIsPaymentVisible(true);
  };

  return (
    <div className="p-6 pt-50 max-w-4xl mx-auto shadow-lg bg-gradient-to-bl from-blue-300 to-blue-950 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Subtotal</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product_id?._id} className="border-b border-gray-200 hover:bg-blue-300">
                  <td className="p-3 flex flex-col items-center">
                    {item.product_id?.images?.length > 0 && (
                      <img
                        src={item.product_id.images[0]?.url}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                        alt={item.product_id?.name || "Product image"}
                      />
                    )}
                    <div className="mt-2 text-center font-semibold">{item.product_id?.name || "Unknown Product"}</div>
                  </td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-center">{item.product_id?.price || 0}/-</td>
                  <td className="p-3 text-center">{(item.product_id?.price || 0) * item.quantity}/-</td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleRemove(item.product_id?._id)} className="text-red-600 hover:text-red-800 font-semibold">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-xl font-bold text-right">Total: {total_price} /-</p>
      {cartItems.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsAddressVisible(!isAddressVisible)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md"
          >
            {isAddressVisible ? "Cancel" : "Proceed to Checkout"}
          </button>
          {isAddressVisible && (
            <div className="mt-4 p-6 bg-gray-400 shadow-lg rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="street" placeholder="Street Address" className="p-2 border rounded" value={shippingAddress.street} onChange={handleAddressChange} />
                <input type="text" name="city" placeholder="City" className="p-2 border rounded" value={shippingAddress.city} onChange={handleAddressChange} />
                <input type="text" name="state" placeholder="State" className="p-2 border rounded" value={shippingAddress.state} onChange={handleAddressChange} />
                <input type="text" name="zip" placeholder="ZIP Code" className="p-2 border rounded" value={shippingAddress.zip} onChange={handleAddressChange} />
              </div>
              <button onClick={handleProceedToPayment} className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md">
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      )}
      {isPaymentVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2xl">
            <button onClick={() => setIsPaymentVisible(false)} className="text-red-600 float-right">✖</button>
            <Elements stripe={stripePromise}>
              <PaymentForm total_price={total_price} shippingAddress={shippingAddress} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
