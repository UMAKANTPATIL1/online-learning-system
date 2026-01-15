import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-10 relative z-10 clear-both">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">LearnSphere</h2>
          <p className="text-sm leading-6">
            Empowering students and professionals with high-quality online
            courses, interactive learning, and expert-led training programs.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                All Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Popular Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* For Instructors */}
        <div>
          <h3 className="font-semibold text-white mb-3">For Instructors</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Teach on LearnSphere
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Instructor Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-3">Support & Policies</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 mb-6"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} LearnSphere — All Rights Reserved.
        </p>

        {/* Social icons */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
