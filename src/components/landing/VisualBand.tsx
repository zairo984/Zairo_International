"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import office from "@/images/landing-visual-office.jpg";
import tech from "@/images/landing-visual-tech.jpg";
import marketing from "@/images/landing-visual-marketing.jpg";
import ScrollReveal from "./ScrollReveal";

const frames = [
  { src: office, label: "Company spaces" },
  { src: tech, label: "Product craft" },
  { src: marketing, label: "Brand systems" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function VisualBand() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal as="section" className="bg-[#070f18] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-[680px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            INSIDE ZAIRO
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
            A brand world built with care
          </h2>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {frames.map((frame, index) => (
            <motion.li
              key={frame.label}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={frame.src}
                  alt={frame.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-motion group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/25 to-transparent"
                  aria-hidden
                />
                <p className="absolute bottom-5 left-5 text-sm font-semibold tracking-wide text-white">
                  {frame.label}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
