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
  const copy = JSON.stringify({
    accuracy: locales.ka.product.accuracy,
    signoff: locales.ka.product.signoff,
  });

  assert.doesNotMatch(copy, /[\u0400-\u04ff]/u);
});
