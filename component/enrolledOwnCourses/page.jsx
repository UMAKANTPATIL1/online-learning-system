"use client";
import React, { useEffect, useState } from "react";
import { useCourse } from "@/app/contextApi/page";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdPlayCircleOutline, MdCheckCircle } from "react-icons/md";

const MyOwnEnrolledCourses = () => {
  const { getData, MyEnrolledCourses } = useCourse();
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  // Fetch enrolled courses
  useEffect(() => {
    if (userId) {
      MyEnrolledCourses(userId).then(() => setLoading(false));
    }
  }, [userId]);

  // Fetch progress for each course
  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !getData?.length) return;

      const validCourses = getData.filter((enrolled) => enrolled?.course);
      if (validCourses.length === 0) return;

      const progressData = {};

      for (const enrolled of validCourses) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/progress-percent`,
            {
              params: {
                userId,
                courseId: enrolled.course?.id,
                totalVideos: enrolled.course?.videoUrls?.length || 0,
              },
            }
          );
          progressData[enrolled.course?.id] = Math.min(res.data, 100).toFixed(1); // Percentage
        } catch (err) {
          console.error("Error fetching progress:", err.message);
        }
      }
      setProgressMap(progressData);
    };

    fetchProgress();
  }, [getData, userId]);

  return (
    <div className="px-4 py-8 text-black max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
        <p className="text-gray-500 mt-2">Track your progress and continue learning</p>
      </div>

      {getData?.length === 0 && !loading ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <img src="/assets/empty-box.png" alt="No courses" className="w-32 h-32 mx-auto mb-4 opacity-50" />
          <p className="text-xl text-gray-500 font-medium">You haven't enrolled in any courses yet.</p>
          <button
            onClick={() => router.push('/course')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {getData
            ?.filter((enrolled) => enrolled?.course)
            .map((enrolled, index) => {
              const course = enrolled?.course;
              const progress = parseFloat(progressMap[course?.id] || 0);
              const isCompleted = progress === 100;

              return (
                <div
                  key={course?.id}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/course/${course?.courseTitle?.toLowerCase()?.replace(/\s+/g, "-")}`
                    )
                  }
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                    <img
                      src={course?.thumbnailUrl || "/assets/default-course.png"}
                      alt={course?.courseTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay Play Icon on Hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <MdPlayCircleOutline className="text-white w-12 h-12" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {isCompleted ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                      {course?.courseTitle}
                    </h3>

                    {/* Progress Bar Section */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
                        <span>{isCompleted ? 'All Done!' : `${progress}% Complete`}</span>
                        {isCompleted && <MdCheckCircle className="text-green-500" />}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? "bg-green-500" : "bg-blue-600"
                            }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <button
                        className={`w-full mt-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${isCompleted
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                      >
                        {isCompleted ? (
                          <>Review Course</>
                        ) : (
                          <>Continue Learning</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyOwnEnrolledCourses;
