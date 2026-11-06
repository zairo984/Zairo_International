"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "@phosphor-icons/react";
import heroDark from "@/images/landing-hero-brand.jpg";
import heroLight from "@/images/landing-hero-brand-light.jpg";
import vacationMark from "@/images/ventures/vacation-saga.png";
import housingLogo from "@/images/ventures/housing-saga.webp";
import techTunesMark from "@/images/ventures/tech-tunes.jpg";
import silkenMark from "@/images/ventures/silken-knot.jpg";
import { useHeroTheme } from "@/components/hero-theme-provider";
import { landingEase as ease, maskReveal, softIn } from "./landingMotion";

type VentureLogo = {
  name: string;
  src: StaticImageData;
  style: "full" | "mark";
};

const ventures: VentureLogo[] = [
  { name: "Vacation Saga", src: vacationMark, style: "mark" },
  { name: "Housing Saga", src: housingLogo, style: "full" },
  { name: "Tech Tunes", src: techTunesMark, style: "mark" },
  { name: "Silken Knot", src: silkenMark, style: "mark" },
];

const ventureLoop = [...ventures, ...ventures];

export default function LandingHero() {
  const reduced = useReducedMotion();
  const { theme } = useHeroTheme();
  const [animKey, setAnimKey] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const introStarted = useRef(false);
  const lastTheme = useRef<string | undefined>(undefined);
  const isLight = theme === "light";

  useEffect(() => {
    const startIntro = () => {
      if (introStarted.current) return;
      introStarted.current = true;
      setIntroReady(true);
      setAnimKey((k) => k + 1);
    };

    window.addEventListener("zairo:loader-done", startIntro);
    const fallback = window.setTimeout(startIntro, 2500);
    return () => {
      window.removeEventListener("zairo:loader-done", startIntro);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (lastTheme.current === undefined) {
      lastTheme.current = theme;
      return;
    }
    if (lastTheme.current === theme) return;
    lastTheme.current = theme;
    if (introReady) setAnimKey((k) => k + 1);
  }, [theme, introReady]);

  const soft = isLight ? "text-[#0c1a2a]/60" : "text-white/65";
  const ink = isLight ? "text-[#0c1a2a]" : "text-white";

  return (
    <section
      className={`relative isolate h-[100svh] overflow-hidden transition-colors duration-500 ease-motion ${
        isLight ? "bg-[#EEF1F4] text-[#0c1a2a]" : "bg-[#050b12] text-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          key={
            introReady
              ? `${isLight ? "light" : "dark"}-${animKey}`
              : `hold-${isLight ? "light" : "dark"}`
          }
          className={
            reduced || !introReady
              ? "absolute inset-0"
              : "hero-aperture absolute inset-0"
          }
        >
          <Image
            src={isLight ? heroLight : heroDark}
            alt=""
            fill
            priority
            className={`object-cover object-center ${
              reduced || !introReady ? "" : "hero-drift"
            } ${isLight ? "opacity-70" : "opacity-80"}`}
            sizes="100vw"
            aria-hidden
          />
        </div>
      </div>

      {isLight ? (
        <>
          <div className="absolute inset-0 bg-white/30" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/25 to-[#EEF1F4]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,16,29,0.16),transparent_48%)]"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#050b12]/60" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#050b12]/35 via-[#050b12]/55 to-[#050b12]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,20,40,0.32),transparent_50%)]"
            aria-hidden
          />
        </>
      )}

      {!reduced && introReady ? (
        <>
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 hero-grid-pulse opacity-30 ${
              isLight
                ? "bg-[linear-gradient(rgba(12,26,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(12,26,42,0.08)_1px,transparent_1px)]"
                : "bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)]"
            }`}
            style={{ backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div
              className={`hero-beam absolute inset-y-[8%] left-0 w-[18%] bg-gradient-to-r ${
                isLight
                  ? "from-transparent via-primary/30 to-transparent"
                  : "from-transparent via-white/30 to-transparent"
              }`}
            />
          </div>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path
              d="M80 620 C 220 420, 340 510, 480 360 S 760 220, 980 300"
              fill="none"
              stroke={isLight ? "rgba(220,16,29,0.35)" : "rgba(225,20,40,0.45)"}
              strokeWidth="1.25"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease, delay: 0.35 }}
            />
            <motion.path
              d="M140 180 C 320 260, 420 120, 610 210 S 880 340, 1080 240"
              fill="none"
              stroke={isLight ? "rgba(12,26,42,0.18)" : "rgba(255,255,255,0.18)"}
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0.55] }}
              transition={{ duration: 2.6, ease, delay: 0.55 }}
            />
            {[
              [480, 360],
              [610, 210],
              [760, 220],
              [980, 300],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={3.5}
                fill="hsl(var(--primary))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.55, 1], opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 2.8,
                  delay: 1 + i * 0.25,
                  repeat: Infinity,
                  ease,
                }}
              />
            ))}
          </svg>
        </>
      ) : null}

      {introReady ? (
        <div
          key={animKey}
          className="relative z-10 mx-auto flex h-[100svh] max-w-7xl flex-col px-6 pb-14 pt-24 sm:pb-16 sm:pt-28"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center text-center">
            <motion.h1
              className="mx-auto text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
              {...maskReveal(0.12, !!reduced)}
            >
              <span
                className={`whitespace-nowrap ${ink} ${
                  reduced
                    ? ""
                    : `hero-shimmer-text ${isLight ? "hero-shimmer-text-light" : ""}`
                }`}
              >
                ZAIRO
              </span>
              <br />
              <span className="whitespace-nowrap text-primary">
                INTERNATIONAL
              </span>
            </motion.h1>

            <motion.p
              className={`mx-auto mt-4 max-w-2xl text-lg font-medium tracking-tight text-balance sm:mt-5 sm:text-xl md:text-2xl lg:text-3xl ${
                isLight ? "text-[#0c1a2a]/85" : "text-white/92"
              }`}
              {...maskReveal(0.24, !!reduced)}
            >
              Brands that ship.
              <br className="hidden sm:block" />
              Platforms that last.
            </motion.p>

            <motion.p
              className={`mx-auto mt-3 max-w-xl text-sm leading-6 text-pretty sm:mt-4 sm:text-base sm:leading-7 md:max-w-2xl ${soft}`}
              {...softIn(0.36, !!reduced)}
            >
              We build and operate across technology, marketing, commerce, and
              property. Each product lives on its own platform. Zairo is the
              company behind them.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4"
              {...softIn(0.48, !!reduced)}
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(220,16,29,0.85)] transition-[transform,opacity] duration-300 ease-motion hover:opacity-95 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-7 sm:py-3.5 sm:text-base"
              >
                {!reduced ? (
                  <span
                    aria-hidden
                    className="hero-beam pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  />
                ) : null}
                Start a conversation
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform duration-300 ease-motion group-hover:translate-x-0.5 sm:h-5 sm:w-5"
                  aria-hidden
                />
              </Link>
              <Link
                href="#ventures"
                className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ring-1 backdrop-blur-md transition-[transform,background-color,color] duration-300 ease-motion active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-7 sm:py-3.5 sm:text-base ${
                  isLight
                    ? "bg-white/55 text-[#0c1a2a] ring-[#0c1a2a]/12 hover:bg-white/80"
                    : "bg-white/10 text-white/90 ring-white/15 hover:bg-white/15 hover:text-white"
                }`}
              >
                <Play weight="fill" className="h-4 w-4" aria-hidden />
                Explore our ventures
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-5xl shrink-0 pb-1"
            {...softIn(0.6, !!reduced)}
          >
            <div className="flex items-center justify-center gap-4 pb-2">
              <div
                className={`hidden h-0.5 w-28 md:block lg:w-40 ${
                  isLight
                    ? "bg-gradient-to-l from-[#0c1a2a]/35 to-transparent opacity-40"
                    : "bg-gradient-to-l from-white/40 to-transparent opacity-30"
                }`}
                aria-hidden
              />
              <p
                className={`caption-2 max-w-[28rem] px-4 text-center sm:px-2 ${
                  isLight ? "text-[#0c1a2a]/55" : "text-white/55"
                }`}
              >
                Brands we build and operate across markets
              </p>
              <div
                className={`hidden h-0.5 w-28 md:block lg:w-40 ${
                  isLight
                    ? "bg-gradient-to-r from-[#0c1a2a]/35 to-transparent opacity-40"
                    : "bg-gradient-to-r from-white/40 to-transparent opacity-30"
                }`}
                aria-hidden
              />
            </div>

            <div
              className="group pause-on-hover flex overflow-hidden p-0 [--duration:24s] [--gap:1rem] gap-[var(--gap)]"
              aria-label="Our ventures"
            >
              {(reduced ? [0] : [0, 1, 2, 3]).map((track) => (
                <div
                  key={track}
                  className={`flex shrink-0 flex-row items-center justify-around gap-[var(--gap)] ${
                    reduced ? "" : "animate-marquee"
                  }`}
                >
                  {ventureLoop.map((venture, i) => (
                    <div
                      key={`${track}-${venture.name}-${i}`}
                      className="mr-6 flex h-8 shrink-0 items-center lg:mr-20"
                    >
                      {venture.style === "full" ? (
                        <Image
                          src={venture.src}
                          alt={venture.name}
                          className="h-8 w-auto max-w-[9rem] object-contain object-left"
                          height={32}
                          sizes="144px"
                        />
                      ) : (
                        <div
                          className={`flex items-center gap-2.5 ${
                            isLight ? "text-[#0c1a2a]" : "text-white"
                          }`}
                        >
                          <Image
                            src={venture.src}
                            alt=""
                            className="h-8 w-8 shrink-0 rounded-full object-cover"
                            width={32}
                            height={32}
                            aria-hidden
                          />
                          <span className="title-3 whitespace-nowrap tracking-tight">
                            {venture.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      ) : (
        <div className="relative z-10 h-[100svh]" aria-hidden />
      )}
    </section>
  );
}
