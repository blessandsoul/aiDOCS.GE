'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   DocsScans: we show the failure on purpose.

   Every vendor in this category demos a clean scan. Then the customer's real pile arrives:
   a phone photo taken at an angle in a dark stockroom, a thermal receipt that has been in a
   coat pocket for three weeks, and a handwritten note from a supplier who does not own a
   printer. The demo told him nothing about any of that.

   So the widget shows the same document four ways, including the one that beats us. A B2B
   buyer who has been burned by a vendor before does not convert on a 99% claim. He converts
   on the moment you admit what you cannot do, because it is the first thing anyone has said
   to him all week that could be checked.
   ========================================================================= */

type State = 'ok' | 'held' | 'fail';
const SCANS: { id: string; state: State }[] = [
  { id: 's1', state: 'ok' },
  { id: 's2', state: 'held' },
  { id: 's3', state: 'held' },
  { id: 's4', state: 'fail' },
];

const TONE: Record<State, { chip: string; card: string }> = {
  ok: { chip: 'bg-[#10b981]/14 text-[#065f46]', card: 'shadow-[0_0_0_1px_rgba(0,0,0,0.08)]' },
  held: { chip: 'bg-[#f59e0b]/16 text-[#92400e]', card: 'shadow-[0_0_0_1px_#f59e0b]' },
  fail: { chip: 'bg-[#ef4444]/14 text-[#7f1d1d]', card: 'shadow-[0_0_0_1px_#ef4444]' },
};

export function DocsScans() {
  const t = useTranslations('product.scans');
  const reduced = useReducedMotion();
  const [pick, setPick] = useState(0);
  const s = SCANS[pick];

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-14">
        <div>
          <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
            {t('subtitle')}
          </p>

          <ul className="mt-8 flex flex-col gap-2">
            {SCANS.map((sc, i) => {
              const on = i === pick;
              return (
                <li key={sc.id}>
                  <button
                    type="button"
                    onClick={() => setPick(i)}
                    aria-pressed={on}
                    className={cn(
                      'flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl px-4 text-left',
                      'transition-[transform,background-color,box-shadow] duration-150 ease-out',
                      'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                      on
                        ? 'bg-white shadow-[0_0_0_1px_var(--brand)]'
                        : 'bg-[#fafafa] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:hover:bg-[#f0f0f0]',
                    )}
                  >
                    <span className="text-[14px] font-semibold text-neutral-900">{t(sc.id)}</span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
                        TONE[sc.state].chip,
                      )}
                    >
                      {t(sc.state)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-7 text-pretty text-[12px] leading-relaxed text-[#737373]">{t('note')}</p>
        </div>

        {/* the render */}
        <motion.div
          key={s.id}
          initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={cn('rounded-2xl bg-white p-6 md:p-8', TONE[s.state].card)}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-xl font-extrabold text-neutral-900">{t(s.id)}</span>
            <span
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase',
                TONE[s.state].chip,
              )}
            >
              {t(s.state)}
            </span>
          </div>

          {/* the document, rendered in the state it actually arrives in */}
          <div className="mt-6 flex justify-center">
            <div
              className="relative aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-sm bg-[#f5f3ec] p-4 shadow-md"
              style={{
                transform:
                  s.id === 's2'
                    ? 'rotate(-6deg) skewY(2deg)'
                    : s.id === 's3'
                      ? 'rotate(1.5deg)'
                      : 'none',
                filter: s.id === 's3' ? 'contrast(0.72) brightness(1.06)' : 'none',
              }}
            >
              {s.id === 's2' && (
                <span
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.75)_46%,transparent_60%)]"
                  aria-hidden="true"
                />
              )}
              {s.id === 's3' && (
                <span
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(100deg,transparent_0_9px,rgba(0,0,0,0.045)_9px_11px)]"
                  aria-hidden="true"
                />
              )}
              <span className="block h-2 w-2/3 rounded-sm bg-neutral-900/70" />
              <span className="mt-4 block h-px w-full bg-neutral-900/15" />
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    'mt-2.5 block h-1.5 rounded-sm',
                    s.id === 's4' ? 'bg-neutral-900/22' : 'bg-neutral-900/15',
                  )}
                  style={{
                    width: `${42 + ((i * 41) % 52)}%`,
                    transform: s.id === 's4' ? `rotate(${(i % 3) - 1}deg)` : 'none',
                    borderRadius: s.id === 's4' ? 9999 : undefined,
                  }}
                />
              ))}
              <span className="mt-5 block h-2.5 w-2/5 rounded-sm bg-neutral-900/60" />
            </div>
          </div>

          <p
            className={cn(
              'mt-7 text-pretty text-[15px] leading-relaxed',
              s.state === 'fail' ? 'font-semibold text-neutral-900' : 'text-[#404040]',
            )}
          >
            {t(`${s.id}r`)}
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
