import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const heroSource = readFileSync(new URL('./LandingHero.tsx', import.meta.url), 'utf8');
const heroCss = readFileSync(new URL('./landing-hero.css', import.meta.url), 'utf8');
const productCopyCssUrl = new URL('./landing-product-copy.css', import.meta.url);
const productCopyCss = existsSync(productCopyCssUrl) ? readFileSync(productCopyCssUrl, 'utf8') : '';
const proofSource = readFileSync(
  new URL('../../showcase/HeroProof.tsx', import.meta.url),
  'utf8',
);
const magneticSource = readFileSync(
  new URL('../../../components/common/MagneticButton.tsx', import.meta.url),
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

test('hero proof uses the canonical loop and bundled status icon', () => {
  assert.match(proofSource, /createDocsDemoLoop\(/);
  assert.match(proofSource, /cycleMs: 2100/);
  assert.doesNotMatch(proofSource, /createDemoLoop|holdMs/);
  assert.match(proofSource, /<Ico name="solar:check-circle-bold-duotone"/);
  assert.doesNotMatch(proofSource, /uppercase|✓|✅|❌|⚠|—|–/u);
  assert.match(heroSource, /<Ico name="solar:arrow-right-bold-duotone"/);
  assert.doesNotMatch(heroSource, /<svg[\s\S]*?<polyline points="12 5 19 12 12 19"/);
});

test('product copy keeps its authored case in work, faq, and cta', () => {
  assert.match(heroSource, /import '\.\/landing-product-copy\.css';/);
  assert.match(productCopyCss, /#work \.uppercase[\s\S]*?#faq \.uppercase[\s\S]*?#cta \.uppercase/);
  assert.match(productCopyCss, /text-transform: none;/);
});

test('reduced motion keeps server and client markup deterministic', () => {
  assert.doesNotMatch(proofSource, /initial=\{reduced \? false/);
  assert.doesNotMatch(magneticSource, /if \(reducedMotion\(\)\) \{\s*return <span/);
  assert.match(magneticSource, /const handleMove[\s\S]*?if \(reducedMotion\(\)\) return;/);
});
