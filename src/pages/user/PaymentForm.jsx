import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getGuestId from "../../utils/getGuestId";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { clearCart } from "../../redux/slices/cartSlice";
import { setOrderDetails } from "../../redux/slices/orderSlice";

const PaymentForm = ({ total_price, shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // For success/failure feedback

  const { user } = useSelector((state) => state.auth);
  const guestId = getGuestId();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Ensure Stripe.js is loaded

    setLoading(true);
    setPaymentStatus(null); // Reset the previous payment status

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total_price }),
      });

      const { clientSecret } = await response.json();
      if (!clientSecret) throw new Error("Failed to get client secret");

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        toast.error("Card input elements not found.");
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: user ? user.fullName : "Guest",
          },
        },
      });

      if (error) {
        setPaymentStatus("failed");
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("success");
        toast.success("Payment Successful!");
        const orderData = {
          paymentIntentId: paymentIntent.id,
          user_id: user ? user._id : null,
          guest_id: !user ? guestId : null,
          shippingAddress,
          totalPrice: total_price,
        };

        const orderResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const orderResult = await orderResponse.json();
        if (orderResult.message === "Order placed successfully") {
          // Clear the cart after successful payment
          dispatch(setOrderDetails(orderResult));
          dispatch(clearCart());

          // Redirect to order confirmation page
          navigate("/order-confirmation");  // Make sure to set up this route in your React Router
        }
      }
    } catch (error) {
      setPaymentStatus("failed");
      toast.error("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Shipping Address (Top for smaller screens, Right for larger screens) */}
      <div className="w-full md:w-1/3 p-4 bg-blue-100 rounded-md">
        <h3 className="text-l font-bold text-gray-800">Shipping Address</h3>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Name: {user ? user.fullName : "Guest"}</p>
          <p className="text-sm text-gray-600">Street: {shippingAddress.street}</p>
          <p className="text-sm text-gray-600">City: {shippingAddress.city}</p>
          <p className="text-sm text-gray-600">State: {shippingAddress.state}</p>
          {/* <p className="text-sm text-gray-600">Emirate: {shippingAddress.emirate}</p> */}
          <p className="text-sm text-gray-600">Zip: {shippingAddress.zip}</p>
          <p className="text-sm text-gray-600">Country: {shippingAddress.country}</p>
        </div>
      </div>

      {/* Payment Form (Bottom for smaller screens, Left for larger screens) */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Details</h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Total Amount:</p>
          <p className="text-lg font-semibold text-gray-900">${total_price}</p>
        </div>
        <form onSubmit={handlePayment} className="space-y-4">
          {/* Card Number */}
          <div className="p-3 border rounded-md bg-gray-100">
            <label htmlFor="cardNumber" className="block text-sm text-gray-600">Card Number</label>
            <CardNumberElement id="cardNumber" options={{ style: { base: { fontSize: "16px", padding: "10px" } } }} />
          </div>

          {/* Expiry Date */}
          <div className="p-3 border rounded-md bg-gray-100">
            <label htmlFor="expiryDate" className="block text-sm text-gray-600">Expiry Date</label>
            <CardExpiryElement id="expiryDate" options={{ style: { base: { fontSize: "16px", padding: "10px" } } }} />
          </div>

          {/* CVC */}
          <div className="p-3 border rounded-md bg-gray-100">
            <label htmlFor="cvc" className="block text-sm text-gray-600">CVC</label>
            <CardCvcElement id="cvc" options={{ style: { base: { fontSize: "16px", padding: "10px" } } }} />
          </div>

          <button 
            type="submit" 
            disabled={!stripe || loading} 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : `Pay $${total_price}`}
          </button>

          {/* Feedback Messages */}
          {paymentStatus === "success" && (
            <div className="mt-4 text-green-600">
              <p>Payment was successful! Your order is being processed.</p>
            </div>
          )}
          {paymentStatus === "failed" && (
            <div className="mt-4 text-red-600">
              <p>Payment failed. Please check your details or try again later.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
