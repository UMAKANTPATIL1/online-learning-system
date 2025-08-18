"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";

const ViewInstructor = () => {
  // Sample instructors data (replace with API data)

  const { getData, getAllCourses, isVideo } = useCourse();

  useEffect(() => {
    getAllCourses();
  }, []);
  const instructors = getData.map((course) => ({
    id: course.id,
    name: course.courseTitle,
    subject: course.courseDescription,
    image: course.fileUrl, // Assuming fileUrl is the image URL
  }));

  const [visibleCount, setVisibleCount] = useState(15);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  return (
    <div className="p-4">
      {/* Grid of Instructor Cards */}
      <h1 className="text-2xl font-bold mb-4">Instructors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {instructors.slice(0, visibleCount).map((instructor) => (
          <div
            key={instructor.id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{instructor.name}</h3>
            <p className="text-gray-600 text-sm">{instructor.subject}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < instructors.length && (
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

export default ViewInstructor;
