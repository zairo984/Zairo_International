"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  ArrowRight,
  Rocket,
  UsersRound,
  Lightbulb,
  Globe2,
  ChevronLeft,
  ChevronRight,
  Building2,
  Wifi,
  X,
  ChevronDown,
  Clock,
} from "lucide-react";
import CareersBanner from "@/components/careers/CareersBanner";
import {
  EMPLOYMENT_LABEL,
  MODE_LABEL,
  experienceLabel,
  type JobOpening,
} from "@/lib/careers";

const benefits = [
  {
    icon: Rocket,
    title: "Grow Your Career",
    description: "Be part of a company that invests in your growth.",
  },
  {
    icon: UsersRound,
    title: "Collaborative Culture",
    description: "Work with a passionate and diverse team.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Environment",
    description: "Turn ideas into impact.",
  },
  {
    icon: Globe2,
    title: "Meaningful Impact",
    description: "Contribute to a global vision.",
  },
];

function FilterPill({
  id,
  icon: Icon,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className="relative flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-[#ececec] bg-[#fafafa] px-3.5 text-[#333] transition sm:hover:border-[#d4d4d4] sm:hover:bg-white"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[#555] shadow-sm">
        <Icon size={16} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#888]">
          {label}
        </span>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-[#171717] outline-none"
        >
          {children}
        </select>
      </span>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999]"
      />
    </label>
  );
}

export default function CareersListing({
  jobs,
  error,
}: {
  jobs: JobOpening[];
  error?: boolean;
}) {
  const [department, setDepartment] = useState("all");
  const [employment, setEmployment] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const departments = useMemo(
    () =>
      Array.from(
        new Set(
          jobs
            .map((job) => job.departmentName)
            .filter((name): name is string => Boolean(name)),
        ),
      ).sort(),
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDepartment =
        department === "all" || job.departmentName === department;
      const matchesEmployment =
        employment === "all" || job.employmentType === employment;
      const matchesJobType = jobType === "all" || job.workMode === jobType;

      return matchesDepartment && matchesEmployment && matchesJobType;
    });
  }, [jobs, department, employment, jobType]);

  const hasActiveFilters =
    department !== "all" || employment !== "all" || jobType !== "all";

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));

  const visibleJobs = filteredJobs.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const clearFilters = () => {
    setDepartment("all");
    setEmployment("all");
    setJobType("all");
    setPage(1);
  };

  return (
    <main className="w-full bg-white text-[#171717]">
      <CareersBanner
        eyebrow="Careers · Build · Grow · Belong"
        title={
          <>
            Careers at{" "}
            <span className="text-primary">our company</span>
          </>
        }
        description="Be part of a forward-thinking team that values innovation, collaboration, and continuous growth."
        showCta
      />

      <section className="relative z-20 mx-auto max-w-[1120px] px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="rounded-2xl border border-black/5 bg-white p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:p-4">
          <div
            className={`grid gap-2 sm:gap-3 ${
              hasActiveFilters
                ? "sm:grid-cols-[1fr_1fr_1fr_auto]"
                : "sm:grid-cols-3"
            }`}
          >
            <FilterPill
              id="career-department"
              icon={Building2}
              label="Department"
              value={department}
              onChange={(value) => {
                setDepartment(value);
                setPage(1);
              }}
            >
              <option value="all">All departments</option>
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FilterPill>

            <FilterPill
              id="career-employment"
              icon={BriefcaseBusiness}
              label="Employment"
              value={employment}
              onChange={(value) => {
                setEmployment(value);
                setPage(1);
              }}
            >
              <option value="all">All types</option>
              {Object.entries(EMPLOYMENT_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </FilterPill>

            <FilterPill
              id="career-job-type"
              icon={Wifi}
              label="Work mode"
              value={jobType}
              onChange={(value) => {
                setJobType(value);
                setPage(1);
              }}
            >
              <option value="all">All modes</option>
              {Object.entries(MODE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </FilterPill>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl border border-[#ececec] bg-[#fafafa] px-4 text-sm font-semibold text-[#444] transition sm:hover:border-[#d4d4d4] sm:hover:bg-white"
              >
                <X size={15} />
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section
        id="open-positions"
        className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 sm:px-10 sm:pt-10 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)] lg:gap-7">
          <div className="min-w-0">
            <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
              <h2 className="text-[26px] font-bold tracking-tight sm:text-[34px]">
                Open Positions
              </h2>

              <span className="text-xs text-[#777] sm:text-sm">
                Showing{" "}
                {filteredJobs.length === 0 ? 0 : (page - 1) * pageSize + 1}
                {"–"}
                {Math.min(page * pageSize, filteredJobs.length)} of{" "}
                {filteredJobs.length} jobs
              </span>
            </div>

            {error ? (
              <div className="rounded-xl border border-dashed border-[#ddd] py-16 text-center">
                <h3 className="font-semibold">Couldn’t load open roles</h3>
                <p className="mt-2 text-sm text-[#777]">
                  Please try again in a moment.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {visibleJobs.map((job) => {
                  const exp = experienceLabel(job);
                  return (
                    <div
                      key={job._id}
                      className="group flex flex-col gap-3 rounded-xl border border-[#e9e9e9] bg-white p-3.5 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-5 sm:hover:border-[#e9a0a4] sm:hover:shadow-[0_5px_18px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] text-[#dc101d] sm:h-14 sm:w-14">
                          <BriefcaseBusiness size={22} strokeWidth={2} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/careers/${job.slug}`}
                            className="block break-words text-base font-semibold leading-snug text-[#171717] transition sm:text-lg sm:hover:text-[#dc101d]"
                          >
                            {job.title}
                          </Link>

                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#666] sm:text-sm">
                            {job.location ? (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin size={14} className="shrink-0" />
                                <span className="break-words">{job.location}</span>
                              </span>
                            ) : null}

                            {job.employmentType ? (
                              <span className="inline-flex items-center gap-1.5">
                                <BriefcaseBusiness size={14} className="shrink-0" />
                                {EMPLOYMENT_LABEL[job.employmentType]}
                              </span>
                            ) : null}

                            {job.workMode ? (
                              <span className="inline-flex items-center gap-1.5">
                                <Wifi size={14} className="shrink-0" />
                                {MODE_LABEL[job.workMode]}
                              </span>
                            ) : null}

                            {exp ? (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock size={14} className="shrink-0" />
                                {exp}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/careers/${job.slug}/apply`}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-[#dc101d] px-5 py-2.5 text-xs font-semibold text-white transition-colors sm:self-center sm:hover:bg-[#b90012]"
                      >
                        Apply
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}

                {visibleJobs.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[#ddd] py-16 text-center">
                    <Search size={32} className="mx-auto mb-3 text-[#aaa]" />
                    <h3 className="font-semibold">No positions found</h3>
                    <p className="mt-2 text-sm text-[#777]">
                      {jobs.length === 0
                        ? "No open roles right now — check back soon."
                        : "Try changing your filters."}
                    </p>
                    {hasActiveFilters ? (
                      <button
                        onClick={clearFilters}
                        className="mt-4 text-sm font-semibold text-[#dc101d] sm:hover:underline"
                      >
                        Clear filters
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => setPage(number)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                        page === number
                          ? "bg-[#dc101d] text-white"
                          : "border border-[#e5e5e5] sm:hover:border-[#dc101d]"
                      }`}
                    >
                      {number}
                    </button>
                  ),
                )}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>

          <aside className="h-fit overflow-hidden rounded-2xl border border-[#e8e8e8] bg-[#f6f6f6]">
            <div className="border-b border-[#e8e8e8] bg-white px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888]">
                Culture
              </p>
              <h2 className="mt-1 text-lg font-bold tracking-tight text-[#171717]">
                Why work with us
              </h2>
            </div>

            <div className="space-y-2.5 p-3 sm:p-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group rounded-xl border border-transparent bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition sm:hover:border-[#e5e5e5] sm:hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#171717] text-white transition sm:group-hover:bg-[#3a3a3a]">
                        <Icon size={18} strokeWidth={1.9} />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-sm font-semibold text-[#171717]">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-xs leading-[17px] text-[#666]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
