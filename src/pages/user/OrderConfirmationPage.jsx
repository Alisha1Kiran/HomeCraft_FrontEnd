import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { orderDetails } = useSelector((state) => state.order);
  const theme = useSelector((state) => state.theme.theme); // Light or Dark mode

  console.log('orderDetails : ', orderDetails);

  return (
    <div
      className={`container mx-auto p-8 max-w-4xl ${
        theme === 'dark' ? 'bg-cyan-950 text-white' : 'bg-slate-200 text-gray-800'
      }`}
    >
      <h1
        className={`text-4xl font-semibold text-center mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
      >
        Order Confirmation
      </h1>
      <div
        className={`shadow-lg rounded-lg p-8 space-y-6 ${
          theme === 'dark' ? 'bg-cyan-800' : 'bg-white'
        }`}
      >
        <h2
          className={`text-2xl font-semibold text-center mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Thank you for your order!
        </h2>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h3
            className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-700'
            }`}
          >
            Shipping Information
          </h3>
          <div
            className={`${
              theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800'
            } p-4 rounded-lg`}
          >
            <p className="text-gray-900">
              <strong>Street:</strong> {orderDetails?.order?.shippingAddress?.street}
            </p>
            <p className="text-gray-900">
              <strong>City:</strong> {orderDetails?.order?.shippingAddress?.city}
            </p>
            <p className="text-gray-900">
              <strong>State:</strong> {orderDetails?.order?.shippingAddress?.state}
            </p>
            <p className="text-gray-900">
              <strong>ZIP:</strong> {orderDetails?.order?.shippingAddress?.zip}
            </p>
            <p className="text-gray-900">
              <strong>Country:</strong> {orderDetails?.order?.shippingAddress?.country}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h3
            className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-700'
            }`}
          >
            Order Summary
          </h3>
          <div
            className={`${
              theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-50 text-gray-800'
            } p-4 rounded-lg`}
          >
            <ul className="space-y-4">
              {orderDetails?.order?.items.map((item) => (
                <li
                  key={item.product_id._id}
                  className={`flex justify-between ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  <span>{item.product_id.name}</span>
                  <span>
                    {item.quantity} x{' '}
                    <span className="font-semibold">${item.price_at_purchase}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Total Price */}
        <div
          className={`flex justify-between font-semibold py-4 border-t border-gray-200 mt-6 ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
          }`}
        >
          <span>Total Price:</span>
          <span className="text-xl">${orderDetails?.order?.totalPrice}</span>
        </div>

        {/* Navigation Button */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className={`btn btn-primary w-full sm:w-auto py-3 px-8 rounded-md font-medium ${
              theme === 'dark'
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
