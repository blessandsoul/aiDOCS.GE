'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';

import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

import {
  ACCURACY_LINES,
  createTimelinePlayer,
  initialAccuracyLine,
  partitionFields,
} from '@/features/showcase/docs-demo-models.mjs';
import { DocsDemoStory } from './DocsDemoStory';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type Field = { id: string; value: string; confidence: number; bad?: boolean };
type RowState = 'auto' | 'human' | 'wrong';
type TimelinePlayer = { play: () => void; replay: () => void; cancel: () => void };
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const FIELDS: Field[] = [
  { id: 'f1', value: 'Goodwill, Saburtalo', confidence: 99 },
  { id: 'f3', value: '175.00 GEL', confidence: 97 },
  { id: 'f6', value: '26.69 GEL', confidence: 92 },
  { id: 'f11', value: '28.06.2026', confidence: 68, bad: true },
  { id: 'f12', value: 'for the office', confidence: 39, bad: true },
];

const MIN = 35;
const MAX = 100;

const TONE: Record<RowState, { chip: string; card: string; icon: string; iconTone: string }> = {
  auto: {
    chip: 'bg-[#10b981]/14 text-[#065f46]',
    card: 'shadow-[inset_3px_0_#10b981,0_0_0_1px_rgba(0,0,0,0.06)]',
    icon: 'solar:check-circle-bold-duotone',
    iconTone: 'text-[#047857]',
  },
  human: {
    chip: 'bg-[#f59e0b]/16 text-[#92400e]',
    card: 'shadow-[inset_3px_0_#f59e0b,0_0_0_1px_rgba(0,0,0,0.06)]',
    icon: 'solar:user-check-rounded-bold-duotone',
    iconTone: 'text-[#92400e]',
  },
  wrong: {
    chip: 'bg-[#ef4444]/14 text-[#7f1d1d]',
    card: 'shadow-[inset_3px_0_#ef4444,0_0_0_1px_rgba(0,0,0,0.06)]',
    icon: 'solar:close-circle-bold-duotone',
    iconTone: 'text-[#b91c1c]',
  },
};

export function DocsAccuracy() {
  const t = useTranslations('product.accuracy');
  const reduced = useReducedMotion();
  const [line, setLine] = useState(() => initialAccuracyLine(false));
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const timeline: TimelinePlayer = createTimelinePlayer({
      stages: ACCURACY_LINES,
      onStage: setLine,
    });
    const loop = createDocsDemoLoop({
      target: sectionRef.current,
      reducedMotion: Boolean(reduced),
      cycleMs: 7200,
      play: timeline.play,
      showFinal: () => setLine(80),
      reset: () => setLine(96),
      stop: timeline.cancel,
    });
    loopRef.current = loop;

    return () => {
      loop.cleanup();
      timeline.cancel();
      if (loopRef.current === loop) loopRef.current = null;
    };
  }, [reduced]);

  const setManualLine = useCallback((value: number) => {
    loopRef.current?.takeControl();
    setLine(value);
  }, []);

  const replay = useCallback(() => loopRef.current?.replay(), []);
  const { auto, human, wrong } = useMemo(() => partitionFields(FIELDS, line), [line]);
  const verdict: 'green' | 'neutral' | 'red' = wrong.length > 0 ? 'red' : auto.length === 0 ? 'neutral' : 'green';

  return (
    <SectionContainer
      className="py-16 md:py-24 lg:py-28"
      data-landing-demo="true"
      data-demo-id="docs-accuracy"
      data-demo-detail={`line-${line}-${verdict}`}
      aria-live="off"
    >
      <DocsDemoStory
        visualFirst
        eyebrow={t('eyebrow')}
        title={t('heading')}
        description={t('subtitle')}
        icon="solar:shield-check-bold-duotone"
        result={
          <p data-demo-outcome className="text-pretty">
            {t('businessResult')}
          </p>
        }
      >
        <div
          ref={sectionRef}
          aria-live="off"
          className="min-h-[590px] overflow-hidden rounded-[28px] bg-[#111827] p-4 text-white shadow-[0_26px_64px_-42px_rgba(17,24,39,0.78)] md:p-6"
        >
          <div className="flex min-h-11 items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2 text-[13px] font-extrabold text-white">
              <Ico name="solar:shield-check-bold-duotone" className="h-5 w-5 shrink-0 text-[var(--brand)]" />
              {t('doc')}
            </span>
            <button
              type="button"
              onClick={replay}
              data-demo-replay="docs-accuracy"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.16)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              aria-label={t('replay')}
            >
              <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
              <span className="hidden sm:inline">{t('replay')}</span>
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-white p-4 text-[#111827] md:p-5">
            <div className="flex min-w-0 items-end justify-between gap-4">
              <label htmlFor="docs-line" className="min-w-0 text-pretty text-[12px] font-bold leading-5 text-[#4B5563]">
                {t('thresholdLabel')}
              </label>
              <strong className="shrink-0 font-display text-[24px] font-extrabold tabular-nums text-[var(--brand-ink)]">
                {line}%
              </strong>
            </div>
            <input
              id="docs-line"
              type="range"
              min={MIN}
              max={MAX}
              step={1}
              value={line}
              onChange={(event) => setManualLine(Number(event.target.value))}
              aria-describedby="docs-line-hint"
              aria-valuetext={`${line}%`}
              className="mt-2 h-11 w-full cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
              style={{ accentColor: 'var(--brand)' }}
            />
            <p id="docs-line-hint" className="flex justify-between gap-4 text-[10px] leading-4 text-[#667085]">
              <span className="max-w-[45%]">{t('lowEnd')}</span>
              <span className="max-w-[45%] text-right">{t('highEnd')}</span>
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat value={auto.length} label={t('auto')} icon="solar:check-circle-bold-duotone" colour="#047857" />
            <Stat value={human.length} label={t('human')} icon="solar:user-check-rounded-bold-duotone" colour="#92400e" />
            <Stat value={wrong.length} label={t('wrong')} icon="solar:close-circle-bold-duotone" colour={wrong.length > 0 ? '#7f1d1d' : '#667085'} />
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.07] p-3">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <span className="text-[11px] font-semibold text-white/65">{t('sample')}</span>
              <span className="text-[10px] text-white/55">{t('honest')}</span>
            </div>
            <div className="grid gap-2">
              {FIELDS.map((field) => {
                const isAutomatic = field.confidence >= line;
                const state: RowState = isAutomatic ? (field.bad ? 'wrong' : 'auto') : 'human';
                const note = state === 'wrong' ? t(`w${field.id.slice(1)}`) : field.bad ? t('caught') : t(state === 'auto' ? 'autoReady' : 'reviewReady');
                const tone = TONE[state];

                return (
                  <div key={field.id} className={cn('min-w-0 rounded-xl bg-white px-3 py-2.5 text-[#111827] transition-[box-shadow] duration-200', tone.card)}>
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                      <div className="min-w-0">
                        <span className="block text-[10px] text-[#667085]">{t(field.id)}</span>
                        <span className="mt-0.5 block break-words text-[12px] font-extrabold tabular-nums">{field.value}</span>
                      </div>
                      <span className={cn('inline-flex min-h-7 w-[88px] items-center justify-center gap-1 rounded-full px-2 text-center text-[9px] font-bold', tone.chip)}>
                        <Ico name={tone.icon} className="h-3 w-3" />
                        {t(state === 'auto' ? 'autoChip' : state === 'human' ? 'humanChip' : 'wrongChip')}
                      </span>
                    </div>
                    <p
                      data-accuracy-note-slot="true"
                      className={cn('mt-1.5 h-12 text-pretty text-[10px] font-semibold leading-4', tone.iconTone)}
                    >
                      {note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={cn(
              'mt-3 flex h-[82px] items-start gap-3 rounded-2xl bg-white p-4 text-[13px] font-bold leading-5 text-[#111827] shadow-[inset_3px_0_transparent]',
              verdict === 'red' ? 'shadow-[inset_3px_0_#ef4444]' : verdict === 'green' ? 'shadow-[inset_3px_0_#10b981]' : 'shadow-[inset_3px_0_#94a3b8]',
            )}
            role="status"
            aria-live="off"
          >
            <Ico
              name={verdict === 'red' ? 'solar:close-circle-bold-duotone' : verdict === 'green' ? 'solar:check-circle-bold-duotone' : 'solar:user-check-rounded-bold-duotone'}
              className={cn('mt-0.5 h-5 w-5 shrink-0', verdict === 'red' ? 'text-[#b91c1c]' : verdict === 'green' ? 'text-[#047857]' : 'text-[#475569]')}
            />
            <span>{t(verdict)}</span>
          </div>
        </div>
      </DocsDemoStory>
    </SectionContainer>
  );
}

function Stat({
  value,
  label,
  icon,
  colour,
}: {
  value: number;
  label: string;
  icon: string;
  colour: string;
}) {
  return (
    <div className="min-w-0 rounded-xl bg-white px-3 py-3 text-[#111827]">
      <Ico name={icon} className="h-4 w-4" style={{ color: colour }} />
      <span className="mt-2 block text-[19px] font-extrabold tabular-nums leading-none" style={{ color: colour }}>
        {value}
      </span>
      <span className="mt-1.5 block min-h-[28px] text-pretty text-[9px] font-semibold leading-3.5 text-[#667085]">{label}</span>
    </div>
  );
}
