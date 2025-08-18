"use client";

import { useState } from "react";

export default function Sidebar({ navList, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    onSelect(index); // Update parent to show correct component
  };

  return (
    <aside className="fixed flex  left-0 h-screen w-64  bg-gray-100  shadow-lg z-40 md:translate-x-0">
      <nav className="p-4 space-y-2">
        {navList.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`block w-full text-left px-3 py-2 rounded transition-colors duration-200
              ${
                activeIndex === index
                  ? "bg-blue-100 text-black"
                  : "text-black hover:bg-blue-100 hover:text-black"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
