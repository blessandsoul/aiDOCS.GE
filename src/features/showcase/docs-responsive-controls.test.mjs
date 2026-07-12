import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function source(file) {
  return readFileSync(new URL(file, import.meta.url), 'utf8');
}

test('the accuracy control can shrink inside the 342px grid', () => {
  const accuracy = source('DocsAccuracy.tsx');

  assert.match(accuracy, /<div ref=\{sectionRef\} className="min-w-0">/u);
});

test('every compact docs control keeps a 44px touch target', () => {
  const row = source('DocsToRow.tsx');
  const split = source('DocsSplit.tsx');
  const hero = source('HeroProof.tsx');

  assert.match(
    row,
    /selectDoc\(index\)[\s\S]*?min-h-\[44px\]/u,
    'document picker must be at least 44px high',
  );
  assert.match(
    split,
    /function Choose[\s\S]*?min-h-\[44px\]/u,
    'split choices must be at least 44px high',
  );
  assert.match(
    hero,
    /data-demo-replay="hero"[\s\S]*?h-11 w-11/u,
    'hero Replay must be 44 by 44px',
  );
});

test('hero Replay is mounted before the result and remains available during playback', () => {
  const hero = source('HeroProof.tsx');
  const replayIndex = hero.indexOf('data-demo-replay="hero"');
  const conditionalResultIndex = hero.indexOf('{posted && (');

  assert.notEqual(replayIndex, -1, 'hero Replay hook is missing');
  assert.notEqual(conditionalResultIndex, -1, 'posted result branch is missing');
  assert.ok(
    replayIndex < conditionalResultIndex,
    'hero Replay must render outside and before the posted-only result branch',
  );
});
