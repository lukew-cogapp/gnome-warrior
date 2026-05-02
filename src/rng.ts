// Deterministic PRNG (mulberry32). Same seed → same sequence.
export function mulberry32(seedInput: number): () => number {
  let a = seedInput | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

// Range helpers that take a Rng so they share the same seeded stream.
export const range = (r: Rng, min: number, max: number): number =>
  min + r() * (max - min);
export const symmetric = (r: Rng, span: number): number => (r() - 0.5) * span;
