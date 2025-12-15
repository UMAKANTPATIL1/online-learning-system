"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";

const InstructorCarousels = () => {
  const router = useRouter();

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

  const carouselData = [
    {
      imageUrl:
        "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
      title: "Web Development",
      description: "Join our platform and gain real-world experience",
      buttonText: "Explore Course",
    },
    {
      imageUrl:
        "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg",
      title: "Java Development",
      description: "Join our platform and gain real-world experience",
      buttonText: "Explore Course",
    },
    {
      imageUrl:
        "https://thumbs.dreamstime.com/b/demo-text-businessman-dark-vintage-background-108609906.jpg",
      title: "Frontend Development",
      description: "Join our platform and gain real-world experience",
      buttonText: "Explore Course",
    },
    {
      imageUrl:
        "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
      title: "Backend Development",
      description: "Join our platform and gain real-world experience",
      buttonText: "Explore Course",
    },
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 700,

    slidesToShow: 4,
    slidesToScroll: 1,

    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1280, // laptops
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // small tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">All Instructors</h1>

      <Slider {...settings}>
        {carouselData.map((course, index) => (
          <div key={index} className="px-2">
            <div className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col">
              {/* Image */}
              <div className="h-40 w-full overflow-hidden rounded-t-xl">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 text-center">
                <h2 className="text-lg font-semibold mb-1">{course.title}</h2>

                <p className="text-gray-600 text-sm mb-3">
                  {course.description}
                </p>

                <button
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  onClick={() =>
                    router.push(
                      `/course/${course.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                    )
                  }
                >
                  {course.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InstructorCarousels;
