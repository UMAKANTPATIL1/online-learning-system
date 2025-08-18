"use client";

import Navbar from "@/component/navbar/page";
import Sidebar from "@/component/sidebar/page";
import ViewInstructor from "@/component/viewInstructors/page";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navList = [
    { label: "🏠 Overview" },
    { label: "➕ Add Instructor" },
    { label: "👨‍🏫 View Instructors" },
    { label: "👨‍🎓 View Students" },
    { label: "📚 View Courses" },
    { label: "➕ Add Course" },
    { label: "📋 View Enrollments" },
    { label: "⭐ View Reviews" },
    { label: "💰 View Earnings" },
  ];

  // Components for each menu item
  const components = [
    <div key="overview">🏠 This is the Overview page</div>,
    <div key="add-instructor">➕ Add Instructor form goes here</div>,
    <ViewInstructor key="view-instructors" />,
    <div key="view-students">👨‍🎓 Student list goes here</div>,
    <div key="view-courses">📚 Course list goes here</div>,
    <div key="add-course">➕ Add Course form goes here</div>,
    <div key="view-enrollments">📋 Enrollments list goes here</div>,
    <div key="view-reviews">⭐ Reviews list goes here</div>,
    <div key="view-earnings">💰 Earnings page goes here</div>,
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar navList={navList} onSelect={setSelectedIndex} />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto px-4 py-4 bg-gray-50">
        {/* {isAuthenticated && <Navbar />} */}
        <div className="rounded-2xl border border-gray-200 shadow-md p-4 bg-white">
          {components[selectedIndex]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
