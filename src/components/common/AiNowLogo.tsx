"use client";

import React from "react";
import Link from "next/link";

interface AiNowThreeStripesProps {
  className?: string;
}

/**
 * Product-family three-stripe mark, recolored for the active aiDOCS surface:
 * Three skewed rounded rectangles (-15 deg):
 * 1. Pale lavender (#e1deff)
 * 2. Violet (#8b7cff)
 * 3. Indigo (#5b5bf7)
 */
export function AiNowThreeStripes({ className = "size-6" }: AiNowThreeStripesProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(120 96) skewX(-15)">
        <rect x="0" y="0" width="368" height="72" rx="18" fill="#e1deff" />
        <rect x="0" y="120" width="368" height="72" rx="18" fill="#8b7cff" />
        <rect x="0" y="240" width="368" height="72" rx="18" fill="#5b5bf7" />
      </g>
    </svg>
  );
}

interface AiNowLogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  wordmarkClassName?: string;
}

const AI_WORDMARK_STYLE: React.CSSProperties = {
  backgroundImage: "linear-gradient(118deg, #6f62c9 0%, #8b7cff 48%, #5b5bf7 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  textShadow: "0 0.09em 0.26em rgba(91, 91, 247, 0.16)",
};

const NOW_WORDMARK_STYLE: React.CSSProperties = {
  backgroundImage: "linear-gradient(108deg, #5b5bf7 0%, #8b7cff 52%, #6f62c9 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  textShadow: "0 0.09em 0.26em rgba(91, 91, 247, 0.16)",
};

export function AiNowLogo({
  href = "/",
  size = "md",
  className = "",
  wordmarkClassName = "",
}: AiNowLogoProps) {
  const iconSizes = {
    sm: "size-5",
    md: "size-6",
    lg: "size-8",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const badgeSizes = {
    sm: "size-7 p-1 rounded-md",
    md: "size-8 p-1.5 rounded-lg",
    lg: "size-11 p-2 rounded-xl",
  };

  const content = (
    <div dir="ltr" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* 3-Stripe Icon Badge */}
      <div
        className={`flex items-center justify-center bg-white/90 dark:bg-[#111318]/90 border border-black/[0.08] dark:border-white/12 shadow-xs group-hover:border-[#8b7cff]/40 group-hover:shadow-[0_0_12px_rgba(91,91,247,0.18)] transition-all duration-200 ${badgeSizes[size]}`}
      >
        <AiNowThreeStripes className={`${iconSizes[size]} transition-transform duration-200 group-hover:scale-105`} />
      </div>

      {/* Typography: aiDOCS */}
      <div className={`ainow-logo-wordmark flex items-center font-black tracking-tight leading-none ${textSizes[size]} ${wordmarkClassName}`}>
        <span className={wordmarkClassName ? "font-semibold opacity-90 text-inherit" : "font-semibold"} style={wordmarkClassName ? undefined : AI_WORDMARK_STYLE}>ai</span>
        <span className={wordmarkClassName ? "font-black text-inherit" : "font-black"} style={wordmarkClassName ? undefined : NOW_WORDMARK_STYLE}>DOCS</span>
        {!wordmarkClassName && <span className="ainow-logo-light-pass" aria-hidden="true" />}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="aiDOCS" className="inline-flex">
      {content}
    </Link>
  );
}
