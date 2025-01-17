'use client';
// In MessageSection.tsx or MessageSection.jsx
import ceo from '@/images/ceo.webp';
import Image from 'next/image';
import 'animate.css';
import WOW from 'wowjs';
import { useEffect } from 'react';


const MessageSection = () => {

    useEffect(() => {
        new WOW.WOW().init(); // Initialize WOW.js
      }, []);

  return (
    <div className="my-[20px] mx-[120px] grid h-screen grid-cols-12 ">
      {/* Left Column with Image */}
        <div className="col-span-5 bg-white flex items-center  justify-center shadow-blue-700-2xl relative">
          <div className='slide-in-blurred-top absolute w-full bg-white top-0 transition-all duration-500 ease-in-out transform origin-top group-hover:translate-y-full group-hover:scale-105' 
>
        
          </div>
        <Image
          className="w-[500px] h-[700px] max-w-full absolute right-0 transition-transform duration-500 ease-in-out transform hover:scale-105 wow fadeInDown"  
          src={ceo} // Correctly passing the imported image as the source
          alt="CEO"
          
        />
        <div className="counter-box absolute left-[160px] bottom-[80px] ">
            <h2 className="count">
            <span className="count-text text-black font-extrabold text-[120px]">8</span>
            </h2>
        </div>
        <div className="text-box absolute left-[160px] bottom-[70px]">
            <p className='text-black font-bold'>YEARS <br/> WORKING <br/>EXPERIENCE</p>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-7 bg-white ">
        <div className='relative block mx-[100px] mt-[100px] '>
            <p className='text-red-600 font-semibold text-[20px] font-sans'> Message from the CEO</p>
            <h2 className='font-bold text-[35px] '>Ideas are easy; <br/>turning them into reality is the real challenge.</h2>
            <div className="text-box">
                <p className='text-gray-600 mt-6'>
                Zairo International is one of the best growing companies for providing development and marketing services to our clients. 
                With the help of our expert team and professionals, we want to convert business ideas of brilliant minds into money earning opportunities. 
                We understand the importance of online world today, and that is why we aim to make the most use of this growing platform to help our clients. 
                Reaching out to potential customers, increasing market scope, improving competitiveness, all goals are achieved at Zairo international. 
                We are driven by the passion of our empowered team, and celebrate the professional and enthusiastic spirit which helps our clients in realizing their dreams. 
                We feel fortunate to be able to help young and brilliant minds in achieving their life goals, and become a part of their legacy.
                </p>
            </div>
            <button
              type="button"
              className="mt-[70px] text-[20px] w-[170px] bg-red-600 text-white p-[16px] border-none outline-none ml-3 font-bold cursor-pointer rounded-lg"
              style={{
                fontFamily: 'Helvetica',
                animation: 'hover-scale-up-tl 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
              }}
            >
              Discover More
            </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
