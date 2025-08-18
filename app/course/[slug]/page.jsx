"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import { useCourse } from "@/app/contextApi/page";

export default function CourseDetails() {
  const { getData, getAllCourses, isVideo } = useCourse();
  const params = useParams();

  useEffect(() => {
    getAllCourses(); // Fetch course data on mount
  }, []);

  const toSlug = (title) => title?.toLowerCase().replace(/\s+/g, "-");

  const slug = params.slug?.toLowerCase();

  const course = getData.find((c) => toSlug(c.courseTitle) === slug);

  if (!course) {
    return (
      <div className="p-6 text-red-500 font-bold text-xl">Course not found</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
      {isVideo(course.fileUrl) ? (
        <video
          controls
          src={course.fileUrl}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      ) : (
        <img
          src={course.fileUrl}
          alt={course.courseTitle}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <p className="text-lg text-gray-700 mb-2">{course.courseDescription}</p>
    </div>
  );
}
