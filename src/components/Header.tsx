import React from "react";
import logo from "@/images/logo.webp";

const Header = () => {
  return (
    <header className="sticky top-0 z-10" >
      {/* Upper Part: Logo, Email, and Contact */}
      <div className="bg-gray-100 p-4 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-black text-2xl font-bold">
            <img src={logo.src} alt="Logo" className="h-12" />
          </div>

          {/* Contact Info */}
          <div className="flex gap-6 text-black">
            <div className="flex items-center">
              <span className="mr-2">📧</span>
              <span>info@example.com</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📞</span>
              <span>(123) 456-7890</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Part: Navigation Menu */}
      <div className="bg-[#16293c]">
        <div className="p-4">
          <nav>
            <ul className="flex justify-center space-x-8">
              <li>
                <a
                  href="#home"
                  className="text-white hover:text-red-600 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white hover:text-red-600 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white hover:text-red-600 transition-colors duration-300"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-white hover:text-red-600 transition-colors duration-300"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#blogs"
                  className="text-white hover:text-red-600 transition-colors duration-300"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white hover:text-red-600 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
