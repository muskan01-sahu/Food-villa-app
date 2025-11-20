import React from "react";
import { useCart } from "../utils/useCart";
import { useNavigate } from "react-router-dom";
const Cart = () => {

  const navigate = useNavigate();  // <-- Add navigation hook
  const { items, increment, decrement, removeFromCart, clear, subtotal, tax, total, getImageUrl } = useCart();

  if (items.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Your cart is empty!</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cart Items ({items.length})</h1>

      <button onClick={clear} className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600">
        Clear Cart
      </button>

      <div className="flex flex-col space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white shadow rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img src={getImageUrl(item.imageId)} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500">₹{((item.price ?? item.defaultPrice) / 100).toFixed(2)}</p>
                </div>
            </div>
            {/* Quantity Control */}
            <div className="flex items-center space-x-2">
              <button onClick={() => decrement(item.id)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.id)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold px-2 hover:underline">X</button>
            </div>

            {/* Total Price Per Item */}
            <div className="font-semibold">
              ₹{(((item.price ?? item.defaultPrice) / 100) * item.quantity).toFixed(2)}
            </div>       
          </div>
        ))}
      </div>

      {/*Order Summary  */}

      <div className="mt-8 bg-white shadow rounded-lg p-6 flex flex-col space-y-2">
        <h1 className="font-bold text-2xl">Order Summary</h1>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
           {/* Redirect to Checkout */}
          <button
          onClick={() => navigate("/checkout")}   // <-- Redirects correctly
          className="mt-4 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
