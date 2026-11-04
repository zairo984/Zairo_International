export const landingEase = [0.22, 1, 0.36, 1] as const;

const maskInitial = {
  opacity: 0,
  y: 18,
  filter: "blur(12px)",
  clipPath: "inset(0 0 100% 0)",
} as const;

const maskAnimate = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  clipPath: "inset(0 0 0% 0)",
} as const;

const softInitial = {
  opacity: 0,
  scale: 0.94,
  filter: "blur(8px)",
} as const;

const softAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
} as const;

/** Hero load / theme-swap text wipe (blur + clip). */
export const maskReveal = (delay: number, reduced: boolean) =>
  reduced
    ? { initial: false as const, animate: { opacity: 1, filter: "blur(0px)" } }
    : {
        initial: { ...maskInitial },
        animate: { ...maskAnimate },
        transition: { duration: 0.95, delay, ease: landingEase },
      };

/** Softer scale/blur entrance for secondary hero blocks. */
export const softIn = (delay: number, reduced: boolean) =>
  reduced
    ? { initial: false as const, animate: { opacity: 1, scale: 1 } }
    : {
        initial: { ...softInitial },
        animate: { ...softAnimate },
        transition: { duration: 0.8, delay, ease: landingEase },
      };

/**
 * Soft scale/blur on scroll. No clipPath — full clip on the watched node
 * can zero intersection and leave whileInView stuck forever.
 */
export const softInView = (delay = 0, reduced = false) =>
  reduced
    ? {
        initial: false as const,
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.01 },
      }
    : {
        initial: { ...softInitial },
        whileInView: { ...softAnimate },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.8, delay, ease: landingEase },
      };
