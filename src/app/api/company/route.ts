import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import { NextResponse} from "next/server";

export async function GET(){
    try{
        await connectDB();
        const comp = await Company.find();
        return NextResponse.json({comp:comp},{status:200})
    }catch(error){
        console.log("Something went Wrong",error);
        return NextResponse.json({error:"Something went wrong"},{status:500})
    }
}