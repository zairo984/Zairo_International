"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";

const Project = () => {
  const pathname = usePathname();
  const id = decodeURIComponent(pathname.split("/").pop() || "");

  interface Company {
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    logo: string;
    createdAt: string;
    content: string;
    _id: string;
  }

  const [project, setProject] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/api/company/${id}`);
        setProject(response.data.comp);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-destructive text-lg font-medium">{error}</p>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground text-lg">No project found.</p>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back button
        <div>
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div> */}
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{project.name}</h1>
          {/* <p className="text-xl text-muted-foreground">{project.description}</p> */}
        </div>

        {/* Project Banner Image */}
        {project.logo && (
          <div className="overflow-hidden rounded-xl shadow-md p-4">
            <img
              src={project.logo || "/placeholder.svg"}
              alt={project.name}
              className="w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        {/* Project Content */}
        {project.content && (
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div 
                className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </CardContent>
          </Card>
        )}

        {/* Project Meta Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href={`mailto:${project.email}`} className="text-primary hover:underline">
                  {project.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href={`tel:${project.phone}`} className="text-primary hover:underline">
                  {project.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{project.address}</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Published on: {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Project;
