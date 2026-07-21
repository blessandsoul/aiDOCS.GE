'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';

import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

import { DocsDemoStory } from './DocsDemoStory';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type Bucket = 'free' | 'paid';
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const DOCS: { id: string; answer: Bucket; icon: string }[] = [
  { id: 'd1', answer: 'free', icon: 'solar:calculator-bold-duotone' },
  { id: 'd2', answer: 'free', icon: 'solar:layers-minimalistic-bold-duotone' },
  { id: 'd3', answer: 'paid', icon: 'solar:text-bold-duotone' },
  { id: 'd4', answer: 'paid', icon: 'solar:calculator-bold-duotone' },
  { id: 'd5', answer: 'paid', icon: 'solar:bookmark-bold-duotone' },
  { id: 'd6', answer: 'paid', icon: 'solar:gallery-bold-duotone' },
  { id: 'd7', answer: 'paid', icon: 'solar:text-bold-duotone' },
  { id: 'd8', answer: 'paid', icon: 'solar:text-bold-duotone' },
];

const FINAL_PLACED = Object.fromEntries(
  DOCS.map((doc) => [doc.id, doc.answer]),
) as Record<string, Bucket>;

export function DocsSplit() {
  const t = useTranslations('product.split');
  const reduced = useReducedMotion();
  const [placed, setPlaced] = useState<Record<string, Bucket>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const resetState = useCallback(() => setPlaced({}), []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const play = () => {
      clear();
      resetState();
      DOCS.forEach((doc, index) => {
        timers.current.push(
          setTimeout(() => {
            setPlaced((current) => ({ ...current, [doc.id]: doc.answer }));
          }, (index + 1) * 450),
        );
      });
    };

    const loop = createDocsDemoLoop({
      target: sectionRef.current,
      reducedMotion: Boolean(reduced),
      cycleMs: 6000,
      play: play,
      showFinal: () => setPlaced(FINAL_PLACED),
      reset: resetState,
      stop: clear,
    });
    loopRef.current = loop;

    return () => {
      loop.cleanup();
      clear();
      if (loopRef.current === loop) loopRef.current = null;
    };
  }, [clear, reduced, resetState]);

  const place = (id: string, bucket: Bucket) => {
    loopRef.current?.takeControl();
    setPlaced((current) => ({ ...current, [id]: bucket }));
  };

  const replay = () => loopRef.current?.replay();
  const correct = DOCS.filter((doc) => placed[doc.id] === doc.answer).length;
  const done = correct === DOCS.length;
  const currentDoc = DOCS.find((doc) => !placed[doc.id]) ?? DOCS.at(-1)!;
  const buckets = {
    free: DOCS.filter((doc) => placed[doc.id] === 'free'),
    paid: DOCS.filter((doc) => placed[doc.id] === 'paid'),
  };

  const routeNext = () => {
    if (!done) place(currentDoc.id, currentDoc.answer);
  };

  return (
    <SectionContainer
      className="py-16 md:py-24 lg:py-28"
      data-landing-demo="true"
      data-demo-id="docs-split"
      data-demo-detail={done ? 'final' : `sorting-${correct}`}
      aria-live="off"
    >
      <DocsDemoStory
        visualFirst
        eyebrow={t('eyebrow')}
        title={t('heading')}
        description={t('subtitle')}
        icon="solar:layers-minimalistic-bold-duotone"
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
              <Ico name="solar:arrow-down-bold-duotone" className="h-5 w-5 shrink-0 text-[var(--brand)]" />
              {t('incoming')}
            </span>
            <button
              type="button"
              onClick={replay}
              data-demo-replay="docs-split"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.16)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              aria-label={t('reset')}
            >
              <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
              <span className="hidden sm:inline">{t('reset')}</span>
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-white/[0.07] p-4" data-split-unsorted-slot="true">
            <div className="grid min-w-0 gap-3 sm:flex sm:min-h-[84px] sm:items-center">
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[var(--brand)]">
                  <Ico name={done ? 'solar:check-circle-bold-duotone' : currentDoc.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1" data-split-source-state={done ? 'placed' : 'unplaced'}>
                  <span className="block h-8 text-[10px] font-semibold leading-4 text-white/60">{done ? t('allSorted') : t('unsorted')}</span>
                  <strong className="mt-1 block h-[100px] text-pretty text-[14px] font-extrabold leading-5 text-white sm:h-[60px]">
                    {done ? t('allSortedDetail') : t(currentDoc.id)}
                  </strong>
                </div>
              </div>
              <button
                type="button"
                onClick={routeNext}
                disabled={done}
                aria-label={done ? t('allSorted') : t('routeNext')}
                className="inline-flex h-[52px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-3 text-[12px] font-extrabold text-white transition-[transform,opacity] duration-150 active:scale-[0.96] disabled:cursor-default disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] sm:w-[164px] sm:px-4"
              >
                <Ico name={done ? 'solar:check-circle-bold-duotone' : 'solar:arrow-right-bold-duotone'} className="h-4 w-4" />
                <span className="text-pretty leading-4">{done ? t('allSorted') : t('routeNext')}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2" data-split-bins-slot="true">
            <BucketPanel tone="free" docs={buckets.free} t={t} />
            <BucketPanel tone="paid" docs={buckets.paid} t={t} />
          </div>

          <div className="mt-4 rounded-2xl bg-white/[0.07] p-4" data-split-controls-slot="true">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-semibold text-white/65">{t('progress')}</span>
              <strong className="text-[14px] font-extrabold tabular-nums text-white">{correct}/{DOCS.length}</strong>
            </div>
            <span className="mt-3 block h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <span
                className="block h-full rounded-full bg-[var(--brand)] transition-[width] duration-300 ease-out"
                style={{ width: `${(correct / DOCS.length) * 100}%` }}
              />
            </span>
          </div>
        </div>
      </DocsDemoStory>
    </SectionContainer>
  );
}

function BucketPanel({
  tone,
  docs,
  t,
}: {
  tone: Bucket;
  docs: { id: string; answer: Bucket; icon: string }[];
  t: (key: string) => string;
}) {
  const visibleDocs = docs.slice(-3);

  return (
    <div
      data-split-bin-slot={tone}
      className={cn(
        'min-w-0 rounded-2xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.11)]',
        tone === 'paid' ? 'bg-[var(--brand)]/12' : 'bg-white/[0.07]',
      )}
    >
      <div className="flex min-h-[54px] items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[12px] font-extrabold text-white">{t(tone)}</span>
          <span className="mt-1 block text-pretty text-[10px] leading-4 text-white/60">{t(`${tone}Hint`)}</span>
        </div>
        <span className="grid h-8 min-w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-[12px] font-extrabold tabular-nums text-white">
          {docs.length}
        </span>
      </div>

      <ul className="mt-3 grid h-[232px] grid-rows-[repeat(3,72px)] gap-2" aria-label={t(tone)}>
        {Array.from({ length: 3 }, (_, index) => {
          const doc = visibleDocs[index];
          return (
            <li
              key={`${tone}-slot-${index}`}
              aria-hidden={!doc}
              className={cn(
                'flex h-[72px] min-w-0 items-center gap-2 rounded-xl bg-white px-3 py-2 text-[#111827] transition-opacity duration-200',
                doc ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Ico name={doc?.icon ?? 'solar:text-bold-duotone'} className="h-4 w-4 shrink-0 text-[var(--brand-ink)]" />
              <span className="min-w-0 break-words text-[10px] font-bold leading-3">{doc ? t(doc.id) : t('unsorted')}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
