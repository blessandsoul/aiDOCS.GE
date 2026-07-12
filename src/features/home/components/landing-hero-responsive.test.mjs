import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const heroSource = readFileSync(new URL('./LandingHero.tsx', import.meta.url), 'utf8');
const heroCss = readFileSync(new URL('./landing-hero.css', import.meta.url), 'utf8');
const proofSource = readFileSync(
  new URL('../../showcase/HeroProof.tsx', import.meta.url),
  'utf8',
);

test('mobile hero keeps its grid and animated headline inside the padded viewport', () => {
  assert.match(
    heroSource,
    /const availableWidth = el\.parentElement\?\.clientWidth \?\? maxW \+ caretW;/,
  );
  assert.match(
    heroSource,
    /Math\.min\(Math\.ceil\(maxW \+ caretW\), availableWidth\)/,
  );
  assert.match(heroSource, /className="w-full min-w-0 max-w-\[1180px\]/);
  assert.match(heroSource, /className="min-w-0 order-1 text-center/);
  assert.match(heroSource, /className="relative min-w-0 order-2/);
  assert.match(
    heroCss,
    /@media \(max-width: 640px\) \{\s*\.typewriter \{[^}]*max-width: 100%;[^}]*white-space: normal;/,
  );
  assert.match(
    proofSource,
    /className="grid grid-cols-1 items-center gap-4 sm:grid-cols-\[86px_minmax\(0,1fr\)\]/,
  );
  assert.match(proofSource, /className="relative min-h-\[132px\] min-w-0 w-full"/);
  assert.match(proofSource, /className="w-full table-fixed border-collapse bg-white text-left"/);
});
