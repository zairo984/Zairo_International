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
import { useState, useEffect } from "react"

const Slider = () => {
  const [isShapeVisible, setIsShapeVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Function to handle when slide changes
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)

    // Reset shape visibility
    setIsShapeVisible(false)

    // Trigger animation after a short delay for the new slide
    setTimeout(() => {
      setIsShapeVisible(true)
    }, 500)
  }

  // Set initial shape visibility on component mount
  useEffect(() => {
    setIsShapeVisible(true)
  }, [])

  const slides = [
    {
      id: 1,
      image: meeting1.src,
      bigText: "We are Zairo",
      smallText: "Team with Big Talents",
    },
    {
      id: 2,
      image: meeting2.src,
      bigText: "We are the best",
      smallText: "Company in the world",
    },
  ]

  return (
    <div className="main-slider w-full h-screen relative overflow-hidden">
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-red-600",
          bulletClass: "swiper-pagination-bullet bg-white/50 w-3 h-3 mx-1 transition-all duration-300",
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
        }}
        speed={1000}
        onSlideChange={handleSlideChange}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div className="relative w-full h-full">
              {/* Full-screen image with zoom effect */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-in-out ${
                    activeIndex === index ? "scale-110" : "scale-100"
                  } opacity-90 filter brightness-[0.35]`}
                  src={slide.image || "/placeholder.svg"}
                  alt={`${slide.bigText} - ${slide.smallText}`}
                />
              </div>

              {/* Animated shape1 image */}
              <img
                src={shape1.src || "/placeholder.svg"}
                alt="Decorative shape"
                className={`absolute top-0 left-0 transition-all duration-1000 ease-in-out hidden md:block z-[1] ${
                  isShapeVisible && activeIndex === index ? "opacity-70 translate-x-0" : "opacity-0 -translate-x-40"
                }`}
              />

              {/* Content container */}
              <div className="absolute inset-0 flex items-center z-10">
                <div className="container mx-auto px-4 md:px-8">
                  {/* Text content with staggered animations */}
                  <div className="max-w-xl md:ml-16 text-white z-10 text-left">
                    <h1
                      className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 transition-all duration-1000 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      {slide.bigText}
                    </h1>
                    <h3
                      className={`text-xl md:text-2xl lg:text-3xl mb-8 transition-all duration-1000 delay-200 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      {slide.smallText}
                    </h3>
                    <button
                      type="button"
                      className={`mt-4 px-8 py-4 bg-red-600 text-white text-lg rounded-md hover:bg-red-700  hover:shadow-lg hover:translate-y-[-2px] transition-all duration-1000 delay-400 ${
                        isShapeVisible && activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated shape2 image with floating animation */}
              <img
                src={shape2.src || "/placeholder.svg"}
                alt="Decorative shape"
                className={`absolute bottom-8 right-0 animate-float-bob-x transition-all duration-1000 delay-300 ${
                  isShapeVisible && activeIndex === index ? "opacity-70 translate-x-0" : "opacity-0 translate-x-40"
                }`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev !text-white !opacity-70 hover:!opacity-100 transition-opacity duration-300 !left-4 !after:text-2xl"></div>
      <div className="swiper-button-next !text-white !opacity-70 hover:!opacity-100 transition-opacity duration-300 !right-4 !after:text-2xl"></div>
    </div>
  )
}

export default Slider

