"use client";

import { useEffect, useRef, useState } from "react";

const LINE_ONE = "A company that builds brands,";
const LINE_TWO = "then keeps raising the bar.";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function Word({
  word,
  active,
  reduced,
}: {
  word: string;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <span
      className={`inline-block transition-colors duration-500 ease-motion ${
        reduced || active ? "text-white" : "text-white/20"
      }`}
    >
      {word}
    </span>
  );
}

export default function TaglineReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = [...LINE_ONE.split(" "), ...LINE_TWO.split(" ")];
  const [activeCount, setActiveCount] = useState(reduced ? words.length : 0);

  useEffect(() => {
    if (reduced) {
      setActiveCount(words.length);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const wordNodes = section.querySelectorAll<HTMLElement>("[data-tagline-word]");
    const observers: IntersectionObserver[] = [];

    wordNodes.forEach((node, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCount((prev) => Math.max(prev, index + 1));
            observer.disconnect();
          }
        },
        {
          root: null,
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        },
      );
      observer.observe(node);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [reduced, words.length]);

  const lineOneWords = LINE_ONE.split(" ");
  const lineTwoWords = LINE_TWO.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050b12] px-4 py-28 sm:px-6 sm:py-32"
      aria-label="Tagline"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[860px]">
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {lineOneWords.map((word, i) => (
            <span key={`l1-${word}-${i}`}>
              <span data-tagline-word>
                <Word word={word} active={i < activeCount} reduced={reduced} />
              </span>
              {i < lineOneWords.length - 1 ? " " : null}
            </span>
          ))}
          <br />
          {lineTwoWords.map((word, i) => {
            const globalIndex = lineOneWords.length + i;
            return (
              <span key={`l2-${word}-${i}`}>
                <span data-tagline-word>
                  <Word
                    word={word}
                    active={globalIndex < activeCount}
                    reduced={reduced}
                  />
                </span>
                {i < lineTwoWords.length - 1 ? " " : null}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
