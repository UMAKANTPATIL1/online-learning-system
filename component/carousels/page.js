"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Carousel = () => {
  const carouselData = [
    "https://happenings.lpu.in/wp-content/uploads/2024/01/What-to-do-after-10th.jpg",
    "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg",
    "https://thumbs.dreamstime.com/b/demo-text-businessman-dark-vintage-background-108609906.jpg",
  ];

  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      speed={800}
      loop={true}
      className="mySwiper"
    >
      {carouselData.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item}
            alt={`Slide ${index + 1}`}
            className="w-full h-[500px]  object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
