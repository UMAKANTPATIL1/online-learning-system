"use client";
import React, { useEffect, useState } from "react";

const Modal = ({ children, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setShow(true);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = () => {
    setShow(false);
    // Delay unmount until animation completes
    document.body.style.overflow = "auto";
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center  items-center  bg-opacity-40 backdrop-blur-sm transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-black text-lg"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
