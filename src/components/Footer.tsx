import React from "react";
import logo from "@/images/logo1.webp"; // Replace with your actual logo path

const Footer = () => {
  return (
    <footer className="bg-[#111f2e] text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo and Address */}
        <div className="space-y-4">
          <img src={logo.src} alt="Logo" className="h-12" />
          <address>
            <p>123 Street Name,</p>
            <p>City, Country</p>
            <p>Email: email@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </address>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-red-600 transition-colors duration-300">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-red-600 transition-colors duration-300">About Us</a>
            </li>
            <li>
              <a href="#services" className="hover:text-red-600 transition-colors duration-300">Services</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-red-600 transition-colors duration-300">Contact Us</a>
            </li>
            <li>
              <a href="#blog" className="hover:text-red-600 transition-colors duration-300">Our Blog</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#help" className="hover:text-red-600 transition-colors duration-300">Help</a>
            </li>
            <li>
              <a href="#support" className="hover:text-red-600 transition-colors duration-300">Support</a>
            </li>
            <li>
              <a href="#clients" className="hover:text-red-600 transition-colors duration-300">Clients</a>
            </li>
            <li>
              <a href="#shop" className="hover:text-red-600 transition-colors duration-300">Shop</a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-red-600 transition-colors duration-300">Portfolio</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Newsletter</h3>
          <p>Subscribe our newsletter to get the latest news & updates</p>
          <form action="#" method="POST">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-md text-black"
              required
            />
            <button
              type="submit"
              className="w-full mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-12">
        <p>Copyright © 2024 Zairo by codesholder. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
