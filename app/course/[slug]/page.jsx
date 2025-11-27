// "use client";

// import { useEffect } from "react";

// import { useParams } from "next/navigation";
// import { useCourse } from "@/app/contextApi/page";
// import Breadcrum from "@/component/page";
// import Breadcrumb from "@/component/page";
// import { FaBackward, FaFastBackward } from "react-icons/fa";
// import { IoArrowBackCircleSharp } from "react-icons/io5";

// export default function CourseDetails() {
//   const { getData, getAllCourses, isVideo } = useCourse();
//   const params = useParams();

//   // console.log("video url", getData?.videoUrls);
//   useEffect(() => {
//     getAllCourses(); // Fetch course data on mount
//   }, []);

//   const toSlug = (title) => title?.toLowerCase().replace(/\s+/g, "-");

//   const slug = params.slug?.toLowerCase();

//   const course = getData.find((c) => toSlug(c.courseTitle) === slug);

//   // console.log(course.videoUrls.length);

//   if (!course) {
//     return (
//       <div className="p-6 text-red-500 font-bold text-xl">Course not found</div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen text-black">
//       {/* <Breadcrumb /> */}
//       {/* <button
//         className="mb-4 text-blue-600 hover:underline rounded-2xl bg-gray-200 px-4 py-2"
//         onClick={() => window.history.back()}
//       > */}
//       <IoArrowBackCircleSharp
//         onClick={() => window.history.back()}
//         size={36}
//         className="cursor-pointer  hover:text-gray-800 mb-4"
//       />

//       {/* </button> */}
//       <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
//       {isVideo(course.videoUrl) ? (
//         <video
//           controls
//           src={course.videoUrl}
//           className="w-full h-64 object-cover mb-4 rounded"
//         />
//       ) : (
//         <img
//           src={course.thumbnailUrl}
//           alt={course.courseTitle}
//           className="w-full h-64 object-cover mb-4 rounded"
//         />
//       )}
//       <p className="text-lg text-gray-700 mb-2">{course.courseDescription}</p>

//       <div className="space-y-4 border-t pt-4 mt-4">
//         {course.videoUrls &&
//         Array.isArray(course.videoUrls) &&
//         course.videoUrls.length > 0 ? (
//           course.videoUrls.map((video, index) => {
//             // Extract safe video URL
//             const videoSrc =
//               typeof video.videoUrl === "string"
//                 ? video.videoUrl
//                 : video.videoUrl?.secure_url || video.videoUrl?.[0] || "";

//             return (
//               <div
//                 key={index}
//                 className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition"
//               >
//                 {/* Left - Title */}
//                 <div className="w-1/2">
//                   <p className="text-lg font-semibold text-gray-900">
//                     <span className="text-blue-500 mr-2 ">{index + 1}.</span>
//                     <span className="capitalize ">
//                       {/* {video.videoTitle
//                         ? video.videoTitle.charAt(0).toUpperCase() +
//                           video.videoTitle.slice(1)
//                         : `Video ${index + 1}`} */}
//                       {video.videoTitle || `Video ${index + 1}`}
//                     </span>
//                   </p>
//                 </div>

//                 {/* Right - Video */}
//                 <div className="w-1/2 flex justify-end">
//                   {videoSrc ? (
//                     <video
//                       src={videoSrc}
//                       controls
//                       className="w-48 h-28 rounded-lg border border-gray-200 object-cover"
//                     />
//                   ) : (
//                     <p className="text-red-500 text-sm">
//                       ⚠ Invalid or missing video
//                     </p>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 text-center">No videos uploaded yet 🎥</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useCourse } from "@/app/contextApi/page";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function CourseDetails() {
  const { getData, getAllCourses } = useCourse();
  const params = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const videoRef = useRef(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  useEffect(() => {
    getAllCourses();
  }, []);

  // Find course based on slug
  const toSlug = (title) => title?.toLowerCase().replace(/\s+/g, "-");
  const slug = params.slug?.toLowerCase();
  const course = getData.find((c) => toSlug(c.courseTitle) === slug);

  // Fetch watched videos from backend
  useEffect(() => {
    const fetchWatchedVideos = async () => {
      if (!userId || !course) return;
      try {
        const res = await axios.get(
          "https://lms-production-9f83.up.railway.app/api/auth/progress",
          {
            params: {
              userId,
              courseId: course.id,
            },
          }
        );
        // Assume API returns array of videoUrls with completed progress
        const completedVideos = res.data
          .filter((v) => v.progress === 100)
          .map((v) => v.videoUrl);
        setWatchedVideos(completedVideos);
      } catch (err) {
        console.error("Error fetching watched videos:", err);
      }
    };
    fetchWatchedVideos();
  }, [userId, course]);

  if (!course)
    return <div className="p-6 text-red-500 font-bold">Course not found</div>;

  // Update progress while watching
  const handleProgress = async () => {
    if (!videoRef.current || !currentVideo) return;
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;

    try {
      await axios.post(
        "https://lms-production-9f83.up.railway.app/api/auth/update",
        {
          userId,
          courseId: course.id,
          videoUrl: currentVideo.videoUrl,
          videoTitle: currentVideo.videoTitle,
          progress,
        }
      );
    } catch (err) {
      console.error("Error updating video progress:", err);
    }
  };

  // Mark video as fully watched
  const handleVideoEnd = async () => {
    if (!currentVideo) return;

    try {
      await axios.post(
        "https://lms-production-9f83.up.railway.app/api/auth/update",
        {
          userId,
          courseId: course.id,
          videoUrl: currentVideo.videoUrl,
          videoTitle: currentVideo.videoTitle,
          progress: 100,
        }
      );

      if (!watchedVideos.includes(currentVideo.videoUrl)) {
        setWatchedVideos((prev) => [...prev, currentVideo.videoUrl]);
      }
    } catch (err) {
      console.error("Error marking video as completed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <IoArrowBackCircleSharp
        onClick={() => window.history.back()}
        size={36}
        className="cursor-pointer hover:text-gray-800 mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Video player */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          {currentVideo ? (
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              controls
              className="w-full rounded-lg"
              onTimeUpdate={handleProgress}
              onEnded={handleVideoEnd}
            />
          ) : (
            <p className="text-gray-600">Select a video to start learning 🎥</p>
          )}
        </div>

        {/* Video list */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-800 mb-2">Course Videos</h2>
          <ul>
            {course.videoUrls.map((video, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${
                  currentVideo?.videoUrl === video.videoUrl ? "bg-blue-50" : ""
                }`}
                onClick={() => setCurrentVideo(video)}
              >
                <div className="flex items-center justify-between">
                  {index + 1}. {video.videoTitle}
                  {watchedVideos.includes(video.videoUrl) && (
                    <FaCheckCircle color="green" size={18} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
