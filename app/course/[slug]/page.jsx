"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCourse } from "@/app/contextApi/page";
import axios from "axios";
import { IoArrowBackCircleSharp, IoPlayCircle, IoCheckmarkCircle } from "react-icons/io5";
import { FaBookOpen, FaVideo } from "react-icons/fa";

export default function CourseDetails() {
  const { getData, getAllCourses } = useCourse();
  const params = useParams();
  const router = useRouter();

  const [currentVideo, setCurrentVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const videoRef = useRef(null);

  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  useEffect(() => {
    getAllCourses();
  }, []);

  // Find course based on slug
  const toSlug = (title) => title?.toLowerCase().replace(/\s+/g, "-");
  const slug = params.slug?.toLowerCase();
  const course = getData.find((c) => toSlug(c.courseTitle) === slug);

  // Set initial video when course loads
  useEffect(() => {
    if (course && course.videoUrls?.length > 0 && !currentVideo) {
      setCurrentVideo(course.videoUrls[0]);
    }
  }, [course]);

  // Fetch watched videos from backend
  useEffect(() => {
    const fetchWatchedVideos = async () => {
      if (!userId || !course) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/progress`,
          {
            params: {
              userId,
              courseId: course.id,
            },
          }
        );
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );

  // Update progress while watching
  const handleProgress = async () => {
    if (!videoRef.current || !currentVideo) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;

    try {
      // Debounce or limit api calls in real app
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/update`, {
        userId,
        courseId: course.id,
        videoUrl: currentVideo.videoUrl,
        videoTitle: currentVideo.videoTitle,
        progress,
      });
    } catch (err) {
      console.error("Error updating video progress:", err);
    }
  };

  // Mark video as fully watched
  const handleVideoEnd = async () => {
    if (!currentVideo) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/update`, {
        userId,
        courseId: course.id,
        videoUrl: currentVideo.videoUrl,
        videoTitle: currentVideo.videoTitle,
        progress: 100,
      });

      if (!watchedVideos.includes(currentVideo.videoUrl)) {
        setWatchedVideos((prev) => [...prev, currentVideo.videoUrl]);
      }
    } catch (err) {
      console.error("Error marking video as completed:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-900 transition"
            >
              <IoArrowBackCircleSharp size={32} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 truncate max-w-2xl">
                {course.courseTitle}
              </h1>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <FaBookOpen className="w-3 h-3" />
                {watchedVideos.length} / {course.videoUrls?.length || 0} Lessons Completed
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT COLUMN: Video Player & Description (75%) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
              {currentVideo ? (
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  onTimeUpdate={handleProgress}
                  onEnded={handleVideoEnd}
                  autoPlay
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <IoPlayCircle size={64} className="mx-auto mb-2 opacity-50" />
                    <p>Select a video to start learning</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Course</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                {course.courseDescription}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Course Content / Playlist (25%) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-[600px] sticky top-24">
              <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FaVideo className="text-blue-600" />
                  Course Content
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((watchedVideos.length / (course.videoUrls?.length || 1)) * 100)}% Complete
                </p>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(watchedVideos.length / (course.videoUrls?.length || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-2 space-y-2 scrollbar-hide">
                {course.videoUrls?.map((video, index) => {
                  const isActive = currentVideo?.videoUrl === video.videoUrl;
                  const isWatched = watchedVideos.includes(video.videoUrl);

                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentVideo(video)}
                      className={`
                        p-3 rounded-lg cursor-pointer transition-all duration-200 border
                        flex items-start gap-3 group
                        ${isActive
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                        }
                      `}
                    >
                      <div className="mt-1">
                        {isWatched ? (
                          <IoCheckmarkCircle className="text-green-500 w-5 h-5" />
                        ) : isActive ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 text-gray-400 text-xs flex items-center justify-center">
                            <span className="hidden group-hover:block"><IoPlayCircle /></span>
                            <span className="group-hover:hidden">{index + 1}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                          {video.videoTitle || `Lesson ${index + 1}`}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Video • {index + 1}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
