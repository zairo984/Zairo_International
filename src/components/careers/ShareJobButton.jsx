"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export default function ShareJobButton({ title }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // user cancelled share sheet
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      title={copied ? "Link copied" : "Share job"}
      aria-label={copied ? "Link copied" : "Share job"}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d0d0d0] px-3.5 text-sm font-semibold text-[#171717] transition hover:border-[#171717] hover:bg-[#f5f5f5] lg:h-[42px]"
    >
      <Share2 size={15} className="text-[#171717]" />
      <span>{copied ? "Copied" : "Share"}</span>
    </button>
  );
}
