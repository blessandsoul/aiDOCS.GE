'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';

import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

import { DocsDemoStory } from './DocsDemoStory';
import { createDocsDemoLoop } from './docs-demo-visibility.mjs';

type Field = { key: string; value: string };
type DemoLoop = ReturnType<typeof createDocsDemoLoop>;

const FIELDS: Field[] = [
  { key: 'sourceSupplier', value: 'Pirelli Tyre S.p.A.' },
  { key: 'sourceInvoice', value: 'IT-2026-04417' },
  { key: 'sourceDate', value: '28.06.2026' },
  { key: 'colNet', value: '44 512.80 GEL' },
  { key: 'colVat', value: '0.00 GEL' },
  { key: 'sourceTotal', value: '44 512.80 GEL' },
];

const ROW = {
  date: '28.06.26',
  doc: 'IT-2026-04417',
  counterparty: 'Pirelli Tyre S.p.A.',
  net: '44 512.80',
  vat: '0.00',
  total: '44 512.80',
};

const FIELD_MS = 350;
const COLLAPSE_AT = 4300;
const POSTED_AT = 6400;

export function DocsToRow() {
  const t = useTranslations('product.row');
  const reduced = useReducedMotion();
  const [ms, setMs] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<DemoLoop | null>(null);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const play = () => {
      clear();
      setMs(0);
      FIELDS.forEach((_, index) => {
        timers.current.push(
          setTimeout(() => setMs((index + 1) * FIELD_MS), (index + 1) * FIELD_MS),
        );
      });
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

  const showResult = () => {
    loopRef.current?.takeControl();
    setMs(POSTED_AT);
  };
  const replay = () => loopRef.current?.replay();
  const shown = Math.min(Math.floor(ms / FIELD_MS), FIELDS.length);
  const preparing = ms >= COLLAPSE_AT;
  const posted = ms >= POSTED_AT;
  const status = posted ? 'posted' : preparing ? 'posting' : 'extracting';

  return (
    <SectionContainer
      className="py-16 md:py-24 lg:py-28"
      data-landing-demo="true"
      data-demo-id="docs-to-row"
      data-demo-detail={posted ? 'final' : preparing ? 'posting' : `extracting-${shown}`}
      aria-live="off"
    >
      <DocsDemoStory
        eyebrow={t('eyebrow')}
        title={t('heading')}
        description={t('subtitle')}
        icon="solar:pen-new-square-bold-duotone"
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
              <Ico name="solar:text-bold-duotone" className="h-5 w-5 shrink-0 text-[var(--brand)]" />
              <span className="min-w-0 break-all text-[11px] leading-4">IT-2026-04417.pdf</span>
            </span>
            <button
              type="button"
              onClick={replay}
              data-demo-replay="docs-to-row"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.16)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              aria-label={t('again')}
            >
              <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
              <span className="hidden sm:inline">{t('again')}</span>
            </button>
          </div>

          <div className="mt-5 grid min-w-0 gap-4 xl:grid-cols-[minmax(160px,0.72fr)_minmax(0,1.28fr)]">
            <div className="min-w-0 rounded-2xl bg-[#f5f3ec] p-4 text-[#111827] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
              <span className="text-[10px] font-bold tracking-wide text-[#4B5563]">{t('source')}</span>
              <p className="mt-4 text-[17px] font-extrabold leading-tight">Pirelli Tyre S.p.A.</p>
              <p className="mt-1 text-[11px] text-[#4B5563]">INVOICE IT-2026-04417</p>
              <div className="my-4 h-px bg-[#111827]/10" aria-hidden="true" />
              <dl className="space-y-3 text-[11px]">
                <div>
                  <dt className="text-[#4B5563]">{t('sourceDate')}</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">28.06.2026</dd>
                </div>
                <div>
                  <dt className="text-[#4B5563]">{t('sourceTotal')}</dt>
                  <dd className="mt-0.5 text-[16px] font-extrabold tabular-nums">44 512.80 GEL</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-2" aria-hidden="true">
                {[82, 64, 91, 55].map((width) => (
                  <span key={width} className="block h-1.5 rounded-full bg-[#111827]/10" style={{ width: `${width}%` }} />
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex min-h-8 flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-white/65">{t('details')}</span>
                <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-[10px] font-bold text-white">
                  <Ico
                    name={posted ? 'solar:check-circle-bold-duotone' : preparing ? 'solar:database-bold-duotone' : 'solar:camera-bold-duotone'}
                    className="h-3.5 w-3.5 text-[var(--brand)]"
                  />
                  {t(status)}
                </span>
              </div>

              <div className="mt-3 grid gap-2">
                {FIELDS.map((field, index) => {
                  const visible = index < shown || preparing;
                  return (
                    <div key={field.key} className="grid min-h-[46px] grid-cols-[minmax(92px,0.8fr)_minmax(0,1.2fr)] items-center gap-3 rounded-xl bg-white/[0.07] px-3 py-2">
                      <span className="text-[10px] leading-4 text-white/60">{t(field.key)}</span>
                      <span className="grid min-w-0">
                        <span
                          aria-hidden={!visible}
                          className={cn(
                            'col-start-1 row-start-1 break-words text-right text-[11px] font-bold tabular-nums text-white transition-[opacity,transform] duration-200',
                            visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                          )}
                        >
                          {field.value}
                        </span>
                        <span
                          aria-hidden={visible}
                          className={cn(
                            'col-start-1 row-start-1 ml-auto h-2 w-3/4 self-center rounded-full bg-white/14 transition-opacity duration-200',
                            visible ? 'opacity-0' : 'opacity-100',
                          )}
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={showResult}
                disabled={posted}
                data-demo-manual="docs-to-row"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 text-[12px] font-extrabold text-white transition-[transform,opacity] duration-150 active:scale-[0.98] disabled:cursor-default disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              >
                <Ico name={posted ? 'solar:check-circle-bold-duotone' : 'solar:arrow-right-bold-duotone'} className="h-4 w-4" />
                {posted ? t('posted') : t('showResult')}
              </button>
            </div>
          </div>

          <div
            data-row-ledger-slot="true"
            className={cn(
              'mt-4 min-w-0 rounded-2xl bg-white p-3 text-[#111827] transition-[opacity,box-shadow] duration-300',
              preparing ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.18)]' : 'shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
            )}
          >
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <span className="text-[10px] font-bold text-[#667085]">{t('ledger')}</span>
              <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold', posted ? 'text-[#065f46]' : 'text-[#667085]')}>
                <Ico name={posted ? 'solar:check-circle-bold-duotone' : 'solar:clock-circle-bold-duotone'} className="h-3.5 w-3.5" />
                {t(posted ? 'posted' : 'posting')}
              </span>
            </div>
            <dl className="grid gap-2 rounded-xl bg-[#f8fafc] p-3 sm:hidden">
              {[
                [t('colDate'), preparing ? ROW.date : '...'],
                [t('colCounter'), preparing ? ROW.counterparty : '...'],
                [t('colTotal'), preparing ? ROW.total : '...'],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(80px,0.8fr)_minmax(0,1.2fr)] gap-3">
                  <dt className="text-[9px] font-semibold text-[#4B5563]">{label}</dt>
                  <dd className="break-words text-right text-[10px] font-extrabold tabular-nums text-[#111827]">{value}</dd>
                </div>
              ))}
            </dl>
            <div
              className="hidden w-full min-w-0 max-w-full overflow-x-auto rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] focus-visible:ring-offset-2 sm:block"
              role="region"
              aria-label={t('ledger')}
              tabIndex={0}
            >
              <table className="w-full min-w-[520px] border-collapse text-left">
                <caption className="sr-only">{t('ledger')}</caption>
                <thead>
                  <tr className="border-b border-[#ececec]">
                    {['colDate', 'colDoc', 'colCounter', 'colNet', 'colVat', 'colTotal'].map((key) => (
                      <th key={key} scope="col" className="px-2 py-2 text-[9px] font-semibold text-[#667085]">
                        {t(key)}
                      </th>
                    ))}
                    <th scope="col" className="w-8">
                      <span className="sr-only">{t('status')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cn(posted && 'bg-[#10b981]/8')}>
                    {[ROW.date, ROW.doc, ROW.counterparty, ROW.net, ROW.vat, ROW.total].map((value, index) => (
                      <td key={`${index}-${value}`} className={cn('whitespace-nowrap px-2 py-3 text-[10px] tabular-nums text-[#111827]', index === 5 && 'font-extrabold')}>
                        {preparing ? value : '...'}
                      </td>
                    ))}
                    <td className="px-2 text-[#065f46]">
                      <span className="sr-only">{posted ? t('posted') : t('posting')}</span>
                      <Ico name={posted ? 'solar:check-circle-bold-duotone' : 'solar:clock-circle-bold-duotone'} className="h-4 w-4" aria-hidden="true" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocsDemoStory>
    </SectionContainer>
  );
}
