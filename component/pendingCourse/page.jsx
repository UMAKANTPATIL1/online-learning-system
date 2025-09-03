"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";

const PendingCourse = () => {
  const { getData, pendingCourses, approveCourse, rejectCourse } = useCourse();
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Always paginate over getData
  const totalPages =
    getData.length > 0 ? Math.ceil(getData.length / itemsPerPage) : 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = getData.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await pendingCourses();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-y-auto scrollbar-hide ">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 ">
        Pending Courses
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Preview</th>
                <th className="px-6 py-3 text-left">Course Title</th>
                <th className="px-6 py-3 text-left">Instructor</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // 🔹 Skeleton Rows
                [...Array(itemsPerPage)].map((_, i) => (
                  <tr key={i} className="animate-pulse border-b">
                    <td className="px-6 py-4">
                      <div className="w-24 h-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <div className="h-8 w-20 bg-gray-300 rounded"></div>
                        <div className="h-8 w-20 bg-gray-300 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No pending courses 🎉
                  </td>
                </tr>
              ) : (
                paginatedData.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      {course.fileUrl?.endsWith(".mp4") ? (
                        <video
                          src={course.fileUrl}
                          controls
                          className="w-24 h-16 rounded-md object-cover"
                        />
                      ) : (
                        <img
                          src={course.fileUrl}
                          alt={course.courseTitle}
                          className="w-24 h-16 rounded-md object-cover"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {course.courseTitle}
                    </td>
                    <td className="px-6 py-4">{course.instructorName}</td>
                    <td className="px-6 py-4">{course.category}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ₹{course.coursePrice}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3  ">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
                          onClick={() =>
                            approveCourse(course.id, "admin@gmail.com")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                          onClick={() =>
                            rejectCourse(course.id, "admin@gmail.com")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Professional Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded-lg border ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white transition"
            }`}
          >
            ⬅ Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg border transition ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-lg border ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white transition"
            }`}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default PendingCourse;
