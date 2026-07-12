import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const localeNames = ['en', 'ka', 'ru'];
const locales = Object.fromEntries(
  localeNames.map((locale) => [
    locale,
    JSON.parse(readFileSync(new URL(`./${locale}.json`, import.meta.url), 'utf8')),
  ]),
);

const accuracyKeys = [
  'eyebrow',
  'heading',
  'subtitle',
  'thresholdLabel',
  'lowEnd',
  'highEnd',
  'auto',
  'human',
  'wrong',
  'green',
  'neutral',
  'red',
  'claim',
  'honest',
  'doc',
  'sample',
  'theLine',
  'autoChip',
  'humanChip',
  'wrongChip',
  'caught',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'f10',
  'f11',
  'f12',
  'w11',
  'w12',
  'replay',
];

const signoffKeys = [
  'eyebrow',
  'heading',
  'subtitle',
  'extracted',
  'ambiguous',
  'held',
  'accountant',
  'corrected',
  'draft',
  'signed',
  'orisReady',
  'outcome',
  'replay',
];

function assertNamespace(locale, namespace, keys) {
  assert.ok(namespace, `${locale} is missing the namespace`);
  for (const key of keys) {
    assert.equal(typeof namespace[key], 'string', `${locale} is missing ${key}`);
    assert.ok(namespace[key].trim().length > 0, `${locale}.${key} is empty`);
  }
}

test('all showcase locales provide every confidence and sign-off message', () => {
  for (const [locale, messages] of Object.entries(locales)) {
    assertNamespace(locale, messages.product.accuracy, accuracyKeys);
    assertNamespace(locale, messages.product.signoff, signoffKeys);
  }
});

test('Georgian showcase copy contains no Cyrillic letters', () => {
  const copy = JSON.stringify(locales.ka.product);

  assert.doesNotMatch(copy, /[\u0400-\u04ff]/u);
  assert.doesNotMatch(copy, /გადააადგილ/u);
});

test('product copy is plain, third-person, and avoids unsupported sales claims', () => {
  const en = JSON.stringify(locales.en.product);
  const ru = JSON.stringify(locales.ru.product);
  const all = JSON.stringify(Object.values(locales).map(({ product }) => product));

  assert.doesNotMatch(en, /\b(?:I|we|our|ours|us)\b/i);
  assert.doesNotMatch(ru, /\b(?:мы|наш(?:а|е|и)?|нам|нас)\b/iu);
  assert.doesNotMatch(all, /(?:99%|99 percent|first 3|первые три|Amazon|nobody on earth|—|–)/iu);
  for (const [locale, messages] of Object.entries(locales)) {
    for (const namespace of ['seo', 'hero', 'work', 'faq', 'cta', 'row', 'split', 'scans', 'accuracy', 'signoff', 'proof']) {
      assert.ok(JSON.stringify(messages.product[namespace]).includes('aiNOW'), `${locale}.${namespace} must name aiNOW`);
    }
  }
});

test('showcase components do not force uppercase or use typed status glyphs', () => {
  const files = ['DocsToRow.tsx', 'DocsSplit.tsx', 'DocsScans.tsx', 'DocsAccuracy.tsx', 'DocsHumanSignoff.tsx', 'HeroProof.tsx'];
  for (const file of files) {
    const source = readFileSync(new URL(`../features/showcase/${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /uppercase|✓|✅|❌|⚠|—|–|lucide-react/u, file);
    assert.doesNotMatch(source, /initial=\{reduced \? false/, `${file} has reduced-motion hydration drift`);
  }
});
