"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import strategy from "@/images/landing-visual-strategy.jpg";
import office from "@/images/landing-visual-office.jpg";
import tech from "@/images/landing-visual-tech.jpg";

const steps: {
  step: string;
  title: string;
  detail: string;
  image: StaticImageData;
}[] = [
  {
    step: "01",
    title: "Align on the ambition",
    detail:
      "Share the outcome: a new venture, a product rebuild, growth systems, or partnership scope.",
    image: strategy,
  },
  {
    step: "02",
    title: "Shape the operating plan",
    detail:
      "We map team, timeline, and brand standards using playbooks from our live ventures.",
    image: office,
  },
  {
    step: "03",
    title: "Ship and keep improving",
    detail:
      "Launch is a milestone, not an ending. We stay with the work as the brand evolves.",
    image: tech,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal
      as="section"
      id="how-it-works"
      className="bg-white px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[680px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            HOW WE WORK
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
            Clear steps. Continuous improvement.
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.li
              key={item.step}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease }}
              className="overflow-hidden rounded-2xl border border-border bg-[#FAFBFC]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold tracking-[0.16em] text-primary">
                  {item.step}
                </span>
                <h3 className="mt-3 text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground text-pretty">
                  {item.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </ScrollReveal>
  );
}
