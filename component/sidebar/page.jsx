"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Sidebar({ navList, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false); // Mobile toggle

  const handleClick = (index) => {
    setActiveIndex(index);
    onSelect(index);
    setOpen(false); // Auto close on mobile
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded"
        onClick={() => setOpen(!open)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-8 left-0 h-full w-64 bg-gray-100 shadow-lg z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static
        `}
      >
        <nav className="p-4 space-y-2">
          {navList.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`block w-full text-left px-3 py-2 rounded font-medium transition-colors duration-200
                ${
                  activeIndex === index
                    ? "bg-blue-100 text-black"
                    : "text-black hover:bg-blue-100"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 backdrop-blur-xs  z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
