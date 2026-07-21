import type { ReactNode } from 'react';

import { Ico } from '@/components/common/Ico';
import { cn } from '@/lib/utils';

type DocsDemoStoryProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  result: ReactNode;
  children: ReactNode;
  visualFirst?: boolean;
};

export function DocsDemoStory({
  eyebrow,
  title,
  description,
  icon,
  result,
  children,
  visualFirst = false,
}: DocsDemoStoryProps) {
  return (
    <article
      data-docs-demo-story="true"
      data-visual-first={visualFirst ? 'true' : 'false'}
      className={cn(
        'grid min-w-0 items-center gap-8 overflow-hidden rounded-[32px] bg-white p-5 shadow-[0_0_0_1px_rgba(17,24,39,0.07),0_28px_72px_-50px_rgba(39,75,145,0.34)] md:p-8 lg:min-h-[610px] lg:gap-x-12 lg:gap-y-7 lg:p-10 xl:gap-x-16 xl:p-14',
        visualFirst
          ? 'lg:grid-cols-[minmax(360px,1.12fr)_minmax(0,0.88fr)]'
          : 'lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)]',
      )}
    >
      <div className={cn('min-w-0 lg:row-start-1', visualFirst ? 'lg:col-start-2' : 'lg:col-start-1')}>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand-ink)]">
          <Ico name={icon} className="h-6 w-6" />
        </span>
        <span className="mt-5 block text-[12px] font-semibold tracking-wide text-[#667085]">
          {eyebrow}
        </span>
        <h2 className="mt-3 text-balance font-display text-[30px] font-extrabold leading-[33px] tracking-tight text-[#111827] md:text-[36px] md:leading-[40px]">
          {title}
        </h2>
        <p className="mt-4 max-w-[58ch] text-pretty text-[15px] leading-6 text-[#4B5563] md:text-[16px] md:leading-7">
          {description}
        </p>
      </div>

      <div className={cn('min-w-0 lg:row-span-2 lg:row-start-1', visualFirst ? 'lg:col-start-1' : 'lg:col-start-2')}>
        {children}
      </div>

      <div className={cn('min-w-0 lg:row-start-2', visualFirst ? 'lg:col-start-2' : 'lg:col-start-1')}>{result}</div>
    </article>
  );
}
