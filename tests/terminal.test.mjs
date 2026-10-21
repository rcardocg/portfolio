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
  assert.equal(resolveCommand('open   projects/ted').view, 'projects');
  assert.equal(resolveCommand('cat about.md').view, 'about');
  assert.equal(resolveCommand('cat contact.txt').view, 'contact');
  assert.equal(new Set(completions).size, completions.length);
});

test('ted opens inline and old commands or arbitrary shell and HTML are rejected', () => {
  assert.deepEqual(commands.find(command => command.name === 'ted'), { name: 'ted', description: '???' });
  for (const command of ['ted', '/ted', 'TED', 'open /ted']) {
    assert.equal(resolveCommand(command).kind, 'view');
    assert.equal(resolveCommand(command).view, 'ted');
  }
  for (const command of ['scary', '/scary', 'open /scary', '', 'rm -rf /', '<script>alert(1)</script>', 'open https://example.com', 'about; contact', 'unknown']) {
    assert.equal(resolveCommand(command).kind, 'error');
  }
});
