"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCourses = () => {
  const { user } = useCourse();

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    category: "",
    published: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
    setVideoTitles(files.map((f) => f.name.replace(/\.[^/.]+$/, ""))); // default video titles
  };

  const handleVideoTitleChange = (index, value) => {
    const newTitles = [...videoTitles];
    newTitles[index] = value;
    setVideoTitles(newTitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail || videos.length === 0) {
      toast.error("Please upload a thumbnail and at least one video!");
      return;
    }

    try {
      const data = new FormData();
      data.append("courseTitle", formData.courseTitle);
      data.append("courseDescription", formData.courseDescription);
      data.append("category", formData.category);
      data.append("published", formData.published);
      data.append("thumbnail", thumbnail);

      videos.forEach((video) => data.append("videos", video));
      videoTitles.forEach((title) => data.append("videoTitles", title));

      setIsUploading(true);
      setUploadProgress(0);

      const res = await axios.post(
        `http://localhost:8082/api/auth/create-course/${user.email}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(percent);
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Course created successfully!");
        setFormData({
          courseTitle: "",
          courseDescription: "",
          category: "",
          published: false,
        });
        setThumbnail(null);
        setVideos([]);
        setVideoTitles([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating course");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Basic Info */}
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            placeholder="Course Description"
            rows="3"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded-lg p-3"
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            <span>Publish immediately</span>
          </label>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-2 block w-full border p-2 rounded-lg"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Videos
            </label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
              className="mt-2 block w-full border p-2 rounded-lg"
            />
          </div>

          {/* Video Titles */}
          {videos.map((video, index) => (
            <div key={index} className="mt-2">
              <label className="text-sm font-medium text-gray-600">
                Title for: {video.name}
              </label>
              <input
                type="text"
                value={videoTitles[index] || ""}
                onChange={(e) => handleVideoTitleChange(index, e.target.value)}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>
          ))}

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mt-1">{uploadProgress}%</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourses;
