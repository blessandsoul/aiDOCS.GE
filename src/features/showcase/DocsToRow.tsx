'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   DocsToRow: the signature, and the payoff shot every competitor stops one step short of.

   Everyone in this category demos the same thing: a document goes in, boxes appear around
   the fields, JSON comes out. Then they stop. But nobody is buying JSON. A bookkeeper is
   buying a POSTED ROW in the system she already uses, and the last step, the one from a
   pile of extracted fields to a single line in the journal, is the entire product.

   So this widget does the extraction fast and almost dismissively, and spends its time on
   the collapse: the fields fold together and land as ONE row in a ledger grid with a green
   check. That is what she is paying for, and if she sees it once she does not need the copy.

   Raw OCR is a commodity, roughly 1.50 dollars per thousand pages from Amazon, and the
   section says so out loud. Admitting that the input is cheap is what makes the claim about
   the output believable.
   ========================================================================= */

type Field = { k: string; v: string; slow?: boolean };
type Doc = {
  id: string;
  fields: Field[];
  row: { date: string; doc: string; counter: string; net: string; vat: string; total: string };
};

const DOCS: Doc[] = [
  {
    id: 'd1',
    fields: [
      { k: 'Supplier', v: 'Pirelli Tyre S.p.A.' },
      { k: 'Invoice', v: 'IT-2026-04417' },
      { k: 'Date', v: '2026-06-28' },
      { k: 'VAT ID', v: 'IT00860340157' },
      { k: 'Net', v: '14,280.00 EUR' },
      { k: 'VAT 0%', v: '0.00 EUR', slow: true },
      { k: 'Total', v: '14,280.00 EUR' },
      { k: 'Incoterms', v: 'CIP Tbilisi' },
    ],
    row: {
      date: '28.06.26',
      doc: 'IT-2026-04417',
      counter: 'Pirelli Tyre S.p.A.',
      net: '44 512.80',
      vat: '0.00',
      total: '44 512.80',
    },
  },
  {
    id: 'd2',
    fields: [
      { k: 'Account', v: 'GE29 BG00 0000 1234 5678 90' },
      { k: 'Period', v: '01.06 to 30.06.2026' },
      { k: 'Counterparty', v: 'Nikora Trade LLC' },
      { k: 'Reference', v: 'Payment, invoice 8842' },
      { k: 'Date', v: '2026-06-14' },
      { k: 'Debit', v: '0.00 GEL' },
      { k: 'Credit', v: '9,340.00 GEL' },
      { k: 'Balance', v: '112,904.16 GEL', slow: true },
    ],
    row: {
      date: '14.06.26',
      doc: 'BOG 8842',
      counter: 'Nikora Trade LLC',
      net: '7 915.25',
      vat: '1 424.75',
      total: '9 340.00',
    },
  },
  {
    id: 'd3',
    fields: [
      { k: 'Merchant', v: 'Goodwill, Saburtalo' },
      { k: 'Fiscal', v: '00042117-8891' },
      { k: 'Date', v: '2026-07-02' },
      { k: 'Items', v: '11' },
      { k: 'Net', v: '148.31 GEL' },
      { k: 'VAT 18%', v: '26.69 GEL' },
      { k: 'Total', v: '175.00 GEL', slow: true },
      { k: 'Paid', v: 'Card, BOG' },
    ],
    row: {
      date: '02.07.26',
      doc: '00042117-8891',
      counter: 'Goodwill, Saburtalo',
      net: '148.31',
      vat: '26.69',
      total: '175.00',
    },
  },
];

const FIELD_MS = 210;
const COLLAPSE_AT = 2200;
const POSTED_AT = 3100;

export function DocsToRow() {
  const t = useTranslations('product.row');
  const reduced = useReducedMotion();
  const [pick, setPick] = useState(0);
  const [ms, setMs] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const doc = DOCS[pick];

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clear, [clear]);
  useEffect(() => {
    clear();
    setMs(-1);
  }, [pick, clear]);

  const run = useCallback(() => {
    clear();
    setMs(0);
    if (reduced) {
      setMs(POSTED_AT);
      return;
    }
    doc.fields.forEach((_, i) => {
      timers.current.push(setTimeout(() => setMs((i + 1) * FIELD_MS), (i + 1) * FIELD_MS));
    });
    timers.current.push(setTimeout(() => setMs(COLLAPSE_AT), COLLAPSE_AT));
    timers.current.push(setTimeout(() => setMs(POSTED_AT), POSTED_AT));
  }, [clear, doc.fields, reduced]);

  const shown = ms < 0 ? 0 : Math.min(Math.floor(ms / FIELD_MS), doc.fields.length);
  const collapsing = ms >= COLLAPSE_AT;
  const posted = ms >= POSTED_AT;
  const running = ms >= 0 && !posted;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
          {t('eyebrow')}
        </span>
        <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[12px] uppercase tracking-wide text-neutral-900/35">
          {t('pick')}
        </span>
        {DOCS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setPick(i)}
            aria-pressed={i === pick}
            className={cn(
              'min-h-[40px] rounded-full px-4 text-[13px] font-medium',
              'transition-[transform,background-color,box-shadow,color] duration-150 ease-out',
              'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
              i === pick
                ? 'bg-[var(--brand)] text-white'
                : 'bg-[#fafafa] text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:hover:bg-[#f0f0f0]',
            )}
          >
            {t(d.id)}
          </button>
        ))}
        <button
          type="button"
          onClick={run}
          disabled={running}
          className={cn(
            'ml-auto inline-flex h-12 items-center rounded-full px-7 text-[14px] font-bold text-white',
            'transition-[transform,filter] duration-150 ease-out active:scale-[0.96] md:hover:brightness-110',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
            running && 'opacity-70',
          )}
          style={{ background: 'var(--brand)' }}
        >
          {running ? t('running') : posted ? t('again') : t('play')}
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(220px,1fr)_1.4fr]">
        {/* the document itself, deliberately ugly */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0e0e11] p-5">
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-[220px] rounded-sm bg-[#f3f1ea] p-3 shadow-lg"
            style={{ transform: 'rotate(-1.4deg)' }}
          >
            {/* the crease */}
            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_46%,rgba(0,0,0,0.07)_49%,transparent_53%)]"
              aria-hidden="true"
            />
            <span className="block h-2 w-2/3 rounded-sm bg-neutral-900/70" />
            <span className="mt-1.5 block h-1.5 w-1/3 rounded-sm bg-neutral-900/25" />
            <span className="mt-4 block h-px w-full bg-neutral-900/15" />
            {Array.from({ length: 9 }, (_, i) => (
              <span
                key={i}
                className="mt-2 block h-1.5 rounded-sm bg-neutral-900/15"
                style={{ width: `${45 + ((i * 37) % 50)}%` }}
              />
            ))}
            <span className="mt-4 block h-px w-full bg-neutral-900/15" />
            <span className="mt-2 block h-2.5 w-2/5 rounded-sm bg-neutral-900/60" />
          </div>
          <p className="mt-5 text-pretty text-[11px] leading-relaxed text-white/35">
            {t('commodity')}
          </p>
        </div>

        {/* extraction, then the collapse */}
        <div className="relative min-h-[420px] rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-6">
          <span className="text-[11px] uppercase tracking-wide text-neutral-900/35">
            {posted ? t('posted') : collapsing ? t('posting') : t('extracting')}
          </span>

          {/* the fields */}
          <div className="mt-4 flex flex-col gap-1.5">
            {doc.fields.map((f, i) => {
              const on = i < shown;
              return (
                <motion.div
                  key={f.k}
                  initial={false}
                  animate={
                    collapsing
                      ? { opacity: 0, y: 26, scale: 0.94, filter: 'blur(3px)' }
                      : { opacity: on ? 1 : 0.18, y: 0, scale: 1, filter: 'blur(0px)' }
                  }
                  transition={{
                    duration: reduced ? 0 : collapsing ? 0.38 : 0.24,
                    delay: reduced ? 0 : collapsing ? i * 0.03 : 0,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex items-baseline justify-between gap-4 rounded-lg bg-white px-3 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                >
                  <span className="text-[12px] text-neutral-900/45">{f.k}</span>
                  <span className="truncate text-[13px] font-semibold tabular-nums text-neutral-900">
                    {f.v}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* THE ROW. this is the product. */}
          {collapsing && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: reduced ? 0 : 0.32, duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6"
            >
              <span className="mb-2 block text-[11px] uppercase tracking-wide text-neutral-900/35">
                {t('ledger')}
              </span>
              <div className="overflow-x-auto rounded-xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_14px_30px_-20px_rgba(0,0,0,0.4)]">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#ececec]">
                      {['colDate', 'colDoc', 'colCounter', 'colNet', 'colVat', 'colTotal'].map((c) => (
                        <th
                          key={c}
                          className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-900/35"
                        >
                          {t(c)}
                        </th>
                      ))}
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className="transition-colors duration-200 ease-out"
                      style={{
                        background: posted
                          ? 'color-mix(in srgb, #10b981 9%, white)'
                          : 'transparent',
                      }}
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-[12px] tabular-nums text-neutral-900">
                        {doc.row.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[12px] tabular-nums text-neutral-900">
                        {doc.row.doc}
                      </td>
                      <td className="max-w-[160px] truncate px-3 py-3 text-[12px] text-neutral-900">
                        {doc.row.counter}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold tabular-nums text-neutral-900">
                        {doc.row.net}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[12px] tabular-nums text-neutral-900/60">
                        {doc.row.vat}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[13px] font-extrabold tabular-nums text-neutral-900">
                        {doc.row.total}
                      </td>
                      <td className="px-2">
                        <motion.span
                          initial={reduced ? false : { scale: 0.25, opacity: 0, filter: 'blur(4px)' }}
                          animate={
                            posted
                              ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
                              : { scale: 0.25, opacity: 0, filter: 'blur(4px)' }
                          }
                          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981] text-[11px] font-bold text-white"
                          aria-hidden="true"
                        >
                          ok
                        </motion.span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {posted && (
                <p className="mt-3 text-pretty text-[12px] leading-relaxed text-[#737373]">
                  {t('note')}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
