"use client";
import React, { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VideoPlayer = ({ videoUrl, courseId, userId }) => {
  const videoRef = useRef(null);

  const handleProgress = async () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const progress = (video.currentTime / video.duration) * 100;

    try {
      await axios.post("http://localhost:8082/api/progress/update", {
        userId,
        courseId,
        videoUrl,
        progress,
      });
      if (progress >= 95) toast.success("Video marked as completed!");
    } catch (err) {
      console.error("Error updating progress", err);
    }
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
