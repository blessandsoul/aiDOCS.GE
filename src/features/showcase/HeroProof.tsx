'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

/* =========================================================================
   HeroProof, aiDOCS: a crumpled receipt that has already become one ledger line.

   The whole product, in the smallest possible picture. Everyone else in this category shows the
   extraction, boxes drawn around fields, JSON coming out. Nobody is buying JSON. A bookkeeper is
   buying ONE POSTED ROW in the system she already uses, and the last step, the one from a pile of
   extracted fields to a single line in the journal, is the entire business.

   So the frame is: ugly paper on the left, one clean row on the right, and a green check landing
   on it. If a stranger looks at this for five seconds he knows what we do, and he has read nothing.
   ========================================================================= */

const ROW = {
  date: '02.07.26',
  doc: '00042117',
  counter: 'Goodwill, Saburtalo',
  net: '148.31',
  vat: '26.69',
  total: '175.00',
};

/* An equal-thirds loop rests on a transition two times out of three, so a visitor who glances
   once lands on blurred half-lifted fields and reads the panel as broken. The row IS the product,
   so the row is what the panel rests on: the story plays for two seconds and the payoff is held
   for five. Anyone who looks at any random moment sees the finished ledger line. */
const SCHEDULE = [
  { beat: 0, hold: 1400 }, // the fields, as they come off the paper
  { beat: 1, hold: 700 }, //  they collapse
  { beat: 2, hold: 5100 }, // THE ROW, held
] as const;

export function HeroProof() {
  const t = useTranslations('product.proof');
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduced) {
      setBeat(2);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const step = (i: number) => {
      const s = SCHEDULE[i % SCHEDULE.length] ?? SCHEDULE[0];
      setBeat(s.beat);
      timer = setTimeout(() => step(i + 1), s.hold);
    };
    step(0);
    return () => clearTimeout(timer);
  }, [reduced]);

  const posted = beat >= 2;

  return (
    <div className="rounded-3xl bg-white/70 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_28px_60px_-40px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-6">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[86px_minmax(0,1fr)] md:grid-cols-[104px_minmax(0,1fr)] md:gap-5">
        {/* the paper. deliberately ugly: this is what actually arrives. */}
        <div
          className="relative w-[86px] justify-self-center aspect-[3/4] overflow-hidden rounded-sm bg-[#f3f1ea] p-2 shadow-md sm:w-auto md:p-2.5"
          style={{ transform: 'rotate(-2.2deg)' }}
        >
          <span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(108deg,transparent_44%,rgba(0,0,0,0.08)_49%,transparent_54%)]"
            aria-hidden="true"
          />
          <span className="block h-1.5 w-2/3 rounded-sm bg-neutral-900/65" />
          <span className="mt-1 block h-1 w-1/3 rounded-sm bg-neutral-900/25" />
          <span className="mt-2.5 block h-px w-full bg-neutral-900/15" />
          {[62, 48, 71, 55, 44, 66, 51].map((w, i) => (
            <span
              key={i}
              className="mt-1.5 block h-1 rounded-sm bg-neutral-900/16"
              style={{ width: `${w}%` }}
            />
          ))}
          <span className="mt-2.5 block h-px w-full bg-neutral-900/15" />
          <span className="mt-1.5 block h-1.5 w-2/5 rounded-sm bg-neutral-900/55" />
        </div>

        {/* the fields, lifting off and then collapsing */}
        <div className="relative min-h-[132px] min-w-0 w-full">
          {!posted && (
            <ul className="flex flex-col gap-1">
              {[
                ['Merchant', 'Goodwill'],
                ['Fiscal', '00042117'],
                ['Net', '148.31'],
                ['VAT 18%', '26.69'],
                ['Total', '175.00'],
              ].map(([k, v], i) => (
                <motion.li
                  key={k}
                  initial={reduced ? false : { opacity: 0, x: -8, filter: 'blur(3px)' }}
                  animate={
                    beat === 1
                      ? { opacity: 0, y: 18, scale: 0.94, filter: 'blur(3px)' }
                      : { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
                  }
                  transition={{
                    duration: 0.3,
                    delay: reduced ? 0 : beat === 1 ? i * 0.035 : i * 0.06,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex items-baseline justify-between gap-3 rounded-md bg-white px-2.5 py-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                >
                  <span className="text-[10.5px] text-neutral-900/40">{k}</span>
                  <span className="font-mono text-[11.5px] font-semibold tabular-nums text-neutral-900">
                    {v}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* THE ROW. the product. */}
          {posted && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* The row lands INSIDE a system, not on a blank page. The dark chrome is what makes
                  this read as an accounting package rather than a floating table on white. */}
              <div className="min-w-0 overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_12px_30px_-18px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-2 bg-[#141418] px-2.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" aria-hidden="true" />
                  <span className="text-[9.5px] font-semibold uppercase tracking-wide text-white/60">
                    {t('ledger')}
                  </span>
                </div>
                <table className="w-full table-fixed border-collapse bg-white text-left">
                  <thead>
                    <tr className="border-b border-[#ececec]">
                      {[t('colDate'), t('colCounter'), t('colVat'), t('colTotal')].map((c) => (
                        <th
                          key={c}
                          className="whitespace-nowrap px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-neutral-900/35"
                        >
                          {c}
                        </th>
                      ))}
                      <th className="w-7" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: 'color-mix(in srgb, #10b981 9%, white)' }}>
                      <td className="whitespace-nowrap px-2.5 py-2.5 font-mono text-[11px] tabular-nums text-neutral-900">
                        {ROW.date}
                      </td>
                      <td className="max-w-[110px] truncate px-2.5 py-2.5 text-[11px] text-neutral-900">
                        {ROW.counter}
                      </td>
                      <td className="whitespace-nowrap px-2.5 py-2.5 font-mono text-[11px] tabular-nums text-neutral-900/55">
                        {ROW.vat}
                      </td>
                      <td className="whitespace-nowrap px-2.5 py-2.5 font-mono text-[12px] font-extrabold tabular-nums text-neutral-900">
                        {ROW.total}
                      </td>
                      <td className="px-1.5">
                        <motion.span
                          initial={reduced ? false : { scale: 0.25, opacity: 0, filter: 'blur(4px)' }}
                          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                          transition={{ type: 'spring', duration: 0.3, bounce: 0, delay: 0.16 }}
                          className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#10b981] text-[9px] font-bold text-white"
                          style={{ height: 18, width: 18 }}
                          aria-hidden="true"
                        >
                          ok
                        </motion.span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2.5 text-[11px] leading-snug text-neutral-900/45">{t('note')}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
