import { NextResponse } from "next/server";
import { uploadToBunny } from "@/lib/bunny";
import {
  getOfficeAddresses,
  resolveOfficeAddressId,
  submitJobApplication,
} from "@/lib/careers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PHOTO_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const RESUME_TYPES = new Set(["application/pdf"]);
const PHOTO_MAX = 5 * 1024 * 1024;
const RESUME_MAX = 10 * 1024 * 1024;

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function ensureUrl(raw: string) {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

function buildSocials(github: string, instagram: string, xProfile: string) {
  const lines: string[] = [];
  if (github) lines.push(`GitHub: ${ensureUrl(github)}`);
  if (instagram) lines.push(`Instagram: ${ensureUrl(instagram)}`);
  if (xProfile) lines.push(`X: ${ensureUrl(xProfile)}`);
  return lines.join("\n");
}

function validateOptionalLinks(input: {
  linkedin: string;
  portfolio: string;
  github: string;
  instagram: string;
  xProfile: string;
}) {
  if (input.linkedin && !/linkedin\.com/i.test(input.linkedin)) {
    return "LinkedIn URL must include linkedin.com";
  }
  if (input.portfolio && !/^https?:\/\//i.test(input.portfolio)) {
    return "Portfolio URL must start with http:// or https://";
  }
  if (input.github && !/github\.com\//i.test(input.github)) {
    return "GitHub URL must include github.com/";
  }
  if (input.instagram && !/instagram\.com\//i.test(input.instagram)) {
    return "Instagram URL must include instagram.com/";
  }
  if (
    input.xProfile &&
    !/(x\.com\/|twitter\.com\/)/i.test(input.xProfile)
  ) {
    return "X URL must include x.com/ or twitter.com/";
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = text(form, "name");
    const email = text(form, "email");
    const countryCode = text(form, "countryCode") || "+91";
    const phoneDigits = text(form, "phone").replace(/\D/g, "");
    const city = text(form, "city");
    const country = text(form, "country");
    const gender = text(form, "gender");
    const address = text(form, "address");
    const collegeRaw = text(form, "college");
    const otherCollege = text(form, "otherCollege");
    const experience = text(form, "experience");
    const coverLetter = text(form, "coverLetter");
    const linkedinRaw = text(form, "linkedin");
    const portfolioRaw = text(form, "portfolio");
    const github = text(form, "github");
    const instagram = text(form, "instagram");
    const xProfile = text(form, "xProfile");
    const referralSourceRaw = text(form, "referralSource");
    const otherReferral = text(form, "otherReferral");
    const jobOpeningId = text(form, "jobOpeningId");
    const jobLocation = text(form, "jobLocation");

    const photo = form.get("photo");
    const resume = form.get("resume");

    if (!name) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }
    if (phoneDigits.length !== 10) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits." },
        { status: 400 },
      );
    }
    if (!city || !country || !gender || !address) {
      return NextResponse.json(
        { error: "Please complete all required personal details." },
        { status: 400 },
      );
    }

    const college =
      collegeRaw === "Other" ? otherCollege : collegeRaw;
    if (!college || college === "Select College") {
      return NextResponse.json(
        { error: "Please provide a valid college/university name." },
        { status: 400 },
      );
    }

    const experienceNum = Number(experience);
    if (
      experience === "" ||
      Number.isNaN(experienceNum) ||
      experienceNum < 0 ||
      experienceNum > 50 ||
      !Number.isInteger(experienceNum)
    ) {
      return NextResponse.json(
        { error: "Years of experience must be a whole number from 0 to 50." },
        { status: 400 },
      );
    }

    if (!referralSourceRaw) {
      return NextResponse.json(
        { error: "Please tell us where you heard about us." },
        { status: 400 },
      );
    }
    if (referralSourceRaw === "Other" && !otherReferral) {
      return NextResponse.json(
        { error: "Please tell us how you heard about us." },
        { status: 400 },
      );
    }

    if (!jobOpeningId) {
      return NextResponse.json(
        { error: "Choose a job from the careers page before applying." },
        { status: 400 },
      );
    }

    if (!(photo instanceof File) || photo.size === 0) {
      return NextResponse.json({ error: "Photo is required." }, { status: 400 });
    }
    if (!PHOTO_TYPES.has(photo.type) || photo.size > PHOTO_MAX) {
      return NextResponse.json(
        { error: "Photo must be JPEG, PNG, or WebP up to 5MB." },
        { status: 400 },
      );
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 },
      );
    }
    if (!RESUME_TYPES.has(resume.type) || resume.size > RESUME_MAX) {
      return NextResponse.json(
        { error: "Resume must be a PDF up to 10MB." },
        { status: 400 },
      );
    }

    const linkError = validateOptionalLinks({
      linkedin: linkedinRaw,
      portfolio: portfolioRaw,
      github,
      instagram,
      xProfile,
    });
    if (linkError) {
      return NextResponse.json({ error: linkError }, { status: 400 });
    }

    const offices = await getOfficeAddresses();
    const officeAddressId = resolveOfficeAddressId(offices, jobLocation);
    if (!officeAddressId) {
      return NextResponse.json(
        { error: "Please select a preferred office address." },
        { status: 400 },
      );
    }

    // Upload both files before calling Adminstro; if either fails, do not submit.
    const photoUrl = await uploadToBunny(photo, "Photos");
    const resumeUrl = await uploadToBunny(resume, "Resumes");

    if (!photoUrl.includes("/Photos/") || !resumeUrl.includes("/Resumes/")) {
      return NextResponse.json(
        { error: "Upload produced invalid photo or resume URLs." },
        { status: 500 },
      );
    }

    const linkedin = linkedinRaw ? ensureUrl(linkedinRaw) : "";
    const portfolio = portfolioRaw || "";
    const socials = buildSocials(github, instagram, xProfile);
    const referralSource =
      referralSourceRaw === "Other"
        ? `Other: ${otherReferral}`
        : referralSourceRaw;

    const { status, body } = await submitJobApplication({
      name,
      email,
      phone: `${countryCode}${phoneDigits}`,
      experience: String(experienceNum),
      address,
      city,
      country,
      gender,
      college,
      officeAddressId,
      jobOpeningId,
      coverLetter: coverLetter || undefined,
      linkedin: linkedin || undefined,
      portfolio: portfolio || undefined,
      socials: socials || undefined,
      referralSource,
      resume: resumeUrl,
      photo: photoUrl,
    });

    if (!status || status >= 400 || body?.success !== true) {
      return NextResponse.json(
        {
          error:
            body?.error ||
            "Failed to submit application. Please try again.",
        },
        { status: status && status >= 400 ? status : 500 },
      );
    }

    return NextResponse.json({
      success: true,
      applicationId: body.applicationId,
      message: "Your application has been submitted successfully. Thank you!",
    });
  } catch (error) {
    console.error("Careers apply error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit application.",
      },
      { status: 500 },
    );
  }
}
