// Character factory + shared draw context.
// Each character supplies palette variants + a body-draw fn.
// Base handles seeding, palette pick, sway/headTilt, push/pop wrap.

import type p5 from 'p5';
import { mulberry32, symmetric, type Rng } from '../rng';
import type { CharacterDef } from '../types';

export interface DrawCtx<P> {
  p: p5;
  rng: Rng;
  palette: P;
  /** Whole-figure horizontal sway. Already applied as translate. */
  sway: number;
  /** Head tilt in degrees. Pass to head's rotate. */
  headTilt: number;
}

export interface CharacterConfig<P> {
  id: string;
  name: string;
  /** Seed offset so each character has different RNG stream from same global seed. */
  seedOffset: number;
  /** Palette variants. RNG picks one per draw. */
  palettes: readonly P[];
  /** Sway range in pixels. Default 12. */
  swayRange?: number;
  /** Head tilt range in degrees. Default 8. */
  headTiltRange?: number;
  /** Body draw fn. Origin is figure centre, feet at +160ish, head at -60ish. */
  drawBody: (ctx: DrawCtx<P>) => void;
}

export function defineCharacter<P>(config: CharacterConfig<P>): CharacterDef {
  const {
    id, name, seedOffset, palettes,
    swayRange = 12, headTiltRange = 8,
    drawBody,
  } = config;

  return {
    id,
    name,
    draw(p: p5, seed: number) {
      const rng = mulberry32(seed + seedOffset);
      const palette = palettes[Math.floor(rng() * palettes.length)]!;
      const sway = symmetric(rng, swayRange);
      const headTilt = symmetric(rng, headTiltRange);

      p.push();
      p.translate(sway, 0);
      drawBody({ p, rng, palette, sway, headTilt });
      p.pop();
    },
  };
}
