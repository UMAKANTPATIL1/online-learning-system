"use client";
import React, { useEffect, useState } from "react";
import Carousel from "../carousels/page";
import CourseCarousel from "@/app/course/page";
import InstructorCarousels from "../instructorCarousel/page";

import { request } from "http";

const HomePage = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole.toLowerCase());
    }
  }, []);

  return (
    <div>
      <Carousel />
      <CourseCarousel />

      {role !== "student" && role && <InstructorCarousels />}
    </div>
  );
};

export default HomePage;
