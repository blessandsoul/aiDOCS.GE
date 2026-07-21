'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';

import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

import {
  SIGNOFF_STAGES,
  createTimelinePlayer,
  signoffFrame,
} from '@/features/showcase/docs-demo-models.mjs';
import { DocsDemoStory } from './DocsDemoStory';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type SignoffStage = 'held' | 'corrected' | 'drafted' | 'signed';
type TimelinePlayer = { play: () => void; replay: () => void; cancel: () => void };
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const STEPS = [
  { key: 'held', icon: 'solar:shield-check-bold-duotone' },
  { key: 'accountant', icon: 'solar:user-check-rounded-bold-duotone' },
  { key: 'draft', icon: 'solar:pen-new-square-bold-duotone' },
  { key: 'signed', icon: 'solar:check-circle-bold-duotone' },
] as const;

export function DocsHumanSignoff() {
  const t = useTranslations('product.signoff');
  const rowT = useTranslations('product.row');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<SignoffStage>('held');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const timeline: TimelinePlayer = createTimelinePlayer({
      stages: SIGNOFF_STAGES,
      onStage: (next: SignoffStage) => setStage(next),
    });
    const loop = createDocsDemoLoop({
      target: sectionRef.current,
      reducedMotion: Boolean(reduced),
      cycleMs: 7200,
      play: timeline.play,
      showFinal: () => setStage('signed'),
      reset: () => setStage('held'),
      stop: timeline.cancel,
    });
    loopRef.current = loop;

    return () => {
      loop.cleanup();
      timeline.cancel();
      if (loopRef.current === loop) loopRef.current = null;
    };
  }, [reduced]);

  const replay = useCallback(() => loopRef.current?.replay(), []);
  const frame = useMemo(() => signoffFrame(stage), [stage]);
  const stageIndex = SIGNOFF_STAGES.indexOf(stage);
  const hasCorrection = frame.correctedDate !== null;
  const hasDraft = frame.record === 'draft' || frame.record === 'oris-ready';
  const isSigned = frame.approval === 'signed';
  const currentStatus = isSigned && frame.resultKey
    ? t(frame.resultKey)
    : hasDraft
      ? t('draft')
      : hasCorrection
        ? t('corrected')
        : t('held');

  return (
    <SectionContainer
      className="py-16 md:py-24 lg:py-28"
      data-landing-demo="true"
      data-demo-id="docs-signoff"
      data-demo-detail={stage}
      aria-live="off"
    >
      <DocsDemoStory
        eyebrow={t('eyebrow')}
        title={t('heading')}
        description={t('subtitle')}
        icon="solar:user-check-rounded-bold-duotone"
        result={
          <p data-demo-outcome className="text-pretty">
            {t('businessResult')}
          </p>
        }
      >
        <div
          ref={sectionRef}
          aria-live="off"
          className="min-h-[520px] overflow-hidden rounded-[28px] bg-[#111827] p-4 text-white shadow-[0_26px_64px_-42px_rgba(17,24,39,0.78)] md:p-6"
        >
          <div className="flex min-h-11 items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2 text-[13px] font-extrabold text-white">
              <Ico name="solar:user-check-rounded-bold-duotone" className="h-5 w-5 shrink-0 text-[var(--brand)]" />
              {t('currentStage')}
            </span>
            <button
              type="button"
              onClick={replay}
              data-demo-replay="docs-signoff"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.16)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              aria-label={t('replay')}
            >
              <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
              <span className="hidden sm:inline">{t('replay')}</span>
            </button>
          </div>

          <ol
            data-signoff-process-slot="true"
            className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"
            aria-label={t('eyebrow')}
          >
            {STEPS.map((step, index) => {
              const active = index === stageIndex;
              const complete = index < stageIndex;
              return (
                <li
                  key={step.key}
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'min-h-[92px] rounded-xl bg-white/[0.07] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-[background-color,box-shadow] duration-200',
                    active && 'bg-white/[0.12] shadow-[inset_0_0_0_1px_var(--brand)]',
                  )}
                >
                  <span className={cn('grid h-7 w-7 place-items-center rounded-lg', complete || active ? 'bg-[var(--brand)] text-white' : 'bg-white/10 text-white/55')}>
                    <Ico name={complete ? 'solar:check-circle-bold-duotone' : step.icon} className="h-4 w-4" />
                  </span>
                  <span className="mt-2 block text-pretty text-[10px] font-bold leading-4 text-white">{t(step.key)}</span>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-[minmax(150px,0.72fr)_minmax(0,1.28fr)]">
            <div className="min-w-0 rounded-2xl bg-white p-4 text-[#111827] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
              <span className="text-[10px] font-semibold text-[#667085]">{t('extracted')}</span>
              <Ico name="solar:calendar-mark-bold-duotone" className={cn('mt-4 h-6 w-6', hasCorrection ? 'text-[#047857]' : 'text-[#92400e]')} />
              <strong className={cn('mt-3 block h-[72px] text-pretty font-display text-[18px] font-extrabold tabular-nums leading-6', hasCorrection ? 'text-[#111827]' : 'text-[#92400e]')}>
                {hasCorrection ? '06.07.2026' : t('ambiguous')}
              </strong>
              <p className={cn('mt-4 h-[72px] rounded-xl px-3 py-2 text-pretty text-[11px] font-bold leading-4', hasCorrection ? 'bg-[#10b981]/10 text-[#065f46]' : 'bg-[#f59e0b]/14 text-[#92400e]')}>
                {hasCorrection ? t('corrected') : t('held')}
              </p>
            </div>

            <div className={cn('min-w-0 rounded-2xl bg-white p-4 text-[#111827] transition-[box-shadow] duration-200', isSigned ? 'shadow-[inset_3px_0_#10b981]' : 'shadow-[inset_3px_0_var(--brand)]')}>
              <div className="flex min-h-[44px] flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-[#667085]">{rowT('ledger')}</span>
                <span className={cn('inline-flex min-h-9 w-[148px] items-center justify-center gap-1 rounded-full px-2.5 text-center text-[9px] font-bold', isSigned ? 'bg-[#10b981]/14 text-[#065f46]' : hasDraft ? 'bg-[var(--brand-soft)] text-[var(--brand-ink)]' : 'bg-[#f59e0b]/14 text-[#92400e]')}>
                  <Ico name={isSigned ? 'solar:check-circle-bold-duotone' : hasDraft ? 'solar:pen-new-square-bold-duotone' : 'solar:clock-circle-bold-duotone'} className="h-3.5 w-3.5" />
                  {isSigned ? t('signed') : hasDraft ? t('draft') : hasCorrection ? t('corrected') : t('held')}
                </span>
              </div>

              <dl className="mt-4 grid gap-2 rounded-lg bg-[#f8fafc] p-3 sm:hidden">
                {[
                  [rowT('colDate'), hasDraft ? '06.07.26' : '...'],
                  [rowT('colCounter'), hasDraft ? 'Goodwill, Saburtalo' : '...'],
                  [rowT('colTotal'), hasDraft ? '175.00' : '...'],
                ].map(([label, value]) => (
                  <div key={label} className="grid h-9 grid-cols-[minmax(76px,0.8fr)_minmax(0,1.2fr)] items-start gap-3">
                    <dt className="text-[9px] font-semibold text-[#4B5563]">{label}</dt>
                    <dd className="break-words text-right text-[10px] font-extrabold tabular-nums text-[#111827]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div
                className="mt-4 hidden w-full min-w-0 max-w-full overflow-x-auto rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] focus-visible:ring-offset-2 sm:block"
                role="region"
                aria-label={rowT('ledger')}
                tabIndex={0}
              >
                <table className="w-full min-w-[430px] border-collapse text-left">
                  <caption className="sr-only">{rowT('ledger')}</caption>
                  <thead>
                    <tr className="border-b border-[#ececec]">
                      {['colDate', 'colDoc', 'colCounter', 'colTotal'].map((key) => (
                        <th key={key} scope="col" className="px-3 py-2 text-[9px] font-semibold text-[#667085]">
                          {rowT(key)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold tabular-nums text-[#111827]">{hasDraft ? '06.07.26' : '...'}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-[10px] tabular-nums text-[#111827]">{hasDraft ? '00042117-8891' : '...'}</td>
                      <td className="max-w-[150px] break-words px-3 py-3 text-[10px] text-[#111827]">{hasDraft ? 'Goodwill, Saburtalo' : '...'}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-[11px] font-extrabold tabular-nums text-[#111827]">{hasDraft ? '175.00' : '...'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p
                data-signoff-result-slot="true"
                className={cn('mt-4 flex h-[72px] items-center gap-2 rounded-xl px-3 text-pretty text-[11px] font-extrabold leading-4 transition-[background-color,color,box-shadow] duration-200', isSigned ? 'bg-[#10b981]/12 text-[#065f46] shadow-[0_0_0_1px_#10b981]' : 'bg-[#f3f4f6] text-[#4B5563] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]')}
                role="status"
                aria-live="off"
              >
                <Ico name={isSigned ? 'solar:check-circle-bold-duotone' : 'solar:clock-circle-bold-duotone'} className="h-5 w-5 shrink-0" />
                {currentStatus}
              </p>
            </div>
          </div>
        </div>
      </DocsDemoStory>
    </SectionContainer>
  );
}
