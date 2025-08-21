import Modal from "@/component/modal/page";
import React from "react";

const InstructorModal = ({ instructor, onClose }) => {
  if (!instructor) return null;

  return (
    <Modal onClose={onClose} modalBgColor="bg-gray-100">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={instructor.imageUrl}
            alt={instructor.name}
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {instructor.name}
        </h2>
        <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">
          {instructor.role}
        </p>
      </div>

      {/* Info Section */}
      <div className="mt-6 divide-y divide-gray-300 rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center p-3">
          <span className="text-gray-600 font-medium flex items-center gap-2">
            📧 Email
          </span>
          <span className="text-gray-800">{instructor.email}</span>
        </div>
        <div className="flex justify-between items-center p-3">
          <span className="text-gray-600 font-medium flex items-center gap-2">
            📞 Phone
          </span>
          <span className="text-gray-800">{instructor.phoneNo}</span>
        </div>
        <div className="flex justify-between items-center p-3">
          <span className="text-gray-600 font-medium flex items-center gap-2">
            🎓 Expert In
          </span>
          <span className="text-gray-800">{instructor.expertIn}</span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
        >
          Close
        </button>
        <button
          onClick={() => alert("Edit feature coming soon!")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Edit
        </button>
      </div>
    </Modal>
  );
};

export default InstructorModal;
