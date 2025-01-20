import React from "react";
import remote from "@/images/remote.jpg";
import ai from "@/images/ai.jpg";
import space from "@/images/space.jpg";
import sustainable from "@/images/sustainable.jpg";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      date: "12 February 2021",
      name: "Exploring New Horizons in Modern Technology",
      content:
        "Beyond the realms of imagination, where innovation meets practicality, lies the future of modern technology.",
      author: "tech_guru",
      comments: "8",
      image: remote.src,
    },
    {
      id: 2,
      date: "05 September 2020",
      name: "The Evolution of Remote Work Culture",
      content:
        "In a world reshaped by global events, remote work has transformed from a luxury to a necessity.",
      author: "hr_expert",
      comments: "12",
      image: ai.src,
    },
    {
      id: 3,
      date: "19 April 2022",
      name: "Sustainable Living: A Step Towards Green Future",
      content:
        "As climate concerns rise, sustainable living emerges as a beacon of hope for a greener tomorrow.",
      author: "eco_enthusiast",
      comments: "5",
      image: sustainable.src,
    },
    {
      id: 4,
      date: "30 November 2021",
      name: "The Rise of Artificial Intelligence in Daily Life",
      content:
        "AI is no longer science fiction; it is now deeply ingrained in our everyday routines, enhancing productivity.",
      author: "ai_specialist",
      comments: "15",
      image: ai.src,
    },
    {
      id: 5,
      date: "10 August 2023",
      name: "Unveiling the Mysteries of Deep Space Exploration",
      content:
        "Human curiosity pushes the boundaries as we delve deeper into the unexplored vastness of space.",
      author: "space_fanatic",
      comments: "7",
      image: space.src,
    },
  ];

  return (
    <section className="p-12 text-center bg-[#080f1c]">
      <h2 className="text-red-600 text-2xl font-semibold">Our Blog Post</h2>
      <h1 className="text-white text-5xl sm:text-6xl font-bold mt-4">
        Read Our Latest News
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
          >
            {/* Blog Image */}
            <div className="relative overflow-hidden">
              <img
                src={blog.image}
                alt={blog.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Blog Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                {blog.name}
              </h3>
              <p className="text-sm text-gray-500">{blog.date}</p>
            </div>
            {/* Bottom Section */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 group-hover:text-red-600 transition-colors duration-300">
                <div className="p-2 bg-red-500 text-white rounded-full group-hover:bg-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Add</span>
              </div>
              <div className="flex items-center gap-2 group-hover:text-red-600 transition-colors duration-300">
                <div className="p-2 bg-gray-200 rounded-full group-hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.5l8.485 8.485m0 0l-8.485 8.485m8.485-8.485H20.25"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Read More</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
