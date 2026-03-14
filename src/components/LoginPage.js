import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../utils/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const {
    form,
    error,
    success,
    setSuccess,
    handleChange,
    validate,
  } = useLoginForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("authChange"));
    setSuccess(true);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
        </div>

        {error && (
          <div className="rounded border border-red-400 bg-red-50 px-4 py-2 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded border border-green-400 bg-green-50 px-4 py-2 text-green-700 text-sm">
            Login successful! Redirecting you to the home page…
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"

          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

