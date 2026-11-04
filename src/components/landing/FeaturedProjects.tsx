"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import vacation from "@/images/venture-vacation-saga.jpg";
import housing from "@/images/venture-housing-saga.jpg";
import techtunes from "@/images/venture-tech-tunes.png";
import silken from "@/images/venture-silken-knot.jpg";
import ScrollReveal from "./ScrollReveal";

type Venture = {
  name: string;
  category: string;
  blurb: string;
  cta: string;
  theme: string;
  image: StaticImageData;
  href: string;
};

const ventures: Venture[] = [
  {
    name: "Vacation Saga",
    category: "Travel platform",
    blurb:
      "Holiday homes and monthly rentals — find verified stays abroad with secure payments and 24/7 support.",
    cta: "View Project",
    theme: "#F97316",
    image: vacation,
    href: "https://www.vacationsaga.com/",
  },
  {
    name: "Housing Saga",
    category: "Property platform",
    blurb:
      "Homes, offices, and rentals in Greece — discovery for buyers, investors, and Golden Visa journeys.",
    cta: "View Project",
    theme: "#A4E600",
    image: housing,
    href: "https://housingsaga.com/",
  },
  {
    name: "Tech Tunes",
    category: "Technology and marketing",
    blurb:
      "Product and growth studio for brands that need design, build, and digital marketing in one place.",
    cta: "View Project",
    theme: "#E879F9",
    image: techtunes,
    href: "https://techtunes.ai/",
  },
  {
    name: "Silken Knot",
    category: "Commerce brand",
    blurb:
      "Premium body care, bath, and wellness ecommerce — curated products with a polished retail experience.",
    cta: "Explore Store",
    theme: "#C9A27A",
    image: silken,
    href: "https://www.silkenknot.com/",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedProjects() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal
      as="section"
      id="ventures"
      aria-labelledby="ventures-heading"
      className="scroll-mt-28 bg-[#070f18] px-4 py-12 text-white sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[720px]">
          <h2
            id="ventures-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Brands with their own homes
          </h2>
          <p className="mt-3 text-base leading-7 text-white/65 text-pretty sm:text-lg sm:leading-8">
            Independent products under Zairo. Each runs on its own site with its
            own audience — open any brand to see the live product.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ventures.map((venture, index) => (
            <motion.li
              key={venture.name}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease }}
            >
              <article
                className="group relative flex h-full min-h-[26rem] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-sm transition-all duration-500 ease-motion hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-xl sm:min-h-[28rem]"
                style={{ ["--venture-theme" as string]: venture.theme }}
              >
                <a
                  href={venture.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label={`${venture.cta}: ${venture.name}`}
                />

                <div className="relative min-h-0 flex-[3] overflow-hidden bg-navy">
                  <Image
                    src={venture.image}
                    alt={`${venture.name} preview`}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-motion group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                  />
                </div>

                <div className="relative z-0 flex min-h-0 flex-[2] flex-col p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {venture.category}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:[color:var(--venture-theme)] group-focus-within:[color:var(--venture-theme)] sm:text-xl">
                    {venture.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-5 text-white/65 text-pretty line-clamp-3">
                    {venture.blurb}
                  </p>
                  <span className="group/button mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300">
                    {venture.cta}
                    <ArrowRight
                      weight="bold"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
