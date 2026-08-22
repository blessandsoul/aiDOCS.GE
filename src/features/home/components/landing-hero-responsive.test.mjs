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
const workflowSource = readFileSync(new URL('./HeroWorkflowStory.tsx', import.meta.url), 'utf8');
const workflowCss = readFileSync(new URL('./hero-workflow-story.css', import.meta.url), 'utf8');
const magneticSource = readFileSync(
  new URL('../../../components/common/MagneticButton.tsx', import.meta.url),
  'utf8',
);

test('mobile hero keeps the shared rotating headline and demo inside the padded viewport', () => {
  assert.match(heroSource, /data-family-shell="true" className="hero-family-shell/);
  assert.match(heroSource, /className="hero-copy-intro order-1 min-w-0 text-center/);
  assert.match(heroSource, /className="relative order-2 min-w-0/);
  assert.match(heroSource, /className="hero-copy-detail order-3 min-w-0 text-center/);
  assert.match(heroSource, /className="typewriter"/);
  assert.match(heroSource, /data-demo-state="idle"/);
  assert.match(heroSource, /IntersectionObserver/);
  assert.doesNotMatch(heroSource, /setInterval|caretW|availableWidth/);
  assert.match(heroCss, /\.hero-family-shell\{width:min\(1140px,calc\(100% - 48px\)\)/);
  assert.match(heroCss, /@media\(max-width:640px\)[^{]*\{[^}]*#hero\{padding-top:96px;/);
  assert.match(heroCss, /#hero \[data-hero-demo\]\{min-height:520px\}/);
  assert.match(heroCss, /@media\(max-width:640px\)[^{]*\{[\s\S]*?#hero \[data-hero-demo\]\{min-height:330px\}/);
  assert.match(proofSource, /<HeroWorkflowStory/u);
  assert.match(proofSource, /mode="orchestrated"/u);
  assert.match(workflowCss, /\.hero-workflow\s*\{[^}]*min-width:\s*0;[^}]*overflow:\s*hidden;/su);
  assert.match(workflowCss, /grid-template-columns:\s*38px minmax\(0, 1fr\);/u);
  assert.match(
    workflowCss,
    /@media \(max-width: 479px\)[\s\S]*?\.hero-workflow__details\s*\{\s*grid-template-columns:\s*1fr;/u,
  );
});

test('hero proof uses the canonical loop and bundled status icon', () => {
  assert.match(proofSource, /<HeroWorkflowStory/u);
  assert.match(workflowSource, /import \{ createDemoLoop \} from '\.\/lib\/demo-loop\.mjs';/u);
  assert.match(workflowSource, /const CYCLE_MS = 6_400;/u);
  assert.match(workflowSource, /threshold: 0\.35/u);
  assert.match(workflowSource, /holdMs: 2_000/u);
  assert.match(workflowSource, /<Ico name="solar:check-circle-bold-duotone"/u);
  assert.doesNotMatch(`${proofSource}\n${workflowSource}`, /✓|✅|❌|⚠|—|–/u);
  assert.match(heroSource, /<Ico name="solar:arrow-right-bold-duotone"/);
  assert.doesNotMatch(heroSource, /<svg[\s\S]*?<polyline points="12 5 19 12 12 19"/);
});

test('product copy uses the shared authored-case typography without a local override', () => {
  assert.doesNotMatch(heroSource, /landing-product-copy\.css/);
  assert.match(productCopyCss, /#work \.uppercase[\s\S]*?#faq \.uppercase[\s\S]*?#cta \.uppercase/u);
  assert.match(productCopyCss, /text-transform: none;/u);
  assert.match(heroSource, /className="typewriter"/);
  assert.doesNotMatch(heroSource, /uppercase|text-transform/u);
});

test('hero controls keep deterministic markup without cursor-following motion', () => {
  assert.doesNotMatch(proofSource, /initial=\{reduced \? false/);
  assert.doesNotMatch(workflowSource, /framer-motion|AnimatePresence|layout=/u);
  assert.match(magneticSource, /return <span className=\{cn\('inline-flex', className\)\}>\{children\}<\/span>;/);
  assert.doesNotMatch(magneticSource, /handleMove|useMotionValue|onMouseMove/);
});
