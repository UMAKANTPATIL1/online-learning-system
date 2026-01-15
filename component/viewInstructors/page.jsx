"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InstructorModal from "./instructorModal/page";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Mail, Phone, Award, Loader2, ChevronRight } from "lucide-react";

const ViewInstructor = () => {
  const { instructors, fetchAllInstructors, user } = useCourse();
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  console.log("All instructors", instructors);

  useEffect(() => {
    if (user === null) return; // Wait for user context

    if (!user) {
      setLoading(false);
      return;
    }

    if (user.role === "admin" && instructors.length === 0) {
      setLoading(true);
      fetchAllInstructors().finally(() => setLoading(false));
    } else if (user.role !== "admin") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, instructors.length, fetchAllInstructors, router]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const filteredInstructors = instructors.filter((instructor) => {
    const query = searchQuery.toLowerCase();
    return (
      instructor.name?.toLowerCase().includes(query) ||
      instructor.expertIn?.toLowerCase().includes(query) ||
      instructor.email?.toLowerCase().includes(query)
    );
  });

  const visibleInstructors = filteredInstructors.slice(0, visibleCount);

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

  if (loading || (user === null)) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="h-24 bg-gray-200 rounded-t-xl mb-12 relative">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gray-300 rounded-full border-4 border-white" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
                <div className="h-20 bg-gray-100 rounded-lg" />
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
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Instructors
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Meet the experts shaping your learning journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, expertise..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {filteredInstructors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
            <User className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No instructors found</h3>
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
              {visibleInstructors.map((instructor) => (
                <motion.div
                  key={instructor.id}
                  variants={cardVariants}
                  layout
                  className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                  onClick={() => setSelectedInstructor(instructor)}
                >
                  {/* Card Banner */}
                  <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                      {instructor.role}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src={instructor.imageUrl || "/default-avatar.png"}
                      alt={instructor.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
                      onError={(e) => (e.currentTarget.src = "https://ui-avatars.com/api/?name=Instructor&background=random")}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="pt-14 pb-6 px-6 flex-1 flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {instructor.name}
                    </h3>

                    {/* Expertise Badge */}
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      <Award className="w-3 h-3 mr-1" />
                      {instructor.expertIn || "General Instructor"}
                    </div>

                    <div className="mt-6 w-full space-y-3">
                      <div className="flex items-center justify-center text-sm text-gray-500 space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate max-w-[150px]">{instructor.email}</span>
                      </div>
                      {instructor.phoneNo && (
                        <div className="flex items-center justify-center text-sm text-gray-500 space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{instructor.phoneNo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer (Hover Action) */}
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-blue-50/50 transition-colors">
                    <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">View Profile</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More */}
        {visibleCount < filteredInstructors.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span>Load More Instructors</span>
              <Loader2 className="ml-2 w-4 h-4 group-active:animate-spin" />
            </button>
          </div>
        )}

      </div>

      {/* Modal Integration */}
      {selectedInstructor && (
        <InstructorModal
          instructor={selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
          onSubmit={(updated) => {
            console.log("Updated", updated);
            setSelectedInstructor(null);
          }}
        />
      )}
    </div>
  );
};

export default ViewInstructor;
