"use client";
import { useCourse } from "@/app/contextApi/page";
import { get } from "jquery";
import React, { use, useEffect, useState } from "react";
import CourseModal from "../viewCourse/viewCourseModal/page";

const MyOwnEnrolledCourses = () => {
  const { getData, MyEnrolledCourses } = useCourse();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = setInterval(() => {
      if (userId) {
        MyEnrolledCourses(userId);
        clearInterval(fetchData);
        // console.log("Fetched enrolled courses for user ID:", userId);
      }
      getData();
    });
  }, []);
  console.log("CourseData", getData.course);
  return (
    <div>
      Enrolled Courses
      {getData?.length === 0 ? (
        <p className="text-center text-gray-500">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {getData?.map((courseData) => (
            <div
              key={courseData.course.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={courseData.course.fileUrl || "/default-course.png"}
                alt={courseData.course.courseTitle}
                className="w-full h-40 rounded-lg object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">
                {courseData.course.courseTitle}
              </h3>
              <p className="text-gray-600 text-sm my-1 flex-1">
                {courseData.course.courseDescription}
              </p>
              <p className="text-blue-600 font-bold mt-2">
                ${courseData.course.coursePrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOwnEnrolledCourses;
