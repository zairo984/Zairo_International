"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  RocketLaunch,
  ShieldCheck,
  Sparkle,
  Handshake,
} from "@phosphor-icons/react";
import strategy from "@/images/landing-visual-strategy.jpg";
import ScrollReveal from "./ScrollReveal";

const values = [
  {
    icon: Sparkle,
    title: "Brand level craft",
    detail:
      "Every venture is treated as a real brand, not a one off deliverable.",
  },
  {
    icon: RocketLaunch,
    title: "Always improving",
    detail:
      "We keep iterating on products, systems, and experiences after launch.",
  },
  {
    icon: ShieldCheck,
    title: "Own the outcome",
    detail:
      "Strategy, build, and support stay under one roof with clear ownership.",
  },
  {
    icon: Handshake,
    title: "Partner mindset",
    detail:
      "Long term collaboration with teams that want premium execution.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal
      as="section"
      className="relative overflow-hidden bg-[#070f18] px-4 py-20 text-white sm:px-6 sm:py-28"
    >
      <div className="absolute inset-0">
        <Image
          src={strategy}
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#070f18]/80" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(225,20,40,0.28),transparent_30%)]"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="max-w-[680px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            WHY ZAIRO
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Premium company energy.
            <br />
            Modern operating rhythm.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/70 text-pretty sm:text-lg sm:leading-8">
            We do not present as a single niche shop. We present as a company
            that keeps shipping brands and improving them in public.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-[transform,opacity] duration-300 ease-motion hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Partner with Zairo
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, detail }, index) => (
            <motion.li
              key={title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease }}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-[transform,background-color] duration-500 ease-motion hover:-translate-y-1 hover:bg-white/[0.1]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon weight="duotone" className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65 text-pretty">
                {detail}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
