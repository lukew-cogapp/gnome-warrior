import type p5 from 'p5';

export type CharacterDraw = (p: p5, seed: number) => void;

export interface CharacterDef {
  id: string;
  name: string;
  /** Optional offset to align feet with ground line. */
  yOffset?: number;
  draw: CharacterDraw;
}
