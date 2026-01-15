"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Layout,
  FileText,
  Image as ImageIcon,
  Video,
  UploadCloud,
  CheckCircle2,
  X,
  Loader2,
  ListVideo,
  Tag
} from "lucide-react";

const CreateCourses = () => {
  const { user } = useCourse();

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    category: "",
    published: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
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

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setVideos((prev) => [...prev, ...files]);
      const newTitles = files.map((f) => f.name.replace(/\.[^/.]+$/, ""));
      setVideoTitles((prev) => [...prev, ...newTitles]);
    }
  };

  const handleVideoTitleChange = (index, value) => {
    const newTitles = [...videoTitles];
    newTitles[index] = value;
    setVideoTitles(newTitles);
  };

  const removeVideo = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    const newTitles = videoTitles.filter((_, i) => i !== index);
    setVideos(newVideos);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-course/${user.email}`,
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
        setThumbnailPreview(null);
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
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Layout className="w-8 h-8 text-blue-600" />
            Create New Course
          </h1>
          <p className="mt-2 text-gray-600">
            Design your curriculum, upload content, and share your knowledge with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Course Info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FileText className="w-5 h-5 text-gray-500" />
                Course Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    placeholder="e.g. Advanced Web Development 2024"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="courseDescription"
                    value={formData.courseDescription}
                    onChange={handleChange}
                    placeholder="Describe what students will learn..."
                    rows="5"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Programming, Design, Business"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum / Videos Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <ListVideo className="w-5 h-5 text-gray-500" />
                  Course Content
                </h2>
                <span className="text-sm text-gray-500">{videos.length} videos selected</span>
              </div>

              {/* Video Upload Area */}
              <div className="relative group">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 group-hover:bg-blue-50/30 group-hover:border-blue-300 transition-all">
                  <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Drop videos here or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">MP4, MOV, MKV up to 500MB</p>
                </div>
              </div>

              {/* Video List */}
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg shrink-0">
                      <Video className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 truncate mb-1">Source: {video.name}</p>
                      <input
                        type="text"
                        value={videoTitles[index] || ""}
                        onChange={(e) => handleVideoTitleChange(index, e.target.value)}
                        placeholder="Enter video title"
                        className="w-full px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent transition-all placeholder:font-normal"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {videos.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    No videos added yet. Start adding content to your course.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Settings & Sidebar */}
          <div className="space-y-6">

            {/* Publishing Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Publishing</h2>
              <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 rounded"
                  />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900">Publish Immediately</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Make this course visible to students immediately after creation.</span>
                </div>
              </label>
            </div>

            {/* Thumbnail Upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-500" />
                Course Thumbnail
              </h2>

              <div className="space-y-4">
                <div className="aspect-video w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-xs">No image selected</span>
                    </div>
                  )}

                  {thumbnailPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button type="button" className="w-full py-2.5 px-4 bg-gray-50 text-gray-700 font-medium text-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <UploadCloud className="w-4 h-4" />
                    {thumbnail ? "Change Thumbnail" : "Upload Image"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Recommended size: 1280x720 (16:9)
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="sticky top-6">
              {isUploading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-900 mb-1">
                    <span>Uploading Course...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-center text-gray-500 animate-pulse">
                    Please do not close this window
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Create Course
                </button>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourses;
