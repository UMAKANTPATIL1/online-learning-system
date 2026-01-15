"use client";
import Modal from "@/component/modal/page";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCourse } from "../contextApi/page";
import Register from "../register/page";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";

const Login = ({ setShowModal }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true); // toggle state
  const searchParams = useSearchParams();

  // get login and error from context
  const { login, error } = useCourse();

  const handleLogin = (e) => {
    e.preventDefault();
    login(credentials, setShowModal);
  };
  useEffect(() => {
    fetch("http://localhost:8082/api/auth/me", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        router.push("/dashboard");
      }
    });
  }, []);
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;

    const storeId = localStorage.getItem("id") || Cookies.get("id");
    localStorage.setItem("id", storeId);
    console.log("storeId", storeId);
  };

  useEffect(() => {
    if (!searchParams.get("showLogin")) {
      setShowModal(false);
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal onClose={() => setShowModal(false)} modalBgColor="bg-white">
      {/* Toggle buttons with underline animation */}
      <div className="relative flex mb-6 border-b border-gray-200 ">
        <button
          className={`flex-1 py-2 font-medium relative cursor-pointer ${
            isLogin ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
          {isLogin && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 "
            />
          )}
        </button>
        <button
          className={`flex-1 py-2 font-medium relative cursor-pointer ${
            !isLogin ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
          {!isLogin && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
            />
          )}
        </button>
      </div>

      {/* Auth Form */}
      {isLogin ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-bold">Welcome Back</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 cursor-pointer rounded hover:bg-blue-800"
          >
            Login
          </button>
          <p className="text-sm text-center">
            {" "}
            <a href="#" className="text-blue-600 hover:underline">
              {" "}
              Forget Password?{" "}
            </a>{" "}
          </p>
          <div
            className=" flex items-center justify-center w-1/2 mx-auto bg-gray-100 border-2 rounded-3xl cursor-pointer hover:bg-gray-200 transition-duration-100"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="inline-block text-red-500 mr-2 " size={20} />

            <span className="text-black py-2 ">Sign in with Google</span>
          </div>
        </form>
      ) : (
        <Register />
      )}
    </Modal>
  );
};

export default Login;
