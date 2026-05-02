// Shared draw primitives. Each takes a p5 instance + options.
// Coordinates are local — caller pushes/translates first.

import type p5 from 'p5';

export interface LimbOptions {
  fill: string;
  width?: number;
  length?: number;
  radius?: number;
}

/** Rectangular sleeved limb, top-anchored at (0,0). */
export function limb(p: p5, opts: LimbOptions): void {
  const { fill, width = 26, length = 50, radius = 8 } = opts;
  p.noStroke();
  p.fill(fill);
  p.rect(-width / 2, 0, width, length, radius);
}

export interface HandOptions {
  skin: string;
  shade: string;
  size?: number;
  thumb?: boolean;
}

/** Skin-coloured hand at origin. Optional thumb wrap (for grip). */
export function hand(p: p5, opts: HandOptions): void {
  const { skin, shade, size = 24, thumb = false } = opts;
  p.noStroke();
  p.fill(shade);
  p.ellipse(0, 0, size + 6, size);
  p.fill(skin);
  p.ellipse(-2, -2, size, size - 6);
  if (thumb) {
    p.fill(shade);
    p.ellipse(-size * 0.4, 4, size * 0.5, size * 0.35);
  }
}

export interface HeadOptions {
  skin: string;
  shade: string;
  width?: number;
  height?: number;
  blush?: boolean;
}

/** Round head with optional blush. */
export function head(p: p5, opts: HeadOptions): void {
  const { skin, shade, width = 90, height = 86, blush = true } = opts;
  p.noStroke();
  p.fill(shade);
  p.rect(-width * 0.16, -8, width * 0.32, 18, 5);
  p.fill(skin);
  p.ellipse(0, -10, width, height);
  if (blush) {
    p.fill(220, 130, 120, 80);
    p.circle(-width * 0.24, 4, width * 0.24);
    p.circle(width * 0.24, 4, width * 0.24);
  }
}

/** Determined squint eyes (warrior). */
export function squintEyes(p: p5, colour = '#1a1208'): void {
  p.stroke(colour);
  p.strokeWeight(3);
  p.strokeCap(p.ROUND);
  p.line(-22, -10, -10, -8);
  p.line(10, -8, 22, -10);
  p.strokeWeight(4);
  p.line(-26, -20, -10, -16);
  p.line(10, -16, 26, -20);
  p.noStroke();
}

/** Almond eyes with highlight (mage / bard / ranger). */
export function almondEyes(p: p5, colour = '#1a1208'): void {
  p.noStroke();
  p.fill(colour);
  p.ellipse(-14, -14, 9, 5);
  p.ellipse(14, -14, 9, 5);
  p.fill(255);
  p.circle(-12, -15, 2);
  p.circle(16, -15, 2);
  p.stroke('#3a1a08');
  p.strokeWeight(2);
  p.strokeCap(p.ROUND);
  p.line(-22, -22, -8, -20);
  p.line(8, -20, 22, -22);
  p.noStroke();
}

/** Soft radial glow — for crystals, magic, lanterns. */
export function radialGlow(
  p: p5,
  cx: number,
  cy: number,
  outer: number,
  step: number,
  rgb: [number, number, number],
  alpha = 18,
): void {
  p.noStroke();
  for (let r = outer; r > step; r -= step) {
    p.fill(rgb[0], rgb[1], rgb[2], alpha);
    p.circle(cx, cy, r);
  }
}

/** Soft elliptical ground shadow. */
export function groundShadow(p: p5): void {
  p.noStroke();
  p.fill(0, 90);
  p.ellipse(0, 165, 240, 36);
  p.fill(0, 50);
  p.ellipse(0, 165, 320, 50);
}

/** Belt with central buckle, anchored at hip line y=50. */
export function belt(p: p5, beltColour: string, buckleColour: string): void {
  p.noStroke();
  p.fill(beltColour);
  p.rect(-72, 50, 144, 18, 4);
  p.fill(buckleColour);
  p.rect(-10, 50, 20, 18, 3);
}

/** Two stocky legs with boots (warrior style). */
export function stockyLegs(p: p5, trouser: string, boot: string): void {
  p.noStroke();
  p.fill(trouser);
  p.rect(-44, 70, 36, 60, 8);
  p.rect(8, 70, 36, 60, 8);
  p.fill(boot);
  p.rect(-50, 120, 44, 30, 6);
  p.rect(6, 120, 44, 30, 6);
}

/** Slim legs with boots (rogue / ranger / bard). */
export function slimLegs(p: p5, trouser: string, boot: string): void {
  p.noStroke();
  p.fill(trouser);
  p.rect(-26, 60, 22, 90, 6);
  p.rect(4, 60, 22, 90, 6);
  p.fill(boot);
  p.rect(-30, 140, 30, 16, 4);
  p.rect(0, 140, 30, 16, 4);
}
