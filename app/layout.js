// app/layout.jsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/component/navbar/page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CourseProvider } from "./contextApi/page";
import Navbar from "@/component/navbar/page";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { Footer } from "@/component/footer/page";
import ProtectedClient from "@/component/protectedClient/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LearnSphere",
  description: "It is online learning platform",
};
const navList = [
  { label: "Home", href: "/" },
  { label: "Contact us", href: "/contact-us" },
  { label: "About", href: "/about" },
  { label: "Log in", href: "/" },
];
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-amber-300 min-h-screen`}
      >
        <Suspense>
          {/* <ProtectedClient> */}
          <CourseProvider>
            <Navbar navList={navList} />
            <Toaster className="swiper-centered" />
            <main>{children}</main>
          </CourseProvider>
          <Footer />
          {/* </ProtectedClient> */}
        </Suspense>
      </body>
    </html>
  );
}
