
import { connectDB } from "@/lib/db";
import Blog from "@/models/blogs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


connectDB();

export async function GET(req: NextRequest){
    try{
        await connectDB(); // Ensure DB is connected
        // console.log(req)
		const urlPath = req.nextUrl.pathname.split("/");
        // console.log("urlPath: ", urlPath);
		const id = urlPath[urlPath.length - 1];
		// console.log("id in backend: ", id);
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json( 
				{ error: "Invalid product ID" },
				{ status: 400 }
			);
		}
        const blog = await Blog.findById(id);
        if (!blog) {
			return NextResponse.json(
				{ error: "Blog not found" },
				{ status: 404 }
			);
		}

		// return NextResponse.json(blog, { status: 200 });
        return NextResponse.json({blog:blog},{status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Something went wrong"},{status:500});
    }
}