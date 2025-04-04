import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL as string;

export const connectDB=async()=>{
    try{
        await mongoose.connect(mongoUrl, {dbName:"PropertyDb"})
        console.log("Connected to Db");
    }
    catch(error){
        console.log("Error Connecting to DB",error);
    }
}