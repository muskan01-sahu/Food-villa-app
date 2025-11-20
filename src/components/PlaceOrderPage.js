import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/", { replace: true });
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderNumber = "#123456" } = orderData;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <button onClick={() => navigate("/home")} className="text-blue-500">
          ← Back to Home / Menu
        </button>
        <h2 className="text-3xl font-bold">Place Order</h2>
      </div>

      <div className="bg-white shadow rounded-lg p-10 text-center space-y-6">
        <h3 className="text-2xl font-semibold">
          Thank you! Your order has been placed successfully.
        </h3>

        <div>
          <p className="text-lg font-medium">Order Number:</p>
          <p className="text-3xl font-bold mt-1">{orderNumber}</p>
        </div>

        <p className="text-gray-600 leading-relaxed">
          We’re excited to prepare your delicious food! Your order is being
          processed and will be delivered to you shortly. Please keep your phone
          handy in case our delivery partner needs to reach you.
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderPage;