"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/images/logo1.webp";

const ventures = [
  { name: "Vacation Saga", href: "#ventures" },
  { name: "Housing Saga", href: "#ventures" },
  { name: "Tech Tunes", href: "#ventures" },
  { name: "Silken Knot", href: "#ventures" },
];

export default function AnimatedWaveFooter() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (sectionId: string, page: string = "/") => {
    if (pathname !== page) {
      router.push(`${page}#${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative overflow-hidden pt-20 text-white"
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #0a0a0a 42%, #131313 100%)",
      }}
    >
      {/* Gloss highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute bottom-0 flex h-[420px] w-[3600px] animate-wave"
          style={{ color: "#D33333" }}
        >
          <svg
            className="h-full w-[1800px] shrink-0"
            viewBox="0 0 1800 500"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
              fill="currentColor"
              className="opacity-15"
            />
            <path
              d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
              fill="currentColor"
              className="opacity-25"
            />
          </svg>
          <svg
            className="h-full w-[1800px] shrink-0"
            viewBox="0 0 1800 500"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
              fill="currentColor"
              className="opacity-15"
            />
            <path
              d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
              fill="currentColor"
              className="opacity-25"
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src={logo}
                alt="Zairo International"
                className="h-12 w-auto"
                height={48}
              />
            </Link>
            <p className="body-6 mb-6 text-white/70">
              Building brands and ventures across technology, marketing,
              commerce, and selective property.
            </p>
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = new FormData(form).get("email");
                const query =
                  typeof email === "string" && email
                    ? `?email=${encodeURIComponent(email)}`
                    : "";
                router.push(`/contact${query}`);
              }}
            >
              <div className="space-y-1">
                <Label htmlFor="footer-email" className="text-white/80">
                  Partner with Zairo
                </Label>
                <Input
                  id="footer-email"
                  name="email"
                  placeholder="Work email"
                  type="email"
                  required
                  className="border-white/15 bg-[#1a1a1a] text-white backdrop-blur-sm placeholder:text-white/40 focus-visible:ring-[#D33333]"
                />
              </div>
              <Button
                type="submit"
                className="button-md w-full bg-[#D33333] text-white hover:bg-[#D33333]/90"
              >
                Start a conversation
              </Button>
            </form>
          </div>

          <div>
            <h3 className="title-1 mb-4">Navigate</h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="body-6 block text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="body-6 block text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
              >
                About us
              </Link>
              <button
                type="button"
                onClick={() => handleScroll("capabilities")}
                className="body-6 block text-left text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => handleScroll("ventures")}
                className="body-6 block text-left text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
              >
                Ventures
              </button>
              <Link
                href="/contact"
                className="body-6 block text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="title-1 mb-4">Ventures</h3>
            <nav className="space-y-2">
              {ventures.map((venture) => (
                <button
                  key={venture.name}
                  type="button"
                  onClick={() => handleScroll("ventures")}
                  className="body-6 block text-left text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
                >
                  {venture.name}
                </button>
              ))}
              <Link
                href="/careers"
                className="body-6 block text-white/75 transition-opacity duration-300 ease-motion hover:text-white hover:opacity-100"
              >
                Careers
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="title-1 mb-4">Contact</h3>
            <address className="body-6 space-y-2 not-italic text-white/70">
              <p>117/N/70 3rd Floor, Kakadeo,</p>
              <p>Kanpur, India</p>
              <p>
                <a
                  href="tel:+919519803665"
                  className="transition-opacity duration-300 ease-motion hover:text-white"
                >
                  Phone: (+91) 95198 03665
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@zairointl.com"
                  className="transition-opacity duration-300 ease-motion hover:text-white"
                >
                  Email: info@zairointl.com
                </a>
              </p>
            </address>
            <div className="mt-6">
              <h4 className="title-4 mb-3">Follow Zairo</h4>
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/10 hover:text-white"
                >
                  <Link
                    href="https://www.facebook.com/Zairointernational"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/10 hover:text-white"
                >
                  <Link
                    href="https://www.instagram.com/zairointernational/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/10 hover:text-white"
                >
                  <Link
                    href="https://www.linkedin.com/company/zairointernational/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="caption-2 text-white/50">
            © {new Date().getFullYear()} Zairo International. All rights
            reserved.
          </p>
          <p className="caption-2 text-white/50">
            Brands and ventures, built to grow
          </p>
        </div>
      </div>
    </footer>
  );
}
