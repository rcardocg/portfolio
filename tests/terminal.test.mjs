import test from 'node:test';
import assert from 'node:assert/strict';
import { commands, completions, resolveCommand } from '../lib/terminal.ts';

test('documented commands resolve, normalize input and only open intended views', () => {
  for (const command of commands) assert.notEqual(resolveCommand(command.name).kind, 'error');
  for (const view of ['about', 'projects', 'contact']) {
    assert.deepEqual(resolveCommand(`  ${view.toUpperCase()}  `), resolveCommand(view));
    assert.equal(resolveCommand(view).view, view);
  }
  assert.equal(resolveCommand('clear').kind, 'clear');
  assert.equal(resolveCommand('ls').view, 'projects');
  assert.equal(resolveCommand('open   sesion-pendiente').view, 'projects');
  assert.equal(resolveCommand('cat about.md').view, 'about');
  assert.equal(resolveCommand('cat contact.txt').view, 'contact');
  assert.equal(new Set(completions).size, completions.length);
});

test('navigation is limited to the game and arbitrary shell or HTML is rejected', () => {
  for (const command of ['/scary', 'SCARY', 'open /scary']) {
    assert.equal(resolveCommand(command).kind, 'navigate');
    assert.equal(resolveCommand(command).href, '/scary');
  }
  for (const command of ['', 'rm -rf /', '<script>alert(1)</script>', 'open https://example.com', 'about; contact', 'unknown']) {
    assert.equal(resolveCommand(command).kind, 'error');
  }
});
