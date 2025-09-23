"use client";

import Login from "@/app/login/page";
import Cookies from "js-cookie";
import { Sidebar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = ({ navList }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", image: "" });
  const searchParams = useSearchParams();
  // const router = useRouter();
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
    const token = Cookies.get("token");

    if (token) {
      // ✅ Correctly remove by key (not value)
      Cookies.remove("token", { path: "/" });
      Cookies.remove("name", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("image", { path: "/" });
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setIsAuthenticated(false);
      setUser({ name: "", image: "" });

      router.push("/");
      router.refresh(); // optional, if you need hard refresh
    } else {
      setShowModal(true);
      router.push("/?showLogin=true");
    }
  };

  return (
    <div className="bg-white text-black p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Logo</h1>
        {/* {isAuthenticated && <Sidebar navList={navList} />} */}

        <div className="flex items-center space-x-8">
          <ul className="flex space-x-8 items-center font-semibold">
            {navList.map((item, key) => {
              const isLoginLink = item.label.toLowerCase() === "log in";
              return (
                <li key={key}>
                  {isLoginLink ? (
                    isAuthenticated ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.image || "/default-avatar.png"}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border border-gray-300"
                        />
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
      {showModal && <Login setShowModal={setShowModal} />}
    </div>
  );
};

export default Navbar;
