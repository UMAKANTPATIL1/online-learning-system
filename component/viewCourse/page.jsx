"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseModal from "./viewCourseModal/page";
import { MdDeleteForever, MdAccessTime, MdOndemandVideo, MdStar } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmationModal from "../modal/confermationModal.jsx/page";

const ViewCourses = () => {
  const { getData, getAllCourses } = useCourse();
  const [visibleCount, setVisibleCount] = useState(12);
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
    setVisibleCount((prev) => prev + 12);
  };

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-0 flex flex-col overflow-hidden animate-pulse h-full">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-full bg-gray-200 rounded"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
        <div className="mt-auto h-10 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete/${courseId}`
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
    <div className="px-4 py-8 text-black max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="text-gray-500 mt-2">Discover high-quality courses to upgrade your skills</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
          : approvedCourses.slice(0, visibleCount).map((course) => (
            <div
              key={course.id}
              className="group bg-white border border-fuchsia-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Delete button (Admin only) */}
              {role === "admin" && (
                <button
                  className="absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCourseToDelete(course.id);
                    setIsConfirmOpen(true);
                  }}
                >
                  <MdDeleteForever size={20} />
                </button>
              )}

              {/* Thumbnail Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={course.thumbnailUrl || "/assets/default-course.png"}
                  alt={course.courseTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm uppercase tracking-wide">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                  <MdStar /> <span className="text-gray-700 font-medium">4.8</span> <span className="text-gray-400">(120 reviews)</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.courseTitle}
                </h3>

                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MdOndemandVideo size={16} />
                    <span>{course.videoUrls?.length || 0} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAccessTime size={16} />
                    <span>{Math.floor(Math.random() * 10 + 2)}h 30m</span>
                  </div>
                </div>

                {/* Price & Action Row (MT-AUTO sticks to bottom) */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xl font-bold text-gray-900">₹{course.coursePrice}</span>
                  </div>

                  {/* Role-based button behavior */}
                  {(role === "admin" || role === "instructor") && (
                    <button
                      className="bg-gray-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      onClick={() =>
                        router.push(
                          `/course/${course.courseTitle
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`
                        )
                      }
                    >
                      Explore
                    </button>
                  )}

                  {role === "student" && (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
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
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:shadow-md transition shadow-sm"
          >
            Load More Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;
