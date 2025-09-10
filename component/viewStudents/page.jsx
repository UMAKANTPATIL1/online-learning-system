import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import CourseModal from "../viewCourse/viewCourseModal/page";

const ViewStudents = () => {
  const { getData, viewStudents } = useCourse();
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await viewStudents(); // assuming this fetches and updates getData
      setLoading(false);
    };
    fetchData();
  }, []);
  // console.log(fetchData);
  const SkeletonCard = () => (
    <div className="bg-white border rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Students</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? // Show skeletons while loading
            Array.from({ length: visibleCount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : // Show actual course cards
            getData.slice(0, visibleCount).map((student) => (
              <div
                key={student.id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedStudent(student)}
              >
                <img
                  src={student.fileUrl || "/default-avatar.png"}
                  alt={student.name}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-gray-600 text-sm my-1 text-center">
                  {student.email}
                </p>
              </div>
            ))}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <CourseModal
          course={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Load More */}
      {/* {!loading && visibleCount < approvedCourses.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ViewStudents;
