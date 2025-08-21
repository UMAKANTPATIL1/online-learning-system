"use client";
import Modal from "@/component/modal/page";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCourse } from "../contextApi/page";

const Login = ({ setShowModal }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const searchParams = useSearchParams();

  // get login and error from context
  const { login, error } = useCourse();

  const handleLogin = (e) => {
    e.preventDefault();
    login(credentials, setShowModal); // call context login
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!searchParams.get("showLogin")) {
      setShowModal(false);
    }
  }, []);

  return (
    <Modal onClose={() => setShowModal(false)}>
      <h2 className="text-xl font-bold mb-4">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Your email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={credentials.email}
            onChange={handleOnChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Your password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex items-end justify-end text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 cursor-pointer rounded hover:bg-blue-800"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Not registered?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Create account
          </a>
        </p>
      </form>
    </Modal>
  );
};

export default Login;
