import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";
import CareersHero from "@/components/careers/CareersHero";
import JobMeta from "@/components/careers/JobMeta";
import ApplyForm from "@/components/careers/ApplyForm";
import { getJob, lines } from "@/lib/careers";

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
      ? `Apply: ${job.title} | Zairo International`
      : "Apply for a job",
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const overview = job.description || job.summary || "";
  const responsibilities = lines(job.responsibilities);
  const requirements = lines(job.requirements);

  return (
    <main className="w-full bg-[#faf8f8] text-[#171717]">
      <CareersHero
        eyebrow="CAREERS"
        title="Apply for Job"
        description="Take the next step in your career with Zairo International. We'd love to have you on our team."
        compact
      />

      <div className="mx-auto max-w-[1440px] px-3 pb-6 pt-5 sm:px-10 sm:pb-12 sm:pt-8 lg:px-12">
        <Link
          href={`/careers/${job.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#555] transition sm:hover:text-[#dc101d]"
        >
          ← <span>Back to role</span>
        </Link>

        {/* Compact role summary on mobile */}
        <div className="mt-4 rounded-2xl border border-[#ececec] bg-white p-3.5 sm:hidden">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#dc101d]">
              <BriefcaseBusiness size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="break-words text-base font-bold tracking-tight">
                {job.title}
              </h2>
              <JobMeta job={job} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)] lg:gap-10 lg:rounded-2xl lg:border lg:border-[#ececec] lg:bg-white lg:p-8 lg:shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <article className="order-2 hidden min-w-0 rounded-2xl border border-[#ececec] bg-white p-5 sm:block sm:p-7 lg:order-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#dc101d] sm:h-12 sm:w-12">
                <BriefcaseBusiness size={20} />
              </div>
              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold tracking-tight sm:text-[28px]">
                  {job.title}
                </h2>
                <JobMeta job={job} />
              </div>
            </div>

            {overview ? (
              <section className="mt-6 sm:mt-8">
                <h3 className="mb-3 flex items-center gap-3 text-base font-bold sm:text-lg">
                  <span className="h-5 w-1 shrink-0 rounded-full bg-[#dc101d]" />
                  Job Overview
                </h3>
                <p className="whitespace-pre-line break-words text-[15px] leading-7 text-[#555]">
                  {overview}
                </p>
              </section>
            ) : null}

            {responsibilities.length ? (
              <section className="mt-6 sm:mt-8">
                <h3 className="mb-3 flex items-center gap-3 text-base font-bold sm:text-lg">
                  <span className="h-5 w-1 shrink-0 rounded-full bg-[#dc101d]" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-2.5">
                  {responsibilities.map((item) => (
                    <li
                      key={item}
                      className="relative break-words pl-5 text-[15px] leading-7 text-[#555] before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#dc101d]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {requirements.length ? (
              <section className="mt-6 sm:mt-8">
                <h3 className="mb-3 flex items-center gap-3 text-base font-bold sm:text-lg">
                  <span className="h-5 w-1 shrink-0 rounded-full bg-[#dc101d]" />
                  Requirements
                </h3>
                <ul className="space-y-2.5">
                  {requirements.map((item) => (
                    <li
                      key={item}
                      className="relative break-words pl-5 text-[15px] leading-7 text-[#555] before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#dc101d]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>

          <div className="order-1 min-w-0 lg:order-2">
            <ApplyForm job={job} />
          </div>
        </div>
      </div>
    </main>
  );
}
