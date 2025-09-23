"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateCourses = () => {
  const { user } = useCourse();
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    category: "",
    published: false,
  });
  const [fileUrl, setFileUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFileUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileUrl) {
      toast.error("Please upload a file first");
      return;
    }

    try {
      const data = new FormData();
      data.append("courseTitle", formData.courseTitle);
      data.append("courseDescription", formData.courseDescription);
      data.append("category", formData.category);
      data.append("published", formData.published);
      data.append("fileUrl", fileUrl);

      const res = await fetch(
        `http://localhost:8082/api/auth/create-course/${user.email}`,
        {
          method: "POST",
          body: data,
        }
      );

      if (res.ok) {
        toast.success("Course added successfully!");
        setFormData({
          courseTitle: "",
          courseDescription: "",
          category: "",
          published: false,
        });
        setFileUrl(null);
      } else {
        toast.error("Failed to add course");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Add New Course
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Fill in the details below to create a new course.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              required
              rows="4"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Briefly describe the course"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Programming, Business, Design"
            />
          </div>

          {/* Published */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="ml-2 text-gray-700 text-sm">
              Publish immediately
            </label>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              name="fileUrl"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 shadow-md transition-all duration-200"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourses;
