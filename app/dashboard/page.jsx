"use client";

import Navbar from "@/component/navbar/page";
import PendingCourse from "@/component/pendingCourse/page";
import Sidebar from "@/component/sidebar/page";
import ViewCourses from "@/component/viewCourse/page";
import ViewEnrolledStudents from "@/component/viewEnrolledStudents/page";
import ViewInstructor from "@/component/viewInstructors/page";
import ViewStudents from "@/component/viewStudents/page";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const token = Cookies.get("token");

  const role = Cookies.get("role").toLowerCase();

  console.log("User role from cookie:", role);
  // Navigation items

  const adminNavList = [
    { label: "🏠 Overview" },
    { label: "➕ Add Instructor" },
    { label: "👨‍🏫 View Instructors" },
    { label: "👨‍🎓 View Students" },
    { label: "📚 View Courses" },
    { label: "➕ Add Course" },
    { label: "📋 View Enrollments" },
    { label: "⭐ Pending Courses" },
    { label: "💰 View Earnings" },
  ];

  // Components for each menu item
  const adminComponents = [
    <div key="overview">🏠 This is the Overview page</div>,
    <div key="add-instructor">➕ Add Instructor form goes here</div>,
    <ViewInstructor key="view-instructors" />,
    <ViewStudents key={"view-students"} />,
    <ViewCourses key={"view-courses"} />,
    <div key="add-course">➕ Add Course form goes here</div>,
    <ViewEnrolledStudents key={"view-enrollments"} />,
    <PendingCourse key={"pending-courses"} />,
    <div key="view-earnings">💰 Earnings page goes here</div>,
  ];

  const instructorNavList = [
    { label: "🏠 Overview" },
    { label: "➕ Add Course" },
    { label: "👨‍🎓 View Students" },
    { label: "📚 View Courses" },
    { label: "📋 View Enrollments" },
    { label: "⭐ Pending Courses" },
    { label: "💰 View Earnings" },
  ];

  const instructorComponents = [
    <div key="overview">🏠 This is the Overview page</div>,
    <div key="add-course">➕ Add Course form goes here</div>,
    <ViewStudents key={"view-students"} />,
    <ViewCourses key={"view-courses"} />,
    <ViewEnrolledStudents key={"view-enrollments"} />,
    <PendingCourse key={"pending-courses"} />,
    <div key="view-earnings">💰 Earnings page goes here</div>,
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role").toLowerCase();
    setIsAuthenticated(!!token);
  }, []);

  // or "admin"
  const navList = role === "instructor" ? instructorNavList : adminNavList;

  const componentsToRender =
    role === "instructor" ? instructorComponents : adminComponents;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar navList={navList} onSelect={setSelectedIndex} />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto px-4 py-4 bg-gray-50">
        {/* {isAuthenticated && <Navbar />} */}
        <div className="rounded-2xl border border-gray-200 shadow-md p-4 bg-white">
          {componentsToRender[selectedIndex]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
