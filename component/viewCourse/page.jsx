"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseModal from "./viewCourseModal/page";

const ViewCourses = () => {
  const { getData, getAllCourses } = useCourse();
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true); // track loading state
  const router = useRouter();

  const approvedCourses = getData.filter(
    (course) => course.courseStatus === "Approved".toUpperCase()
  );
  console.log("Approved Courses:", approvedCourses);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllCourses(); // Fetch course data
      setLoading(false);
    };
    fetchData();
  }, []);

  // console.log("View Courses Data:", getData);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  // 🔹 Skeleton placeholder card
  const SkeletonCard = () => (
    <div className="bg-white border rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? // Show skeletons while loading
            Array.from({ length: visibleCount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : // Show actual course cards
            approvedCourses.slice(0, visibleCount).map((course) => (
              <div
                key={course.id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <img
                  src={course.fileUrl || "/default-avatar.png"}
                  alt={course.courseTitle}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
                <p className="text-gray-600 text-sm my-1 text-center">
                  {course.category}
                </p>
              </div>
            ))}
      </div>

      {/* Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          userId={localStorage.getItem("id")}
        />
      )}

      {/* Load More */}
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
