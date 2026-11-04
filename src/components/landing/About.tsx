"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import aboutImage from "@/images/landing-about.jpg";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  {
    label: "Ventures",
    value: "4",
    detail: "Vacation Saga, Housing Saga, Tech Tunes, Silken Knot",
  },
  {
    label: "Focus",
    value: "Multi",
    detail: "Technology, marketing, commerce, property",
  },
  {
    label: "Base",
    value: "Kanpur",
    detail: "India operations with partners across markets",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal
      as="section"
      id="company"
      aria-labelledby="company-heading"
      className="scroll-mt-28 bg-white px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          className="relative mx-auto w-full max-w-lg lg:mx-0"
          initial={reduced ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <div
            className="absolute -bottom-4 -left-4 h-20 w-20 border-b-[5px] border-l-[5px] border-primary sm:-bottom-5 sm:-left-5"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={aboutImage}
              alt="Zairo team collaborating"
              className="h-full min-h-[280px] w-full object-cover sm:min-h-[380px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.06, ease }}
        >
          <h2
            id="company-heading"
            className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl"
          >
            Not one product.
            <span className="text-primary"> A brand house.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground text-pretty">
            Zairo International designs, builds, and operates brands that stand
            on their own, with one standard for craft and accountability.
          </p>

          <dl className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-foreground">
                  {item.value}
                </dd>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-[transform,opacity] duration-300 ease-motion hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            About Zairo
          </Link>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}
