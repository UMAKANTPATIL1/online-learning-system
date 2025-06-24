import React from "react";

const Navbar = ({ navList }) => {
  return (
    <div className="bg-white text-black p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Logo</h1>

        <div className="flex items-center space-x-8">
          <ul className="flex space-x-8 items-center font-semibold">
            {navList.map((item, key) => (
              <li key={key}>
                {item.label.toLowerCase() === "log in" ? (
                  <button className=" text-black border-2 border-blue-400  px-4 py-1  rounded-sm hover:bg-blue-200 hover:text-black transition-all duration-300 ease-in-out cursor-pointer ">
                    Log In
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className=" hover:text-blue-500 transition duration-200 "
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
