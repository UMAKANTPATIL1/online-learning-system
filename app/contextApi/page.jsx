"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [getData, setGetData] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 📌 Fetch all courses
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

  // inside CourseProvider
  const [instructors, setInstructors] = useState([]);

  // const [instructors, setInstructors] = useState([]);

  const fetchAllInstructors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/auth/get-all-instructor",
        { withCredentials: true }
      );
      setInstructors(response.data);
      console.log(instructors); // 👈 update state
      return response.data;
    } catch (error) {
      console.error("Error fetching instructors:", error);
      return [];
    }
  };

  // 📌 Utility function for checking video
  const isVideo = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  // 📌 Login handler
  const login = async (credentials, setShowModal) => {
    try {
      const response = await axios.post(
        "http://localhost:8082/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { role } = response.data;
        const lowerRole = role.toLowerCase(); // ✅ normalize role
        setUser({ role: lowerRole });
        setError(null);

        if (setShowModal) setShowModal(false);

        // Redirect
        router.push("/");
        if (lowerRole === "admin") {
          router.push("/admin/dashboard");
        } else if (lowerRole === "instructor") {
          router.push("/instructor");
        } else {
          router.push("/student");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <CourseContext.Provider
      value={{
        getData,
        getAllCourses,
        isVideo,
        user,
        login,
        error,
        fetchAllInstructors,
        instructors,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
