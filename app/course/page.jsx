"use client";
import React, { useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick/lib/slider";
// import PropTypes from 'prop-types'
import { useRouter } from "next/navigation";
import { useCourse } from "../contextApi/page";
const CourseCarousel = () => {
  const router = useRouter();
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
  // const carouselData = [
  //   {
  //     imageUrl:
  //       "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp/v1/fill/w_640,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
  //     title: "Web Development",
  //     description: "Join our platform and gain real-world experience",
  //     buttonText: "Explore Course",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg",
  //     title: "Java Development",
  //     description: "Join our platform and gain real-world experience",
  //     buttonText: "Explore Course",
  //   },

  //   {
  //     imageUrl:
  //       "https://thumbs.dreamstime.com/b/demo-text-businessman-dark-vintage-background-108609906.jpg",

  //     title: "Frontend Development",
  //     description: "Join our platform and gain real-world experience",
  //     buttonText: "Explore Course",
  //   },
  //   {
  //     imageUrl:
  //       "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp/v1/fill/w_640,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
  //     title: "Web Development",
  //     description: "Join our platform and gain real-world experience",
  //     buttonText: "Explore Course",
  //   },
  //   {
  //     imageUrl:
  //       "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp/v1/fill/w_640,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
  //     title: "Web Development",
  //     description: "Join our platform and gain real-world experience",
  //     buttonText: "Explore Course",
  //   },
  //   {
  //     imageUrl:
  //       "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp/v1/fill/w_640,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
  //     title: "Web Development",
  //     description: "Join our platform and gain real-world experience",
  //     buttonText: "Explore Course",
  //   },
  // ];
  const { getData, getAllCourses, isVideo } = useCourse();

  useEffect(() => {
    getAllCourses();
  }, []);

  console.log("getData", getData); // should be an array after fetch
  console.log("First course title:", getData[0]?.courseTitle);
  console.log("Total courses:", getData.length);

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
      <h1 className="text-2xl font-bold mb-4 ">All Courses</h1>
      <Slider {...settings}>
        {getData.map((course, index) => (
          <div
            key={index}
            className="w-48 p-3 h-auto text-center   rounded-lg shadow-md flex  items-center justify-center "
          >
            <img
              src={course.fileUrl}
              alt={course.title}
              className="w-auto h-48 object-cover mb-2 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-1">{course.courseTitle}</h2>
            <p className="text-gray-600 mb-2">{course.courseDescription}</p>
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
              {/* {course.buttonText} */}
              Explore Course
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseCarousel;
