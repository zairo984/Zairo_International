import CareersBanner from "@/components/careers/CareersBanner";

/**
 * @param {object} props
 * @param {string} [props.eyebrow]
 * @param {import("react").ReactNode} props.title
 * @param {string} [props.description]
 * @param {import("react").ReactNode} [props.meta]
 * @param {boolean} [props.compact]
 */
export default function CareersHero({
  eyebrow = "Careers",
  title,
  description,
  meta = null,
  compact = false,
}) {
  return (
    <CareersBanner
      eyebrow={eyebrow}
      title={title}
      description={description}
      meta={meta}
      compact={compact}
    />
  );
}
