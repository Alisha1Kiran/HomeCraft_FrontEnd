import { useState } from "react";
import { useSelector } from "react-redux";
import getGuestId from "../../utils/getGuestId";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ total_price, shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const guestId = getGuestId();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet.
    }

    setLoading(true);

    try {
      // Step 1: Create a payment intent on the backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total_price      
        }),
      });

      const { clientSecret } = await response.json();

      // Step 2: Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setLoading(false);
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Step 3: Handle successful payment
        const orderData = {
          paymentIntentId: result.paymentIntent.id,
          user_id: user ? user._id : null,
          guest_id: !user ? guestId : null,
          shippingAddress,
          totalPrice: total_price,
        };

        // Call backend to save the order on success
        const orderResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/confirm-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const orderResult = await orderResponse.json();
        if (orderResult.success) {
          alert("Order placed successfully!");
          // Redirect or clear cart after order
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during payment.");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Payment Details</h2>
      <form onSubmit={handlePayment}>
        <CardElement />
        <button type="submit" disabled={!stripe || loading} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
