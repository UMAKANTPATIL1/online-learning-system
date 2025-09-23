"use client";

import CreateCourses from "@/component/AddCourses/createCourse";
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

  const role = Cookies.get("role")?.toLowerCase();

  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role")?.toLowerCase();

  // console.log("User role and token from localstorage:", role, token);
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
    <CreateCourses key={"create-course"} />,
    <ViewStudents key={"view-students"} />,
    <ViewCourses key={"view-courses"} />,
    <ViewEnrolledStudents key={"view-enrollments"} />,
    <PendingCourse key={"pending-courses"} />,
    <div key="view-earnings">💰 Earnings page goes here</div>,
  ];

  const studentNavList = [
    { label: "🏠 Overview" },
    { label: "📚 My Courses" },
    { label: "🔍 Browse Courses" },
    { label: "📋 My Enrollments" },
    { label: "💰 My Payments" },
    { label: "⚙️ Settings" },
  ];

  const studentComponents = [
    <div key="overview">🏠 This is the Overview page</div>,
    <div key="my-courses">📚 List of my courses goes here</div>,
    <div key="browse-courses">🔍 Browse available courses here</div>,
    <div key="my-enrollments">📋 My enrollments details go here</div>,
    <div key="my-payments">💰 My payment history goes here</div>,
    <div key="settings">⚙️ User settings form goes here</div>,
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role")?.toLowerCase();
    setIsAuthenticated(!!token);
  }, []);
  console.log("getrole", role);

  // or "admin"
  // const navList = role === "instructor" ? instructorNavList : adminNavList;

  // const componentsToRender =
  //   role === "instructor" ? instructorComponents : adminComponents ;
  const navList =
    role === "admin"
      ? adminNavList
      : role === "instructor"
      ? instructorNavList
      : studentNavList;
  const componentsToRender =
    role === "admin"
      ? adminComponents
      : role === "instructor"
      ? instructorComponents
      : studentComponents;

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
