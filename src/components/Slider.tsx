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
    <div className="main-slider">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={50}
        slidesPerView={1}
        loop
        onSlideChange={handleSlideChange} // Trigger slide change handler
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide">
              {/* Full-screen image */}
              <img
    src={slide.image}
    alt="slide image"
    style={{
      width: '100%',
      height: '100vh', // Full viewport height
      objectFit: 'cover', // Ensures image covers the area
      position: 'relative', // Necessary for z-index
      zIndex: '-1',
      filter: 'brightness(40%)', // Initial brightness (before hover)
      transition: 'transform 5s, filter 3s ease-in-out', // Add smooth transition for zoom and brightness
    }}
  />

              {/* Animated shape1 image */}
              <img
                src={shape1.src}
                className={`shape1 ${isShapeVisible ? 'visible' : ''}`}
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  transform: isShapeVisible ? 'translateX(0)' : 'translateX(-80px)', // Slide-in effect
                  opacity: isShapeVisible ? '1' : '0', // Fade-in effect
                  transition: 'all 1.2s ease', // Smooth transition
                  zIndex: '0', // Higher than background image
                }}
              />

              {/* Animated shape2 image with float effect */}
              <img
                src={shape2.src}
                className="shape2 float-bob-x"
                style={{
                  position: 'absolute',
                  bottom: '35px',
                  right: '0',
                  zIndex: '-1',
                }}
              />

              {/* Main Text and Social Links */}
              
              <div className="text-content" style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '20%', 
                transform: 'translate(-50%, -50%)', 
                color: '#dc1212', 
                textAlign: 'center', 
                zIndex: '1', fontSize: '35px', fontFamily: "arial" }}>
                <div className="main-slider-one__content">
                  {/* Main Text: Slide 1 */}
                  <h1 className="animate__animated custom-bounce-up text-[70px] mt-8 ">{slide.bigText}</h1>
                  <h3 className="animate__animated custom-bounce-up text-[35px] mt-4" style={{ color: '#fff' }}>
                    {slide.smallText}
                  </h3>
                </div>
                <button
                  type="button"
                  style={{
                    marginTop: '70px',
                    fontSize: '20px',
                    width: '140px',
                    fontFamily: 'Arial',
                    backgroundColor: '#dc1212', // Remove background
                    color: '#fff', // Text color (you can customize)
                    padding: '15px', // No padding
                    border: 'none', // Remove border
                    outline: 'none', // Remove any focus outline
                    textAlign: 'center', // Ensure text is centered
                    cursor: 'pointer', // Pointer cursor on hover
                    borderRadius: '7px'
                  }}
                >
                  Contact Us
              </button>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
