'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   DocsSplit: the highest-trust move available in this market, and it costs us half our scope.

   Georgia made electronic tax invoicing mandatory. Domestic invoices and waybills are already
   structured data sitting inside rs.ge. So an OCR vendor selling extraction for them is selling
   a solved problem, and every imported American competitor is doing exactly that, because they
   have never read a Georgian tax regulation.

   This widget hands the bookkeeper her own pile and asks her to sort it, and then tells her
   which half she should not buy from us. Voluntarily disqualifying half of our own addressable
   scope, on our own sales page, is not modesty. It is the fastest way to prove we know this
   country, and it makes everything else we say more credible for free.

   It is also the thing no competitor will copy, because copying it means admitting they were
   quoting for the free half.
   ========================================================================= */

type Bucket = 'free' | 'paid';
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

export function DocsSplit() {
  const t = useTranslations('product.split');
  const reduced = useReducedMotion();
  const [placed, setPlaced] = useState<Record<string, Bucket>>({});
  const [revealed, setRevealed] = useState(false);

  const unsorted = DOCS.filter((d) => !placed[d.id]);
  const correct = DOCS.filter((d) => placed[d.id] === d.answer).length;
  const done = unsorted.length === 0;

  const place = (id: string, b: Bucket) => setPlaced((p) => ({ ...p, [id]: b }));
  const reset = () => {
    setPlaced({});
    setRevealed(false);
  };

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="mb-9 max-w-2xl">
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

      {/* the pile */}
      {!done && (
        <div className="mb-6">
          <span className="text-[11px] uppercase tracking-wide text-neutral-900/35">
            {t('unsorted')}
          </span>
          <ul className="mt-3 flex flex-col gap-2">
            {unsorted.map((d) => (
              <motion.li
                key={d.id}
                layout={!reduced}
                initial={false}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-[15px] font-semibold text-neutral-900">{t(d.id)}</span>
                <span className="flex shrink-0 gap-2">
                  <Choose onClick={() => place(d.id, 'free')}>{t('free')}</Choose>
                  <Choose onClick={() => place(d.id, 'paid')} primary>
                    {t('paid')}
                  </Choose>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* the two buckets */}
      <div className="grid gap-4 md:grid-cols-2">
        <Bin
          title={t('free')}
          tone="free"
          docs={DOCS.filter((d) => placed[d.id] === 'free')}
          answerOf={(id) => DOCS.find((d) => d.id === id)!.answer}
          t={t}
          reveal={revealed || done}
          reduced={reduced}
        />
        <Bin
          title={t('paid')}
          tone="paid"
          docs={DOCS.filter((d) => placed[d.id] === 'paid')}
          answerOf={(id) => DOCS.find((d) => d.id === id)!.answer}
          t={t}
          reveal={revealed || done}
          reduced={reduced}
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        {(done || revealed) && (
          <p className="text-[15px] font-semibold tabular-nums text-neutral-900">
            {t('score')} {correct} {t('of')} {DOCS.length}
          </p>
        )}
        {!done && !revealed && (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#fafafa] px-5 text-[14px] font-medium text-neutral-900/70 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] md:hover:bg-[#f0f0f0]"
          >
            {t('reveal')}
          </button>
        )}
        {(done || revealed) && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#fafafa] px-5 text-[14px] font-medium text-neutral-900/70 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] md:hover:bg-[#f0f0f0]"
          >
            {t('reset')}
          </button>
        )}
      </div>

      {(done || revealed) && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-5 max-w-2xl text-pretty text-[15px] font-semibold leading-relaxed text-neutral-900"
        >
          {t('outro')}
        </motion.p>
      )}
    </SectionContainer>
  );
}

function Choose({
  onClick,
  primary,
  children,
}: {
  onClick: () => void;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'min-h-[40px] rounded-full px-4 text-[12px] font-semibold',
        'transition-[transform,background-color] duration-150 ease-out active:scale-[0.96]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
        primary
          ? 'bg-[var(--brand)] text-white md:hover:brightness-110'
          : 'bg-[#f0f0f0] text-neutral-900/70 md:hover:bg-[#e8e8e8]',
      )}
    >
      {children}
    </button>
  );
}

function Bin({
  title,
  tone,
  docs,
  answerOf,
  t,
  reveal,
  reduced,
}: {
  title: string;
  tone: Bucket;
  docs: { id: string }[];
  answerOf: (id: string) => Bucket;
  t: (k: string) => string;
  reveal: boolean;
  reduced: boolean | null;
}) {
  return (
    <div
      className={cn(
        'min-h-[180px] rounded-2xl p-5',
        tone === 'free'
          ? 'bg-[#fafafa] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]'
          : 'shadow-[0_0_0_1px_var(--brand)]',
      )}
      style={
        tone === 'paid'
          ? { background: 'color-mix(in srgb, var(--brand) 8%, white)' }
          : undefined
      }
    >
      <span className="block text-pretty text-[13px] font-bold leading-snug text-neutral-900">
        {title}
      </span>
      <ul className="mt-4 flex flex-col gap-2">
        {docs.map((d) => {
          const right = answerOf(d.id) === tone;
          return (
            <motion.li
              key={d.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.95, filter: 'blur(3px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-xl bg-white px-3 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-[13px] font-semibold text-neutral-900">{t(d.id)}</span>
                {reveal && (
                  <span
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
                      right ? 'bg-[#10b981]/14 text-[#065f46]' : 'bg-[#f59e0b]/16 text-[#92400e]',
                    )}
                  >
                    {right ? t('correct') : t('wrong')}
                  </span>
                )}
              </span>
              {reveal && (
                <span className="mt-1.5 block text-pretty text-[12px] leading-snug text-[#525252]">
                  {t(`e${d.id.slice(1)}`)}
                </span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
