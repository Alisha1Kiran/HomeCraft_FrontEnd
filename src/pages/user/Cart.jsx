import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteCartItem } from "../../redux/slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(`${import.meta.env.STRIPE_PUBLIC_KEY}`);

const getGuestId = () => {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems = [], total_price = 0 } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    emirate: "",
    zip: "",
    country: "United Arab Emirates",
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
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zip
    ) {
      alert("Please fill out all shipping details.");
      return;
    }
    setIsAddressVisible(false);
    setIsPaymentVisible(true);
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

      {cartItems.length > 0 && (
        <div>
          {!isPaymentVisible && (
            <button
              onClick={() => setIsAddressVisible(!isAddressVisible)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              {isAddressVisible ? "Cancel" : "Proceed Checkout"}
            </button>
          )}

          {isAddressVisible && (
            <div className="mt-4 p-4 border rounded glass">
              <h3 className="text-lg font-semibold">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <select
                  disabled
                  name="country"
                  className="p-2 border rounded"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                >
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="India" selected>India</option>
                </select>
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  className="p-2 border rounded"
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="p-2 border rounded"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="p-2 border rounded"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                />
                {/* <input
                  type="text"
                  name="emirate"
                  placeholder="Emirate"
                  className="p-2 border rounded"
                  value={shippingAddress.emirate}
                  onChange={handleAddressChange}
                /> */}
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  className="p-2 border rounded"
                  value={shippingAddress.zip}
                  onChange={handleAddressChange}
                />
              </div>
              <button
                onClick={handleProceedToPayment}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {isPaymentVisible && (
            <Elements stripe={stripePromise}>
              <PaymentForm total_price={total_price} shippingAddress={shippingAddress} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
