"use client";
import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { useCourse } from "../contextApi/page";

const CourseCarousel = () => {
  const router = useRouter();
  const { getData, getAllCourses } = useCourse();

  useEffect(() => {
    getAllCourses();
  }, []);

  if (!Array.isArray(getData) || getData.length === 0) {
    return <div className="p-4">Loading courses...</div>;
  }

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-10
                 bg-black/50 hover:bg-black text-white p-2 rounded-full"
    >
      <FaArrowRight />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-10
                 bg-black/50 hover:bg-black text-white p-2 rounded-full"
    >
      <FaArrowLeft />
    </button>
  );

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 700,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    // 🔥 RESPONSIVE BREAKPOINTS
    responsive: [
      {
        breakpoint: 1280, // laptops
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024, // tablets landscape
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // tablets portrait
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const approvedCourses = getData.filter(
    (course) => course.courseStatus === "APPROVED"
  );

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">All Courses</h1>

      <Slider {...settings}>
        {approvedCourses.map((course) => (
          <div key={course.id} className="px-2">
            <div className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col">
              {/* Thumbnail */}
              <div className="h-40 w-full overflow-hidden rounded-t-xl">
                <img
                  src={course.thumbnailUrl}
                  alt={course.courseTitle}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                  {course.courseTitle}
                </h2>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {course.courseDescription}
                </p>

                {/* Button pinned to bottom */}
                <button
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (token) {
                      router.push(
                        `/course/${course.courseTitle
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      );
                    } else {
                      router.push("/?showLogin=true");
                    }
                  }}
                >
                  Explore Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseCarousel;
