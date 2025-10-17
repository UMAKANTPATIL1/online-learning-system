"use client";
import React from "react";
import { FaClosedCaptioning, FaRegClosedCaptioning } from "react-icons/fa";
import { IoClose, IoCloseCircle } from "react-icons/io5";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to proceed with this action?",
  confirmText = "Yes",
  cancelText = "No",
  confirmColor = "bg-red-600 hover:bg-red-700", // can change for Update, Delete, etc.
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-sm text-center">
        <button className=" flex justify-end w-full mb-4  ">
          <IoCloseCircle
            onClick={onClose}
            size={28}
            // cursor={2}
            className="cursor-pointer text-gray-800 hover:text-red-500 transition"
          />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`${confirmColor} text-white px-4 py-2 rounded-md transition`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
