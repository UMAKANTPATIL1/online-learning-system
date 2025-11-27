"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseModal from "./viewCourseModal/page";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmationModal from "../modal/confermationModal.jsx/page";

const ViewCourses = () => {
  const { getData, getAllCourses } = useCourse();
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const router = useRouter();

  const role = localStorage.getItem("role")?.toLowerCase();

  const approvedCourses = getData.filter(
    (course) => course.courseStatus === "APPROVED"
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllCourses();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  const SkeletonCard = () => (
    <div className="bg-white border rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </div>
  );

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(
        `https://lms-production-9f83.up.railway.app/api/auth/delete/${courseId}`
      );

      if (response.status === 200) {
        toast.success("Course deleted successfully");
        await getAllCourses();
        setIsConfirmOpen(false);
        setCourseToDelete(null);
      } else {
        toast.error("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Something went wrong while deleting the course");
    }
  };

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">View Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black">
        {loading
          ? Array.from({ length: visibleCount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : approvedCourses.slice(0, visibleCount).map((course) => (
              <div
                key={course.id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center relative"
              >
                {/* Delete button (Admin only) */}
                {role === "admin" && (
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setCourseToDelete(course.id);
                      setIsConfirmOpen(true);
                    }}
                  >
                    <MdDeleteForever size={26} />
                  </button>
                )}

                <img
                  src={course.thumbnailUrl || "/default-avatar.png"}
                  alt={course.courseTitle}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />

                <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
                <p className="text-gray-600 text-sm my-1 text-center">
                  {course.category}
                </p>

                {/* Role-based button behavior */}
                {(role === "admin" || role === "instructor") && (
                  <button
                    className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded transition mt-2"
                    onClick={() =>
                      router.push(
                        `/course/${course.courseTitle
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    Explore Course
                  </button>
                )}

                {role === "student" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition mt-2 cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    View Details
                  </button>
                )}
              </div>
            ))}
      </div>

      {/* Confirmation Modal (Admin only) */}
      {role === "admin" && (
        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => handleDelete(courseToDelete)}
          title="Delete Course"
          message="Are you sure you want to delete this course? This action cannot be undone."
          confirmText="Delete"
          confirmColor="bg-red-600 hover:bg-red-700"
        />
      )}

      {/* Course View Modal (for Students) */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          userId={localStorage.getItem("id")}
        />
      )}

      {/* Load More Button */}
      {!loading && visibleCount < approvedCourses.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;
