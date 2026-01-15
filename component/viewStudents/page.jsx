"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import StudentModal from "./studentModal/page";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Mail, Loader2, ChevronRight, GraduationCap } from "lucide-react";

const ViewStudents = () => {
  const { getData, viewStudents } = useCourse();
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await viewStudents();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // Safe filtering
  const studentsList = Array.isArray(getData) ? getData : [];

  const filteredStudents = studentsList.filter((student) => {
    const query = searchQuery.toLocaleLowerCase();
    return (
      student.name?.toLocaleLowerCase().includes(query) ||
      student.email?.toLocaleLowerCase().includes(query)
    )
  })

  const visibleStudents = filteredStudents.slice(0, visibleCount);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 shadow-sm border border-gray-100 p-4 animate-pulse flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
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
              <GraduationCap className="h-8 w-8 text-blue-600" />
              Students
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage and view all registered students.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
            <User className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No students found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search terms.</p>
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
              {visibleStudents.map((student) => (
                <motion.div
                  key={student.id}
                  variants={cardVariants}
                  layout
                  className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="p-6 flex flex-col items-center text-center flex-1">
                    <div className="relative mb-4">
                      <img
                        src={student.imageUrl || "/default-avatar.png"}
                        alt={student.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 group-hover:border-blue-500 transition-colors"
                        onError={(e) => (e.currentTarget.src = "https://ui-avatars.com/api/?name=Student&background=random")}
                      />
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {student.name}
                    </h3>

                    <div className="flex items-center justify-center text-sm text-gray-500 mt-2 gap-1 w-full">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{student.email}</span>
                    </div>

                    <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {student.role || "Student"}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-blue-50/30 transition-colors">
                    <span className="text-xs font-medium text-gray-400">ID: {student.id.substring(0, 8)}...</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More */}
        {visibleCount < filteredStudents.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span>Load More Students</span>
              <Loader2 className="ml-2 w-4 h-4 group-active:animate-spin" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default ViewStudents;
