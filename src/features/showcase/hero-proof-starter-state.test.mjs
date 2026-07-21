import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const adapter = readFileSync(new URL('./HeroProof.tsx', import.meta.url), 'utf8');
const source = readFileSync(
  new URL('../home/components/HeroWorkflowStory.tsx', import.meta.url),
  'utf8',
);

test('hero proof starts with the request and can rewind or show a stable final state', () => {
  assert.match(adapter, /mode="orchestrated"/u);
  assert.match(source, /const \[phase, setPhase\] = useState\(0\);/u);
  assert.match(source, /const reset = useCallback\(\(\): void => \{[\s\S]*?setPhase\(0\);/u);
  assert.match(source, /const ORCHESTRATED_TIMES = \[850, 2_150, 3_800\]/u);
  assert.match(source, /setTimeout\(\(\) => setPhase\(index \+ 1\), delay\)/u);
  assert.match(source, /const showFinal = useCallback\(\(\): void => \{[\s\S]*?setPhase\(finalPhase\);/u);
});
