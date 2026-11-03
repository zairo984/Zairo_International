import {
  BriefcaseBusiness,
  HeartPulse,
  Rocket,
  TrendingUp,
  UsersRound,
  Wallet,
} from "lucide-react";
import JobMeta from "./JobMeta";
import { lines } from "@/lib/careers";

const companyBenefits = [
  { icon: "growth", title: "Growth Opportunities" },
  { icon: "culture", title: "Collaborative Culture" },
  { icon: "health", title: "Health & Wellness" },
  { icon: "flex", title: "Flexible Work Culture" },
  { icon: "pay", title: "Competitive Compensation" },
];

const benefitIcons = {
  growth: TrendingUp,
  culture: UsersRound,
  health: HeartPulse,
  flex: Rocket,
  pay: Wallet,
};

function ContentSection({ title, children }) {
  return (
    <section className="mt-6 sm:mt-8">
      <h3 className="mb-3 flex items-center gap-3 text-base font-bold text-[#171717] sm:text-lg">
        <span className="h-5 w-1 shrink-0 rounded-full bg-[#dc101d]" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  if (!items.length) return null;
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-[15px] leading-7 text-[#555] before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#dc101d]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function JobDetails({ job, showHeading = true }) {
  const summary = job.summary?.trim() || "";
  const description = job.description?.trim() || "";
  const responsibilities = lines(job.responsibilities);
  const requirements = lines(job.requirements);

  return (
    <>
      {showHeading ? (
        <div>
          <h2 className="break-words text-[24px] font-bold tracking-tight text-[#171717] sm:text-[32px]">
            {job.title}
          </h2>
          <JobMeta job={job} />
        </div>
      ) : summary ? (
        <p className="text-[15px] leading-7 text-[#555] sm:text-base">
          {summary}
        </p>
      ) : null}

      {description ? (
        <ContentSection title="Job Overview">
          <p className="whitespace-pre-line text-[15px] leading-7 text-[#555]">
            {description}
          </p>
        </ContentSection>
      ) : !summary && showHeading ? (
        <ContentSection title="Job Overview">
          <p className="text-[15px] leading-7 text-[#555]">
            Details for this role will be shared during the hiring process.
          </p>
        </ContentSection>
      ) : null}

      {responsibilities.length ? (
        <ContentSection title="Key Responsibilities">
          <BulletList items={responsibilities} />
        </ContentSection>
      ) : null}

      {requirements.length ? (
        <ContentSection title="Requirements">
          <BulletList items={requirements} />
        </ContentSection>
      ) : null}

      <section className="mt-8 sm:mt-10">
        <h3 className="mb-4 flex items-center gap-3 text-base font-bold text-[#171717] sm:mb-5 sm:text-lg">
          <span className="h-5 w-1 shrink-0 rounded-full bg-[#dc101d]" />
          What We Offer
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {companyBenefits.map((benefit) => {
            const Icon = benefitIcons[benefit.icon] || BriefcaseBusiness;
            return (
              <div
                key={benefit.title}
                className="flex flex-col items-center gap-2.5 text-center sm:gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f0] text-[#dc101d] sm:h-14 sm:w-14">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <p className="max-w-[120px] text-[11px] font-semibold leading-4 text-[#333] sm:text-xs">
                  {benefit.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
