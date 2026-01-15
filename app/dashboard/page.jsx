"use client";

import CreateCourses from "@/component/AddCourses/createCourse";
import MyOwnEnrolledCourses from "@/component/enrolledOwnCourses/page";
import HomePage from "@/component/HomePage/page";
// import Navbar from "@/component/navbar/page"; // Not used in this layout
import PendingCourse from "@/component/pendingCourse/page";
import ProtectedClient from "@/component/protectedClient/page";
import Sidebar from "@/component/sidebar/page";
import ViewCourses from "@/component/viewCourse/page";
import ViewEnrolledStudents from "@/component/viewEnrolledStudents/page";
import ViewInstructor from "@/component/viewInstructors/page";
import ViewStudents from "@/component/viewStudents/page";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  PlusCircle,
  ClipboardList,
  Clock,
  DollarSign,
  Settings,
  Search as SearchIcon, // Renamed to avoid conflict if needed
  CreditCard,
  GraduationCap
} from "lucide-react";

// Placeholder for missing components
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
    <div className="bg-gray-100 p-6 rounded-full mb-4">
      <Settings className="w-12 h-12 text-gray-400" />
    </div>
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p className="text-sm mt-2">This feature is currently under development.</p>
  </div>
);

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // ✅ SAFE BROWSER-ONLY ACCESS
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || Cookies.get("token");
    const storeId = localStorage.getItem("id") || Cookies.get("id");

    if (storeId) localStorage.setItem("id", storeId);

    const storedRole = (
      localStorage.getItem("role") || Cookies.get("role")
    )?.toLowerCase();

    if (storedToken && storedRole) {
      if (!localStorage.getItem("token")) localStorage.setItem("token", storedToken);
      if (!localStorage.getItem("role")) localStorage.setItem("role", storedRole);

      setToken(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return null; // ProtectedClient will redirect
  }

  // ================= ADMIN =================
  const adminNavList = [
    { label: "Add Instructor", icon: PlusCircle },
    { label: "View Instructors", icon: Users },
    { label: "View Students", icon: GraduationCap },
    { label: "View Courses", icon: BookOpen },
    { label: "Add Course", icon: PlusCircle },
    { label: "View Enrollments", icon: ClipboardList },
    { label: "Pending Courses", icon: Clock },
    { label: "View Earnings", icon: DollarSign },
  ];

  const adminComponents = [
    <ComingSoon key="add-instructor" title="Add Instructor" />,
    <ViewInstructor key="view-instructors" />,
    <ViewStudents key="view-students" />,
    <ViewCourses key="view-courses" />,
    <ComingSoon key="add-course" title="Add Course" />,
    <ViewEnrolledStudents key="view-enrollments" />,
    <PendingCourse key="pending-courses" />,
    <ComingSoon key="view-earnings" title="View Earnings" />,
  ];

  // ================= INSTRUCTOR =================
  const instructorNavList = [
    { label: "Add Course", icon: PlusCircle },
    { label: "View Students", icon: GraduationCap },
    { label: "View Courses", icon: BookOpen },
    { label: "View Enrollments", icon: ClipboardList },
    { label: "Pending Courses", icon: Clock },
    { label: "View Earnings", icon: DollarSign },
  ];

  const instructorComponents = [
    <CreateCourses key="create-course" />,
    <ViewStudents key="view-students" />,
    <ViewCourses key="view-courses" />,
    <ViewEnrolledStudents key="view-enrollments" />,
    <PendingCourse key="pending-courses" />,
    <ComingSoon key="view-earnings" title="View Earnings" />,
  ];

  // ================= STUDENT =================
  const studentNavList = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "All Courses", icon: BookOpen },
    { label: "My Courses", icon: BookOpen },
    { label: "Browse Courses", icon: SearchIcon },
    { label: "My Enrollments", icon: ClipboardList },
    { label: "My Payments", icon: CreditCard },
    { label: "Settings", icon: Settings },
  ];

  const studentComponents = [
    <HomePage key="home-page" />,
    <ViewCourses key="view-courses" />,
    <ComingSoon key="my-courses" title="My Courses" />,
    <ComingSoon key="browse-courses" title="Browse Courses" />,
    <MyOwnEnrolledCourses key="my-enrollments" />,
    <ComingSoon key="my-payments" title="My Payments" />,
    <ComingSoon key="settings" title="Settings" />,
  ];

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
    <ProtectedClient>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar
          navList={navList}
          onSelect={setSelectedIndex}
          setOpen={setOpen}
          open={open}
        />

        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Top mobile header could go here if needed, but Sidebar handle it */}

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Page Content */}
              {componentsToRender[selectedIndex] ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[calc(100vh-4rem)] p-1 overflow-hidden">
                  {componentsToRender[selectedIndex]}
                </div>
              ) : (
                <ComingSoon title="Page Not Found" />
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedClient>
  );
};

export default Dashboard;
