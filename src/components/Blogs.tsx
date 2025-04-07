"use client"

import { useEffect, useState } from "react"
import axios from "axios"
// import { formatDistance } from 'date-fns';
import { Calendar, Clock, ArrowRight, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface MyBlog {
  title: string
  banner: string
  maintext: string
  content: string
  author: string
  tags: [string]
  totalWords: number
  createdAt: Date
  updatedAt: Date
  _id: string
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<MyBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get("api/blogs")
      const fetchedBlogs = response.data.blog

      // Sort and slice in one step after receiving data
      const sortedBlogs = [...fetchedBlogs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

      setBlogs(sortedBlogs)
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
      setError("Failed to load blog posts. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // // Format date to relative time (e.g., "2 days ago")
  // const formatDate = (dateString: Date) => {
  //   try {
  //     const date = new Date(dateString)
  //     return formatDistance(date,{addSuffix: true})
  //   } catch (e) {
  //     return "Date unavailable"
  //   }
  // }

  return (
    <section className="py-16 px-4 md:px-12 text-center bg-gradient-to-b from-[#080f1c] to-[#0c1526]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header with animated underline */}
        <div className="inline-block box1 group">
          <h2 className="text-red-600 text-2xl font-semibold mb-2">Our Blog Post</h2>
          <div className="h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-700 mx-auto"></div>
        </div>

        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-12">
          Read Our Latest <span className="text-red-600">News</span>
        </h1>

        {/* Error state */}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">{error}</div>}

        {/* Loading state with skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 box3 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#111827] border-0 overflow-hidden">
                <Skeleton className="w-full h-52" />
                <CardHeader className="p-6">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="p-6 flex justify-between">
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-10 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1  box3 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="group  bg-gradient-to-br from-[#172b3e] to-[#0f1c2a] border-0 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Blog Image with overlay */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={blog.banner || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Tags overlay */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {blog.tags[0]}
                    </div>
                  )}
                </div>

                <CardHeader className="p-6 pb-0 text-left">
                  {/* Date and reading time */}
                  <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{blog.createdAt.toString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.totalWords ? `${Math.ceil(blog.totalWords / 200)} min read` : "Quick read"}</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-white mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {blog.title}
                  </CardTitle>

                  <CardDescription className="text-gray-300 text-sm line-clamp-2">
                    {blog.maintext || "Read this article to learn more about the latest developments in this area."}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between items-center p-6 border-t border-gray-700/50 mt-4">
                  <button className="flex items-center space-x-1 text-white group/btn hover:text-red-600 transition-colors duration-300">
                    <div className="p-2 bg-red-600 text-white rounded-full group-hover/btn:bg-black transition-colors duration-300">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Add</span>
                  </button>

                  <button
                    onClick={() => (window.location.href = `/blogs/${blog._id}`)}
                    className="flex items-center space-x-1 text-white hover:text-red-600 transition-colors duration-300 group/read"
                  >
                    <span className="font-medium">Read More</span>
                    <div className="p-2 bg-gray-700 rounded-full group-hover/read:bg-red-600 transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 transform group-hover/read:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* No blogs state */}
        {!loading && blogs.length === 0 && !error && (
          <Card className="bg-[#172b3e] border-0 rounded-xl p-8 text-center">
            <CardContent className="pt-6">
              <h3 className="text-white text-xl mb-2">No blog posts yet</h3>
              <p className="text-gray-400">Check back soon for new content!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

export default Blogs

