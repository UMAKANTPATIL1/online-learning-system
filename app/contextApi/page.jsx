"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [getData, setGetData] = useState([]);

  const getAllCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/auth/get-courses"
      );
      setGetData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const isVideo = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  return (
    <CourseContext.Provider value={{ getData, getAllCourses, isVideo }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
