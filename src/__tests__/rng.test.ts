import { describe, expect, it } from 'vitest';
import { mulberry32, range, symmetric } from '../rng';

describe('mulberry32', () => {
  it('returns deterministic sequence for same seed', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it('returns different sequences for different seeds', () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    expect(a()).not.toBe(b());
  });

  it('returns values in [0, 1)', () => {
    const r = mulberry32(7);
    for (let i = 0; i < 1000; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe('range', () => {
  it('returns values within bounds', () => {
    const r = mulberry32(7);
    for (let i = 0; i < 100; i++) {
      const v = range(r, 10, 20);
      expect(v).toBeGreaterThanOrEqual(10);
      expect(v).toBeLessThan(20);
    }
  });
});

describe('symmetric', () => {
  it('returns values within ± span/2', () => {
    const r = mulberry32(7);
    for (let i = 0; i < 100; i++) {
      const v = symmetric(r, 20);
      expect(v).toBeGreaterThanOrEqual(-10);
      expect(v).toBeLessThan(10);
    }
  });
});
