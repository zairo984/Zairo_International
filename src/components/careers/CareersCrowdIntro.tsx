"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

const INTRO_MS = 2600;
const EXIT_EASE = [0.785, 0.135, 0.15, 0.86] as const;

/**
 * Full-screen Skiper39 crowd intro when landing on Careers from elsewhere.
 * Shows ~2.5s, then slides away to reveal the page.
 */
export default function CareersCrowdIntro({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => !reduced);
  const [ready, setReady] = useState(() => Boolean(reduced));

  useEffect(() => {
    if (reduced) {
      setShow(false);
      setReady(true);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const revealTimer = window.setTimeout(() => setReady(true), INTRO_MS - 400);
    const hideTimer = window.setTimeout(() => setShow(false), INTRO_MS);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduced]);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <>
      <AnimatePresence>
        {show ? (
          <motion.div
            key="careers-crowd-intro"
            className="fixed inset-0 z-[100] bg-white"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: EXIT_EASE }}
            aria-busy="true"
            aria-label="Loading careers"
          >
            <div className="pointer-events-none absolute left-1/2 top-[16%] z-10 grid w-full max-w-lg -translate-x-1/2 justify-items-center gap-3 px-6 text-center">
              <span className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-[#888] after:absolute after:left-1/2 after:top-full after:mt-3 after:h-14 after:w-px after:bg-gradient-to-b after:from-[#ccc] after:to-transparent after:content-['']">
                Careers
              </span>
              <p className="mt-16 text-2xl font-semibold tracking-tight text-[#171717] text-balance sm:text-3xl">
                Join the people building Zairo
              </p>
            </div>

            <div className="absolute inset-0" aria-hidden="true">
              <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {ready ? children : (
        <div className="min-h-screen bg-white" aria-hidden="true" />
      )}
    </>
  );
}
