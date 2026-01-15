"use client";

import { useState } from "react";
import { Menu, X, Rocket, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCourse } from "@/app/contextApi/page";

export default function Sidebar({ navList, onSelect, setOpen, open }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { logout, user } = useCourse();

  const handleClick = (index) => {
    setActiveIndex(index);
    onSelect(index);
    setOpen(false); // Auto close on mobile
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 h-full w-72 bg-white border-r border-gray-200 shadow-xl md:shadow-none z-40 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-72 lg:w-80
        `}
      >
        {/* Logo Area */}
        {/* <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Rocket className="w-8 h-8" />
            <span>LearnSphere</span>
          </div>
        </div> */}

        {/* User Info (Optional) */}
        {user && (
          <div className="px-6 py-6 flex items-center gap-3">
            <img
              src={user.image || "/default-avatar.png"}
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navList.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 group
                  ${isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {Icon && (
                  <Icon
                    className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}
                  />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
