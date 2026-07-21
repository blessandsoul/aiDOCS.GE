'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';

import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

import { DocsDemoStory } from './DocsDemoStory';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type ScanState = 'ok' | 'held' | 'fail';
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const SCANS: { id: string; state: ScanState }[] = [
  { id: 's1', state: 'ok' },
  { id: 's2', state: 'held' },
  { id: 's3', state: 'held' },
  { id: 's4', state: 'fail' },
];

const TONE: Record<ScanState, { chip: string; panel: string; icon: string; iconTone: string }> = {
  ok: {
    chip: 'bg-[#10b981]/15 text-[#d1fae5]',
    panel: 'shadow-[inset_3px_0_#10b981]',
    icon: 'solar:check-circle-bold-duotone',
    iconTone: 'text-[#34d399]',
  },
  held: {
    chip: 'bg-[#f59e0b]/16 text-[#fef3c7]',
    panel: 'shadow-[inset_3px_0_#f59e0b]',
    icon: 'solar:user-check-rounded-bold-duotone',
    iconTone: 'text-[#92400e]',
  },
  fail: {
    chip: 'bg-[#ef4444]/15 text-[#fee2e2]',
    panel: 'shadow-[inset_3px_0_#ef4444]',
    icon: 'solar:close-circle-bold-duotone',
    iconTone: 'text-[#f87171]',
  },
};

export function DocsScans() {
  const t = useTranslations('product.scans');
  const reduced = useReducedMotion();
  const [pick, setPick] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);
  const scan = SCANS[pick];

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const play = () => {
      clear();
      setPick(0);
      timers.current.push(setTimeout(() => setPick(1), 700));
      timers.current.push(setTimeout(() => setPick(2), 3600));
      timers.current.push(setTimeout(() => setPick(3), 6000));
    };

    const loop = createDocsDemoLoop({
      target: sectionRef.current,
      reducedMotion: Boolean(reduced),
      cycleMs: 6000,
      play: play,
      showFinal: () => setPick(3),
      reset: () => setPick(0),
      stop: clear,
    });
    loopRef.current = loop;

    return () => {
      loop.cleanup();
      clear();
      if (loopRef.current === loop) loopRef.current = null;
    };
  }, [clear, reduced]);

  const selectScan = (index: number) => {
    loopRef.current?.takeControl();
    setPick(index);
  };

  const nextScan = () => selectScan((pick + 1) % SCANS.length);
  const replay = () => loopRef.current?.replay();

  return (
    <SectionContainer
      className="py-16 md:py-24 lg:py-28"
      data-landing-demo="true"
      data-demo-id="docs-scans"
      data-demo-detail={`${scan.id}-${scan.state}`}
      aria-live="off"
    >
      <DocsDemoStory
        eyebrow={t('eyebrow')}
        title={t('heading')}
        description={t('subtitle')}
        icon="solar:camera-bold-duotone"
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
              <Ico name="solar:gallery-bold-duotone" className="h-5 w-5 shrink-0 text-[var(--brand)]" />
              <span>{t('sampleCount', { current: pick + 1, total: SCANS.length })}</span>
            </span>
            <button
              type="button"
              onClick={replay}
              data-demo-replay="docs-scans"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.16)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              aria-label={t('replay')}
            >
              <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
              <span className="hidden sm:inline">{t('replay')}</span>
            </button>
          </div>

          <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-[minmax(150px,0.78fr)_minmax(0,1.22fr)] sm:items-stretch">
            <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-white/[0.07] p-5">
              <div
                className="relative aspect-[3/4] w-full max-w-[190px] overflow-hidden rounded-sm bg-[#f5f3ec] p-4 text-[#111827] shadow-[0_18px_36px_-22px_rgba(0,0,0,0.8)] transition-[transform,filter] duration-300 ease-out"
                style={{
                  transform: scan.id === 's2' ? 'rotate(-5deg) skewY(1.5deg)' : scan.id === 's3' ? 'rotate(1.5deg)' : 'none',
                  filter: scan.id === 's3' ? 'contrast(0.72) brightness(1.06)' : 'none',
                }}
              >
                {scan.id === 's2' && (
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.75)_46%,transparent_60%)]" aria-hidden="true" />
                )}
                {scan.id === 's3' && (
                  <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(100deg,transparent_0_9px,rgba(0,0,0,0.045)_9px_11px)]" aria-hidden="true" />
                )}
                <span className="block text-[12px] font-extrabold">GOODWILL</span>
                <span className="mt-1 block text-[8px] text-[#4B5563]">Saburtalo, Tbilisi</span>
                <span className="my-3 block h-px bg-[#111827]/12" />
                {['Coffee', 'Milk', 'Office paper', 'Water'].map((item, index) => (
                  <span key={item} className="mt-2 grid grid-cols-[1fr_auto] gap-2 text-[8px]">
                    <span className={cn(scan.id === 's4' && index > 1 && 'font-serif italic')}>{item}</span>
                    <span className="font-bold tabular-nums">{[12.9, 5.8, 36.4, 4.2][index].toFixed(2)}</span>
                  </span>
                ))}
                <span className="my-3 block h-px bg-[#111827]/12" />
                <span className="flex items-end justify-between gap-3">
                  <span className="text-[9px] font-bold">TOTAL</span>
                  <span className="text-[15px] font-extrabold tabular-nums">175.00</span>
                </span>
                <span className="mt-3 block text-[8px] tabular-nums text-[#4B5563]">02.07.2026 · 19:14</span>
              </div>
            </div>

            <div
              data-scan-result-slot="true"
              className={cn('flex min-h-[320px] min-w-0 flex-col rounded-2xl bg-white/[0.07] p-4 transition-[box-shadow] duration-200 md:p-5', TONE[scan.state].panel)}
            >
              <div className="flex h-[112px] flex-col items-start gap-2">
                <span className="block h-[72px] text-pretty text-[17px] font-extrabold leading-6 text-white">{t(scan.id)}</span>
                <span className={cn('inline-flex min-h-7 w-[154px] items-center justify-center gap-1.5 rounded-full px-2.5 text-center text-[10px] font-bold', TONE[scan.state].chip)}>
                  <Ico name={TONE[scan.state].icon} className="h-3.5 w-3.5" />
                  {t(scan.state)}
                </span>
              </div>

              <div className="mt-4 h-[200px] rounded-xl bg-white p-4 text-[#111827]" role="status" aria-live="off">
                <Ico name={TONE[scan.state].icon} className={cn('h-6 w-6', TONE[scan.state].iconTone)} />
                <p className="mt-3 min-h-[64px] text-pretty text-[13px] font-bold leading-5">{t(`${scan.id}r`)}</p>
                <p className="mt-2 min-h-[52px] text-pretty text-[11px] leading-4 text-[#667085]">{t(`${scan.state}Action`)}</p>
              </div>

              <button
                type="button"
                onClick={nextScan}
                className="mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 text-[12px] font-extrabold text-white transition-transform duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              >
                {t('next')}
                <Ico name="solar:arrow-right-bold-duotone" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </DocsDemoStory>
    </SectionContainer>
  );
}
