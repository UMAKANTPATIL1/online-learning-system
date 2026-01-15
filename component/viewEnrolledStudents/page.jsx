"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Mail,
  BookOpen,
  Calendar,
  Loader2,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

const ViewEnrolledStudents = () => {
  const { viewEnrolledStudents, getData } = useCourse();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await viewEnrolledStudents();
      setLoading(false);
    };
    fetchData();
  }, []); // Remove dependency on viewEnrolledStudents

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // Safe data handling
  const enrollments = Array.isArray(getData) ? getData : [];

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const query = searchQuery.toLowerCase();
    const userName = enrollment.user?.name?.toLowerCase() || "";
    const userEmail = enrollment.user?.email?.toLowerCase() || "";
    const courseTitle = enrollment.course?.courseTitle?.toLowerCase() || "";

    return (
      userName.includes(query) ||
      userEmail.includes(query) ||
      courseTitle.includes(query)
    );
  });

  const visibleEnrollments = filteredEnrollments.slice(0, visibleCount);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-72 shadow-sm border border-gray-100 p-6 animate-pulse flex flex-col justify-between"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Enrolled Students
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Track course enrollments and student progress.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search student, email, or course..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {filteredEnrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
            <GraduationCap className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No enrollments found</h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search terms or wait for new enrollments.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {visibleEnrollments.map((enrollment) => (
                <motion.div
                  key={enrollment.id}
                  variants={cardVariants}
                  layout
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* User Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={enrollment.user?.imageUrl || "/default-avatar.png"}
                          alt={enrollment.user?.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-blue-500 transition-colors"
                          onError={(e) =>
                          (e.currentTarget.src =
                            "https://ui-avatars.com/api/?name=Student&background=random")
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {enrollment.user?.name || "Unknown User"}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {enrollment.user?.email || "No Email"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Enrolled Course
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">
                            {enrollment.course?.courseTitle || "Unknown Course"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {enrollment.enrollmentDate
                            ? new Date(enrollment.enrollmentDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                        Active
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More */}
        {visibleCount < filteredEnrollments.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span>Load More Enrollments</span>
              <Loader2 className="ml-2 w-4 h-4 group-active:animate-spin" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEnrolledStudents;
