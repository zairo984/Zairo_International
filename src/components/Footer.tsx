"use client";
import React from "react";
import logo from "@/images/logo1.webp"; // Replace with your actual logo path

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Facebook, Instagram, Linkedin} from "lucide-react";

const Footer = () => {
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
		<footer className="bg-[#111f2e] text-white py-12">
			<div className="container box5 mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
				{/* Logo and Address */}
				<div className="space-y-4">
					<img src={logo.src} alt="Logo" className="h-12" />
					<address>

						<p>117/N/70 3rd Floor, Kakadeo,</p>
						<p>Kanpur, India</p>
						<p>Email: 	hr@zairointernational.com</p>
						<p>Phone: (+91) 95198 03665</p>
					</address>
					<div className="space-y-3 flex-col justify-end pr-9">
					<h5 className="text-base font-semibold">Be a Part of our Community</h5>
					<div className="flex  space-x-6">
						<Link
							href="https://www.facebook.com/Zairointernational"
							target="_blank"
							aria-label="Facebook"
						>
							<Facebook className="w-4 h-4 hover:text-blue-500 transition-all" />
						</Link>
						<Link
							href="https://www.instagram.com/zairointernational/?hl=en"
							target="_blank"
							aria-label="Instagram"
						>
							<Instagram className="w-4 h-4 hover:text-pink-500 transition-all" />
						</Link>
						{/* <Link
							href="https://twitter.com"
							target="_blank"
							aria-label="Twitter"
						>
							<Twitter className="w-4 h-4 hover:text-blue-400 transition-all" />
						</Link> */}
						<Link
							href="https://www.linkedin.com/company/zairointernational/posts/?feedView=all"
							target="_blank"
							aria-label="Linkedin"
						>
							<Linkedin className="w-4 h-4 hover:text-blue-400 transition-all" />
						</Link>
					</div>
				
			</div>
				</div>

				{/* Navigation Links */}
				<div className="space-y-2 flex flex-col">
					<h3 className="text-xl font-semibold">Navigation</h3>
					<Link href="/">
						<span className="hover:text-red-600 transition-colors duration-300">
							Home
						</span>
					</Link>
					<Link href="/about">
						<span className="hover:text-red-600 transition-colors duration-300">
							About Us
						</span>
					</Link>
					<span
						onClick={() => handleScroll("mySection")}
						className="hover:text-red-600 transition-colors duration-300"
					>
						Services
					</span>
					<Link href="/contact">
						<span className="hover:text-red-600 transition-colors duration-300">
							Contact Us
						</span>
					</Link>
					<Link href="/blog">
						<span className="hover:text-red-600 transition-colors duration-300">
							Our Blog
						</span>
					</Link>
				</div>

				{/* Quick Links */}
				<div className="space-y-2 flex flex-col">
					<h3 className="text-xl font-semibold">Quick Links</h3>
					<Link href="/contact">
						<span className="hover:text-red-600 transition-colors duration-300">
							Help
						</span>
					</Link>
					<Link href="/contact">
						<span className="hover:text-red-600 transition-colors duration-300">
							Support
						</span>
					</Link>
					<span
						onClick={() => handleScroll("projects")}
						className="hover:text-red-600 transition-colors duration-300"
					>
						Clients
					</span>
					<Link href="#shop">
						<span className="hover:text-red-600 transition-colors duration-300">
							Shop
						</span>
					</Link>
					<Link href="#portfolio">
						<span className="hover:text-red-600 transition-colors duration-300">
							Portfolio
						</span>
					</Link>
				</div>

				{/* Newsletter */}
				<div className="space-y-4">
          <h3 className="text-xl font-semibold">Join Our Team</h3>
          <p>Be a Part of our Team</p>
          <form action="#" method="POST">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-md text-black"
              required
            />
            <button
              onClick={()=> window.location.href = "/hiring"}
              className="w-full mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
            >
			  Contact Us
            </button>
          </form>
        </div>
			</div>

			{/* Copyright Section */}
			<div className="text-center mt-12">
				<p>
					Copyright © 2024 Zairo by codesholder. All Rights Reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
