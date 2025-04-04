"use client"; // Needed if using Next.js App Router

// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { usePathname } from "next/navigation";

const BlogDetail = () => {
    const pathname = usePathname();
    console.log(pathname);
    const id = pathname.split("/").pop();
    console.log("id id",id)

    interface MyBlog{
        title: string;
        banner: string;
        maintext: string;
        content: string;
        author: string;
        tags: [string];
        totalWords: number
        createdAt: Date;
        updatedAt: Date;
        _id: string;
    }

    const [blog, setBlog] = useState<MyBlog>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/blogs/${id}`);
                console.log(response.data.blog);
                setBlog(response.data.blog);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            
            {/* Blog Banner Image */}
            <img src={blog.banner} alt={blog.title} className="w-full max-h-[400px] object-cover rounded-lg shadow-md mb-6" />
            
            {/* Blog Main Text */}
            <p className="text-lg text-gray-700 mb-4">{blog.maintext}</p>

            {/* Blog Content (Supports HTML) */}
            <div className="prose max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Blog Author */}
            <div className="mt-6 text-gray-600 text-sm">
                <p><strong>Author:</strong> {blog.author}</p>
                <p><strong>Published on:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
            )}
        </div>
    );
};

export default BlogDetail; // ✅ Ensure it's a valid component
