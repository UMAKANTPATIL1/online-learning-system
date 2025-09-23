"use client";
import { useCourse } from "@/app/contextApi/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InstructorModal from "./instructorModal/page";

const ViewInstructor = () => {
  const { instructors, fetchAllInstructors, user } = useCourse();
  const [visibleCount, setVisibleCount] = useState(15);
  const [loading, setLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const router = useRouter();

  console.log("User", user);
  useEffect(() => {
    if (user === null) {
      return; // wait until context sets user
    }

    if (!user) {
      setLoading(false);
      return;
    }

    if (user.role === "admin" && instructors.length === 0) {
      setLoading(true);
      fetchAllInstructors().finally(() => setLoading(false));
    } else if (user.role !== "admin") {
      router.push("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user, instructors.length]);

  console.log("object", instructors);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  // Show skeleton while loading instructors
  if (loading || !user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Instructors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-xl h-40"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Instructors</h1>
      {instructors.length === 0 ? (
        <p className="text-gray-600">No instructors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instructors.slice(0, visibleCount).map((instructor) => (
            <div
              key={instructor.id}
              className="relative bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
              onClick={() => setSelectedInstructor(instructor)}
              style={{ cursor: "pointer" }}
            >
              {/* Role badge */}
              <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                {instructor.role}
              </span>

              {/* Instructor Image with fallback */}
              <img
                src={instructor.imageUrl}
                alt={instructor.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
                // onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
              />

              {/* Name */}
              <h3 className="text-lg font-semibold">{instructor.name}</h3>

              {/* Expertise */}
              <p className="text-gray-600 text-sm my-1 text-center">
                {instructor.expertIn}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedInstructor && (
        <InstructorModal
          instructor={selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
          onSubmit={(updatedInstructor) => {
            // Handle update logic here
            console.log("Updated Instructor:", updatedInstructor);
            setSelectedInstructor(null); // Close modal after update
          }}
        />
      )}

      {visibleCount < instructors.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewInstructor;
