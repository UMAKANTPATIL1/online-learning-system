"use client";

import { useCourse } from "@/app/contextApi/page";
import Modal from "@/component/modal/page";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdPerson, MdCategory, MdAttachMoney, MdClose, MdCheckCircle } from "react-icons/md";

const CourseModal = ({ course, onClose, userId }) => {
  if (!course) return null;

  const { postEnrolledCourse } = useCourse();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Safe localStorage access
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role")?.toLowerCase());
    }
  }, []);

  const handleEnrollCourse = async () => {
    if (!userId) {
      // alert("Please login to enroll");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      await postEnrolledCourse(course.id, userId);
      onClose();
    } catch (err) {
      console.error("Enrollment failed:", err);
      // alert("Failed to enroll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} modalBgColor="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full mx-4 relative">

      {/* Hero Image Section */}
      <div className="relative h-48 sm:h-64 bg-gray-100">
        <img
          src={course.thumbnailUrl || "/assets/default-course.png"}
          alt={course.courseTitle}
          className="w-full h-full object-cover"
        />
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition backdrop-blur-sm"
        >
          <MdClose size={20} />
        </button> */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
          {course.category || "General"}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight shadow-sm">
            {course.courseTitle}
          </h2>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 md:p-6">

        {/* Metadata Grid */}
        <div className="flex flex-wrap gap-4 sm:gap-8 mb-4 text-sm text-gray-600 border-b border-gray-100 pb-auto">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
              <MdPerson size={18} />
            </div>
            <div>
              <span className="block text-xs text-gray-400 font-semibold uppercase">Instructor</span>
              <span className="font-medium text-gray-900">{course.instructorName || "Unknown"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-green-50 p-1.5 rounded-full text-green-600">
              <MdAttachMoney size={18} />
            </div>
            <div>
              <span className="block text-xs text-gray-400 font-semibold uppercase">Price</span>
              <span className="font-medium text-gray-900 text-lg">₹{course.coursePrice}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 ">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">About this Course</h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-h-40 overflow-y-auto pr-4 text-justify scrollbar-thin scrollbar-thumb-gray-200">
            {course.courseDescription || "No description available for this course."}
          </p>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-between  gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg cursor-pointer border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition w-full sm:w-auto"
          >
            Cancel
          </button>

          {role === "student" && (
            <button
              onClick={handleEnrollCourse}
              disabled={loading}
              className={`px-8 py-3 cursor-pointer rounded-lg text-white font-bold shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
                }
              `}
            >
              {loading ? (
                <>Enrollment Processing...</>
              ) : (
                <>
                  Enroll Now <MdCheckCircle />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
