// "use client";
// import { useCourse } from "@/app/contextApi/page";
// import { get } from "jquery";
// import React, { use, useEffect, useState } from "react";
// import CourseModal from "../viewCourse/viewCourseModal/page";
// import { useRouter } from "next/navigation";

// const MyOwnEnrolledCourses = () => {
//   const { getData, MyEnrolledCourses } = useCourse();
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const userId = localStorage.getItem("id");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = setInterval(() => {
//       if (userId) {
//         MyEnrolledCourses(userId);
//         clearInterval(fetchData);
//         // console.log("Fetched enrolled courses for user ID:", userId);
//       }
//     });
//   }, []);
//   // console.log("CourseData", getData);
//   // console.log("user id:", userId);
//   // console.log("CourseId:", getData?.courseId);
//   return (
//     <div className="mb-auto   min-h-screen text-black">
//       <p className="font-bold text-2xl text-blue-600"> Enrolled Courses </p>
//       {getData?.length === 0 ? (
//         <p className="text-center text-gray-500">No enrolled courses found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6 ">
//           {getData?.map((courseData) => (
//             <div
//               key={courseData.course?.id}
//               className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
//               onClick={() => setSelectedCourse(courseData.course)}
//             >
//               {/* {courseData.course?.id}
//               userid : {courseData.user?.id} */}
//               <img
//                 src={courseData.course?.thumbnailUrl || "/default-course.png"}
//                 alt={courseData.course?.courseTitle}
//                 className="w-full h-40 rounded-lg object-cover mb-3"
//               />
//               <h3 className="text-lg font-semibold text-black">
//                 {courseData.course?.courseTitle}
//               </h3>
//               <p className="text-gray-600 text-sm my-1 flex-1">
//                 {courseData.course?.courseDescription}
//               </p>
//               <p className="text-blue-600 font-bold mt-2">
//                 ${courseData.course?.coursePrice}
//               </p>
//               <button
//                 className="bg-blue-500 hover:bg-blue-800 cursor-pointer text-white px-4 py-2 rounded"
//                 onClick={() =>
//                   router.push(
//                     `/course/${courseData.course?.courseTitle
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}`
//                   )
//                 }
//               >
//                 Explore Course
//               </button>
//               {/* {selectedCourse && (
//                 <CourseModal
//                   course={selectedCourse}
//                   onClose={() => setSelectedCourse(null)}
//                 />
//               )} */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOwnEnrolledCourses;
"use client";
import React, { useEffect, useState } from "react";
import { useCourse } from "@/app/contextApi/page";
import { useRouter } from "next/navigation";
import axios from "axios";

const MyOwnEnrolledCourses = () => {
  const { getData, MyEnrolledCourses } = useCourse();
  const [progressMap, setProgressMap] = useState({});
  const router = useRouter();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  // Fetch enrolled courses
  useEffect(() => {
    if (userId) MyEnrolledCourses(userId);
  }, [userId]);

  // Fetch progress for each course
  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !getData?.length) return;

      const progressData = {};

      for (const enrolled of getData) {
        try {
          const res = await axios.get(
            "https://lms-production-9f83.up.railway.app/api/auth/progress-percent",
            {
              params: {
                userId,
                courseId: enrolled.course?.id,
                totalVideos: enrolled.course?.videoUrls?.length || 0,
              },
            }
          );
          console.log("getData ", getData);
          progressData[enrolled.course?.id] = res.data.toFixed(1); // Percentage
        } catch (err) {
          console.error("Error fetching progress:", err.message);
        }
      }
      setProgressMap(progressData);
    };

    fetchProgress();
  }, [getData, userId]);

  return (
    <div className="min-h-screen mb-auto text-black px-4 md:px-8 py-6">
      <h2 className="font-bold text-2xl text-blue-600 mb-4">
        My Enrolled Courses
      </h2>

      {getData?.length === 0 ? (
        <p className="text-center text-gray-500">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getData?.map((enrolled) => {
            const course = enrolled.course;
            const progress = progressMap[course?.id] || 0;

            return (
              <div
                key={course?.id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {/* Thumbnail */}
                <img
                  src={course?.thumbnailUrl || "/default-course.png"}
                  alt={course?.courseTitle}
                  className="w-full h-40 rounded-lg object-cover mb-3"
                />
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {course?.courseTitle}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm flex-1 mt-1">
                  {course?.courseDescription?.length > 60
                    ? course?.courseDescription.slice(0, 60) + "..."
                    : course?.courseDescription}
                </p>
                {/* Price */}
                <p className="text-blue-600 font-bold mt-2">
                  ${course?.coursePrice}
                </p>
                {/* Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    {progress == 100.0 ? (
                      <span>Completed</span>
                    ) : (
                      <span>Progress</span>
                    )}
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      // className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      className={`${
                        progress == 100.0 ? "bg-green-500" : "bg-blue-600"
                      } h-2 rounded-full transition-all duration-500 `}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                {/* Continue button */}
                {progress == 100.0 ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 mt-4 text-white px-4 py-2 rounded-lg transition"
                    onClick={() =>
                      router.push(
                        `/course/${course?.courseTitle
                          ?.toLowerCase()
                          ?.replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-4 py-2 rounded-lg transition"
                    onClick={() =>
                      router.push(
                        `/course/${course?.courseTitle
                          ?.toLowerCase()
                          ?.replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    Continue Learning
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOwnEnrolledCourses;
