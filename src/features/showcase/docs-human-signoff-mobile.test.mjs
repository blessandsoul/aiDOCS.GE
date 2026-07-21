import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('./DocsHumanSignoff.tsx', import.meta.url), 'utf8');
const rowSource = readFileSync(new URL('./DocsToRow.tsx', import.meta.url), 'utf8');
const heroAdapterSource = readFileSync(new URL('./HeroProof.tsx', import.meta.url), 'utf8');
const heroWorkflowSource = readFileSync(
  new URL('../home/components/HeroWorkflowStory.tsx', import.meta.url),
  'utf8',
);
const heroWorkflowCss = readFileSync(
  new URL('../home/components/hero-workflow-story.css', import.meta.url),
  'utf8',
);
const iconCatalog = readFileSync(new URL('../../components/common/solar-icons.ts', import.meta.url), 'utf8');
const navSource = readFileSync(new URL('../home/components/LandingNav.tsx', import.meta.url), 'utf8');
const locales = ['en', 'ka', 'ru'].map((locale) =>
  JSON.parse(readFileSync(new URL(`../../messages/${locale}.json`, import.meta.url), 'utf8')),
);

test('signed-entry table scrolls inside a shrinkable stable card', () => {
  assert.match(source, /className="min-h-\[520px\] overflow-hidden rounded-\[28px\]/u);
  assert.match(source, /grid min-w-0 gap-3 md:grid-cols-\[minmax\(150px,0\.72fr\)_minmax\(0,1\.28fr\)\]/u);
  assert.match(source, /className="mt-4 hidden w-full min-w-0 max-w-full overflow-x-auto rounded-lg/u);
  assert.match(source, /className="w-full min-w-\[430px\] border-collapse text-left"/u);
  assert.match(source, /data-signoff-result-slot="true"/u);
});

test('sign-off uses only bundled icons and no typed status glyphs', () => {
  const names = [...source.matchAll(/solar:([a-z0-9-]+)/gu)].map((match) => match[1]);
  assert.ok(names.length > 0);
  for (const name of names) {
    assert.ok(iconCatalog.includes(`"${name}":{"body"`), `missing bundled icon: ${name}`);
  }
  assert.doesNotMatch(source, /✓|✅|❌|⚠|—|–/u);
  assert.doesNotMatch(source, /uppercase|lucide-react/u);
});

test('navigation labels are localized and the language disclosure uses button semantics', () => {
  assert.match(navSource, /const NAV_A11Y = \{/u);
  assert.match(navSource, /aria-label=\{menuOpen \? a11y\.close : a11y\.open\}/u);
  assert.match(navSource, /aria-label=\{a11y\.language\}/u);
  assert.match(navSource, /NAV_A11Y\[locale as keyof typeof NAV_A11Y\] \?\? NAV_A11Y\.en/u);
  assert.doesNotMatch(navSource, /aria-haspopup="menu"/u);

  for (const messages of locales) {
    for (const key of ['openMenu', 'closeMenu', 'switchLanguage']) {
      assert.equal(typeof messages.landingNav?.[key], 'string');
      assert.ok(messages.landingNav[key].length > 0);
    }
  }
});

test('keyboard-scrollable accounting tables expose focus, captions, headers, and status text', () => {
  for (const tableSource of [source, rowSource]) {
    assert.match(tableSource, /overflow-x-auto[^"\n]*focus-visible:ring-\[var\(--brand-ink\)\]/u);
    assert.match(tableSource, /<caption className="sr-only">/u);
    assert.match(tableSource, /scope="col"/u);
  }

  for (const statusTableSource of [rowSource]) {
    assert.match(statusTableSource, /<span className="sr-only">\{t\('status'\)\}<\/span>/u);
    assert.match(statusTableSource, /<span className="sr-only">\{(?:posted \? )?t\('posted'\)/u);
  }
});

test('hero workflow replaces the wide ledger with a shrinkable accessible story', () => {
  assert.match(heroAdapterSource, /<HeroWorkflowStory/u);
  assert.match(heroWorkflowSource, /aria-live="off"/u);
  assert.match(heroWorkflowSource, /data-demo-replay="true"/u);
  assert.match(heroWorkflowSource, /aria-label=\{copy\.replay\}/u);
  assert.match(heroWorkflowCss, /\.hero-workflow\s*\{[^}]*min-width:\s*0;[^}]*contain:\s*inline-size;/su);
  assert.match(heroWorkflowCss, /\.hero-workflow__replay\s*\{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px;/su);
});
