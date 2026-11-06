"use client";

import Image from "next/image";
import Link from "next/link";
import { Buildings, Cpu, Storefront, type Icon } from "@phosphor-icons/react";
import officePhoto from "@/images/landing-visual-office.jpg";
import ScrollReveal from "./ScrollReveal";

type Connection = {
  name: string;
  href: string;
};

type Service = {
  index: string;
  name: string;
  line: string;
  icon: Icon;
  seenIn: Connection[];
};

const services: Service[] = [
  {
    index: "01",
    name: "Property",
    line: "Need a home? We help you find it, buy it, rent it, and look after it.",
    icon: Buildings,
    seenIn: [
      { name: "Housing Saga", href: "https://housingsaga.com/" },
      { name: "Vacation Saga", href: "https://www.vacationsaga.com/" },
    ],
  },
  {
    index: "02",
    name: "Commerce",
    line: "Bringing a product to market? We build the line and run the store with you.",
    icon: Storefront,
    seenIn: [{ name: "Silken Knot", href: "https://www.silkenknot.com/" }],
  },
  {
    index: "03",
    name: "Digital",
    line: "Want the business online and growing? We build the website, app, software, CRM, and AI with you.",
    icon: Cpu,
    seenIn: [{ name: "Tech Tunes", href: "https://techtunes.ai/" }],
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function Services() {
  return (
    <ScrollReveal
      as="section"
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-28 bg-[#F5F6F8] px-4 py-16 sm:px-6 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          Zairo International
        </p>
        <h2
          id="capabilities-heading"
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl"
        >
          What do you need from us?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#475569] text-pretty">
          A home, a product in market, or software for your business. You start
          with Zairo. Open a venture when you want to see the work live.
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#E6E8EC] bg-white lg:mt-14 lg:grid lg:grid-cols-12">
          <div className="flex flex-col bg-navy text-white lg:col-span-4">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={officePhoto}
                alt="A quiet place to sit and talk"
                fill
                className="zairo-drift object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent"
                aria-hidden
              />
            </div>
            <div className="flex flex-1 flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
                For you
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Zairo
              </p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/80">
                Tell us what you need. We stay with you from the first
                conversation to the finished work.
              </p>
            </div>
            <Link
              href="/contact"
              className={`mt-8 inline-flex w-fit cursor-pointer items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 ease-motion hover:opacity-90 ${focusRing}`}
            >
              Tell us what you need
            </Link>
            </div>
          </div>

          <ul className="lg:col-span-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li
                  key={service.name}
                  className="border-b border-[#E6E8EC] px-6 py-7 last:border-b-0 sm:px-8 sm:py-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="pt-1 text-[11px] font-semibold tracking-[0.16em] text-primary">
                      {service.index}
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-navy">
                        <Icon
                          weight="regular"
                          className="h-5 w-5 shrink-0 text-primary"
                          aria-hidden
                        />
                        {service.name}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#475569] text-pretty sm:text-base sm:leading-7">
                        {service.line}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-navy">
                        <span className="text-[#475569]">See it live on </span>
                        {service.seenIn.map((link, index) => (
                          <span key={link.name}>
                            {index > 0 ? (
                              <span className="text-[#475569]"> and </span>
                            ) : null}
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`cursor-pointer font-semibold underline decoration-primary/40 underline-offset-4 transition-colors duration-200 ease-motion hover:decoration-primary ${focusRing}`}
                            >
                              {link.name}
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          </span>
                        ))}
                        <span className="text-[#475569]">.</span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ScrollReveal>
  );
}
