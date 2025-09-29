"use client";

import Navbar from "@/component/navbar/page";
import InstructorCarousels from "@/component/instructorCarousel/page";
import Carousel from "@/component/carousels/page";
import CourseCarousel from "./course/page";
import Login from "./login/page";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/component/sidebar/page";
import HomePage from "@/component/HomePage/page";

// const navList = [
//   { label: "Home", href: "/" },
//   { label: "Contact us", href: "/contact-us" },
//   { label: "About", href: "/about" },
//   { label: "Log in", href: "/" },
// ];

export default function Home() {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const showLogin = searchParams.get("showLogin");

  //   if (showLogin === "true") {
  //     setShowModal(true);

  //     router.replace("/", { scroll: false });
  //   }
  // }, [searchParams]);

  return (
    <>
      {/* <Navbar navList={navList} setShowModal={setShowModal} /> */}
      <HomePage />
    </>
  );
}
