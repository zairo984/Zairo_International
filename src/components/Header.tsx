"use client"
import { useEffect, useRef, useState } from "react"
import logo from "@/images/logo1.webp"
import Link from "next/link"
import gsap from "gsap"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

const Header = () => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const boxes = ref.current.querySelectorAll(".box")
    if (!boxes || boxes.length === 0) return
    gsap.from(boxes, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      delay: 0.8,
      stagger: 0.3,
      ease: "power4.out",
    })
  }, [])

  // Animation for mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      })

      // Animate menu items
      const menuItems = mobileMenuRef.current.querySelectorAll(".mobile-menu-item")
      gsap.fromTo(
        menuItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        },
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }, [isMenuOpen])

  const pathname = usePathname()

  const handleScroll = (sectionId: string, page = "/") => {
    if (pathname !== page) {
      router.push(`${page}#${sectionId}`)
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  const navLinks = [
    { name: "Home", href: "/", isButton: false },
    { name: "About", href: "/about", isButton: false },
    { name: "Services", href: "#", isButton: true, sectionId: "mySection" },
    { name: "Blogs", href: "/blogs", isButton: false },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#16293c] shadow-lg">
      <div ref={ref} className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo or Branding */}
        <div className="box text-white text-2xl font-bold flex items-center">
          <img
            src={logo.src || "/placeholder.svg"}
            alt="Logo"
            className="h-10 sm:h-12 ml-0 sm:ml-5 transition-all duration-300"
          />
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <nav className="box hidden md:flex mr-0 md:mr-5 space-x-2 lg:space-x-6">
          {navLinks.map((link, index) =>
            link.isButton ? (
              <button
                key={index}
                onClick={() => handleScroll(link.sectionId as string)}
                className="relative text-base lg:text-lg font-medium group pb-1 px-2 text-white hover:text-red-300 transition-colors duration-200"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 transition-all duration-200 ease-in-out group-hover:w-full"></span>
              </button>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={`relative text-base lg:text-lg font-medium group pb-1 px-2 transition-colors duration-200 ${
                  pathname === link.href ? "text-red-300" : "text-white hover:text-red-300"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] bg-red-500 transition-all duration-200 ease-in-out ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ),
          )}
        </nav>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="box md:hidden text-white p-2 focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>

        {/* Mobile Menu - Slide in from right */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-[#16293c] shadow-xl transform translate-x-full z-40 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full pt-20 px-8">
            {navLinks.map((link, index) => (
              <div key={index} className="mobile-menu-item py-4 border-b border-gray-700">
                {link.isButton ? (
                  <button
                    onClick={() => handleScroll(link.sectionId as string)}
                    className="text-xl font-medium text-white hover:text-red-300 transition-colors duration-200 w-full text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-xl font-medium block w-full ${
                      pathname === link.href ? "text-red-300" : "text-white hover:text-red-300"
                    } transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Additional mobile menu content */}
            <div className="mt-auto pb-8 mobile-menu-item opacity-0">
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-4">Connect with us</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-red-300 transition-colors duration-200">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-red-300 transition-colors duration-200">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-red-300 transition-colors duration-200">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsMenuOpen(false)}></div>
        )}
      </div>
    </header>
  )
}

export default Header

