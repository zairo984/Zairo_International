"use client"

import "animate.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import meeting1 from "@/images/meeting1.jpg"
import meeting2 from "@/images/meeting2.jpg"
import shape1 from "@/images/shape-1.png"
import shape2 from "@/images/shape-2.png"
import type { Swiper as SwiperType } from "swiper"
import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"

const Slider = () => {
  const [isShapeVisible, setIsShapeVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Function to handle when slide changes
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)

    // Reset shape visibility
    setIsShapeVisible(false)

    // Reset progress bar animation
    if (progressRef.current) {
      progressRef.current.style.width = "0%"
      void progressRef.current.offsetWidth // Force reflow
      progressRef.current.style.width = "100%"
    }

    // Trigger animation after a short delay for the new slide
    setTimeout(() => {
      setIsShapeVisible(true)
    }, 300)
  }

  // Set initial shape visibility on component mount
  useEffect(() => {
    setIsShapeVisible(true)

    // Initialize progress bar
    if (progressRef.current) {
      progressRef.current.style.width = "100%"
    }
  }, [])

  const slides = [
    {
      id: 1,
      image: meeting1.src,
      bigText: "We are Zairo",
      smallText: "Team with Big Talents",
      description:
        "We create innovative solutions that transform businesses and elevate user experiences to new heights.",
    },
    {
      id: 2,
      image: meeting2.src,
      bigText: "We are the best",
      smallText: "Company in the world",
      description:
        "Our award-winning team delivers exceptional results through creativity, expertise, and dedication to excellence.",
    },
  ]

  return (
    <div className="main-slider w-full h-screen relative overflow-hidden">
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-[2]"></div>

      {/* Animated dots pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-red-600 !w-6 !h-3",
          bulletClass: "swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !rounded-full mx-1 transition-all duration-300",
          horizontalClass: "!bottom-8",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        onSlideChange={handleSlideChange}
        className="h-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div className="relative w-full h-full">
              {/* Full-screen image with zoom effect */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-in-out ${
                    activeIndex === index ? "scale-110" : "scale-100"
                  } filter brightness-[0.4]`}
                  src={slide.image || "/placeholder.svg"}
                  alt={`${slide.bigText} - ${slide.smallText}`}
                />
              </div>

              {/* Animated shape1 image */}
              <img
                src={shape1.src || "/placeholder.svg"}
                alt="Decorative shape"
                className={`absolute top-0 left-0 transition-all duration-1000 ease-in-out hidden md:block z-[3] ${
                  isShapeVisible && activeIndex === index
                    ? "opacity-70 translate-x-0 rotate-0"
                    : "opacity-0 -translate-x-40 -rotate-12"
                }`}
              />

              {/* Content container */}
              <div className="absolute inset-0 flex items-center z-10">
                <div className="container mx-auto px-4 md:px-8">
                  {/* Text content with staggered animations */}
                  <div className="max-w-2xl md:ml-16 text-white z-10 text-left relative">
                    {/* Accent line */}
                    <div
                      className={`h-1 w-20 bg-red-600 mb-6 transition-all duration-1000 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"
                      }`}
                    ></div>

                    <h3
                      className={`text-xl md:text-2xl font-light mb-3 transition-all duration-1000 delay-100 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      {slide.smallText}
                    </h3>

                    <h1
                      className={`text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 transition-all duration-1000 delay-200 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      {slide.bigText}
                    </h1>

                    <p
                      className={`text-lg text-gray-200 max-w-xl mb-8 transition-all duration-1000 delay-300 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      {slide.description}
                    </p>

                    <div
                      className={`flex space-x-4 transition-all duration-1000 delay-400 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <button
                        type="button"
                        className="group relative overflow-hidden px-8 py-4 bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center">
                          Contact Us
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>

                      <button
                        type="button"
                        className="px-8 py-4 border-2 border-white/30 text-white text-lg rounded-md hover:bg-white/10 transition-all duration-300"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated shape2 image with floating animation */}
              <img
                src={shape2.src || "/placeholder.svg"}
                alt="Decorative shape"
                className={`absolute bottom-8 right-0 animate-float-bob-x transition-all duration-1000 delay-300 z-[3] ${
                  isShapeVisible && activeIndex === index
                    ? "opacity-70 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-40 rotate-12"
                }`}
              />

              {/* Slide number indicator */}
              <div className="absolute top-8 right-8 z-20 hidden md:flex items-center space-x-2">
                <span className="text-5xl font-bold text-white/90">{String(index + 1).padStart(2, "0")}</span>
                <div className="h-12 w-px bg-white/30"></div>
                <span className="text-xl text-white/50">{String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            ref={progressRef}
            className="h-full bg-red-600 w-0 transition-[width] duration-5000 ease-linear"
            style={{ transitionDuration: isHovering ? "10000ms" : "5000ms" }}
          ></div>
        </div>
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev !w-12 !h-12 !bg-black/30 !backdrop-blur-sm !rounded-full flex items-center justify-center !text-white hover:!bg-red-600/80 transition-all duration-300 !left-6 !after:hidden">
        <ChevronLeft className="w-6 h-6" />
      </div>
      <div className="swiper-button-next !w-12 !h-12 !bg-black/30 !backdrop-blur-sm !rounded-full flex items-center justify-center !text-white hover:!bg-red-600/80 transition-all duration-300 !right-6 !after:hidden">
        <ChevronRight className="w-6 h-6" />
      </div>

      {/* Social media links */}
      <div className="absolute left-8 bottom-24 z-20 hidden md:flex flex-col space-y-4">
        <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
          <div className="w-px h-8 bg-white/30 mx-auto mb-2"></div>
          Facebook
        </a>
        <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
          Twitter
        </a>
        <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
          Instagram
        </a>
      </div>
    </div>
  )
}

export default Slider

