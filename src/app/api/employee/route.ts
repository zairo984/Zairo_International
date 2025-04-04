
import { connectDB } from "@/lib/db";
import Employees from "@/models/employee";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function GET(req: NextRequest){
    try{
        const emp = await Employees.find();
        return NextResponse.json({emp:emp},{status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Something went wrong"},{status:500});
    }
}