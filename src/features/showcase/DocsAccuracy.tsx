'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import {
  ACCURACY_LINES,
  createTimelinePlayer,
  initialAccuracyLine,
  partitionFields,
} from '@/features/showcase/docs-demo-models.mjs';
import { startTimelineWhenVisible } from './docs-demo-visibility.mjs';

/* =========================================================================
   DocsAccuracy: HOW it works. He sets the line himself and watches what it costs him.

   This is the honesty mechanism the whole product rests on, and it is the one number every
   vendor in this category hides. Extraction is never certain. It is certain-ish, per field,
   and the only responsible thing to do with that uncertainty is to show it and to refuse to
   post anything below a line the customer picked.

   So the widget hands him the line. Drag it up: almost nothing posts itself and nothing is
   wrong, and at the very top we are worth nothing to him, which is exactly the position he is
   in today. Drag it down: the machine does more, and then a misread date quietly posts itself
   into a closed period and nobody ever looks at it. No totals check catches that one. That is
   the trade, it is his to make, and both ends of it are true.

   We quote no accuracy figure of our own anywhere near this. There is no published Georgian
   extraction benchmark from any vendor on earth, so a percentage here would be a percentage we
   invented. We measure it on his documents, in the pilot, before he pays for anything. A vendor
   who claims 99 percent and shows you no confidence at all is a vendor who will post a wrong
   number into your client's filing and never mention it, and a bookkeeper who has been burned
   once already knows that. Showing the machine's doubt is the only claim here that can be
   checked, which is why it is the only one we make.
   ========================================================================= */

type Field = { id: string; v: string; confidence: number; bad?: boolean };

/* One sample document: a photographed fiscal receipt. Values and confidences are the screen
   data of that single run, ordered the way the extractor orders them, most certain first. The
   two `bad` fields are ones the machine actually got wrong, which is the entire point: at a
   high line a person catches them, and at a low line they post themselves. */
const FIELDS: Field[] = [
  { id: 'f1', v: 'Goodwill, Saburtalo', confidence: 99 },
  { id: 'f2', v: '00042117-8891', confidence: 98 },
  { id: 'f3', v: '175.00', confidence: 97 },
  { id: 'f4', v: 'Card, BOG', confidence: 96 },
  { id: 'f5', v: '148.31', confidence: 94 },
  { id: 'f6', v: '26.69', confidence: 92 },
  { id: 'f7', v: '11', confidence: 88 },
  { id: 'f8', v: '19:14', confidence: 84 },
  { id: 'f9', v: 'Coffee, 250 g', confidence: 76 },
  { id: 'f10', v: '12.90', confidence: 74 },
  { id: 'f11', v: '28.06.2026', confidence: 68, bad: true },
  { id: 'f12', v: 'for the office', confidence: 39, bad: true },
];

const MIN = 35;
const MAX = 100;
type TimelinePlayer = { play: () => void; replay: () => void; cancel: () => void };

type RowState = 'auto' | 'human' | 'wrong';

const TONE: Record<RowState, { bar: string; chip: string; card: string }> = {
  auto: {
    bar: '#10b981',
    chip: 'bg-[#10b981]/14 text-[#065f46]',
    card: 'shadow-[0_0_0_1px_rgba(0,0,0,0.06)]',
  },
  human: {
    bar: '#f59e0b',
    chip: 'bg-[#f59e0b]/16 text-[#92400e]',
    card: 'shadow-[0_0_0_1px_#f59e0b]',
  },
  wrong: {
    bar: '#ef4444',
    chip: 'bg-[#ef4444]/14 text-[#7f1d1d]',
    card: 'shadow-[0_0_0_1px_#ef4444]',
  },
};

export function DocsAccuracy() {
  const t = useTranslations('product.accuracy');
  const reduced = useReducedMotion();
  const [line, setLine] = useState(() => initialAccuracyLine(false));
  const playerRef = useRef<TimelinePlayer | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const visibilityCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const timeline = createTimelinePlayer({
      stages: ACCURACY_LINES,
      onStage: setLine,
      reducedMotion: Boolean(reduced),
    });
    playerRef.current = timeline;
    const stopVisibility = startTimelineWhenVisible({
      node: sectionRef.current,
      reducedMotion: Boolean(reduced),
      play: timeline.play,
    });
    visibilityCleanupRef.current = stopVisibility;

    return () => {
      stopVisibility();
      if (visibilityCleanupRef.current === stopVisibility) visibilityCleanupRef.current = null;
      timeline.cancel();
      if (playerRef.current === timeline) playerRef.current = null;
    };
  }, [reduced]);

  const setManualLine = useCallback((value: number) => {
    visibilityCleanupRef.current?.();
    visibilityCleanupRef.current = null;
    playerRef.current?.cancel();
    setLine(value);
  }, []);

  const replay = useCallback(() => playerRef.current?.replay(), []);

  const { auto, human, wrong, boundary } = useMemo(
    () => partitionFields(FIELDS, line),
    [line],
  );

  const verdict: 'green' | 'neutral' | 'red' =
    wrong.length > 0 ? 'red' : auto.length === 0 ? 'neutral' : 'green';

  const verdictTone: Record<typeof verdict, { dot: string; text: string; ring: string }> = {
    green: { dot: 'bg-[#10b981]', text: 'text-[#065f46]', ring: 'shadow-[0_0_0_1px_#10b981]' },
    neutral: {
      dot: 'bg-neutral-900/25',
      text: 'text-neutral-900',
      ring: 'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]',
    },
    red: { dot: 'bg-[#ef4444]', text: 'text-[#7f1d1d]', ring: 'shadow-[0_0_0_1px_#ef4444]' },
  };

  /* One flat list so the divider keeps a stable key and framer slides it between the rows
     instead of teleporting it. The rows are sorted by confidence, so the line is a single
     position in the stack and it sweeps as he drags. */
  const stack: React.ReactNode[] = [];
  FIELDS.forEach((f, i) => {
    if (i === boundary) {
      stack.push(<TheLine key="line" value={line} label={t('theLine')} reduced={reduced} />);
    }
    const isAuto = f.confidence >= line;
    const state: RowState = isAuto ? (f.bad ? 'wrong' : 'auto') : 'human';
    stack.push(
      <Row
        key={f.id}
        name={t(f.id)}
        value={f.v}
        confidence={f.confidence}
        state={state}
        chip={t(state === 'auto' ? 'autoChip' : state === 'human' ? 'humanChip' : 'wrongChip')}
        note={
          state === 'wrong'
            ? { text: t(`w${f.id.slice(1)}`), tone: 'bad' }
            : f.bad
              ? { text: t('caught'), tone: 'ok' }
              : null
        }
        reduced={reduced}
      />,
    );
  });
  if (boundary >= FIELDS.length) {
    stack.push(<TheLine key="line" value={line} label={t('theLine')} reduced={reduced} />);
  }

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(280px,400px)_1fr] lg:gap-14">
        <div ref={sectionRef}>
          <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
            {t('subtitle')}
          </p>

          {/* the control. this is the whole widget. */}
          <div className="mt-8 rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="docs-line" className="text-[13px] font-semibold text-neutral-900">
                {t('thresholdLabel')}
              </label>
              <span
                className="font-display text-2xl font-extrabold tabular-nums"
                style={{ color: 'var(--brand-ink)' }}
              >
                {line}
              </span>
            </div>
            <input
              id="docs-line"
              type="range"
              min={MIN}
              max={MAX}
              step={1}
              value={line}
              onChange={(e) => setManualLine(Number(e.target.value))}
              aria-describedby="docs-line-hint"
              aria-valuetext={`${line}%`}
              className="mt-1 h-11 w-full cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
              style={{ accentColor: 'var(--brand)' }}
            />
            <p
              id="docs-line-hint"
              className="flex justify-between gap-4 text-[11px] leading-snug text-[#737373]"
            >
              <span className="max-w-[45%]">{t('lowEnd')}</span>
              <span className="max-w-[45%] text-right">{t('highEnd')}</span>
            </p>
            <button
              type="button"
              onClick={replay}
              className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-white px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 md:hover:bg-[#f0f0f0]"
            >
              {t('replay')}
            </button>
          </div>

          {/* the trade, in three live counters */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat n={auto.length} label={t('auto')} colour="#065f46" />
            <Stat n={human.length} label={t('human')} colour="#92400e" />
            <Stat
              n={wrong.length}
              label={t('wrong')}
              colour={wrong.length > 0 ? '#7f1d1d' : 'rgba(0,0,0,0.35)'}
              alarm={wrong.length > 0}
            />
          </div>

          <div
            className={cn('mt-4 rounded-2xl bg-white p-5', verdictTone[verdict].ring)}
            role="status"
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  'mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full',
                  verdictTone[verdict].dot,
                )}
                aria-hidden="true"
              />
              <p
                className={cn(
                  'text-pretty text-[15px] font-semibold leading-relaxed',
                  verdictTone[verdict].text,
                )}
              >
                {t(verdict)}
              </p>
            </div>
          </div>

          <p className="mt-6 text-pretty text-[15px] font-semibold leading-relaxed text-neutral-900">
            {t('claim')}
          </p>
          <p className="mt-3 text-pretty text-[12px] leading-relaxed text-[#737373]">
            {t('honest')}
          </p>
        </div>

        {/* the document, with its doubt showing */}
        <div className="rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-[11px] uppercase tracking-wide text-neutral-900/35">
              {t('doc')}
            </span>
            <span className="text-[11px] tabular-nums text-neutral-900/35">{t('sample')}</span>
          </div>

          <div className="mt-4 flex flex-col gap-1.5">{stack}</div>
        </div>
      </div>
    </SectionContainer>
  );
}

function TheLine({
  value,
  label,
  reduced,
}: {
  value: number;
  label: string;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      layout={!reduced}
      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-3 py-1.5"
    >
      <span
        className="h-px flex-1 shrink"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, var(--brand) 0 6px, transparent 6px 11px)',
        }}
        aria-hidden="true"
      />
      <span
        className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
        style={{ background: 'var(--brand-cta)' }}
      >
        <span className="tabular-nums">{value}</span> {label}
      </span>
      <span
        className="h-px flex-1 shrink"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, var(--brand) 0 6px, transparent 6px 11px)',
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function Row({
  name,
  value,
  confidence,
  state,
  chip,
  note,
  reduced,
}: {
  name: string;
  value: string;
  confidence: number;
  state: RowState;
  chip: string;
  note: { text: string; tone: 'ok' | 'bad' } | null;
  reduced: boolean | null;
}) {
  const tone = TONE[state];
  return (
    <motion.div
      layout={!reduced}
      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'rounded-xl bg-white px-3 py-2.5 transition-[box-shadow] duration-200 ease-out',
        tone.card,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[12px] text-neutral-900/45">{name}</span>
          <span className="block truncate text-[13px] font-semibold tabular-nums text-neutral-900">
            {value}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-neutral-900/8 sm:block"
            aria-hidden="true"
          >
            <span
              className="block h-full rounded-full transition-[width,background-color] duration-200 ease-out"
              style={{ width: `${confidence}%`, background: tone.bar }}
            />
          </span>
          <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-neutral-900/55">
            {confidence}
          </span>
          <span
            className={cn(
              'w-[78px] shrink-0 rounded-full px-2 py-0.5 text-center text-[9px] font-bold uppercase leading-tight',
              tone.chip,
            )}
          >
            {chip}
          </span>
        </div>
      </div>

      {note && (
        <p
          className={cn(
            'mt-2 text-pretty text-[12px] leading-snug',
            note.tone === 'bad' ? 'font-semibold text-[#7f1d1d]' : 'text-[#065f46]',
          )}
        >
          {note.text}
        </p>
      )}
    </motion.div>
  );
}

function Stat({
  n,
  label,
  colour,
  alarm,
}: {
  n: number;
  label: string;
  colour: string;
  alarm?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white px-3 py-3',
        alarm ? 'shadow-[0_0_0_1px_#ef4444]' : 'shadow-[0_0_0_1px_rgba(0,0,0,0.06)]',
      )}
    >
      <span
        className="block font-display text-2xl font-extrabold tabular-nums leading-none"
        style={{ color: colour }}
      >
        {n}
      </span>
      <span className="mt-1.5 block text-pretty text-[10px] leading-tight text-[#737373]">
        {label}
      </span>
    </div>
  );
}
