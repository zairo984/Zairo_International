
import { connectDB } from "@/lib/db";
// import Blog from "@/models/blogs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Company from "@/models/Company";


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
        const comp = await Company.findById(id);
        if (!comp) {
            return NextResponse.json(
                { error: "Company not found" },
                { status: 404 }
            );
        }

        // return NextResponse.json(blog, { status: 200 });
        return NextResponse.json({comp:comp},{status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Something went wrong"},{status:500});
    }
}