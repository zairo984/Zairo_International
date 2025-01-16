'use client';

import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import meeting1 from '@/images/meeting1.jpg'
import meeting2 from '@/images/meeting2.jpg'

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: meeting1.src
    },

    {
      id: 2,
      image:meeting2.src,
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
                }}
              />
              {/* Content overlay */}
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
