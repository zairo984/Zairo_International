// import fs from "fs";
// import axios from "axios";
import Career from "@/models/Career"; // Your Career model
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import nodemailer from "nodemailer";

connectDB();
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		// console.log(body)
		const {
			name,
			phoneNumber,
			email,
			currentDesignation,
			position,
			skills,
			description,
			team,
			resume,
		} = body;

		// Check if a similar application already exists (this is optional based on your needs)
		const existingApplication = await Career.findOne({ email });
		if (existingApplication) {
			return NextResponse.json(
				{ message: "Application already submitted with this email" },
				{ status: 400 }
			);
		}

		// Read the file from the given path (it could be a temporary location on your server or from a URL) // Assuming the Bunny CDN API returns the file URL

		// Create and save the career data in the database
		const careerData = new Career({
			name,
			phoneNumber,
			email,
			currentDesignation,
			position,
			skills,
			description,
			team,
			resume, // Save the file URL from Bunny CDN
		});

		await careerData.save();

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.RECEIVER_EMAIL,
			subject: `Career Form Submission: ${name}}`,
			text: `A new candidate has applied for the position of ${position}.

Here are the details of the application:

Name: ${name}
Phone Number: ${phoneNumber}
Email: ${email}
Current Designation: ${currentDesignation}
Position: ${position}
Skills: ${skills}
Description: ${description}
Team: ${team}
Resume: ${resume}

Please review the application and consider this candidate for the position.
`,
			html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Phone Number:</strong> ${phoneNumber}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Current Designation:</strong> ${currentDesignation}</p>
<p><strong>Position:</strong> ${position}</p>
<p><strong>Skills:</strong> ${skills}</p>
<p><strong>Description:</strong><br>${description}</p>
<p><strong>Team:</strong> ${team}</p>
<p><strong>Resume:</strong> <a href="${resume}" target="_blank">Download Resume</a></p>
`,
		};

		await transporter.sendMail(mailOptions);
		// return NextResponse.json({
		// 	success: true,
		// 	message: "Email sent successfully.",
		// });
		// Send a success response
		return NextResponse.json(
			{ message: "Application submitted successfully!" },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error submitting application:", err);
		return NextResponse.json(
			{ message: "Failed to submit application." },
			{ status: 500 }
		);
	}
}
