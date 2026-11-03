import { BriefcaseBusiness, Clock, MapPin, Wifi } from "lucide-react";
import {
  EMPLOYMENT_LABEL,
  MODE_LABEL,
  experienceLabel,
} from "@/lib/careers";

export default function JobMeta({ job }) {
  const exp = experienceLabel(job);
  const items = [
    job.location
      ? { icon: MapPin, label: job.location }
      : null,
    job.employmentType
      ? { icon: BriefcaseBusiness, label: EMPLOYMENT_LABEL[job.employmentType] }
      : null,
    job.workMode
      ? { icon: Wifi, label: MODE_LABEL[job.workMode] }
      : null,
    exp ? { icon: Clock, label: exp } : null,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold text-[#111111] sm:gap-x-4 sm:text-[13px] sm:font-medium sm:text-[#555]">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <span
            key={`${item.label}-${index}`}
            className="inline-flex max-w-full items-center gap-1.5"
          >
            <Icon size={14} className="shrink-0 text-[#dc101d]" strokeWidth={2.4} />
            <span className="break-words">{item.label}</span>
          </span>
        );
      })}
    </div>
  );
}
