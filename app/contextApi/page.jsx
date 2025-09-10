"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [getData, setGetData] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const router = useRouter();

  // 📌 Restore user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

  // 📌 Fetch all instructors
  const fetchAllInstructors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/auth/get-all-instructor",
        { withCredentials: true }
      );
      setInstructors(response.data);
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
        const userData = { role: lowerRole };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ persist user
        setError(null);

        if (setShowModal) setShowModal(false);
        router.push(`/dashboard`);
        // Redirect
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid credentials. Try again.");
    }
  };

  const pendingCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/auth/pending-courses",
        { withCredentials: true }
      );
      console.log("Pending courses fetched:", response.data);
      setGetData(response.data);
    } catch (error) {
      console.error("Error fetching pending courses:", error);
    }
  };

  const viewEnrolledStudents = async (courseId) => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/auth/get-all-enrolled-user"
        // { withCredentials: true }
      );
      console.log("enrolled students:", response.data);
      setGetData(response.data);

      // return response.data;
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
      return [];
    }
  };

  const approveCourse = async (courseId, adminEmail) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/auth/approve-course`,
        { courseId, adminEmail },
        { withCredentials: true }
      );
      console.log("Course approved:", response.data);
      // Optionally refresh the course list
      await pendingCourses();
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const rejectCourse = async (courseId, adminEmail) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/auth/reject-course`,
        { courseId, adminEmail },
        { withCredentials: true }
      );
      console.log("Course rejected:", response.data);
      // Optionally refresh the course list
      await pendingCourses();
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  const viewStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/auth/get-all-students",
        { withCredentials: true }
      );
      setGetData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };

  // 📌 Logout handler
  const logout = () => {
    setUser(null);
    setInstructors([]);
    localStorage.removeItem("user"); // ✅ clear user on logout
    router.push("/");
  };

  return (
    <CourseContext.Provider
      value={{
        getData,
        getAllCourses,
        isVideo,
        user,
        login,
        logout,
        error,
        fetchAllInstructors,
        instructors,
        pendingCourses,
        viewEnrolledStudents,
        approveCourse,
        rejectCourse,
        viewStudents,
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
