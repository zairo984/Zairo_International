"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";
import TeamLanyardRail, {
  type LanyardMember,
} from "@/components/ui/team-lanyard-rail";
import {
  getFeaturedEmployees,
  type FeaturedEmployee,
} from "@/lib/careers";

function toLanyardMember(member: FeaturedEmployee, index: number): LanyardMember {
  const role = member.position?.trim() || member.department?.trim() || "Team";
  const department = member.department?.trim();
  const team = department && department !== role ? department : undefined;
  const description = member.description?.trim();
  const tags = [department, member.position?.trim()].filter(
    (tag, tagIndex, all): tag is string =>
      Boolean(tag) && tag !== role && all.indexOf(tag) === tagIndex,
  );

  return {
    id: member._id ?? `${member.name}-${index}`,
    name: member.name,
    role,
    team,
    image: member.photoUrl?.trim() || "",
    bio: description && description !== role ? description : undefined,
    tags,
    /* Strip: red, blue, red, blue… */
    tone: (index % 2 === 0 ? 1 : 2) as 1 | 2,
  };
}

export default function Team() {
  const [members, setMembers] = useState<FeaturedEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const featured = await getFeaturedEmployees();
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
