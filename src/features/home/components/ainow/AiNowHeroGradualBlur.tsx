"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

/**
 * AiNowHeroGradualBlur
 * Inspired by ReactBits GradualBlur (https://reactbits.dev/animations/gradual-blur)
 * Creates an infinite, looping frosted glass aurora background in the aiDOCS palette:
 * - Indigo (#5b5bf7)
 * - Violet (#8b7cff)
 * - Pale lavender (#e1deff)
 * Paired with stacked multi-layer progressive backdrop filters (GradualBlur).
 */
export function AiNowHeroGradualBlur() {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDark = mounted ? (resolvedTheme || theme) === "dark" : true;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HIGH-PERFORMANCE aiDOCS COLOR MESH (GPU-Accelerated Radial Orbs)
          Zero blur filters, zero backdrop-filter passes.
          Rendered via native GPU hardware color interpolation.
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 size-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 92% 82% at 50% 45%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 82% at 50% 45%, black 65%, transparent 100%)",
        }}
      >
        {/* Orb 1: pale lavender - drifting across top-left */}
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[460px] sm:w-[580px] h-[380px] sm:h-[460px] rounded-full transition-opacity duration-1000 animate-[iai-orb-drift-1_32s_ease-in-out_infinite]"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, rgba(225, 222, 255, 0.24) 0%, rgba(225, 222, 255, 0.08) 42%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(225, 222, 255, 0.15) 0%, rgba(225, 222, 255, 0.04) 42%, transparent 70%)",
            willChange: "transform",
          }}
        />

        {/* Orb 2: aiDOCS indigo - orbiting center-right */}
        <div
          className="absolute top-1/3 right-1/4 translate-x-1/4 -translate-y-1/4 w-[440px] sm:w-[560px] h-[360px] sm:h-[460px] rounded-full transition-opacity duration-1000 animate-[iai-orb-drift-2_38s_ease-in-out_infinite]"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, rgba(91, 91, 247, 0.24) 0%, rgba(91, 91, 247, 0.08) 42%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(91, 91, 247, 0.14) 0%, rgba(91, 91, 247, 0.04) 42%, transparent 70%)",
            willChange: "transform",
          }}
        />

        {/* Orb 3: aiDOCS violet - lower anchor */}
        <div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/4 w-[500px] sm:w-[640px] h-[340px] sm:h-[420px] rounded-full transition-opacity duration-1000 animate-[iai-orb-drift-3_44s_ease-in-out_infinite]"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, rgba(139, 124, 255, 0.22) 0%, rgba(139, 124, 255, 0.06) 42%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(139, 124, 255, 0.13) 0%, rgba(139, 124, 255, 0.03) 42%, transparent 70%)",
            willChange: "transform",
          }}
        />

        {/* Orb 4: Central aiDOCS spectrum fusion */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[300px] rounded-full transition-opacity duration-1000 animate-[iai-orb-pulse_24s_ease-in-out_infinite]"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, rgba(139, 124, 255, 0.18) 0%, rgba(91, 91, 247, 0.12) 35%, rgba(225, 222, 255, 0.05) 55%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(139, 124, 255, 0.10) 0%, rgba(91, 91, 247, 0.07) 35%, rgba(225, 222, 255, 0.03) 55%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
}
