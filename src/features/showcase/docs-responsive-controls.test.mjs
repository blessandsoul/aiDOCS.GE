import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function source(file) {
  return readFileSync(new URL(file, import.meta.url), 'utf8');
}

const stories = [
  'DocsToRow.tsx',
  'DocsSplit.tsx',
  'DocsScans.tsx',
  'DocsAccuracy.tsx',
  'DocsHumanSignoff.tsx',
];

test('landing renders one static five-item capability list instead of five demos', () => {
  const landing = source('../home/components/LandingShowcase.tsx');
  const capabilities = source('../home/components/ProductCapabilities.tsx');

  assert.match(landing, /useTranslations\('product\.capabilities'\)/u);
  assert.match(landing, /<ProductCapabilities/u);
  assert.equal((landing.match(/solar:[a-z0-9-]+/gu) ?? []).length, 5);
  assert.match(landing, /items=\{ICONS\.map/u);
  for (const oldDemo of ['DocsToRow', 'DocsSplit', 'DocsScans', 'DocsAccuracy', 'DocsHumanSignoff']) {
    assert.doesNotMatch(landing, new RegExp(`features/showcase/${oldDemo}|<${oldDemo}`), oldDemo);
  }
  assert.doesNotMatch(landing, /data-landing-demo/u);
  assert.match(capabilities, /items\.map\(\(item, index\)/u);
  assert.match(capabilities, /data-feature-section="true"/u);
  assert.match(capabilities, /data-feature-id=\{`capability-\$\{index \+ 1\}`\}/u);
  assert.doesNotMatch(capabilities, /data-landing-demo/u);
});

test('all five demos use the same simple story shell and permanent business result', () => {
  const shell = source('DocsDemoStory.tsx');
  assert.match(shell, /data-docs-demo-story="true"/u);
  assert.match(shell, /visualFirst\?: boolean/u);
  assert.match(shell, /data-visual-first=\{visualFirst \? 'true' : 'false'\}/u);
  assert.match(shell, /lg:grid-cols-\[minmax\(0,0\.88fr\)_minmax\(360px,1\.12fr\)\]/u);
  assert.match(shell, /lg:grid-cols-\[minmax\(360px,1\.12fr\)_minmax\(0,0\.88fr\)\]/u);

  for (const file of stories) {
    const component = source(file);
    assert.match(component, /import \{ DocsDemoStory \} from '\.\/DocsDemoStory';/u, file);
    assert.match(component, /<DocsDemoStory/u, file);
    assert.match(component, /data-demo-outcome/u, file);
    assert.match(component, /t\('businessResult'\)/u, file);
    assert.doesNotMatch(component, /transition-all|layout=|AnimatePresence/u, file);
  }

  assert.doesNotMatch(source('DocsToRow.tsx'), /<DocsDemoStory\s+visualFirst/u);
  assert.match(source('DocsSplit.tsx'), /<DocsDemoStory\s+visualFirst/u);
  assert.doesNotMatch(source('DocsScans.tsx'), /<DocsDemoStory\s+visualFirst/u);
  assert.match(source('DocsAccuracy.tsx'), /<DocsDemoStory\s+visualFirst/u);
  assert.doesNotMatch(source('DocsHumanSignoff.tsx'), /<DocsDemoStory\s+visualFirst/u);
});

test('the simplified demos keep only the controls the business story needs', () => {
  const expectedButtons = new Map([
    ['DocsToRow.tsx', 2],
    ['DocsSplit.tsx', 2],
    ['DocsScans.tsx', 2],
    ['DocsAccuracy.tsx', 1],
    ['DocsHumanSignoff.tsx', 1],
  ]);

  for (const [file, expected] of expectedButtons) {
    const component = source(file);
    assert.equal((component.match(/<button\b/gu) ?? []).length, expected, file);
  }

  assert.match(source('DocsAccuracy.tsx'), /type="range"[\s\S]*?h-11 w-full/u);
});

test('every interactive docs control keeps a 44px touch target', () => {
  for (const file of stories) {
    const component = source(file);
    assert.match(component, /data-demo-replay="[^"]+"[\s\S]*?min-h-11/u, `${file} Replay`);
  }

  assert.match(source('DocsToRow.tsx'), /data-demo-manual="docs-to-row"[\s\S]*?min-h-11/u);
  assert.match(source('DocsSplit.tsx'), /onClick=\{routeNext\}[\s\S]*?h-\[52px\]/u);
  assert.match(source('DocsScans.tsx'), /onClick=\{nextScan\}[\s\S]*?min-h-11/u);
  const workflow = source('../home/components/HeroWorkflowStory.tsx');
  const workflowCss = source('../home/components/hero-workflow-story.css');
  assert.match(workflow, /data-demo-replay="true"/u);
  assert.match(workflowCss, /\.hero-workflow__replay\s*\{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px;/su);
});

test('dynamic content stays inside permanent geometry slots', () => {
  const row = source('DocsToRow.tsx');
  assert.match(row, /data-row-ledger-slot="true"/u);
  assert.match(row, /FIELDS\.map\(\(field, index\)/u);
  assert.doesNotMatch(row, /\{preparing &&/u);

  const split = source('DocsSplit.tsx');
  assert.match(split, /data-split-unsorted-slot="true"/u);
  assert.match(split, /data-split-bins-slot="true"/u);
  assert.match(split, /data-split-bin-slot=\{tone\}/u);
  assert.match(split, /Array\.from\(\{ length: 3 \}/u);
  assert.match(split, /data-split-controls-slot="true"/u);

  const scans = source('DocsScans.tsx');
  assert.match(scans, /data-scan-result-slot="true"[\s\S]*?min-h-\[320px\]/u);

  const accuracy = source('DocsAccuracy.tsx');
  assert.match(accuracy, /data-accuracy-note-slot="true"[\s\S]*?h-12/u);
  assert.doesNotMatch(accuracy, /TheLine|boundary/u);

  const signoff = source('DocsHumanSignoff.tsx');
  assert.match(signoff, /data-signoff-process-slot="true"/u);
  assert.match(signoff, /data-signoff-result-slot="true"[\s\S]*?h-\[72px\]/u);
  assert.doesNotMatch(signoff, /\{isSigned &&/u);
});

test('autoplay stays silent to screen readers while status remains explicit', () => {
  for (const file of stories) {
    const component = source(file);
    assert.match(component, /aria-live="off"/u, file);
  }

  const accuracy = source('DocsAccuracy.tsx');
  assert.match(accuracy, /role="status"\s+aria-live="off"/u);
  assert.match(accuracy, /wrong\.length > 0 \? '#7f1d1d' : '#667085'/u);

  const signoff = source('DocsHumanSignoff.tsx');
  assert.match(signoff, /role="status"\s+aria-live="off"/u);
});

test('hero Replay stays mounted while every story row keeps permanent geometry', () => {
  const adapter = source('HeroProof.tsx');
  const workflow = source('../home/components/HeroWorkflowStory.tsx');
  const workflowCss = source('../home/components/hero-workflow-story.css');

  assert.match(adapter, /<HeroWorkflowStory/u);
  assert.match(workflow, /<div className="hero-workflow__timeline">[\s\S]*?<StoryRow[\s\S]*?<StoryRow[\s\S]*?<StoryRow/u);
  assert.match(workflow, /<div className="hero-workflow__footer">[\s\S]*?data-demo-replay="true"/u);
  assert.doesNotMatch(workflow, /AnimatePresence|layout=|transition-all/u);
  assert.match(workflowCss, /\.hero-workflow__row\s*\{[^}]*min-height:\s*82px;/su);
});

test('hero workflow is constrained to the shared hero column without clipping copy', () => {
  const adapter = source('HeroProof.tsx');
  const workflow = source('../home/components/HeroWorkflowStory.tsx');
  const workflowCss = source('../home/components/hero-workflow-story.css');

  assert.match(adapter, /mode="orchestrated"/u);
  assert.match(workflow, /className="hero-workflow"/u);
  assert.doesNotMatch(workflow, /truncate|line-clamp|min-w-\[\d+px\]/u);
  assert.match(workflowCss, /\.hero-workflow\s*\{[^}]*min-width:\s*0;[^}]*overflow:\s*hidden;[^}]*contain:\s*inline-size;/su);
  assert.match(workflowCss, /grid-template-columns:\s*38px minmax\(0, 1fr\);/u);
  assert.match(workflowCss, /@media \(max-width: 479px\)[\s\S]*?\.hero-workflow__details\s*\{\s*grid-template-columns:\s*1fr;/u);
});
