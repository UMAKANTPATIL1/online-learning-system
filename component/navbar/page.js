"use client";

import { useCourse } from "@/app/contextApi/page";
import Login from "@/app/login/page";
import { Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const Navbar = ({ navList }) => {
  const { logout, user } = useCourse();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("showLogin") === "true") {
      setShowModal(true);
      router.replace("/", { scroll: true });
    }
  }, [searchParams, router]);

  const handleLogout = () => {
    logout(); // context logout
    setIsProfileOpen(false);
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="h-10 flex items-center justify-between">
        {/* Logo (INCREASED SIZE) */}
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image
            src={logo}
            alt="Logo"
            className="h-32 w-auto object-cover" // ⬅ increased size
            priority
          />
        </div>

        {/* Right Side (NavList + Profile/Login) */}
        <div className="hidden md:flex items-center space-x-10">
          {/* Nav List */}
          <ul className="flex space-x-8 font-semibold">
            {navList.map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="hover:text-blue-600 transition">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          <div className="relative">
            {user ? (
              <>
                <img
                  src={user.image || "/assets/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border rounded-md shadow-md p-3">
                    <p className="text-sm mb-3">👋 {user.name}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-500 hover:bg-red-50 px-2 py-1 rounded"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => router.push("/?showLogin=true")}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden mt-4 space-y-3 font-semibold">
          {navList.map((item, idx) => (
            <li key={idx}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}

      {showModal && <Login setShowModal={setShowModal} />}
    </div>
  );
};

export default Navbar;
