// lib/careers.ts — server-side helpers for the Adminstro careers API
export const ADMINSTRO_API_BASE = (
  process.env.ADMINSTRO_API_BASE || "https://adminstro.in"
).replace(/\/$/, "");

export type JobOpening = {
  _id: string;
  title: string;
  slug: string;
  departmentName?: string;
  positionName?: string;
  summary?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  location?: string;
  employmentType: "fulltime" | "parttime" | "intern" | "contract" | null;
  workMode: "onsite" | "hybrid" | "remote" | null;
  experienceLevel: "fresher" | "range" | null;
  experienceMin: number | null;
  experienceMax: number | null;
  isPublished: boolean;
};

export type OfficeAddress = {
  _id: string;
  name?: string;
  city?: string;
  formattedAddress?: string;
  isActive?: boolean;
};

export async function getJobs(): Promise<JobOpening[]> {
  const res = await fetch(`${ADMINSTRO_API_BASE}/api/job-openings?published=1`, {
    cache: "no-store",
  });
  const body = await res.json();
  if (!res.ok || !body.success || !Array.isArray(body.data))
    throw new Error(body.error || "Failed to fetch jobs");
  return body.data;
}

// returns null when the role is missing or unpublished (404)
export async function getJob(slug: string): Promise<JobOpening | null> {
  const res = await fetch(
    `${ADMINSTRO_API_BASE}/api/job-openings/by-slug/${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );
  if (res.status === 404) return null;
  const body = await res.json();
  if (!res.ok || !body.success || !body.data)
    throw new Error(body.error || "Failed to fetch job");
  return body.data;
}

export async function getOfficeAddresses(): Promise<OfficeAddress[]> {
  const res = await fetch(
    `${ADMINSTRO_API_BASE}/api/office-addresses?active=1`,
    { cache: "no-store" },
  );
  const body = await res.json();
  if (!res.ok || !body.success || !Array.isArray(body.data)) {
    throw new Error(body.error || "Failed to fetch office addresses");
  }
  return body.data;
}

/** Prefer unique cities; first office wins when cities collide. */
export function uniqueOfficesByCity(offices: OfficeAddress[]): OfficeAddress[] {
  const seen = new Set<string>();
  const unique: OfficeAddress[] = [];

  for (const office of offices) {
    const key = (office.city || office.name || office._id).trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(office);
  }

  return unique.sort((a, b) =>
    (a.city || a.name || "").localeCompare(b.city || b.name || ""),
  );
}

export function resolveOfficeAddressId(
  offices: OfficeAddress[],
  jobLocation?: string | null,
): string | null {
  const list = uniqueOfficesByCity(offices);
  if (list.length === 0) return null;

  const needle = (jobLocation || "").trim().toLowerCase();
  if (!needle) return list[0]._id;

  const exact = list.find((office) => {
    const city = (office.city || "").trim().toLowerCase();
    const name = (office.name || "").trim().toLowerCase();
    return city === needle || name === needle;
  });
  if (exact) return exact._id;

  const partial = list.find((office) => {
    const city = (office.city || "").trim().toLowerCase();
    const name = (office.name || "").trim().toLowerCase();
    return (
      (city && (needle.includes(city) || city.includes(needle))) ||
      (name && (needle.includes(name) || name.includes(needle)))
    );
  });

  return partial?._id || list[0]._id;
}

export async function submitJobApplication(payload: Record<string, unknown>) {
  const res = await fetch(
    `${ADMINSTRO_API_BASE}/api/job-application/setInterview`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

export const applyUrl = (slug: string) =>
  `${ADMINSTRO_API_BASE}/careers/${slug}`;

export const EMPLOYMENT_LABEL: Record<string, string> = {
  fulltime: "Full time",
  parttime: "Part time",
  intern: "Internship",
  contract: "Contract",
};
export const MODE_LABEL: Record<string, string> = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Work from home",
};

export function experienceLabel(j: JobOpening): string | null {
  if (j.employmentType === "intern" || j.experienceLevel === "fresher")
    return "Fresher";
  if (
    j.experienceLevel === "range" &&
    j.experienceMin != null &&
    j.experienceMax != null
  ) {
    const { experienceMin: a, experienceMax: b } = j;
    return a === b ? `${a} ${a === 1 ? "year" : "years"}` : `${a}–${b} years`;
  }
  return null;
}

export const lines = (t?: string) =>
  (t ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
