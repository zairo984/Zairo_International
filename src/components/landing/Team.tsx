"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";
import TeamLanyardRail, {
  type LanyardMember,
} from "@/components/ui/team-lanyard-rail";

type Member = {
  _id?: string;
  name: string;
  profilePic?: string;
  role?: string;
  experience?: number;
  alias?: string;
  isfeatured?: boolean;
};

const HIDDEN_ROLES = new Set([
  "admin",
  "superadmin",
  "super admin",
  "guest",
  "root",
  "owner",
]);

const JOB_ROLE_LABELS: Record<string, string> = {
  advert: "Marketing",
  content: "Content",
  sales: "Sales",
  hr: "Human Resources",
  developer: "Developer",
};

/** Known Unsplash portrait fallbacks when an employee has no profile photo. */
const FALLBACK_PORTRAITS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80",
] as const;

function getJobRole(role?: string) {
  if (!role) return null;
  const key = role.trim().toLowerCase();
  if (HIDDEN_ROLES.has(key)) return null;
  if (JOB_ROLE_LABELS[key]) return JOB_ROLE_LABELS[key];
  if (/admin|super|guest|root/i.test(role)) return null;
  return role;
}

function toLanyardMember(member: Member, index: number): LanyardMember {
  const jobRole = getJobRole(member.role) ?? "Team";
  const years =
    typeof member.experience === "number" && member.experience > 0
      ? member.experience
      : null;
  const tags = [
    jobRole,
    years ? `Since ${new Date().getFullYear() - years}` : null,
  ].filter(Boolean) as string[];

  return {
    id: member._id ?? `${member.name}-${index}`,
    name: member.name,
    role: jobRole,
    team: "Zairo International",
    image:
      member.profilePic ||
      FALLBACK_PORTRAITS[index % FALLBACK_PORTRAITS.length] ||
      FALLBACK_PORTRAITS[0],
    bio: years
      ? `${years} ${years === 1 ? "year" : "years"} with the Zairo crew — building brands, products, and ventures that ship.`
      : "Part of the Zairo crew — building brands, products, and ventures that ship.",
    tags,
    /* Strip: red, blue, red, blue… */
    tone: (index % 2 === 0 ? 1 : 2) as 1 | 2,
  };
}

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await axios.get("/api/employee");
        const fetched = (response.data.emp ?? []) as Member[];
        const featured = fetched
          .filter((emp) => emp.isfeatured === true)
          .slice(0, 8);
        if (!cancelled) setMembers(featured);
      } catch {
        if (!cancelled) setError("Could not load team members right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(
    () => members.map((member, index) => toLanyardMember(member, index)),
    [members],
  );

  if (!loading && !error && members.length === 0) return null;

  return (
    <ScrollReveal as="div" className="scroll-mt-28 bg-white">
      {loading ? (
        <section
          id="team"
          aria-labelledby="team-heading"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
        >
          <h2
            id="team-heading"
            className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl"
          >
            People behind the brand
          </h2>
          <div className="mt-10 flex h-[28rem] items-end justify-center gap-4 overflow-hidden">
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-24 animate-pulse rounded-2xl border border-border bg-muted"
                style={{ height: `${180 + (item % 3) * 28}px` }}
              />
            ))}
          </div>
        </section>
      ) : error ? (
        <section id="team" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm text-muted-foreground">{error}</p>
        </section>
      ) : (
        <TeamLanyardRail
          id="team"
          items={items}
          heading="People behind the brand"
          caption="Brush along the rail to meet someone. Click a badge to flip it."
          autoplay
          className="scroll-mt-28 bg-white"
          action={
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm outline-none transition-[transform,opacity] duration-300 ease-motion hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-primary"
              />
              Join our team
              <ArrowRight weight="bold" className="h-4 w-4" aria-hidden />
            </Link>
          }
        />
      )}
    </ScrollReveal>
  );
}
