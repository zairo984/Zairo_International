"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const slides = [
  {
    quote:
      "Vacation Saga shows how we operate a travel brand with its own product surface and audience.",
    name: "Vacation Saga",
    role: "Company venture",
  },
  {
    quote:
      "Housing Saga carries our property related work as a dedicated platform, separate from the parent brand site.",
    name: "Housing Saga",
    role: "Company venture",
  },
  {
    quote:
      "Tech Tunes represents our technology and marketing craft as a standalone brand experience.",
    name: "Tech Tunes",
    role: "Company venture",
  },
  {
    quote:
      "Silken Knot is our commerce brand, proof that Zairo can build and run consumer facing products.",
    name: "Silken Knot",
    role: "Company venture",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const reduced = useReducedMotion();

  const go = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <ScrollReveal
      as="section"
      className="bg-[#F6F7F8] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Quotes
          weight="fill"
          className="mx-auto h-12 w-12 text-primary"
          aria-hidden
        />
        <div className="relative mt-8 min-h-[220px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={slide.name}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-x-0"
            >
              <p className="text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
                “{slide.quote}”
              </p>
              <footer className="mt-8">
                <p className="text-base font-medium text-foreground">
                  {slide.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{slide.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition-[transform,background-color] duration-300 ease-motion hover:bg-navy hover:text-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Previous story"
          >
            <CaretLeft weight="bold" className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex gap-2">
            {slides.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-motion ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
                aria-label={`Show ${item.name}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition-[transform,background-color] duration-300 ease-motion hover:bg-navy hover:text-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Next story"
          >
            <CaretRight weight="bold" className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}
