import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handle POST requests for sending contact form data
export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      return NextResponse.json(
        { success: false, message: "Email is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: user,
      to: "info@zairointl.com",
      subject: `Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
