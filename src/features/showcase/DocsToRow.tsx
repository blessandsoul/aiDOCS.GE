'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type Field = { k: string; v: string };
type Doc = {
  id: string;
  fields: Field[];
  row: { date: string; doc: string; counter: string; net: string; vat: string; total: string };
};
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const DOCS: Doc[] = [
  {
    id: 'd1',
    fields: [
      { k: 'Supplier', v: 'Pirelli Tyre S.p.A.' },
      { k: 'Invoice', v: 'IT-2026-04417' },
      { k: 'Date', v: '2026-06-28' },
      { k: 'VAT ID', v: 'IT00860340157' },
      { k: 'Net', v: '14,280.00 EUR' },
      { k: 'VAT', v: '0.00 EUR' },
      { k: 'Total', v: '14,280.00 EUR' },
      { k: 'Terms', v: 'CIP Tbilisi' },
    ],
    row: { date: '28.06.26', doc: 'IT-2026-04417', counter: 'Pirelli Tyre S.p.A.', net: '44 512.80', vat: '0.00', total: '44 512.80' },
  },
  {
    id: 'd2',
    fields: [
      { k: 'Account', v: 'GE29 BG00 0000 1234 5678 90' },
      { k: 'Period', v: '01.06 to 30.06.2026' },
      { k: 'Counterparty', v: 'Nikora Trade LLC' },
      { k: 'Reference', v: 'Invoice 8842' },
      { k: 'Date', v: '2026-06-14' },
      { k: 'Debit', v: '0.00 GEL' },
      { k: 'Credit', v: '9,340.00 GEL' },
      { k: 'Balance', v: '112,904.16 GEL' },
    ],
    row: { date: '14.06.26', doc: 'BOG 8842', counter: 'Nikora Trade LLC', net: '7 915.25', vat: '1 424.75', total: '9 340.00' },
  },
  {
    id: 'd3',
    fields: [
      { k: 'Merchant', v: 'Goodwill, Saburtalo' },
      { k: 'Fiscal', v: '00042117-8891' },
      { k: 'Date', v: '2026-07-02' },
      { k: 'Items', v: '11' },
      { k: 'Net', v: '148.31 GEL' },
      { k: 'VAT', v: '26.69 GEL' },
      { k: 'Total', v: '175.00 GEL' },
      { k: 'Paid', v: 'Card, BOG' },
    ],
    row: { date: '02.07.26', doc: '00042117-8891', counter: 'Goodwill, Saburtalo', net: '148.31', vat: '26.69', total: '175.00' },
  },
];

const FIELD_MS = 350;
const COLLAPSE_AT = 4300;
const POSTED_AT = 6400;

export function DocsToRow() {
  const t = useTranslations('product.row');
  const reduced = useReducedMotion();
  const [pick, setPick] = useState(0);
  const [ms, setMs] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);
  const doc = DOCS[pick];

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const play = () => {
      clear();
      setMs(0);
      for (let i = 0; i < 8; i += 1) {
        timers.current.push(setTimeout(() => setMs((i + 1) * FIELD_MS), (i + 1) * FIELD_MS));
      }
      timers.current.push(setTimeout(() => setMs(COLLAPSE_AT), COLLAPSE_AT));
      timers.current.push(setTimeout(() => setMs(POSTED_AT), POSTED_AT));
    };
    const loop = createDocsDemoLoop({
      target: sectionRef.current,
      reducedMotion: Boolean(reduced),
      cycleMs: 6400,
      play: play,
      showFinal: () => setMs(POSTED_AT),
      reset: () => setMs(0),
      stop: clear,
    });
    loopRef.current = loop;
    return () => {
      loop.cleanup();
      clear();
      if (loopRef.current === loop) loopRef.current = null;
    };
  }, [clear, reduced]);

  const selectDoc = (index: number) => {
    loopRef.current?.takeControl();
    setPick(index);
    setMs(0);
  };
  const replay = () => loopRef.current?.replay();
  const shown = Math.min(Math.floor(ms / FIELD_MS), doc.fields.length);
  const collapsing = ms >= COLLAPSE_AT;
  const posted = ms >= POSTED_AT;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <span className="text-[12px] tracking-wide text-neutral-900/40">{t('eyebrow')}</span>
        <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">{t('heading')}</h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">{t('subtitle')}</p>
      </div>

      <div ref={sectionRef}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[12px] tracking-wide text-neutral-900/35">{t('pick')}</span>
          {DOCS.map((item, index) => (
            <button key={item.id} type="button" onClick={() => selectDoc(index)} aria-pressed={index === pick} className={cn('min-h-[44px] rounded-full px-4 text-[13px] font-medium transition-colors', index === pick ? 'bg-[var(--brand)] text-white' : 'bg-[#fafafa] text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]')}>
              {t(item.id)}
            </button>
          ))}
          <button type="button" onClick={replay} className="ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-[var(--brand)] px-6 text-[14px] font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2">
            <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
            {t('again')}
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(220px,1fr)_1.4fr]">
          <div className="relative overflow-hidden rounded-2xl bg-[#0e0e11] p-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] rounded-sm bg-[#f3f1ea] p-3 shadow-lg" style={{ transform: 'rotate(-1.4deg)' }}>
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_46%,rgba(0,0,0,0.07)_49%,transparent_53%)]" aria-hidden="true" />
              <span className="block h-2 w-2/3 rounded-sm bg-neutral-900/70" />
              <span className="mt-4 block h-px w-full bg-neutral-900/15" />
              {Array.from({ length: 9 }, (_, index) => <span key={index} className="mt-2 block h-1.5 rounded-sm bg-neutral-900/15" style={{ width: `${45 + ((index * 37) % 50)}%` }} />)}
            </div>
            <p className="mt-5 text-pretty text-[11px] leading-relaxed text-white/45">{t('commodity')}</p>
          </div>

          <div className="relative min-h-[420px] rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-6">
            <span className="text-[11px] tracking-wide text-neutral-900/35">{posted ? t('posted') : collapsing ? t('posting') : t('extracting')}</span>
            <div className="mt-4 flex flex-col gap-1.5">
              {doc.fields.map((field, index) => (
                <motion.div key={field.k} initial={false} animate={collapsing ? { opacity: 0, y: 26, scale: 0.94 } : { opacity: index < shown ? 1 : 0.18, y: 0, scale: 1 }} transition={{ duration: reduced ? 0 : 0.24 }} className="flex items-baseline justify-between gap-4 rounded-lg bg-white px-3 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                  <span className="text-[12px] text-neutral-900/45">{field.k}</span>
                  <span className="truncate text-[13px] font-semibold tabular-nums text-neutral-900">{field.v}</span>
                </motion.div>
              ))}
            </div>

            {collapsing && (
              <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
                <span className="mb-2 block text-[11px] tracking-wide text-neutral-900/35">{t('ledger')}</span>
                <div className="overflow-x-auto rounded-xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead><tr className="border-b border-[#ececec]">{['colDate', 'colDoc', 'colCounter', 'colNet', 'colVat', 'colTotal'].map((key) => <th key={key} className="px-3 py-2 text-[10px] font-semibold tracking-wide text-neutral-900/35">{t(key)}</th>)}<th className="w-8" /></tr></thead>
                    <tbody><tr style={{ background: posted ? 'color-mix(in srgb, #10b981 9%, white)' : 'transparent' }}>
                      {[doc.row.date, doc.row.doc, doc.row.counter, doc.row.net, doc.row.vat, doc.row.total].map((value, index) => <td key={`${index}-${value}`} className={cn('whitespace-nowrap px-3 py-3 text-[12px] tabular-nums text-neutral-900', index === 5 && 'font-extrabold')}>{value}</td>)}
                      <td className="px-2 text-[#065f46]">{posted && <Ico name="solar:check-circle-bold-duotone" className="h-5 w-5" />}</td>
                    </tr></tbody>
                  </table>
                </div>
                <p className="mt-3 text-[12px] text-neutral-900/50">{t('note')}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
