"use client"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { User, Users, Briefcase, ChevronRight, Loader2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface Employee {
  name: string
  email: string
  profilePic: string
  nationality: string
  gender: "Male" | "Female" | "Other"
  spokenLanguage: string
  accountNo: string
  ifsc: string
  phone: string
  aadhar: string
  dateOfJoining: Date
  experience: number
  alias: string
  country: string
  address: string
  password: string
  allotedArea?: string
  isVerified: boolean
  isfeatured:boolean
  role: "Admin" | "Advert" | "Content" | "Sales" | "HR" | "Developer" | "Guest"
  extras: Record<string,unknown>
  passwordExpiresAt: Date
  forgotPasswordToken?: string
  forgotPasswordTokenExpiry?: Date
  verifyToken?: string
  verifyTokenExpiry?: Date
  otpToken?: number
  otpTokenExpiry?: Date
  _id?: string
}
gsap.registerPlugin(ScrollTrigger);


const Team = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef(null);
  
  useEffect(() => {
    if (employees.length === 0) return;
  
    const box1 = document.querySelectorAll(".box1");
    const box2 = document.querySelectorAll(".box2");
    const box3 = document.querySelectorAll(".box3");
    const box4 = document.querySelectorAll(".box4");
    const box5 = document.querySelectorAll(".box5")
    box1.forEach((box) => {
      gsap.from(box, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: box,
          start: "top 90%",
          end: "top 30%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });
    });
      gsap.from(box2, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: box2,
          start: "top 90%",
          end: "top 30%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
    });
    // Animate box3 - SCALE + BLUR
    box3.forEach((box) => {
      gsap.from(box, {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6,
        scrollTrigger: {
          trigger: box,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
    
    gsap.from(box4,{
      x:100,
      opacity:70,
      duration:0.9,
      delay:1,
      scrollTrigger: {
        trigger: box4,
        start: "top 90%",
        end: "top 30%",
        scrub: false,
        toggleActions: "play none none reverse",
      },
    })
    gsap.from(box5,{
      y:30,
      opacity:80,
      duration:0.2,

      scrollTrigger: {
        trigger: box5,
        start: "top 90%",
        end: "top 30%",
        scrub: false,
        toggleActions: "play none none reverse",
      },
    })
  
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    // Very important to recalculate
  }, [employees.length]);
  

  const fetchData = async () => {
    try {
      setLoading(true);
  
      const response = await axios.get("/api/employee");
  
      // Assuming response.data.blog contains an array of employee data (or blogs)
      const fetchedBlogs = response.data.emp;
  
      // Filter out "Guest" roles and take the first 12 entries
      const filteredBlogs = fetchedBlogs.filter((emp:Employee) => emp.isfeatured === true).slice(0, 12);
      console.log(filteredBlogs); // Log the filtered blogs for debugging
  
      // Set the filtered blogs (not employees)
      setEmployees(filteredBlogs); // Set the state with filtered data
    } catch (error) {
      console.log(error);
      setError("Failed to load team members. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData()
  }, [])

  // Function to get role-specific icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <User className="w-5 h-5 mr-1" />
      case "Sales":
        return <Briefcase className="w-5 h-5 mr-1" />
      default:
        return <Users className="w-5 h-5 mr-1" />
    }
  }

  return (
    <div ref={ref} className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-red-600 rounded-full opacity-5 transform translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-600 rounded-full opacity-5 transform -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
          <div className="box1 text-center lg:text-left max-w-2xl">
            <div className="inline-block relative mb-4">
              <h5 className="text-xl font-semibold text-red-600 relative z-10">OUR TEAM MEMBERS</h5>
              <div className="absolute bottom-0 left-0 h-3 w-full bg-red-100 -z-10 transform -rotate-1"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Our Talented Team <br className="hidden md:block" />
              <span className="relative">
                Members Behind
                <span className="text-red-600"> Zairo</span>
                <svg
                  className="absolute -bottom-2 box4 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3C50 0.5 150 0.5 200 3" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl">
              Meet the passionate individuals who make our vision a reality. Our diverse team brings together expertise
              from various fields.
            </p>
          </div>

          <div className="box2 relative group">
            <a
              href="/hiring"
              className="inline-flex items-center px-8 py-4 font-semibold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 overflow-hidden group-hover:pr-12"
            >
              <span className="relative z-10">JOIN OUR TEAM</span>
              <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0" />
            </a>
            <div className="absolute inset-0 w-full h-full bg-red-600 rounded-lg transform scale-105 opacity-20 blur-lg transition-all duration-300 group-hover:opacity-30"></div>
          </div>
        </div>

        {/* Team Grid Section */}
        <div className="relative">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading team members...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 box4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Team Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 box3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {employees &&
                employees.map((member) => (
                  <div
                    key={member._id}
                    className="group  relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="h-72 overflow-hidden">
                      <img
                        src={member.profilePic || "/placeholder.svg?height=300&width=300"}
                        alt={member.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      {/* Role Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {getRoleIcon(member.role)}
                        <span>{member.role}</span>
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>

                      {/* Experience */}
                      {member.experience && (
                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {member.experience} {member.experience === 1 ? "year" : "years"} of experience
                        </p>
                      )}

                      {/* Social Icons - Optional */}
                      
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && employees.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No team members</h3>
              <p className="mt-1 text-sm text-gray-500">No team members have been added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Team

