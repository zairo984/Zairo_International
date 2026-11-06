"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "What is Zairo International?",
    a: "A company that builds and operates brands across technology, marketing, commerce, and selective property ventures.",
  },
  {
    q: "Are Vacation Saga and the others your products?",
    a: "Yes. They are company ventures with their own websites and audiences. Zairo is the parent brand behind them.",
  },
  {
    q: "Do you only work on property?",
    a: "No. Property is one area among several. Technology, marketing, and commerce are equal parts of how we operate.",
  },
  {
    q: "Can other companies partner with you?",
    a: "Yes. We take on partnerships that fit our standards for brand craft, product quality, and long term ownership.",
  },
  {
    q: "Where are you based?",
    a: "Our office is in Kakadeo, Kanpur, India. We work across markets through our ventures and partner network.",
  },
  {
    q: "How do I start a conversation?",
    a: "Use the contact form or email info@zairointl.com with the outcome you want to explore.",
  },
  {
    q: "Where can I see open roles?",
    a: "Browse careers on our careers page and apply when a role matches your background.",
  },
  {
    q: "Do engagements lock you in forever?",
    a: "Scope is agreed per engagement. You can start with a defined project and expand when results earn the next step.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ScrollReveal
      as="section"
      id="faq"
      className="bg-[#F6F7F8] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Questions people ask
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Straight answers about the company and how we work.
        </p>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-opacity duration-300 ease-motion hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-base font-medium text-foreground">
                    {item.q}
                  </span>
                  <CaretDown
                    weight="bold"
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500 ease-motion ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-motion ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-sm leading-6 text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </ScrollReveal>
  );
}
