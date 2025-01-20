import React from "react";
import vs from "@/images/vs.webp";
import ttt from "@/images/ttt.webp";
import workinza from "@/images/Workinza.webp";
import shopbar from "@/images/shopbar.webp";
import bronco from "@/images/bronco.webp";

const Projects = () => {
  const projects = [
    { id: 1, name: "The Vacation Saga", image: vs.src, link: "/vacation" },
    { id: 2, name: "The Tech Tunes", image: ttt.src, link: "/techtunes" },
    { id: 3, name: "Workinza", image: workinza.src, link: "/workinza" },
    { id: 4, name: "Shopbar", image: shopbar.src, link: "/shopbar" },
    { id: 5, name: "Bronco", image: bronco.src, link: "/bronco" },
  ];

  return (
    <div className="relative block p-16 bg-white">
      {/* Section Heading */}
      <div className="text-red-600 text-3xl mb-4 font-semibold ">Projects</div>
      <div className="text-black text-6xl font-bold">Our Recent Projects</div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            className="group relative block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-[280px]"
            />

            {/* Overlay with Flip Animation */}
            <div className="absolute -inset-4 bg-black bg-opacity-80 z-10 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-red-600 text-xl font-bold">{project.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
