"use client";

import Modal from "@/component/modal/page";
import React, { useState } from "react";

const Register = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register called with", credentials);
    // TODO: hook your register API
    setShowModal(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="text-xl font-bold">Create Account</h2>
      <div className=" grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={credentials.name}
            onChange={handleOnChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="text"
            value={credentials.email}
            onChange={handleOnChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone No.
          </label>
          <input
            name="phoneNo"
            id="phoneNo"
            type="number"
            value={credentials.phoneNo}
            onChange={handleOnChange}
            max={9}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium">
            Profile Image
          </label>
          <input
            name="imageUrl"
            id="imageUrl"
            type="file"
            value={credentials.imageUrl}
            onChange={handleOnChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          {/* <input
            name="email"
            id="email"
            type="email"
            value={credentials.email}
            onChange={handleOnChange}
            required
            className="w-full p-2 border rounded"
          /> */}
          <select disabled className="w-full p-2 border rounded bg-gray-200">
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
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
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 cursor-pointer rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
