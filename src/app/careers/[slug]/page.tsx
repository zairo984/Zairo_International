import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Send } from "lucide-react";
import CareersHero from "@/components/careers/CareersHero";
import JobDetails from "@/components/careers/JobDetails";
import JobMeta from "@/components/careers/JobMeta";
import ShareJobButton from "@/components/careers/ShareJobButton";
import { getJob, getJobs, type JobOpening } from "@/lib/careers";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  return {
    title: job
      ? `${job.title} | Careers at Zairo International`
      : "Job not found",
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  let similarJobs: JobOpening[] = [];
  try {
    const allJobs = await getJobs();
    similarJobs = allJobs.filter((item) => item.slug !== job.slug).slice(0, 3);
  } catch {
    similarJobs = [];
  }

  const applyHref = `/careers/${job.slug}/apply`;

  return (
    <main className="w-full bg-white text-[#171717]">
      <CareersHero
        eyebrow="CAREERS"
        title={job.title}
        compact
        meta={<JobMeta job={job} />}
      />

      <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-6 sm:px-10 sm:pb-12 sm:pt-8 lg:px-12">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#555] transition hover:text-[#dc101d]"
        >
          ← <span>Back to Careers</span>
        </Link>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 sm:gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.85fr)]">
          <article className="min-w-0">
            <JobDetails job={job} showHeading={false} />
          </article>

          <aside className="min-w-0 space-y-5">
            <div className="hidden rounded-2xl border border-[#ececec] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-6 lg:block">
              <h2 className="text-lg font-bold tracking-tight">
                Apply for this Job
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-[#666]">
                Take the next step in your career with Zairo International.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <Link
                  href={applyHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc101d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b90012]"
                >
                  <Send size={14} />
                  Apply Now
                </Link>
                <ShareJobButton title={job.title} />
              </div>
            </div>

            {similarJobs.length > 0 ? (
              <div className="rounded-2xl border border-[#ececec] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-6">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">
                  Similar Opportunities
                </h3>
                <div className="mt-3 space-y-1 sm:mt-4">
                  {similarJobs.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/careers/${item.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition hover:bg-[#fff5f5]"
                    >
                      <div className="min-w-0">
                        <p className="break-words text-sm font-semibold text-[#171717] group-hover:text-[#dc101d]">
                          {item.title}
                        </p>
                        {item.location ? (
                          <p className="mt-1 text-xs text-[#777]">
                            {item.location}
                          </p>
                        ) : null}
                      </div>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-[#999] transition group-hover:translate-x-0.5 group-hover:text-[#dc101d]"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        <section className="mt-10 flex justify-center pb-2 sm:mt-14 sm:pb-4">
          <div className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl bg-[#101010] px-5 py-7 pl-8 sm:rounded-3xl sm:px-8 sm:py-9 sm:pl-14 lg:px-10 lg:pl-16">
            <div
              className="pointer-events-none absolute -left-14 -top-16 h-36 w-28 -rotate-12 rounded-br-[70px] border-r-[8px] border-[#b90012] bg-[#dc101d] opacity-90 sm:-left-16 sm:-top-20 sm:h-48 sm:w-36 sm:rounded-br-[90px] sm:border-r-[10px]"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] md:gap-8">
              <div className="min-w-0 space-y-2 text-center md:pl-8 md:text-left lg:pl-0">
                <h2 className="text-[20px] font-bold leading-snug text-white sm:text-[26px]">
                  Shape Your Future with Zairo International
                </h2>
                <p className="text-sm leading-6 text-[#ccc]">
                  Explore opportunities and take the next step in your career
                  journey with us.
                </p>
              </div>

              <div className="flex justify-center md:justify-end">
                <Link
                  href="/careers"
                  className="inline-flex w-full max-w-[240px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#dc101d] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#b90012] hover:shadow-lg sm:w-auto sm:px-7"
                >
                  View All Jobs
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Single mobile Apply CTA — desktop uses the sidebar card */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ececec] bg-white/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:hidden">
        <div className="mx-auto flex max-w-[1440px] gap-2.5">
          <Link
            href={applyHref}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#dc101d] px-4 text-sm font-semibold text-white transition hover:bg-[#b90012]"
          >
            <Send size={15} />
            Apply Now
          </Link>
          <div className="w-[42%] max-w-[140px] shrink-0 sm:max-w-[160px]">
            <ShareJobButton title={job.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
