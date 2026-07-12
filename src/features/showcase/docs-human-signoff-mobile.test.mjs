import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('./DocsHumanSignoff.tsx', import.meta.url), 'utf8');

test('signed-entry table scrolls inside a shrinkable mobile card', () => {
  assert.match(source, /className="min-w-0 rounded-2xl bg-\[#fafafa\] p-5/);
  assert.match(
    source,
    /className="mt-5 grid min-w-0 gap-4 md:grid-cols-\[minmax\(190px,0\.75fr\)_1\.25fr\]"/,
  );
  assert.match(source, /'min-w-0 rounded-xl bg-white p-4 transition-\[box-shadow\]/);
  assert.match(source, /className="mt-4 overflow-x-auto rounded-lg/);
  assert.match(source, /className="w-full min-w-\[430px\] border-collapse text-left"/);
});

test('sign-off uses bundled icons instead of typed status glyphs', () => {
  assert.match(source, /import \{ Ico \} from '@\/components\/common\/Ico';/);
  assert.match(source, /<Ico name="solar:check-circle-bold-duotone"/);
  assert.doesNotMatch(source, /✓|✅|❌|⚠|—|–/u);
  assert.doesNotMatch(source, /uppercase/);
});
