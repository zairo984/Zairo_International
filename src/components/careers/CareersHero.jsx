import Image from "next/image";
import heroImage from "@/images/career_banner.png";

/**
 * @param {object} props
 * @param {string} [props.eyebrow]
 * @param {import("react").ReactNode} props.title
 * @param {string} [props.description]
 * @param {import("react").ReactNode} [props.meta]
 * @param {boolean} [props.compact]
 */
export default function CareersHero({
  eyebrow = "CAREERS",
  title,
  description,
  meta = null,
  compact = false,
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[#f5f3f3] ${
        compact
          ? "min-h-[220px] lg:h-[280px]"
          : "min-h-[280px] sm:min-h-[340px] lg:h-[340px]"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
        />
        {/* Keep dark text readable when the crop lands on busy/dark areas */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/20 sm:from-white/75 sm:via-white/45 sm:to-transparent"
          aria-hidden="true"
        />
      </div>

      <div
        className={`relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-4 sm:px-10 lg:px-12 ${
          compact ? "py-10 sm:py-12" : "py-12 sm:py-16"
        }`}
      >
        <div className="min-w-0 max-w-[720px]">
          <div className="mb-3 flex items-center gap-3 sm:gap-4">
            <span className="h-[2px] w-8 shrink-0 bg-[#dc101d] sm:w-10" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#171717] sm:text-xs sm:tracking-[0.22em]">
              {eyebrow}
            </span>
          </div>

          <h1
            className={`break-words font-bold leading-[1.15] tracking-tight text-[#171717] ${
              compact
                ? "text-[26px] sm:text-4xl lg:text-[42px]"
                : "text-[30px] sm:text-5xl lg:text-[50px]"
            }`}
          >
            {title}
          </h1>

          {meta ? <div className="mt-1">{meta}</div> : null}

          {description ? (
            <p className="mt-3 max-w-[520px] text-sm leading-6 text-[#414141] sm:mt-4 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
