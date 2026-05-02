import { describe, expect, it } from 'vitest';
import { CHARACTERS, findCharacter } from '../characters';

describe('character registry', () => {
  it('has 7 characters', () => {
    expect(CHARACTERS).toHaveLength(7);
  });

  it('has unique ids', () => {
    const ids = CHARACTERS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every entry has id, name, draw fn', () => {
    for (const c of CHARACTERS) {
      expect(typeof c.id).toBe('string');
      expect(c.id.length).toBeGreaterThan(0);
      expect(typeof c.name).toBe('string');
      expect(typeof c.draw).toBe('function');
    }
  });

  it('expected ids are present', () => {
    const ids = CHARACTERS.map((c) => c.id);
    for (const id of ['gnome', 'mage', 'rogue', 'paladin', 'ranger', 'bard', 'druid']) {
      expect(ids).toContain(id);
    }
  });
});

describe('findCharacter', () => {
  it('returns matching character by id', () => {
    expect(findCharacter('mage').id).toBe('mage');
    expect(findCharacter('druid').id).toBe('druid');
  });

  it('falls back to first character for unknown id', () => {
    expect(findCharacter('not-a-real-id')).toBe(CHARACTERS[0]);
  });
});
