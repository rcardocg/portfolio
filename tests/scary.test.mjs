import test from 'node:test';
import assert from 'node:assert/strict';
import { choose, getScene, initialSession } from '../lib/scary.ts';

test('all 18 paths finish in three decisions, preserve choices, and restart cleanly', () => {
  const started = choose(initialSession, 'enter');
  assert.equal(started.phase, 'identity');
  const endings = new Set();
  const stories = new Set();
  let paths = 0;
  for (const identity of getScene(started).choices) {
    const permission = choose(started, identity.id);
    assert.equal(permission.phase, 'permission');
    for (const action of getScene(permission).choices) {
      const closure = choose(permission, action.id);
      assert.equal(closure.phase, 'closure');
      for (const ending of getScene(closure).choices) {
        const result = choose(closure, ending.id);
        assert.equal(result.phase, 'ending');
        assert.equal(result.identity, identity.id);
        assert.equal(result.permission, action.id);
        assert.equal(result.ending, ending.id);
        const scene = getScene(result);
        assert.ok(scene.paragraphs.length >= 4);
        endings.add(scene.code);
        stories.add(scene.paragraphs.join('\n'));
        assert.deepEqual(choose(result, 'restart'), started);
        paths++;
      }
    }
  }
  assert.equal(paths, 18);
  assert.equal(endings.size, 3);
  assert.equal(stories.size, 18);
});

test('invalid or out-of-order responses never change a session', () => {
  let session = initialSession;
  for (let step = 0; step < 5; step++) {
    assert.equal(choose(session, 'invalid'), session);
    assert.equal(choose(session, '<script>'), session);
    if (session.phase === 'ending') break;
    assert.equal(choose(session, 'restart'), session);
    session = choose(session, getScene(session).choices[0].id);
  }
  assert.deepEqual(initialSession, { phase: 'intro' });
});
