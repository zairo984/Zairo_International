
import { connectDB } from "@/lib/db";
import Blog from "@/models/blogs";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function GET(req: NextRequest){
    try{
        const blog = await Blog.find();
        return NextResponse.json({blog:blog},{status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Something went wrong"},{status:500});
    }
}