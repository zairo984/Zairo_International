"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Camera,
  Check,
  CircleCheckBig,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Personal",
    subtitle: "About you",
    icon: User,
  },
  {
    id: 2,
    title: "Background",
    subtitle: "Education & experience",
    icon: Award,
  },
];

const COUNTRY_CODES = [
  { value: "+91", label: "India +91" },
  { value: "+1", label: "USA/Canada +1" },
  { value: "+44", label: "UK +44" },
  { value: "+61", label: "Australia +61" },
  { value: "+971", label: "UAE +971" },
  { value: "+65", label: "Singapore +65" },
  { value: "+49", label: "Germany +49" },
  { value: "+33", label: "France +33" },
  { value: "+81", label: "Japan +81" },
  { value: "+86", label: "China +86" },
];

const COLLEGES = [
  "Indian Institute of Technology Kanpur (IIT Kanpur)",
  "Harcourt Butler Technical University (HBTU)",
  "Chhatrapati Shahu Ji Maharaj University (CSJMU / Kanpur University)",
  "Rama University",
  "Pranveer Singh Institute of Technology (PSIT)",
  "Maharana Pratap Group Of Institutions",
  "Axis Colleges",
  "Allenhouse Institute of Technology",
  "Naraina Group of Institutions",
  "Krishna Institute of Technology",
  "Vision Group of Institutions",
  "Kanpur Institute of Technology (KIT)",
  "Banshi College of Engineering",
  "Dr. Gaur Hari Singhania Institute of Management and Research",
  "Dr Virendra Swarup Institute of Computer Studies (VSICS)",
  "DAV College",
  "Christ Church College",
  "Dayanand Anglo Vedic College",
  "BNSD Degree College",
  "PPN Degree College",
  "DG College",
  "Brahmanand College",
  "Jagran College of Arts Science and Commerce",
  "DAMS Kanpur",
  "Other",
];

const REFERRAL_SOURCES = [
  "A member of our HR team contacted me",
  "LinkedIn",
  "Instagram",
  "Friend or colleague",
  "College",
  "Job board",
  "Company website",
  "Other",
];

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const initialState = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  city: "",
  country: "",
  gender: "",
  address: "",
  college: "",
  otherCollege: "",
  experience: "",
  linkedin: "",
  github: "",
  portfolio: "",
  instagram: "",
  xProfile: "",
  referralSource: "",
  otherReferral: "",
  coverLetter: "",
};

const fieldClass =
  "h-11 w-full min-w-0 rounded-xl border border-border bg-input px-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-12 sm:px-4";

const labelClass =
  "flex items-center gap-1.5 text-sm font-medium text-foreground";

function SectionHeading({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-2">
      <div className="shrink-0 rounded-lg bg-primary/10 p-1.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="min-w-0 break-words text-base font-semibold text-foreground sm:text-lg">
        {title}
      </h3>
    </div>
  );
}

function FieldLabel({ icon: Icon, children, required = false }) {
  return (
    <label className={labelClass}>
      {Icon ? <Icon className="h-3.5 w-3.5 text-muted-foreground" /> : null}
      {children}
      {required ? <span className="text-destructive">*</span> : null}
    </label>
  );
}

function LinkedInIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="#0A66C2"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"
        />
      </svg>
    </span>
  );
}

function GitHubIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground">
        <path
          fill="currentColor"
          d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
        />
      </svg>
    </span>
  );
}

function PortfolioIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground">
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          d="M3 12h18M12 3c2.4 2.6 3.6 5.7 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.7-3.6-9s1.2-6.4 3.6-9z"
        />
      </svg>
    </span>
  );
}

function InstagramIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <defs>
          <radialGradient id="ig-mark" cx="30%" cy="110%" r="120%">
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="35%" stopColor="#FA7E1E" />
            <stop offset="60%" stopColor="#D62976" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-mark)" />
        <rect
          x="7"
          y="7"
          width="10"
          height="10"
          rx="3"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="12"
          r="2.4"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
        />
        <circle cx="16.4" cy="7.6" r="0.9" fill="#fff" />
      </svg>
    </span>
  );
}

function XIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground">
        <path
          fill="currentColor"
          d="M14.7 10.3 22.4 1.5h-1.8l-6.7 7.6L8.6 1.5H2.2l8.1 11.5L2.2 22.5h1.8l7.1-8.1 5.7 8.1h6.4l-8.5-12.2zm-2.5 2.8-.8-1.2-6.6-9.3h2.8l5.3 7.5.8 1.2 6.9 9.8h-2.8l-5.6-8z"
        />
      </svg>
    </span>
  );
}

function FileDropzone({
  id,
  accept,
  file,
  onChange,
  icon: Icon,
  title,
  hint,
  previewUrl,
  inputRef,
}) {
  return (
    <label
      htmlFor={id}
      className="relative block cursor-pointer rounded-xl border-2 border-dashed border-border bg-input px-3 py-5 transition-all sm:px-4 sm:py-8 sm:hover:border-primary/50 sm:hover:bg-accent"
    >
      <div className="flex flex-col items-center justify-center text-center">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Selected photo preview"
            className="mb-3 h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
          />
        ) : (
          <div className="mb-3 rounded-xl bg-primary/10 p-2.5 sm:p-3">
            <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          </div>
        )}
        <span className="mb-1 max-w-full break-all px-1 text-sm font-medium text-foreground">
          {file ? file.name : title}
        </span>
        <span className="text-xs text-muted-foreground">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB · Tap to change`
            : hint}
        </span>
      </div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
}

function StepProgress({ step }) {
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  const current = STEPS[step - 1];

  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#fff7f7] via-white to-[#fff0f0] px-3 py-4 sm:px-6 sm:py-6">
      <div
        className="pointer-events-none absolute -right-8 -top-10 hidden h-28 w-28 rounded-full bg-primary/10 blur-2xl sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-6 hidden h-24 w-24 rounded-full bg-[#dc101d]/5 blur-2xl sm:block"
        aria-hidden="true"
      />

      <div className="relative mb-4 flex items-center justify-between gap-3 sm:mb-5 sm:items-start">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-[11px]">
            Application progress
          </p>
          <p className="mt-0.5 text-sm font-semibold text-foreground sm:hidden">
            {current?.title}
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-primary/15 bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-[0_6px_18px_rgba(220,16,29,0.08)] sm:px-3 sm:py-1.5">
          {step}/{STEPS.length}
        </div>
      </div>

      <ol className="relative grid grid-cols-2 gap-2">
        <div
          className="absolute left-[25%] right-[25%] top-4 h-[2px] -translate-y-1/2 rounded-full bg-[#f0d0d3] sm:top-5"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-[#ff4d57] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {STEPS.map((item) => {
          const done = item.id < step;
          const active = item.id === step;
          const Icon = item.icon;

          return (
            <li
              key={item.id}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10",
                  done
                    ? "border-primary bg-primary text-white shadow-[0_8px_20px_rgba(220,16,29,0.28)]"
                    : active
                      ? "border-primary bg-white text-primary shadow-[0_0_0_4px_rgba(220,16,29,0.12)]"
                      : "border-[#ead0d2] bg-white text-[#b7a0a2]",
                ].join(" ")}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.75} />
                ) : (
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </div>

              <p
                className={[
                  "mt-2 text-[11px] font-semibold leading-tight sm:mt-2.5 sm:text-xs",
                  active || done ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {item.title}
              </p>
              <p
                className={[
                  "mt-0.5 hidden text-[10px] sm:block",
                  active ? "text-primary" : "text-muted-foreground/80",
                ].join(" ")}
              >
                {done ? "Completed" : active ? "In progress" : "Up next"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function ApplyForm({ job }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photoInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const formTopRef = useRef(null);

  const photoPreview = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo],
  );

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const roleLabel = job.positionName || job.title;
  const departmentLabel = job.departmentName || "General";
  const jobLocation = job.location || "";
  const showOtherCollege = values.college === "Other";

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function scrollToFormTop() {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateImage(file) {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxBytes = 5 * 1024 * 1024;
    if (!allowed.includes(file.type)) {
      return "Please upload a JPEG, PNG, or WebP photo.";
    }
    if (file.size > maxBytes) {
      return "Your photo must be 5 MB or smaller.";
    }
    return "";
  }

  function validateResume(file) {
    const maxBytes = 10 * 1024 * 1024;
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return "Please upload a PDF resume.";
    }
    if (file.size > maxBytes) {
      return "Your resume must be 10 MB or smaller.";
    }
    return "";
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    setStatus({ type: "", message: "" });
    if (!file) return;
    const error = validateImage(file);
    if (error) {
      setPhoto(null);
      event.target.value = "";
      setStatus({ type: "error", message: error });
      return;
    }
    setPhoto(file);
  }

  function handleResume(event) {
    const file = event.target.files?.[0];
    setStatus({ type: "", message: "" });
    if (!file) return;
    const error = validateResume(file);
    if (error) {
      setResume(null);
      event.target.value = "";
      setStatus({ type: "error", message: error });
      return;
    }
    setResume(file);
  }

  function validateStep(currentStep) {
    if (currentStep === 1) {
      if (!photo) return "Please upload a photo before continuing.";
      if (!values.name.trim()) return "Please enter your full name.";
      if (
        !values.email.trim() ||
        !values.email.includes("@") ||
        !values.email.includes(".")
      ) {
        return "Please enter a valid email address.";
      }
      const phoneDigits = values.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        return "Phone number must be 10 digits.";
      }
      if (!values.city.trim()) return "Please enter your city.";
      if (!values.country.trim()) return "Please enter your country.";
      if (!values.gender) return "Please select your gender.";
      if (!values.address.trim()) return "Please enter your complete address.";
      return "";
    }

    if (currentStep === 2) {
      if (!values.college) return "Please select your college/university.";
      if (values.college === "Other" && !values.otherCollege.trim()) {
        return "Please specify your college/university.";
      }

      const experienceNum = Number(values.experience);
      if (
        values.experience === "" ||
        Number.isNaN(experienceNum) ||
        experienceNum < 0 ||
        experienceNum > 50 ||
        !Number.isInteger(experienceNum)
      ) {
        return "Years of experience must be a whole number from 0 to 50.";
      }
      if (values.linkedin.trim() && !/linkedin\.com/i.test(values.linkedin)) {
        return "LinkedIn URL must include linkedin.com";
      }
      if (
        values.portfolio.trim() &&
        !/^https?:\/\//i.test(values.portfolio.trim())
      ) {
        return "Portfolio URL must start with http:// or https://";
      }
      if (values.github.trim() && !/github\.com\//i.test(values.github)) {
        return "GitHub URL must include github.com/";
      }
      if (
        values.instagram.trim() &&
        !/instagram\.com\//i.test(values.instagram)
      ) {
        return "Instagram URL must include instagram.com/";
      }
      if (
        values.xProfile.trim() &&
        !/(x\.com\/|twitter\.com\/)/i.test(values.xProfile)
      ) {
        return "X URL must include x.com/ or twitter.com/";
      }
      if (!values.referralSource) {
        return "Please tell us where you heard about us.";
      }
      if (
        values.referralSource === "Other" &&
        !values.otherReferral.trim()
      ) {
        return "Please tell us how you heard about us.";
      }
      if (!resume) return "Please attach your resume before submitting.";
      return "";
    }

    return "";
  }

  function goNext() {
    const error = validateStep(step);
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }
    setStatus({ type: "", message: "" });
    setStep((current) => Math.min(current + 1, STEPS.length));
    scrollToFormTop();
  }

  function goBack() {
    setStatus({ type: "", message: "" });
    setStep((current) => Math.max(current - 1, 1));
    scrollToFormTop();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (step !== STEPS.length) {
      goNext();
      return;
    }

    const error = validateStep(2);
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const payload = new FormData();
      payload.append("name", values.name.trim());
      payload.append("email", values.email.trim());
      payload.append("countryCode", values.countryCode);
      payload.append("phone", values.phone.replace(/\D/g, ""));
      payload.append("city", values.city.trim());
      payload.append("country", values.country.trim());
      payload.append("gender", values.gender);
      payload.append("address", values.address.trim());
      payload.append("college", values.college);
      payload.append("otherCollege", values.otherCollege.trim());
      payload.append("experience", String(Number(values.experience)));
      payload.append("coverLetter", values.coverLetter.trim());
      payload.append("linkedin", values.linkedin.trim());
      payload.append("portfolio", values.portfolio.trim());
      payload.append("github", values.github.trim());
      payload.append("instagram", values.instagram.trim());
      payload.append("xProfile", values.xProfile.trim());
      payload.append("referralSource", values.referralSource);
      payload.append("otherReferral", values.otherReferral.trim());
      payload.append("jobOpeningId", job._id);
      payload.append("jobLocation", jobLocation);
      payload.append("photo", photo);
      payload.append("resume", resume);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body.success) {
        throw new Error(
          body.error || "Failed to submit application. Please try again.",
        );
      }

      setStatus({
        type: "success",
        message:
          body.message ||
          "Your application has been submitted successfully. Thank you!",
      });
      setValues(initialState);
      setPhoto(null);
      setResume(null);
      setStep(1);
      if (photoInputRef.current) photoInputRef.current.value = "";
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="apply"
      ref={formTopRef}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card sm:scroll-mt-28 lg:scroll-mt-6"
      aria-labelledby="application-title"
    >
      <div className="border-b border-border px-3 py-4 sm:px-6 sm:py-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Application
        </div>
        <h2
          id="application-title"
          className="mt-2.5 break-words text-lg font-semibold tracking-tight text-foreground sm:mt-3 sm:text-2xl"
        >
          {roleLabel}
        </h2>
        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:mt-1.5 sm:text-sm sm:leading-6">
          {job.departmentName ? `${departmentLabel} · ` : ""}
          Required fields are marked. Takes a few minutes.
        </p>
      </div>

      <StepProgress step={step} />

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-3 pb-28 sm:space-y-8 sm:p-8 sm:pb-8"
        noValidate
      >
        {step === 1 ? (
          <div className="space-y-4 sm:space-y-5">
            <SectionHeading icon={User} title="1. Personal information" />

            <div className="space-y-2">
              <FieldLabel icon={Camera} required>
                Photo
              </FieldLabel>
              <p className="text-sm text-muted-foreground">
                A clear headshot. JPEG, PNG, or WebP, up to 5MB.
              </p>
              <FileDropzone
                id="photo-upload"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                file={photo}
                onChange={handlePhoto}
                icon={Camera}
                title="Upload a photo"
                hint="JPEG, PNG, WebP (Max 5MB)"
                previewUrl={photoPreview}
                inputRef={photoInputRef}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="space-y-2">
                <FieldLabel icon={User} required>
                  Full Name
                </FieldLabel>
                <input
                  name="name"
                  value={values.name}
                  onChange={updateField}
                  placeholder="John Doe"
                  autoComplete="name"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel icon={Mail} required>
                  Email Address
                </FieldLabel>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={updateField}
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <FieldLabel icon={Phone} required>
                  Phone Number
                </FieldLabel>
                <div className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-2 sm:grid-cols-[10.5rem_minmax(0,1fr)]">
                  <select
                    name="countryCode"
                    aria-label="Country code"
                    value={values.countryCode}
                    onChange={updateField}
                    className={fieldClass}
                  >
                    {COUNTRY_CODES.map((code) => (
                      <option key={code.value} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={updateField}
                    placeholder="9876543210"
                    autoComplete="tel-national"
                    inputMode="numeric"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FieldLabel icon={MapPin} required>
                  City
                </FieldLabel>
                <input
                  name="city"
                  value={values.city}
                  onChange={updateField}
                  placeholder="New York"
                  autoComplete="address-level2"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel icon={Globe} required>
                  Country
                </FieldLabel>
                <input
                  name="country"
                  value={values.country}
                  onChange={updateField}
                  placeholder="United States"
                  autoComplete="country-name"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel icon={User} required>
                  Gender
                </FieldLabel>
                <select
                  name="gender"
                  value={values.gender}
                  onChange={updateField}
                  className={fieldClass}
                >
                  <option value="">Select Gender</option>
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel icon={MapPin} required>
                Complete Address
              </FieldLabel>
              <textarea
                name="address"
                value={values.address}
                onChange={updateField}
                rows={3}
                placeholder="Street address, building number, apartment/suite"
                className="min-h-24 w-full resize-y rounded-xl border border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              <SectionHeading icon={GraduationCap} title="Education" />

              <div className="space-y-2">
                <FieldLabel icon={GraduationCap} required>
                  College/University
                </FieldLabel>
                <select
                  name="college"
                  value={values.college}
                  onChange={updateField}
                  className={fieldClass}
                >
                  <option value="">Select College</option>
                  {COLLEGES.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>

              {showOtherCollege ? (
                <div className="space-y-2">
                  <FieldLabel icon={GraduationCap} required>
                    Specify Your College
                  </FieldLabel>
                  <input
                    name="otherCollege"
                    value={values.otherCollege}
                    onChange={updateField}
                    placeholder="Enter your college/university name"
                    className={fieldClass}
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-4 sm:space-y-5">
              <SectionHeading icon={Award} title="Experience and resume" />

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="space-y-2">
                  <label className={labelClass}>
                    Years of Experience{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    min={0}
                    max={50}
                    value={values.experience}
                    onChange={updateField}
                    placeholder="5"
                    className={fieldClass}
                  />
                </div>

                <div className="rounded-xl border border-border bg-accent px-3 py-3 text-sm leading-6 text-foreground sm:col-span-2 sm:px-4">
                  You are applying for{" "}
                  <span className="break-words font-semibold">{roleLabel}</span>
                  {job.departmentName ? ` in ${departmentLabel}` : ""}.
                </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  <LinkedInIcon />
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  name="linkedin"
                  inputMode="url"
                  value={values.linkedin}
                  onChange={updateField}
                  placeholder="linkedin.com/in/yourprofile"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="github" className={labelClass}>
                  <GitHubIcon />
                  GitHub
                </label>
                <input
                  id="github"
                  type="text"
                  name="github"
                  inputMode="url"
                  autoComplete="url"
                  value={values.github}
                  onChange={updateField}
                  placeholder="github.com/yourname"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  <PortfolioIcon />
                  Portfolio URL
                </label>
                <input
                  type="text"
                  name="portfolio"
                  inputMode="url"
                  value={values.portfolio}
                  onChange={updateField}
                  placeholder="yourportfolio.com"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="instagram" className={labelClass}>
                  <InstagramIcon />
                  Instagram
                </label>
                <input
                  id="instagram"
                  type="text"
                  name="instagram"
                  inputMode="url"
                  autoComplete="url"
                  value={values.instagram}
                  onChange={updateField}
                  placeholder="instagram.com/yourname"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="x-profile" className={labelClass}>
                  <XIcon />
                  X
                </label>
                <input
                  id="x-profile"
                  type="text"
                  name="xProfile"
                  inputMode="url"
                  autoComplete="url"
                  value={values.xProfile}
                  onChange={updateField}
                  placeholder="x.com/yourname"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="referral-source"
                  className="text-sm font-medium text-foreground"
                >
                  Where did you hear about us{" "}
                  <span className="text-destructive">*</span>
                </label>
                <select
                  id="referral-source"
                  name="referralSource"
                  value={values.referralSource}
                  onChange={updateField}
                  className={fieldClass}
                >
                  <option value="">Select one</option>
                  {REFERRAL_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {values.referralSource === "Other" ? (
                <div className="space-y-2 sm:col-span-2">
                  <label
                    htmlFor="other-referral"
                    className="text-sm font-medium text-foreground"
                  >
                    Please specify{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="other-referral"
                    name="otherReferral"
                    value={values.otherReferral}
                    onChange={updateField}
                    placeholder="How did you hear about us?"
                    className={fieldClass}
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <FieldLabel icon={FileText}>Cover Letter</FieldLabel>
              <textarea
                name="coverLetter"
                value={values.coverLetter}
                onChange={updateField}
                rows={4}
                maxLength={1000}
                placeholder="A short note about your experience is enough."
                className="min-h-32 w-full resize-y rounded-xl border border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground">
                {values.coverLetter.length}/1000 characters
              </p>
            </div>

            <div className="space-y-2">
              <FieldLabel icon={Upload} required>
                Resume Upload
              </FieldLabel>
              <FileDropzone
                id="resume-upload"
                accept="application/pdf,.pdf"
                file={resume}
                onChange={handleResume}
                icon={Upload}
                title="Upload a resume"
                hint="PDF only (Max 10MB)"
                inputRef={resumeInputRef}
              />
            </div>
            </div>
          </div>
        ) : null}

        {status.message ? (
          <p
            className={`break-words rounded-xl px-3 py-2.5 text-sm leading-5 ${
              status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
            role="status"
          >
            {status.message}
          </p>
        ) : null}

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/90 sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none sm:supports-[backdrop-filter]:bg-transparent">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:gap-4 sm:pt-2">
            <div className="flex gap-2.5 sm:flex-row">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex h-11 min-w-[5.5rem] items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-12 sm:flex-1 sm:text-base sm:hover:bg-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}

              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-12 sm:text-base"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:text-base"
                >
                  <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>

            <p className="hidden text-center text-xs text-muted-foreground sm:block">
              <span className="text-destructive">*</span> Required fields
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
