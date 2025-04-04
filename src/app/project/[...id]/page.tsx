"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Project = () => {
    const pathname = usePathname();
    const id = decodeURIComponent(pathname.split("/").pop() || ""); // Handle potential undefined case

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

    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center text-lg">{error}</div>
            ) : project ? (
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{project.name}</h1>

                    {/* Project Banner Image */}
                    {project.logo && (
                        <img
                            src={project.logo}
                            alt={project.name}
                            className="w-full max-h-[400px] object-cover rounded-lg shadow-md mb-6"
                        />
                    )}

                    {/* Project Details */}
                    <p className="text-lg text-gray-700 mb-4">{project.description}</p>

                    {/* Project Content (Supports HTML) */}
                    {project.content && (
                        <div
                            className="prose max-w-4xl mx-auto"
                            dangerouslySetInnerHTML={{ __html: project.content }}
                        />
                    )}

                    {/* Project Meta Info */}
                    <div className="mt-6 text-gray-600 text-sm">
                        <p>
                            <strong>Email:</strong> <a href={`mailto:${project.email}`} className="text-blue-500">{project.email}</a>
                        </p>
                        <p>
                            <strong>Phone:</strong> <a href={`tel:${project.phone}`} className="text-blue-500">{project.phone}</a>
                        </p>
                        <p>
                            <strong>Address:</strong> {project.address}
                        </p>
                        <p>
                            <strong>Published on:</strong> {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-gray-500 text-center text-lg">No project found.</div>
            )}
        </div>
    );
};

export default Project;
