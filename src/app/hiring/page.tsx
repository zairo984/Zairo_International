"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Briefcase, Wrench, FileText, Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/"; // Update this

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  currentDesignation: string;
  position: string;
  skills: string;
  description: string;
  documents: File | null;
}

const CareerForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    email: "",
    currentDesignation: "",
    position: "",
    skills: "",
    description: "",
    documents: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (value) formDataToSend.append(key, value as string | Blob);
    });

    try {
      const resp = await axios.post(`api/hiring`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (resp.status === 200) {
        toast.success("Congratulations! Your application is submitted.");
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          currentDesignation: "",
          position: "",
          skills: "",
          description: "",
          documents: null,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { label: "Full Name", name: "name", icon: User, type: "text" },
    { label: "Phone Number", name: "phoneNumber", icon: Phone, type: "tel" },
    { label: "Email Address", name: "email", icon: Mail, type: "email" },
    { label: "Current Designation", name: "currentDesignation", icon: Briefcase, type: "text" },
    { label: "Position Applied For", name: "position", icon: Briefcase, type: "text" },
    { label: "Skills", name: "skills", icon: Wrench, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-[#16293c] sm:px-10">
            <h1 className="text-3xl font-bold text-white text-center">Join Our Team</h1>
            <p className="mt-2 text-orange-100 text-center">
              Take the first step towards your next great opportunity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map(({ label, name, icon: Icon, type }) => (
                <div key={name} className="relative">
                  <label
                    className={`block text-sm font-medium transition-all duration-200 ${
                      focusedField === name ? "text-[#16293c]" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-4 h-4 ${focusedField === name ? "text-[#16293c]" : "text-gray-500"}`}
                      />
                      {label}
                    </div>
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name as keyof FormData] as string}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField("")}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16293c] focus:border-transparent transition-all duration-200"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Description
                </div>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => setFocusedField("description")}
                onBlur={() => setFocusedField("")}
                rows={4}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16293c] focus:border-transparent transition-all duration-200"
                placeholder="Tell us about yourself and why you're interested in this position"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Resume
                </div>
              </label>
              <input
                id="documents"
                name="documents"
                type="file"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16293c] focus:border-transparent transition-all duration-200"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-full
                  ${isSubmitting ? "bg-[#16293c] cursor-not-allowed" : "bg-[#16293c] hover:bg-[#16293c]"}
                  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#16293c] transition-all duration-200`}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
