"use client";

import { useCourse } from "@/app/contextApi/page";
import Login from "@/app/login/page";
import Register from "@/app/register/page";
import Cookies from "js-cookie";
import { Sidebar, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../public/assets/logo.png";
import Image from "next/image";

const Navbar = ({ navList }) => {
  const { logout } = useCourse();

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", image: "" });
  const searchParams = useSearchParams();
  // const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const showLogin = searchParams.get("showLogin");

    if (showLogin === "true") {
      setShowModal(true);

      router.replace("/", { scroll: false });
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const name = Cookies.get("name");
      const image = Cookies.get("image");

      setIsAuthenticated(!!token);

      if (token && name) {
        setUser({ name, image: image || "" });
      } else {
        setUser({ name: "", image: "" });
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoutClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      logout();

      // router.refresh(); // optional, if you need hard refresh
    } else {
      setShowModal(true);
      router.push("/?showLogin=true");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white text-black p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div
          className="h-10 flex items-center -mx-6 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="LearnSphere Logo"
            className="h-32 w-auto object-cover"
          />
        </div>

        {/* Mobile Menu Button - Visible usually on small screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu - Hidden on small screens */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 items-center font-semibold">
            {navList.map((item, key) => {
              const isLoginLink = item.label.toLowerCase() === "log in";
              return (
                <li key={key}>
                  {isLoginLink ? (
                    isAuthenticated ? (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm">{user.name}</span>
                        <button
                          onClick={handleLogoutClick}
                          className="text-black border-2 border-red-400 px-3 py-1 rounded-sm hover:bg-red-100 hover:text-black transition-all duration-300 ease-in-out cursor-pointer"
                        >
                          Log Out
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-black border-2 border-blue-400 px-4 py-1 rounded-sm hover:bg-blue-200 hover:text-black transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={handleLogoutClick}
                      >
                        Log In
                      </button>
                    )
                  ) : (
                    <a
                      href={item.href}
                      className="hover:text-blue-500 transition duration-200"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-4 font-semibold">
            {navList.map((item, key) => {
              const isLoginLink = item.label.toLowerCase() === "log in";
              return (
                <li key={key} className="border-b border-gray-100 pb-2">
                  {isLoginLink ? (
                    isAuthenticated ? (
                      <div className="flex flex-col space-y-3">
                        <span className="text-sm text-gray-600">
                          Signed in as {user.name}
                        </span>
                        <button
                          onClick={() => {
                            handleLogoutClick();
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-black border-2 border-red-400 px-3 py-1 rounded-sm hover:bg-red-100 w-full text-center"
                        >
                          Log Out
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-black border-2 border-blue-400 px-4 py-1 rounded-sm hover:bg-blue-200 w-full text-center"
                        onClick={() => {
                          handleLogoutClick();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Log In
                      </button>
                    )
                  ) : (
                    <a
                      href={item.href}
                      className="block hover:text-blue-500 transition duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {showModal && <Login setShowModal={setShowModal} />}
      {/* {showModal && <Register setShowModal={setShowModal} />} */}
    </div>
  );
};

export default Navbar;
