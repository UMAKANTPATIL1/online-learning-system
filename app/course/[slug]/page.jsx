"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import { useCourse } from "@/app/contextApi/page";
import Breadcrum from "@/component/page";
import Breadcrumb from "@/component/page";
import { FaBackward, FaFastBackward } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function CourseDetails() {
  const { getData, getAllCourses, isVideo } = useCourse();
  const params = useParams();

  // console.log("video url", getData?.videoUrls);
  useEffect(() => {
    getAllCourses(); // Fetch course data on mount
  }, []);

  const toSlug = (title) => title?.toLowerCase().replace(/\s+/g, "-");

  const slug = params.slug?.toLowerCase();

  const course = getData.find((c) => toSlug(c.courseTitle) === slug);

  // console.log(course.videoUrls.length);

  if (!course) {
    return (
      <div className="p-6 text-red-500 font-bold text-xl">Course not found</div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      {/* <Breadcrumb /> */}
      {/* <button
        className="mb-4 text-blue-600 hover:underline rounded-2xl bg-gray-200 px-4 py-2"
        onClick={() => window.history.back()}
      > */}
      <IoArrowBackCircleSharp
        onClick={() => window.history.back()}
        size={36}
        className="cursor-pointer  hover:text-gray-800 mb-4"
      />

      {/* </button> */}
      <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
      {isVideo(course.videoUrl) ? (
        <video
          controls
          src={course.videoUrl}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      ) : (
        <img
          src={course.thumbnailUrl}
          alt={course.courseTitle}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <p className="text-lg text-gray-700 mb-2">{course.courseDescription}</p>

      <div className="space-y-4 border-t pt-4 mt-4">
        {course.videoUrls &&
        Array.isArray(course.videoUrls) &&
        course.videoUrls.length > 0 ? (
          course.videoUrls.map((video, index) => {
            // Extract safe video URL
            const videoSrc =
              typeof video.videoUrl === "string"
                ? video.videoUrl
                : video.videoUrl?.secure_url || video.videoUrl?.[0] || "";

            return (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition"
              >
                {/* Left - Title */}
                <div className="w-1/2">
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="text-blue-500 mr-2 ">{index + 1}.</span>
                    <span className="capitalize ">
                      {/* {video.videoTitle
                        ? video.videoTitle.charAt(0).toUpperCase() +
                          video.videoTitle.slice(1)
                        : `Video ${index + 1}`} */}
                      {video.videoTitle || `Video ${index + 1}`}
                    </span>
                  </p>
                </div>

                {/* Right - Video */}
                <div className="w-1/2 flex justify-end">
                  {videoSrc ? (
                    <video
                      src={videoSrc}
                      controls
                      className="w-48 h-28 rounded-lg border border-gray-200 object-cover"
                    />
                  ) : (
                    <p className="text-red-500 text-sm">
                      ⚠ Invalid or missing video
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No videos uploaded yet 🎥</p>
        )}
      </div>
    </div>
  );
}
