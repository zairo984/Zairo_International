"use client"

import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, ArrowLeft, Building, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const Project = () => {
  const pathname = usePathname()
  const id = decodeURIComponent(pathname.split("/").pop() || "")

  interface Company {
    name: string
    email: string
    phone: string
    address: string
    description: string
    logo: string
    createdAt: string
    content: string
    _id: string
  }

  const [project, setProject] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError("")

      try {
        const response = await axios.get(`/api/company/${id}`)
        setProject(response.data.comp)
      } catch (error) {
        console.error("Error fetching project:", error)
        setError("Failed to load project details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="flex items-center mb-8">
          <Skeleton className="h-10 w-10 rounded-full mr-4" />
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="space-y-8">
          <Skeleton className="h-[400px] w-full rounded-xl" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 rounded-lg col-span-1" />
            <Skeleton className="h-32 rounded-lg col-span-2" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <Card className="border-destructive/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>We encountered a problem</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive text-lg">{error}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <Card className="shadow-lg border-muted">
          <CardHeader>
            <CardTitle>Project Not Found</CardTitle>
            <CardDescription>The requested project could not be found</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">The project you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/30 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto space-y-10"
        >
          {/* Navigation */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="group" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </div>

          {/* Header */}
          <div className="space-y-4">
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
              <Clock className="mr-1 h-3 w-3" />
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{project.name}</h1>
          </div>

          {/* Project Banner Image */}
          {project.logo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-black/20 p-6"
            >
              <img
                src={project.logo || "/placeholder.svg"}
                alt={project.name}
                className="w-full max-h-[500px] object-contain rounded-lg"
              />
            </motion.div>
          )}

          {/* Project Content and Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar with Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="sticky top-8 shadow-lg border-muted/50 overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${project.email}`}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {project.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${project.phone}`}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {project.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="text-foreground">{project.address}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="pt-2">
                    <Button variant="outline" className="w-full group">
                      Contact Us
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Description */}
              <Card className="shadow-lg border-muted/50 overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div
                    className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </CardContent>
              </Card>

              {/* Content Section */}
              {project.content && (
                <Card className="shadow-lg border-muted/50 overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div
                      className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-img:rounded-lg"
                      dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Call to Action */}
              <Card className="shadow-lg border-primary/10 bg-primary/5 overflow-hidden">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Interested in working with us?</h3>
                    <p className="text-muted-foreground">Let's discuss how we can help with your next project</p>
                  </div>
                  <Button size="lg" className="whitespace-nowrap">
                    Get in Touch
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Project
