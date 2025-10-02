"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
    console.log("Saved user from localStorage:", savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 📌 Fetch all courses
  const getAllCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-courses`
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
      console.log(response.data);
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

  //  Login handler

  const login = async (credentials, setShowModal) => {
    try {
      console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email: credentials.email,
          password: credentials.password, // must be sent for login
        },
        { withCredentials: true } // allow cookies (JWT in HttpOnly cookie)
      );

      if (response.status === 200) {
        // destructure safely
        const { token, role, userId } = response.data;

        if (!token) {
          throw new Error("No token received from backend");
        }

        const normalizedRole = role?.toLowerCase() || "guest";

        // Store user info (without password!)
        const newUser = {
          email: credentials.email,
          role: normalizedRole,
          token,
          id: userId,
        };

        toast.success(`${normalizedRole} login successful!`);

        // save in state + localStorage
        console.log("User data from login:", newUser);
        setUser(newUser);

        localStorage.setItem("token", token);
        localStorage.setItem("role", normalizedRole);
        localStorage.setItem("id", userId);

        setError(null);

        if (setShowModal) setShowModal(false);

        // Navigate after login
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
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
  const logout = async () => {
    try {
      // Call backend logout
      await axios.post(
        "http://localhost:8082/api/auth/logout",

        { withCredentials: true }
      );

      // Clear frontend state
      setUser(null);
      setInstructors([]);

      // Extra cleanup (in case)
      console.log("get token in context:", localStorage.getItem("token"));
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("id", { path: "/" });

      // Redirect
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const MyEnrolledCourses = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/auth/get-own-courses/${userId}`,
        { withCredentials: true }
      );
      console.log("enrolled courses user id ", userId);

      // const responseData = response.data.map((enrollment) => enrollment.course);
      console.log("responseData", response.data);
      setGetData(response.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  const postEnrolledCourse = async (courseId, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/auth/enrolled`,
        {
          courseId,
          userId,
        }
      );

      console.log("Enrolled in course:", response.data);
      toast.success("Successfully enrolled in course!");
    } catch (error) {
      console.error("Error in post enrolled course:", error);
      toast.error("Failed to enroll in course.");
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
        logout,
        error,
        fetchAllInstructors,
        instructors,
        pendingCourses,
        viewEnrolledStudents,
        approveCourse,
        rejectCourse,
        viewStudents,
        MyEnrolledCourses,
        postEnrolledCourse,
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
