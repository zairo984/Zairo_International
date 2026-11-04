"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type BrandHoverZoomProps = {
  children: ReactNode;
  className?: string;
  /** Max scale for letters nearest the pointer */
  maxScale?: number;
  /** Falloff radius in px */
  radius?: number;
};

/**
 * Original brand text at rest. On hover, letters near the pointer enlarge
 * (proximity zoom + soft red glow) — no circular magnifying-glass UI.
 */
export default function BrandHoverZoom({
  children,
  className,
  maxScale = 1.9,
  radius = 120,
}: BrandHoverZoomProps) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const pointer = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const paint = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const letters = wrap.querySelectorAll<HTMLElement>("[data-brand-letter]");
    const { x: px, y: py } = pointer.current;

    letters.forEach((el) => {
      if (!activeRef.current) {
        el.style.transform = "scale(1)";
        el.style.filter = "none";
        el.style.zIndex = "0";
        return;
      }
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(px - cx, py - cy);
      const t = Math.max(0, 1 - dist / radius);
      const eased = t * t * (3 - 2 * t);
      const s = 1 + (maxScale - 1) * eased;
      el.style.transform = `scale(${s})`;
      el.style.zIndex = s > 1.08 ? "2" : "0";
      el.style.filter =
        eased > 0.12
          ? `drop-shadow(0 0 ${8 + eased * 22}px rgba(220,16,29,${0.2 + eased * 0.55}))`
          : "none";
    });

    if (activeRef.current) raf.current = requestAnimationFrame(paint);
  }, [maxScale, radius]);

  const onMove = (e: React.PointerEvent) => {
    pointer.current.x = e.clientX;
    pointer.current.y = e.clientY;
    if (!activeRef.current) {
      activeRef.current = true;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(paint);
    }
  };

  const onLeave = () => {
    activeRef.current = false;
    cancelAnimationFrame(raf.current);
    wrapRef.current
      ?.querySelectorAll<HTMLElement>("[data-brand-letter]")
      .forEach((el) => {
        el.style.transform = "scale(1)";
        el.style.filter = "none";
        el.style.zIndex = "0";
      });
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={wrapRef}
      className={className}
      onPointerMove={onMove}
      onPointerEnter={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}

/** Split a string into letter spans the hover zoom can scale */
export function BrandLetters({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {Array.from(text).map((char, i) => (
        <span
          key={`${char}-${i}`}
          data-brand-letter=""
          className="relative inline-block origin-center will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
