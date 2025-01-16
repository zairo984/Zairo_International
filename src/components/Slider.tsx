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

import { useState, useEffect } from 'react';

const Slider = () => {
  const [isShapeVisible, setIsShapeVisible] = useState(false);

  // Function to handle when slide changes
  const handleSlideChange = () => {
    // Reset animation
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
    },
    {
      id: 2,
      image: meeting2.src,
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
                style={{
                  width: '100%',
                  height: '100vh', // Full viewport height
                  objectFit: 'cover', // Ensures image covers the area
                  position: 'relative', // Necessary for z-index
                  zIndex: '-1',
                  filter: 'brightness(40%)',
                  
                }}
              />

              {/* Animated shape image */}
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

              {/* Content overlay */}
              <div
                className="text-content"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20%',
                  transform: 'translate(-50%, -50%)',
                  color: '#dc1212',
                  textAlign: 'center',
                  zIndex: '1',
                  fontSize: '35px',
                  fontFamily: 'arial'
                }}
              >
                <div className="main-slider-one__content">
                {/* Shape2 with floating animation */}
               

                {/* Main Text */}
                <h1 className="animate__animated custom-bounce-up">
                  We are Zairo
                </h1>
                <h3
                  className="animate__animated custom-bounce-up"
                  style={{ color: '#fff' }}
                >
                  Team With Big Talents
                </h3>



                {/* Social Links */}
                <div className="social-links">
                  <a href="#"><span className="icon-facebook"></span></a>
                  <a href="#"><span className="icon-instagram"></span></a>
                  <a href="#"><span className="icon-tik-tok"></span></a>
                  <a href="#"><span className="icon-youtube"></span></a>
                </div>
              </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
