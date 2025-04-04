"use client"
import vs from "@/images/vs.webp"
import ttt from "@/images/ttt.webp"
import workinza from "@/images/Workinza.webp"
import shopbar from "@/images/shopbar.webp"
import bronco from "@/images/bronco.webp"
// import Employe from "../models/Employe";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import axios from "axios"
// import { CardHeader } from "@mui/material";

const Projects = () => {
  const projects = [
    { id: 1, name: "The Vacation Saga", image: vs.src, link: "/vacation" },
    { id: 2, name: "The Tech Tunes", image: ttt.src, link: "/techtunes" },
    { id: 3, name: "Workinza", image: workinza.src, link: "/workinza" },
    { id: 4, name: "Shopbar", image: shopbar.src, link: "/shopbar" },
    { id: 5, name: "Bronco", image: bronco.src, link: "/bronco" },
  ]

  interface myCompany{
    name: string,
        email:  string,
        phone:  string,
        address:  string,
        description:  string,
        logo:  string,
        createdAt: Date,
        content: string,
        _id:string
  }

    const [project,setProject] = useState<myCompany[]>([]);
    const fetchData = async()=>{
      try{
        const response = await axios.get("/api/company");
        console.log(response)
        setProject(response?.data.comp || projects);

      }catch(error){
        console.log(error);
      }
  }

    useEffect(()=>{
      fetchData();
    },[])

  return (
    <div id="projects" className="relative py-24 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-red-100 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading with animated underline */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-red-600 text-xl md:text-3xl mb-4 font-semibold relative inline-block">
              Projects
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600 transform transition-all duration-300 group-hover:w-full"></span>
            </h2>
          </div>
          <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
            Our Recent <span className="text-red-600">Projects</span>
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </div>

        {/* Projects Grid with improved layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {project?.map((project, index) => (
            <Card
              key={project._id}
              className={cn(
                "group overflow-hidden border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500",
                "transform hover:-translate-y-2",
              )}
            >
              <a onClick={()=>window.location.href=`/project/${project._id}`} className="block h-full">
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  {/* Project Image with hover zoom effect */}
                  <img
                    src={project.logo || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 transform group-hover:scale-105"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 to-red-600/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Badge className="bg-white text-red-600 hover:bg-white mb-2">Project {index + 1}</Badge>
                      <h3 className="text-white text-xl font-bold">{project.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 transform group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  </div>
                </div>

                

                
              </a>
            </Card>
          ))}
        </div>

        {/* View All Projects button */}
        {/* <div className="text-center mt-16">
          <a
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 group"
          >
            View All Projects
            <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default Projects

