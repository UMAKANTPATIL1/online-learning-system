import Modal from "@/component/modal/page";
import React from "react";

const CourseModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <Modal onClose={onClose} modalBgColor="bg-gray-100">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={course.fileUrl || "/default-course.png"}
            alt={course.courseTitle}
            className="w-36 h-28 rounded-lg border border-gray-200 shadow-md object-cover"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          {course.courseTitle}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{course.category}</p>
      </div>

      {/* Info Section */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-5 divide-y divide-gray-200">
        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed pb-4">
          {course.courseDescription || "No description provided."}
        </p>

        {/* Instructor */}
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-600 font-medium">👨‍🏫 Instructor</span>
          <span className="text-gray-900">{course.instructorName}</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-600 font-medium">💰 Price</span>
          <span className="text-green-600 font-bold">
            ₹{course.coursePrice}
          </span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
        >
          Close
        </button>
        <button
          onClick={() => alert("Enroll feature coming soon!")}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>
      </div>
    </Modal>
  );
};

export default CourseModal;
