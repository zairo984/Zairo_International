import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CareersBannerProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  meta?: ReactNode;
  compact?: boolean;
  showCta?: boolean;
};

/**
 * Plain white careers hero — centered copy, clear of the fixed navbar.
 */
export default function CareersBanner({
  eyebrow = "Careers",
  title,
  description,
  meta = null,
  compact = false,
  showCta = false,
}: CareersBannerProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className={`relative z-10 mx-auto flex max-w-6xl justify-center px-4 sm:px-6 ${
          compact
            ? "pb-14 pt-28 sm:pb-16 sm:pt-32"
            : "pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36"
        }`}
      >
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            {eyebrow}
          </p>

          <h1
            className={`mt-3 font-semibold tracking-tight text-foreground text-balance ${
              compact
                ? "text-3xl sm:text-4xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h1>

          {meta ? (
            <div className="mt-4 flex justify-center">{meta}</div>
          ) : null}

          {description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground text-pretty sm:text-base">
              {description}
            </p>
          ) : null}

          {showCta ? (
            <div className="mt-8 flex justify-center">
              <Link
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm outline-none transition-[transform,opacity] duration-300 ease-motion hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-primary"
                />
                View open roles
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
