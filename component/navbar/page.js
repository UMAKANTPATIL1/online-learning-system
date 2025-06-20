import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="flex item-center  justify-between p-4 bg-white text-black">
        <h1>logo</h1>
        <div className="flex space-x-8  items-center text-md font-semibold cursor-pointer">
          <ul>Home</ul>
          <ul>Contact us</ul>
          <ul>About</ul>
          <button className=" text-black border-2 border-blue-400  px-4 py-1  rounded-sm hover:bg-blue-200 hover:text-black transition-all duration-300 ease-in-out cursor-pointer ">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
