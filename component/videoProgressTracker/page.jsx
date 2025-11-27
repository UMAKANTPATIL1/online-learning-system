"use client";
import React, { use, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCourse } from "@/app/contextApi/page";

const VideoPlayer = ({ videoUrl, courseId, userId }) => {
  const videoRef = useRef(null);
  const { handleVideoTracker } = useCourse();

  const handleProgress = async () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const progress = (video.currentTime / video.duration) * 100;

    handleVideoTracker(userId, courseId, videoUrl, progress);
  };

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        onTimeUpdate={handleProgress}
        className="rounded-xl shadow-lg w-full max-w-3xl"
      />
    </div>
  );
};

export default VideoPlayer;
