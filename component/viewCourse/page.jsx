"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ViewCourses = () => {
  const { getData, getAllCourses, isVideo } = useCourse();
  const [visibleCount, setVisibleCount] = useState(15);
  const router = useRouter();
  console.log(getData.name);
  useEffect(() => {
    getAllCourses(); // Fetch course data on mount
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  // While checking user, show loader
  // if (!user) {
  //   return <p className="text-gray-600">Loading...</p>;
  // }

  // Only render if admin
  // if (user.role !== "admin") {
  //   return null; // avoid rendering anything before redirect
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getData.slice(0, visibleCount).map((getData) => (
          <div
            key={getData.id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img
              src={getData.fileUrl || "/default-avatar.png"}
              alt={getData.courseTitle}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{getData.courseTitle}</h3>
            <p className="text-gray-600 text-sm my-1 text-center">
              {getData.category}
            </p>
          </div>
        ))}
      </div>

      {visibleCount < getData.length && (
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
