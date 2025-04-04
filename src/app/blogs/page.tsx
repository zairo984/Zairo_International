"use client"
import PageTransition from "@/components/page-transition"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { ArrowRight, Calendar, Clock, Plus } from "lucide-react"
import { useEffect, useState } from "react"

const Blog = () => {
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

  const [blog, setBlog] = useState<MyBlog[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get("api/blogs")
      console.log(response.data.blog)
      setBlog(response.data.blog)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Format date function
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Blogs</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-center text-gray-500">Loading blogs...</p>
          </div>
        ) : blog.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.map((blog) => (
              <Card
                key={blog._id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-[#172b3e] to-[#0f1c2a]"
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
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive" className="font-semibold">
                        {blog.tags[0]}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  {/* Date and reading time */}
                  <div className="flex items-center text-gray-400 text-sm space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.totalWords ? `${Math.ceil(blog.totalWords / 200)} min read` : "Quick read"}</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl text-white group-hover:text-red-600 transition-colors duration-300 mt-2">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-300 line-clamp-2">
                    {blog.maintext || "Read this article to learn more about the latest developments in this area."}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 text-white hover:text-red-600 hover:bg-transparent p-0"
                  >
                    <div className="p-2 bg-red-600 text-white rounded-full group-hover:bg-black transition-colors duration-300 mr-2">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Add</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (window.location.href = `/blogs/${blog._id}`)}
                    className="flex items-center space-x-1 text-white hover:text-red-600 hover:bg-transparent p-0"
                  >
                    <span className="font-medium mr-2">Read More</span>
                    <div className="p-2 bg-gray-700 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-center text-gray-500">No blogs found.</p>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default Blog

