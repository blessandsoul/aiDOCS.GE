'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type Bucket = 'free' | 'paid';
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const DOCS: { id: string; answer: Bucket }[] = [
  { id: 'd1', answer: 'free' },
  { id: 'd2', answer: 'free' },
  { id: 'd3', answer: 'paid' },
  { id: 'd4', answer: 'paid' },
  { id: 'd5', answer: 'paid' },
  { id: 'd6', answer: 'paid' },
  { id: 'd7', answer: 'paid' },
  { id: 'd8', answer: 'paid' },
];

const FINAL_PLACED = Object.fromEntries(DOCS.map((doc) => [doc.id, doc.answer])) as Record<string, Bucket>;

export function DocsSplit() {
  const t = useTranslations('product.split');
  const reduced = useReducedMotion();
  const [placed, setPlaced] = useState<Record<string, Bucket>>({});
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const resetState = useCallback(() => {
    setPlaced({});
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const play = () => {
      clear();
      resetState();
      DOCS.forEach((doc, index) => {
        timers.current.push(setTimeout(() => {
          setPlaced((current) => ({ ...current, [doc.id]: doc.answer }));
          if (index === DOCS.length - 1) setRevealed(true);
        }, (index + 1) * 700));
      });
    };
    const loop = createDocsDemoLoop({
      target: sectionRef.current,
      reducedMotion: Boolean(reduced),
      cycleMs: 5600,
      play: play,
      showFinal: () => {
        setPlaced(FINAL_PLACED);
        setRevealed(true);
      },
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
  const reveal = () => {
    loopRef.current?.takeControl();
    setRevealed(true);
  };
  const replay = () => loopRef.current?.replay();
  const unsorted = DOCS.filter((doc) => !placed[doc.id]);
  const correct = DOCS.filter((doc) => placed[doc.id] === doc.answer).length;
  const done = unsorted.length === 0;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="mb-9 max-w-2xl">
        <span className="text-[12px] tracking-wide text-neutral-900/40">{t('eyebrow')}</span>
        <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">{t('heading')}</h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">{t('subtitle')}</p>
      </div>

      <div ref={sectionRef}>
        {!done && (
          <div className="mb-6">
            <span className="text-[11px] tracking-wide text-neutral-900/35">{t('unsorted')}</span>
            <ul className="mt-3 flex flex-col gap-2">
              {unsorted.map((doc) => (
                <motion.li key={doc.id} layout={!reduced} className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[15px] font-semibold text-neutral-900">{t(doc.id)}</span>
                  <span className="flex shrink-0 gap-2">
                    <Choose onClick={() => place(doc.id, 'free')}>{t('free')}</Choose>
                    <Choose onClick={() => place(doc.id, 'paid')} primary>{t('paid')}</Choose>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Bin title={t('free')} tone="free" docs={DOCS.filter((doc) => placed[doc.id] === 'free')} t={t} reveal={revealed || done} reduced={reduced} />
          <Bin title={t('paid')} tone="paid" docs={DOCS.filter((doc) => placed[doc.id] === 'paid')} t={t} reveal={revealed || done} reduced={reduced} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {(done || revealed) && <p className="text-[15px] font-semibold tabular-nums text-neutral-900">{t('score')} {correct} {t('of')} {DOCS.length}</p>}
          {!done && !revealed && <button type="button" onClick={reveal} className="min-h-[44px] rounded-full bg-[#fafafa] px-5 text-[14px] font-medium text-neutral-900/70 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">{t('reveal')}</button>}
          <button type="button" onClick={replay} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#fafafa] px-5 text-[14px] font-medium text-neutral-900/70 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
            {t('reset')}
          </button>
        </div>

        {(done || revealed) && <p className="mt-5 max-w-2xl text-pretty text-[15px] font-semibold leading-relaxed text-neutral-900">{t('outro')}</p>}
      </div>
    </SectionContainer>
  );
}

function Choose({ onClick, primary, children }: { onClick: () => void; primary?: boolean; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={cn('min-h-[40px] rounded-full px-4 text-[12px] font-semibold', primary ? 'bg-[var(--brand)] text-white' : 'bg-[#f0f0f0] text-neutral-900/70')}>{children}</button>;
}

function Bin({ title, tone, docs, t, reveal, reduced }: { title: string; tone: Bucket; docs: { id: string; answer: Bucket }[]; t: (key: string) => string; reveal: boolean; reduced: boolean | null }) {
  return (
    <div className={cn('min-h-[180px] rounded-2xl p-5', tone === 'free' ? 'bg-[#fafafa] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]' : 'bg-[color-mix(in_srgb,var(--brand)_8%,white)] shadow-[0_0_0_1px_var(--brand)]')}>
      <span className="block text-[13px] font-bold text-neutral-900">{title}</span>
      <ul className="mt-4 flex flex-col gap-2">
        {docs.map((doc) => (
          <motion.li key={doc.id} layout={!reduced} className="rounded-xl bg-white px-3 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            <span className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-semibold text-neutral-900">{t(doc.id)}</span>
              {reveal && <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#10b981]/14 px-2 py-0.5 text-[10px] font-bold text-[#065f46]"><Ico name="solar:check-circle-bold-duotone" className="h-3 w-3" />{t('correct')}</span>}
            </span>
            {reveal && <span className="mt-1.5 block text-pretty text-[12px] leading-snug text-[#525252]">{t(`e${doc.id.slice(1)}`)}</span>}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
