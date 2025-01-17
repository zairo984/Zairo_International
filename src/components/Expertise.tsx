'use client';

import TravelExploreSharpIcon from '@mui/icons-material/TravelExploreSharp';
import WarehouseSharpIcon from '@mui/icons-material/WarehouseSharp';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ComputerIcon from '@mui/icons-material/Computer';
import shape3 from '@/images/shape-3.png';

const Expertise = () => {
  const expertise = [
    {
      number: "01",
      iconClass: TravelExploreSharpIcon,
      title: "Travel",
      description:
        "We have a good experience in the travelling domain. Vacation saga generates revenue through online bookings.",
      link: "/travel",
    },
    {
      number: "02",
      iconClass: WarehouseSharpIcon,
      title: "Leather",
      description:
        "Our unique handcrafted leather products can be purchased from cords craft online shop.",
      link: "/leather",
    },
    {
      number: "03",
      iconClass: QueryStatsIcon,
      title: "Digital Marketing",
      description:
        "We provide web development, SEO, content writing and all types of digital marketing services.",
      link: "/marketing",
    },
    {
      number: "04",
      iconClass: ComputerIcon,
      title: "Technology",
      description:
        "Zairo International provides Technical solutions through BPO Services online.",
      link: "/technology",
    },
  ];

  return (
    <div
  className="relative block py-10"
  style={{ backgroundColor: "#080f1c" }}
>
  <div className='text-center font-semibold justify-center'>
    <h3 className='text-red-600'> Our Expertise</h3>
    <h1 className='text-white text-[70px] font-bold font-sans'> Our Area of Expertise</h1>
  </div>
  <a className="expertise-card cursor-pointer perspective-normal">
    <div className="container mx-auto my-auto w-[1200px] h-[600px] grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-10 transition-all duration-500 ease-out transform-3d hover:rotate-x-40 hover:rotate-z-3 cursor-pointer">
      {expertise.map((item, index) => (
        <div
          key={index}
          className="service-one__single p-6 grid grid-cols-12 gap-6 text-center border border-gray-800 shadow-none outline-none transition-all duration-300 ease-in-out group hover:scale-[1.03] hover:border-red-600 hover:text-red-600"
          style={{
            animation: 'fadeInUp 0.5s ease-in-out',
          }}
        >
          {/* Left Side: Icon and Number */}
          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="iconClass mb-4 text-white transition-all duration-300 ease-in-out group-hover:text-red-600">
              <item.iconClass
                sx={{
                  fontSize: 64,
                }}
              />
            </div>
            <div className="count-text text-4xl font-bold text-gray-700 mb-2 rotate-[-90deg] transition-all duration-300 ease-in-out">
              {item.number}
            </div>
          </div>

          {/* Right Side: Title, Description, and Link */}
          <div className="col-span-8 flex flex-col justify-between">
            <h2 className="text-lg font-bold text-gray-600 mb-4">
              <a href={item.link}>{item.title}</a>
            </h2>
            <p className="text-white mb-4">{item.description}</p>
            <a
              href={item.link}
              className="text-gray-500 font-semibold transition-all duration-300 ease-in-out group-hover:text-red-600"
            >
              Discover More
            </a>
            
          </div>
          
        </div>
        
      ))}
    </div>
  </a>
  <div className="absolute bottom-0 left-0 text-gray-600">
  <img
    src={shape3.src}
    className="animate-bgSlide"
  />
</div>

</div>



  );
};

export default Expertise;
