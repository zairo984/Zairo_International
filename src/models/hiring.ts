import mongoose, { Schema, Document } from "mongoose";

export interface ICareer extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  currentDesignation: string;
  position: string;
  skills: string;
  description: string;
  resume: string; // File path for the uploaded document
  createdAt: Date;
}

const CareerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    currentDesignation: { type: String, required: true },
    position: { type: String, required: true },
    skills: { type: String, required: true },
    description: { type: String, required: true },
    resume: { type: String, required: true }, // Store file path
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Career = mongoose.models.Career || mongoose.model<ICareer>("Career", CareerSchema);
export default Career;