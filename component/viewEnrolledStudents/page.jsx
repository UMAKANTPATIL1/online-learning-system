import { useCourse } from "@/app/contextApi/page";
import React, { useEffect } from "react";

const ViewEnrolledStudents = () => {
  const { viewEnrolledStudents, getData } = useCourse();
  console.log("enrolled students data:", getData);

  useEffect(() => {
    viewEnrolledStudents();
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 ">
        Enrolled Students
      </h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Student ID
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Enrollment Date
            </th>
          </tr>
        </thead>
        <tbody>
          {getData && getData.length > 0 ? (
            getData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 text-black">
                <td className="py-2 px-4 border-b border-gray-200">
                  {student.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {student.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {student.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
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
