"use client";

import TravelExploreSharpIcon from "@mui/icons-material/TravelExploreSharp";
import WarehouseSharpIcon from "@mui/icons-material/WarehouseSharp";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ComputerIcon from "@mui/icons-material/Computer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import shape3 from "@/images/shape-3.png";


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

			id="mySection"
			className="relative block py-20 overflow-hidden"
			style={{
				backgroundColor: "#080f1c",
				backgroundImage:
					"radial-gradient(circle at 20% 80%, rgba(255, 0, 0, 0.03) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(255, 0, 0, 0.03) 0%, transparent 40%)",
			}}
		>
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full opacity-5 transform translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full opacity-5 transform -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

			{/* Header Section */}
			<div className="container mx-auto px-4 mb-16 text-center">
				<div className="inline-block mb-3 box1">
					<span className="text-red-600 font-semibold text-lg relative inline-block">
						OUR EXPERTISE
						<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
					</span>
				</div>

				<h1 className="box2 text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
					Our Area of <span className="text-red-600">Expertise</span>
				</h1>

				<div className="max-w-3xl box1 mx-auto">
					<p className="text-gray-400 text-lg">
						We specialize in multiple domains, bringing innovation
						and excellence to every project we undertake.
					</p>
				</div>
			</div>

			{/* Expertise Cards */}
			<div className="container box3 mx-auto  px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
					{expertise.map((item, index) => (
						<div
							key={index}
							className="group  cursor-pointer bg-[#0c1525] rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/10 border border-gray-800 hover:border-red-600/30"
						>
							<div className="p-8 flex flex-col md:flex-row gap-6 relative">
								{/* Left Side: Number and Icon */}
								<div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6">
									{/* Number */}
									<div className="text-4xl font-bold text-gray-800 group-hover:text-red-600/20 transition-colors duration-500">
										{item.number}
									</div>

									{/* Icon with animated background */}
									<div className="relative">
										<div className="w-16 h-16 flex items-center justify-center relative z-10">
											<item.iconClass
												className="text-white group-hover:text-red-600 transition-colors duration-500"
												sx={{ fontSize: 40 }}
											/>
										</div>
										<div className="absolute inset-0 bg-red-600/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
									</div>
								</div>

								{/* Right Side: Content */}
								<div className="flex-grow">
									{/* Title */}
									<h2 className="text-2xl font-bold text-white mb-4 group-hover:text-red-600 transition-colors duration-300">
										<a
											href={item.link}
											className="hover:underline decoration-2 underline-offset-4"
										>
											{item.title}
										</a>
									</h2>

									{/* Description */}
									<p className="text-gray-400 mb-6 leading-relaxed">
										{item.description}
									</p>

									{/* Link */}
									<a
										href={item.link}
										className="inline-flex items-center text-gray-400 font-medium hover:text-red-600 transition-colors duration-300 group/link"
									>
										<span className="mr-2">
											Discover More
										</span>
										<span className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-800 group-hover/link:bg-red-600 transition-colors duration-300 transform group-hover/link:translate-x-1">
											<ArrowForwardIcon
												sx={{ fontSize: 16 }}
											/>
										</span>
									</a>
								</div>

								{/* Decorative corner accent */}
								<div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-r-[80px] border-t-transparent border-r-red-600/5 group-hover:border-r-red-600/20 transition-colors duration-500"></div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom shape with improved animation */}
			<div className="absolute bottom-0 left-0 w-full overflow-hidden">
				<img
					src={shape3.src || "/placeholder.svg"}
					alt="Decorative shape"
					className="w-full max-w-3xl opacity-10 animate-pulse"
					style={{
						animationDuration: "10s",
						filter: "blur(2px)",
					}}
				/>
			</div>
		</div>
	);
};

export default Expertise;
