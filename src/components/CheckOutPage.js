import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../Constants";
import useCheckoutForm from "../utils/useCheckoutForm";
import { clearCart } from "../utils/cartSlice";
import { clearCheckout } from "../utils/checkoutSlice";


const CheckOutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { form, handleChange, saveDetails, isSaved } = useCheckoutForm();
  const [error, setError] = useState("");

  const getItemPriceInRupees = (item) => {
    const priceInPaise = item?.price ?? item?.defaultPrice ?? 0;
    return priceInPaise / 100;
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + getItemPriceInRupees(item) * item.quantity,
        0
      ),
    [cartItems]
  );
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const deliveryFee = cartItems.length ? 30 : 0;
  const discount = subtotal >= 500 ? 50 : 0;
  const total = Math.max(subtotal + tax + deliveryFee - discount, 0);

  const validateForm = () => {
    const required = {
      name: "Name",
      email: "Email",
      phone: "Phone number",
      pincode: "Pincode",
      address: "Address",
    };
    const missing = Object.entries(required)
      .filter(([key]) => !form[key]?.trim())
      .map(([, label]) => label);

    if (missing.length) {
      setError(`Please complete: ${missing.join(", ")}`);
      return false;
    }

    setError("");
    return true;
  };

  const handleSaveDetails = () => {
    if (validateForm()) {
      saveDetails();
    }
  };

  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      setError("Your cart is empty. Add some items to continue.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const customerDetails = { ...form };
    const itemsSnapshot = cartItems.map((item) => ({ ...item }));

    saveDetails();
    dispatch(clearCart());
    dispatch(clearCheckout());

    navigate("/placeorder", {
      state: {
        form: customerDetails,
        total: total.toFixed(2),
        breakdown: {
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          deliveryFee: deliveryFee.toFixed(2),
          discount: discount.toFixed(2),
        },
        items: itemsSnapshot,
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <button onClick={() => navigate(-1)} className="text-blue-500">
          ← Back
        </button>
        <h2 className="text-3xl font-bold">Checkout</h2>
      </div>

      {error && (
        <div className="rounded border border-red-400 bg-red-50 px-4 py-2 text-red-700">
          {error}
        </div>
      )}

      {/* Delivery Details */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Delivery Details</h2>
          {isSaved && (
            <span className="text-sm text-green-600">Details saved ✔</span>
          )}
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone No</label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Pincode</label>
            <input
              name="pincode"
              type="text"
              placeholder="Enter your area pincode"
              value={form.pincode}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Enter your delivery address"
              value={form.address}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:border-gray-500"
            />
          </div>
        </form>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSaveDetails}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Save Details
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="font-bold text-2xl mb-4">Order Summary</h1>

        <div className="space-y-4">
          {cartItems.length ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3 last:border-b-0"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={IMG_CDN_URL + item.imageId}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                  <p className="font-semibold">
                    ₹{(getItemPriceInRupees(item) * item.quantity).toFixed(2)}
                  </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          {cartItems.length > 0 && (
            <div className="pt-4 space-y-2 border-t">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Special instructions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Special Instructions</h3>
        <textarea
          name="instructions"
          placeholder="Add note for delivery..."
          value={form.instructions}
          onChange={handleChange}
          className="w-full p-3 border rounded h-20"
        ></textarea>
      </div>

      {/* Place Order Button */}
      <div className="mt-6">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg disabled:opacity-50"
          disabled={!cartItems.length}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
