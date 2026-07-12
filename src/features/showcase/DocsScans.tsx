'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type ScanState = 'ok' | 'held' | 'fail';
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const SCANS: { id: string; state: ScanState }[] = [
  { id: 's1', state: 'ok' },
  { id: 's2', state: 'held' },
  { id: 's3', state: 'held' },
  { id: 's4', state: 'fail' },
];
const TONE: Record<ScanState, { chip: string; card: string; icon: string }> = {
  ok: { chip: 'bg-[#10b981]/14 text-[#065f46]', card: 'shadow-[0_0_0_1px_rgba(0,0,0,0.08)]', icon: 'solar:check-circle-bold-duotone' },
  held: { chip: 'bg-[#f59e0b]/16 text-[#92400e]', card: 'shadow-[0_0_0_1px_#f59e0b]', icon: 'solar:user-check-rounded-bold-duotone' },
  fail: { chip: 'bg-[#ef4444]/14 text-[#7f1d1d]', card: 'shadow-[0_0_0_1px_#ef4444]', icon: 'solar:close-circle-bold-duotone' },
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
      timers.current.push(setTimeout(() => setPick(1), 1800));
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
  const replay = () => loopRef.current?.replay();

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-14">
        <div>
          <span className="text-[12px] tracking-wide text-neutral-900/40">{t('eyebrow')}</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">{t('heading')}</h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">{t('subtitle')}</p>

          <ul className="mt-8 flex flex-col gap-2">
            {SCANS.map((item, index) => {
              const active = index === pick;
              return (
                <li key={item.id}>
                  <button type="button" onClick={() => selectScan(index)} aria-pressed={active} className={cn('flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl px-4 text-left transition-colors', active ? 'bg-white shadow-[0_0_0_1px_var(--brand)]' : 'bg-[#fafafa] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]')}>
                    <span className="text-[14px] font-semibold text-neutral-900">{t(item.id)}</span>
                    <span className={cn('flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold', TONE[item.state].chip)}><Ico name={TONE[item.state].icon} className="h-3 w-3" />{t(item.state)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button type="button" onClick={replay} className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#fafafa] px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
            {t('replay')}
          </button>
          <p className="mt-5 text-pretty text-[12px] leading-relaxed text-[#737373]">{t('note')}</p>
        </div>

        <motion.div ref={sectionRef} initial={false} animate={{ opacity: 1, y: 0 }} className={cn('rounded-2xl bg-white p-6 md:p-8', TONE[scan.state].card)}>
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-xl font-extrabold text-neutral-900">{t(scan.id)}</span>
            <span className={cn('flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold', TONE[scan.state].chip)}><Ico name={TONE[scan.state].icon} className="h-4 w-4" />{t(scan.state)}</span>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="relative aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-sm bg-[#f5f3ec] p-4 shadow-md" style={{ transform: scan.id === 's2' ? 'rotate(-6deg) skewY(2deg)' : scan.id === 's3' ? 'rotate(1.5deg)' : 'none', filter: scan.id === 's3' ? 'contrast(0.72) brightness(1.06)' : 'none' }}>
              {scan.id === 's2' && <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.75)_46%,transparent_60%)]" aria-hidden="true" />}
              {scan.id === 's3' && <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(100deg,transparent_0_9px,rgba(0,0,0,0.045)_9px_11px)]" aria-hidden="true" />}
              <span className="block h-2 w-2/3 rounded-sm bg-neutral-900/70" />
              <span className="mt-4 block h-px w-full bg-neutral-900/15" />
              {Array.from({ length: 8 }, (_, index) => <span key={index} className={cn('mt-2.5 block h-1.5 rounded-sm', scan.id === 's4' ? 'bg-neutral-900/22' : 'bg-neutral-900/15')} style={{ width: `${42 + ((index * 41) % 52)}%`, transform: scan.id === 's4' ? `rotate(${(index % 3) - 1}deg)` : 'none' }} />)}
            </div>
          </div>
          <p className={cn('mt-7 text-pretty text-[15px] leading-relaxed', scan.state === 'fail' ? 'font-semibold text-neutral-900' : 'text-[#404040]')}>{t(`${scan.id}r`)}</p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
