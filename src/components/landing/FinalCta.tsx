"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal
      as="section"
      id="cta"
      aria-labelledby="cta-heading"
      className="scroll-mt-28 bg-[#F5F6F8] px-4 py-10 sm:px-6 sm:py-12"
    >
      <motion.div
        className="relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-2xl bg-[#101010] px-5 py-7 pl-8 sm:rounded-3xl sm:px-8 sm:py-8 sm:pl-14 lg:px-10 lg:pl-16"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease }}
      >
        <div
          className="pointer-events-none absolute -left-14 -top-16 h-36 w-28 -rotate-12 rounded-br-[70px] border-r-[8px] border-[#b90012] bg-[#dc101d] opacity-90 sm:-left-16 sm:-top-20 sm:h-48 sm:w-36 sm:rounded-br-[90px] sm:border-r-[10px]"
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] md:gap-8">
          <div className="min-w-0 space-y-2 text-center md:pl-8 md:text-left lg:pl-0">
            <h2
              id="cta-heading"
              className="text-[20px] font-bold leading-snug text-white text-balance sm:text-[26px]"
            >
              Build the next chapter with Zairo International
            </h2>
            <p className="text-sm leading-6 text-[#ccc] text-pretty">
              New venture, brand system, or partnership. Tell us the outcome.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Link
              href="/contact"
              className="inline-flex w-full max-w-[240px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#dc101d] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-motion hover:bg-[#b90012] hover:shadow-lg active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto sm:px-7"
            >
              Talk to us
              <ArrowRight weight="bold" className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
