"use client";
import React from "react";
import logo from "@/images/logo1.webp";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✅ Use `next/navigation` in the App Router

const Header = () => {
  const router = useRouter();

  const pathname = usePathname(); // ✅ Get current page

  const handleScroll = (sectionId: string, page: string = "/") => {
    if (pathname !== page) {
      // ✅ Navigate first if on a different page
      router.push(`${page}#${sectionId}`);
    } else {
      // ✅ Scroll directly if already on the page
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sm:sticky top-0 z-20 bg-[#16293c]">
      <div className="p-4 flex justify-between items-center">
        {/* Logo or Branding */}
        <div className="text-white text-2xl font-bold">
          <img src={logo.src} className="h-12 ml-5" />
        </div>

        {/* Navigation Links */}
        <nav className="mr-5 space-x-6">
          <Link href="/" className="relative text-lg font-medium group pb-1 px-2 text-white">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 transition-all duration-200 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="relative text-lg font-medium group pb-1 px-2 text-white">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 transition-all duration-200 ease-in-out group-hover:w-full"></span>
          </Link>
          <button onClick={() => handleScroll("mySection")} className="relative text-lg font-medium group pb-1 px-2 text-white">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 transition-all duration-200 ease-in-out group-hover:w-full"></span>
          </button>
          <Link href="/blogs" className="relative text-lg font-medium group pb-1 px-2 text-white">
            Blogs
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 transition-all duration-200 ease-in-out group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
