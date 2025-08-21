"use client";
import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick/lib/slider";
import { useRouter } from "next/navigation";
import { useCourse } from "../contextApi/page";

const CourseCarousel = () => {
  const router = useRouter();
  const { getData, getAllCourses } = useCourse();

  useEffect(() => {
    getAllCourses();
  }, []);

  // 🛑 Prevent errors while data is still loading
  if (!Array.isArray(getData) || getData.length === 0) {
    return <div className="p-4">Loading courses...</div>;
  }

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white bg-black/50 p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white bg-black/50 p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <Slider {...settings}>
        {getData.map((course, index) => (
          <div
            key={index}
            className="w-48 p-3 h-auto text-center rounded-lg shadow-md flex flex-col items-center justify-between"
          >
            <img
              src={course.fileUrl}
              alt={course.courseTitle}
              className="w-auto h-48 object-cover mb-2 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-1">{course.courseTitle}</h2>
            <p className="text-gray-600 mb-2">
              {course.courseDescription?.slice(0, 50)}...
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-800 cursor-pointer text-white px-4 py-2 rounded"
              onClick={() =>
                router.push(
                  `/course/${course.courseTitle
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                )
              }
            >
              Explore Course
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseCarousel;
