import CareersCrowdIntro from "@/components/careers/CareersCrowdIntro";
import CareersListing from "@/components/careers/CareersListing";
import { getJobs, type JobOpening } from "@/lib/careers";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  let jobs: JobOpening[] = [];
  let error = false;

  try {
    jobs = await getJobs();
  } catch {
    error = true;
  }

  return (
    <CareersCrowdIntro>
      <CareersListing jobs={jobs} error={error} />
    </CareersCrowdIntro>
  );
}
