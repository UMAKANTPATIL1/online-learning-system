"use client";

import React from "react";
import Slider from "react-slick";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const carouselData = [
    {
      imageUrl:
        "https://static.wixstatic.com/media/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp/v1/fill/w_640,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0b7ff_49b5986644ec4835a8e367ebdcbd8cef~mv2.webp",
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
  ];

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
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {carouselData.map((item, index) => (
        <div key={index} className="relative">
          <img
            src={item.imageUrl}
            alt={`Slide ${index + 1}`}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {item.title}
            </h2>
            <p className="text-lg md:text-xl mb-4">{item.description}</p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-medium">
              {item.buttonText}
            </button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
