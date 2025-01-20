'use client';

import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import meeting1 from '@/images/meeting1.jpg';
import meeting2 from '@/images/meeting2.jpg';
import shape1 from '@/images/shape-1.png';
import shape2 from '@/images/shape-2.png';
import { Swiper as SwiperType } from 'swiper';
import { useState, useEffect } from 'react';

const Slider = () => {
  const [isShapeVisible, setIsShapeVisible] = useState(false);
  const [secondSlideActive, setSecondSlideActive] = useState(false);

  // Function to handle when slide changes
  const handleSlideChange = (swiper: SwiperType) => {
    // Check if it's the second slide
    
    // Reset shape visibility
    setIsShapeVisible(false);

    // Trigger animation after 1 second for the new slide
    setTimeout(() => {
      setIsShapeVisible(true);
    }, 1000);
  };

  const slides = [
    {
      id: 1,
      image: meeting1.src,
      bigText: "We are Zairo",
      smallText: "Team with Big Talents"
    },
    {
      id: 2,
      image: meeting2.src,
      bigText: "We are the best",
      smallText: "Company in the world"
    },
  ];


  return (
    <div className="main-slider w-full h-screen">
  <Swiper
    modules={[Pagination, Navigation]}
    pagination={{ clickable: true }}
    navigation
    spaceBetween={50}
    slidesPerView={1}
    loop
    onSlideChange={handleSlideChange}
  >
    {slides.map((slide) => (
      <SwiperSlide key={slide.id}>
        <div className="relative sm:w-full h-screen">
          {/* Full-screen image */}
          <img
            className="w-full h-full object-cover transition-transform duration-[1000ms] ease-in-out transform hover:scale-120 opacity-90 filter brightness-50"
            src={slide.image}
            alt="slide image"
          />

          {/* Animated shape1 image */}
          <img
            src={shape1.src}
            className={`absolute top-0 left-0 transition-all duration-700 ease-in-out hidden md:block ${
              isShapeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          />


          {/* Main Text Positioned Over Shape1 */}
          {/* Main Text Positioned Over Shape1 */}
<div
  className="absolute top-1/2 left-16 transform -translate-y-1/2 text-white z-10 px-4 md:w-[40%] w-[90%] text-left"
>
  <h1 className="animate__animated custom-bounce-up text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
    {slide.bigText}
  </h1>
  <h3 className="animate__animated custom-bounce-up text-lg md:text-2xl lg:text-3xl mb-6">
    {slide.smallText}
  </h3>
  <button
    type="button"
    className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition-colors"
  >
    Contact Us
  </button>
</div>


          {/* Animated shape2 image */}
          <img
            src={shape2.src}
            className="absolute bottom-8 right-0 float-bob-x"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


  );
};

export default Slider;
