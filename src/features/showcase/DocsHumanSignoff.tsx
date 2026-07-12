'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import {
  SIGNOFF_STAGES,
  createTimelinePlayer,
  signoffFrame,
} from '@/features/showcase/docs-demo-models.mjs';
import { startTimelineWhenVisible } from './docs-demo-visibility.mjs';

type SignoffStage = 'held' | 'corrected' | 'drafted' | 'signed';
type TimelinePlayer = { play: () => void; replay: () => void; cancel: () => void };

const STEP_LABELS = ['held', 'accountant', 'draft', 'signed'] as const;

export function DocsHumanSignoff() {
  const t = useTranslations('product.signoff');
  const rowT = useTranslations('product.row');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<SignoffStage>('held');
  const playerRef = useRef<TimelinePlayer | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeline = createTimelinePlayer({
      stages: SIGNOFF_STAGES,
      onStage: (next: SignoffStage) => setStage(next),
      reducedMotion: Boolean(reduced),
    });
    playerRef.current = timeline;
    const stopVisibility = startTimelineWhenVisible({
      node: sectionRef.current,
      reducedMotion: Boolean(reduced),
      play: timeline.play,
    });

    return () => {
      stopVisibility();
      timeline.cancel();
      if (playerRef.current === timeline) playerRef.current = null;
    };
  }, [reduced]);

  const replay = useCallback(() => playerRef.current?.replay(), []);
  const frame = useMemo(() => signoffFrame(stage), [stage]);
  const stageIndex = SIGNOFF_STAGES.indexOf(stage);
  const hasCorrection = frame.correctedDate !== null;
  const hasDraft = frame.record === 'draft' || frame.record === 'oris-ready';
  const isSigned = frame.approval === 'signed';

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
          <p className="mt-7 text-pretty text-[15px] font-semibold leading-relaxed text-neutral-900">
            {t('outcome')}
          </p>
          <button
            type="button"
            onClick={replay}
            className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-[#fafafa] px-5 text-[14px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 md:hover:bg-[#f0f0f0]"
          >
            {t('replay')}
          </button>
        </div>

        <div
          ref={sectionRef}
          className="min-w-0 rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-6"
        >
          <ol className="grid gap-2 sm:grid-cols-4" aria-label={t('eyebrow')}>
            {STEP_LABELS.map((label, index) => {
              const active = index === stageIndex;
              const complete = index < stageIndex;

              return (
                <li
                  key={label}
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'min-h-[68px] rounded-xl bg-white px-3 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]',
                    active && 'shadow-[0_0_0_1px_var(--brand)]',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold tabular-nums',
                      complete || active
                        ? 'bg-[var(--brand)] text-white'
                        : 'bg-neutral-900/8 text-neutral-900/45',
                    )}
                    aria-hidden="true"
                  >
                    {complete ? '✓' : index + 1}
                  </span>
                  <span className="mt-2 block text-pretty text-[11px] font-semibold leading-snug text-neutral-900">
                    {t(label)}
                  </span>
                </li>
              );
            })}
          </ol>

          <motion.div
            key={stage}
            initial={reduced ? false : { opacity: 0, y: 8, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 grid min-w-0 gap-4 md:grid-cols-[minmax(190px,0.75fr)_1.25fr]"
            aria-live="polite"
          >
            <div className="rounded-xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
              <span className="text-[11px] uppercase tracking-wide text-neutral-900/35">
                {t('extracted')}
              </span>
              <span
                className={cn(
                  'mt-3 block text-pretty font-display text-xl font-extrabold tabular-nums leading-tight',
                  hasCorrection ? 'text-neutral-900' : 'text-[#92400e]',
                )}
              >
                {hasCorrection ? '2026-07-06' : t('ambiguous')}
              </span>
              <p
                className={cn(
                  'mt-4 rounded-lg px-3 py-2 text-pretty text-[12px] font-semibold leading-snug',
                  hasCorrection
                    ? 'bg-[#10b981]/10 text-[#065f46]'
                    : 'bg-[#f59e0b]/14 text-[#92400e]',
                )}
              >
                {hasCorrection ? t('corrected') : t('held')}
              </p>
            </div>

            <div
              className={cn(
                'min-w-0 rounded-xl bg-white p-4 transition-[box-shadow] duration-200',
                isSigned
                  ? 'shadow-[0_0_0_1px_#10b981]'
                  : 'shadow-[0_0_0_1px_rgba(0,0,0,0.08)]',
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-wide text-neutral-900/35">
                  {rowT('ledger')}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide',
                    isSigned
                      ? 'bg-[#10b981]/14 text-[#065f46]'
                      : hasDraft
                        ? 'bg-[var(--brand)]/10 text-[var(--brand-ink)]'
                        : 'bg-[#f59e0b]/14 text-[#92400e]',
                  )}
                >
                  {isSigned ? t('signed') : hasDraft ? t('draft') : hasCorrection ? t('corrected') : t('held')}
                </span>
              </div>

              <div className="mt-4 overflow-x-auto rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.07)]">
                <table className="w-full min-w-[430px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#ececec]">
                      {['colDate', 'colDoc', 'colCounter', 'colTotal'].map((key) => (
                        <th
                          key={key}
                          className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-900/35"
                        >
                          {rowT(key)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={cn(!hasDraft && 'opacity-35')}>
                      <td className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold tabular-nums text-neutral-900">
                        {hasDraft ? '06.07.26' : '—'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[12px] tabular-nums text-neutral-900">
                        {hasDraft ? '00042117-8891' : '—'}
                      </td>
                      <td className="max-w-[150px] truncate px-3 py-3 text-[12px] text-neutral-900">
                        {hasDraft ? 'Goodwill, Saburtalo' : '—'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[13px] font-extrabold tabular-nums text-neutral-900">
                        {hasDraft ? '175.00' : '—'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {isSigned && frame.resultKey && (
                <motion.p
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduced ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-4 flex min-h-[44px] items-center justify-center rounded-xl bg-[#10b981]/12 px-4 text-center text-[13px] font-extrabold text-[#065f46] shadow-[0_0_0_1px_#10b981]"
                >
                  <span aria-hidden="true" className="mr-2">
                    ✓
                  </span>
                  {t(frame.resultKey)}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
