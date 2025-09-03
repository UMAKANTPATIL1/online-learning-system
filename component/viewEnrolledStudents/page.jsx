import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";

const ViewEnrolledStudents = () => {
  const { viewEnrolledStudents, getData } = useCourse();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await viewEnrolledStudents(); // assuming this fetches and updates getData
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Enrolled Students
      </h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Enrollment ID
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Course Title
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Enrollment Date
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            // Skeleton rows while loading
            [...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                </td>
              </tr>
            ))
          ) : getData && getData.length > 0 ? (
            getData.map((enrollment) => (
              <tr key={enrollment.id} className="hover:bg-gray-50 text-black">
                <td className="py-2 px-4 border-b border-gray-200">
                  {enrollment.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {enrollment.user ? enrollment.user.name : "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {enrollment.user ? enrollment.user.email : "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {enrollment.course ? enrollment.course.courseTitle : "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {enrollment.enrollmentDate
                    ? new Date(enrollment.enrollmentDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No enrolled students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEnrolledStudents;
