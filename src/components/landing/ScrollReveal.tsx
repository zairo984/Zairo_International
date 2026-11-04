"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { landingEase } from "./landingMotion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section" | "article";
  "aria-labelledby"?: string;
  delay?: number;
};

const hidden = {
  opacity: 0,
  y: 18,
  filter: "blur(12px)",
  clipPath: "inset(0 0 100% 0)",
};

const shown = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  clipPath: "inset(0 0 0% 0)",
};

export default function ScrollReveal({
  children,
  className = "",
  id,
  as: Tag = "div",
  "aria-labelledby": ariaLabelledBy,
  delay = 0,
}: ScrollRevealProps) {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      ref={ref as never}
      className={className}
    >
      <motion.div
        initial={reduced ? false : hidden}
        animate={reduced || visible ? shown : hidden}
        transition={{ duration: 0.95, delay, ease: landingEase }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
