"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChartLineUp,
  Code,
  Handshake,
  HouseLine,
  RocketLaunch,
  Storefront,
  type Icon,
} from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";
import strategy from "@/images/landing-visual-strategy.jpg";
import tech from "@/images/landing-visual-tech.jpg";
import marketing from "@/images/landing-visual-marketing.jpg";
import commerce from "@/images/landing-visual-commerce.jpg";
import housing from "@/images/landing-housing.jpg";
import office from "@/images/landing-visual-office.jpg";

type Service = {
  title: string;
  outcome: string;
  category: string;
  proof: string;
  icon: Icon;
  image: StaticImageData;
  alt: string;
};

/**
 * Plain-language services a visitor can scan in one look.
 * Categories map to Zairo’s operating domains; proof ties to live ventures.
 */
const services: Service[] = [
  {
    category: "Ventures",
    title: "Launch a new brand",
    outcome:
      "We take a concept to a live product — name, offer, ops model, and launch plan included.",
    proof: "How Vacation Saga started",
    icon: RocketLaunch,
    image: strategy,
    alt: "Strategy boardroom for venture planning",
  },
  {
    category: "Technology",
    title: "Build digital platforms",
    outcome:
      "Websites, dashboards, and product systems engineered to the same bar as our own tech brands.",
    proof: "Same craft as Tech Tunes",
    icon: Code,
    image: tech,
    alt: "Product workstation for technology platforms",
  },
  {
    category: "Marketing",
    title: "Grow the brand",
    outcome:
      "Positioning, creative, and acquisition systems designed to compound — not one-off campaigns.",
    proof: "Narratives that compound",
    icon: ChartLineUp,
    image: marketing,
    alt: "Brand studio for marketing and growth",
  },
  {
    category: "Commerce",
    title: "Ship storefronts that sell",
    outcome:
      "Ecommerce journeys and retail experiences built for conversion and lasting brand presence.",
    proof: "Silken Knot standard",
    icon: Storefront,
    image: commerce,
    alt: "Luxury retail interior for commerce experiences",
  },
  {
    category: "Property",
    title: "Operate property products",
    outcome:
      "Residency and real-estate platforms where discovery, deals, and digital ops stay in one system.",
    proof: "Housing Saga DNA",
    icon: HouseLine,
    image: housing,
    alt: "Villa overlooking the sea for property ventures",
  },
  {
    category: "Partnership",
    title: "Stay as your build partner",
    outcome:
      "Strategy, build, and ongoing support under one accountable team — not a handoff after launch.",
    proof: "Long-term ownership",
    icon: Handshake,
    image: office,
    alt: "Modern office for partnership and advisory",
  },
];

const domains = ["Technology", "Marketing", "Commerce", "Property"] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <ScrollReveal
      as="section"
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-28 bg-white px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[720px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            01 · CAPABILITIES
          </p>
          <h2
            id="capabilities-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
          >
            What we do for partners
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground text-pretty sm:text-lg sm:leading-8">
            Zairo builds and operates brands across four domains. Pick a lane —
            or ask us to own the full stack from idea to live product.
          </p>
        </div>

        <ul
          className="mt-8 flex flex-wrap gap-2 sm:mt-10"
          aria-label="Operating domains"
        >
          {domains.map((domain) => (
            <li
              key={domain}
              className="rounded-full border border-border bg-[#FAFBFC] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-navy"
            >
              {domain}
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.li
                key={service.title}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease }}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-[transform,box-shadow] duration-500 ease-motion hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(11,28,44,0.35)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-motion group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0c1a2a]/55 via-[#0c1a2a]/10 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-primary shadow-sm backdrop-blur-sm">
                        <Icon weight="duotone" className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-navy uppercase shadow-sm backdrop-blur-sm">
                        {service.category}
                      </span>
                    </div>
                    <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/85">
                      {service.proof}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold tracking-tight text-foreground text-balance">
                        {service.title}
                      </h3>
                      <Link
                        href="/contact"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 ease-motion group-hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        aria-label={`Ask about ${service.title}`}
                      >
                        <ArrowUpRight
                          weight="bold"
                          className="h-4 w-4"
                          aria-hidden
                        />
                      </Link>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground text-pretty">
                      {service.outcome}
                    </p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-6 text-muted-foreground text-pretty">
            Not sure which lane fits? Tell us the outcome — we will map the
            work across technology, marketing, commerce, or property.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-[transform,opacity] duration-300 ease-motion hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-primary"
            />
            Talk through your project
            <ArrowUpRight weight="bold" className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
