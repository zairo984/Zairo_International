"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import logo from "@/images/logo1.webp";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useHeroTheme } from "@/components/hero-theme-provider";

const ease = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { name: "Home", href: "/", type: "link" as const },
  { name: "About", href: "/about", type: "link" as const },
  { name: "Capabilities", href: "#capabilities", type: "scroll" as const, sectionId: "capabilities" },
  { name: "Ventures", href: "#ventures", type: "scroll" as const, sectionId: "ventures" },
  { name: "Team", href: "#team", type: "scroll" as const, sectionId: "team" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme: heroTheme, setTheme: setHeroTheme, mounted: themeMounted } =
    useHeroTheme();
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (isMenuOpen || y < 24) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  const handleScroll = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const target = document.getElementById(sectionId);
      const lenis = (window as Window & { __lenis?: { scrollTo: (el: Element, opts?: object) => void } }).__lenis;
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -88 });
      } else {
        target?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>

      <motion.header
        initial={false}
        animate={
          reduced
            ? { y: 0, opacity: 1 }
            : hidden
              ? { y: "-120%", opacity: 0 }
              : { y: 0, opacity: 1 }
        }
        transition={{ duration: 0.35, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-3">
          <div
            className="relative flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl border border-white/10 px-3 py-2.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] sm:px-4"
            style={{
              background:
                "linear-gradient(180deg, #050505 0%, #0a0a0a 42%, #131313 100%)",
            }}
          >
            <Link
              href="/"
              className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label="Zairo International home"
            >
              <Image
                src={logo}
                alt="Zairo International"
                className="h-11 w-auto sm:h-12"
                priority
              />
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active =
                  link.type === "link" &&
                  (link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href));

                if (link.type === "scroll") {
                  return (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => handleScroll(link.sectionId)}
                      className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-white/75 transition-colors duration-300 ease-motion hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {link.name}
                      <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-motion group-hover:scale-x-100" />
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ease-motion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      active ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute inset-x-3.5 bottom-1 h-px bg-primary transition-transform duration-300 ease-motion ${
                        active
                          ? "scale-x-100"
                          : "origin-left scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-[transform,opacity] duration-300 ease-motion hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
              >
                Get started
              </Link>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-[transform,background-color] duration-300 ease-motion hover:bg-white/10 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <motion.span
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="inline-flex"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" weight="bold" />
                  ) : (
                    <List className="h-5 w-5" weight="bold" />
                  )}
                </motion.span>
              </button>
            </div>
          </div>

          {isHome ? (
            <div className="hidden shrink-0 self-center lg:block">
              {themeMounted ? (
                <AnimatedThemeToggler
                  theme={heroTheme}
                  onThemeChange={setHeroTheme}
                  className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-[#0a0a0a]/80 text-white shadow-lg backdrop-blur-md transition-[transform,background-color] duration-300 ease-motion hover:bg-[#131313] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"
                />
              ) : (
                <span
                  className="inline-flex size-11 rounded-2xl border border-white/15 bg-[#0a0a0a]/80"
                  aria-hidden
                />
              )}
            </div>
          ) : null}
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              aria-label="Close menu overlay"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={reduced ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduced ? undefined : { x: "100%" }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 px-6 pb-8 pt-24"
              style={{
                background:
                  "linear-gradient(180deg, #050505 0%, #0a0a0a 42%, #131313 100%)",
              }}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease }}
                  >
                    {link.type === "scroll" ? (
                      <button
                        type="button"
                        onClick={() => handleScroll(link.sectionId)}
                        className="w-full rounded-xl px-3 py-3 text-left text-lg font-medium text-white transition-colors duration-300 ease-motion hover:bg-white/5"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block rounded-xl px-3 py-3 text-lg font-medium transition-colors duration-300 ease-motion hover:bg-white/5 ${
                          pathname === link.href ? "text-primary" : "text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                {isHome && themeMounted ? (
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                    <span className="text-sm font-medium text-white/75">
                      Hero look
                    </span>
                    <AnimatedThemeToggler
                      theme={heroTheme}
                      onThemeChange={setHeroTheme}
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 [&_svg]:size-4"
                    />
                  </div>
                ) : null}

                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
