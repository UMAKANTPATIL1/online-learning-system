"use client";
import Modal from "@/component/modal/page";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Login = ({ setShowModal }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8082/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          withCredentials: true, // Needed if you're storing token in cookie
        }
      );

      if (response.status === 200) {
        const { token, role } = response.data;
        console.log("role", role);
        // Store in localStorage if you're not using HttpOnly cookies
        // localStorage.setItem("token", token);
        // localStorage.setItem("role", role.toLowerCase());

        setShowModal(false); // Close modal

        // Redirect based on role
        const lowerRole = role.toLowerCase();
        router.push("/");
        if (lowerRole === "admin") {
          router.push("admin/dashboard");
          // } else if (lowerRole === "instructor") {
          //   router.push("/instructor");
          // } else {
          //   router.push("/student");
          // }
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid credentials. Try again.");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Optional: close modal if user clicks "X"
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
