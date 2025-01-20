import React from 'react';
import logo from '@/images/logo1.webp'

const Header = () => {
  return (
    <header className="sm:sticky top-0 z-10 bg-[#16293c]">
      <div className="p-4 flex justify-between items-center">
        {/* Logo or Branding */}
        <div className="text-white text-2xl font-bold">
          <img 
          src={logo.src}></img>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
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
                href="#services"
                className="text-white hover:text-red-600 transition-colors duration-300"
              >
                Services
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
    </header>
  );
};

export default Header;
