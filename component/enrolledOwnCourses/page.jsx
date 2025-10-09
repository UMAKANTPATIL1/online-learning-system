"use client";
import { useCourse } from "@/app/contextApi/page";
import { get } from "jquery";
import React, { use, useEffect, useState } from "react";
import CourseModal from "../viewCourse/viewCourseModal/page";
import { useRouter } from "next/navigation";

const MyOwnEnrolledCourses = () => {
  const { getData, MyEnrolledCourses } = useCourse();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const userId = localStorage.getItem("id");
  const router = useRouter();

  useEffect(() => {
    const fetchData = setInterval(() => {
      if (userId) {
        MyEnrolledCourses(userId);
        clearInterval(fetchData);
        // console.log("Fetched enrolled courses for user ID:", userId);
      }
    });
  }, []);
  // console.log("CourseData", getData);
  // console.log("user id:", userId);
  // console.log("CourseId:", getData?.courseId);
  return (
    <div className="mb-auto   min-h-screen text-black">
      <p className="font-bold text-2xl text-blue-600"> Enrolled Courses </p>
      {getData?.length === 0 ? (
        <p className="text-center text-gray-500">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6 ">
          {getData?.map((courseData) => (
            <div
              key={courseData.course?.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              onClick={() => setSelectedCourse(courseData.course)}
            >
              {/* {courseData.course?.id}
              userid : {courseData.user?.id} */}
              <img
                src={courseData.course?.thumbnailUrl || "/default-course.png"}
                alt={courseData.course?.courseTitle}
                className="w-full h-40 rounded-lg object-cover mb-3"
              />
              <h3 className="text-lg font-semibold text-black">
                {courseData.course?.courseTitle}
              </h3>
              <p className="text-gray-600 text-sm my-1 flex-1">
                {courseData.course?.courseDescription}
              </p>
              <p className="text-blue-600 font-bold mt-2">
                ${courseData.course?.coursePrice}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-800 cursor-pointer text-white px-4 py-2 rounded"
                onClick={() =>
                  router.push(
                    `/course/${courseData.course?.courseTitle
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`
                  )
                }
              >
                Explore Course
              </button>
              {/* {selectedCourse && (
                <CourseModal
                  course={selectedCourse}
                  onClose={() => setSelectedCourse(null)}
                />
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOwnEnrolledCourses;
