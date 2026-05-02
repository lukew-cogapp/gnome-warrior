import { symmetric } from '../rng';
import { PALETTE } from '../palette';
import { almondEyes } from '../helpers';
import { defineCharacter, type DrawCtx } from './base';

interface Palette {
  robe: string; robeHi: string; robeShade: string;
  trim: string; goldDark: string;
  hair: string;
  skin: string; skinShade: string;
  staff: string; staffDark: string;
  crystal: string; crystalHi: string; crystalDark: string;
}

const PALETTES: readonly Palette[] = [
  { robe: '#3a2a6e', robeHi: '#5a44a3', robeShade: '#241752', trim: PALETTE.gold, goldDark: PALETTE.goldDark, hair: PALETTE.hairRed, skin: PALETTE.skinFair, skinShade: PALETTE.skinFairShade, staff: '#6b4a2a', staffDark: PALETTE.woodDark, crystal: '#7fe3ff', crystalHi: '#e8fbff', crystalDark: '#2a8aa8' },
  { robe: '#1c4a4a', robeHi: '#2e6a6a', robeShade: '#0e2a2a', trim: PALETTE.gold, goldDark: PALETTE.goldDark, hair: PALETTE.hairBlonde, skin: PALETTE.skinFair, skinShade: PALETTE.skinFairShade, staff: '#5a4030', staffDark: '#2a1c14', crystal: '#8af0a0', crystalHi: '#e8ffd8', crystalDark: '#2a7a3a' },
  { robe: '#7a1c1c', robeHi: '#a83232', robeShade: '#3a0a0a', trim: PALETTE.gold, goldDark: PALETTE.goldDark, hair: PALETTE.hairBlack, skin: PALETTE.skinTan, skinShade: PALETTE.skinTanShade, staff: '#6b4a2a', staffDark: PALETTE.woodDark, crystal: '#ffb648', crystalHi: '#fff0c8', crystalDark: '#a86010' },
  { robe: '#1a1430', robeHi: '#2c2444', robeShade: '#0a0814', trim: '#a87bd8', goldDark: '#5a3a8a', hair: '#e8e8f0', skin: PALETTE.skinDark, skinShade: PALETTE.skinDarkShade, staff: '#2a1c2c', staffDark: '#0e0810', crystal: '#c898ff', crystalHi: '#f0e0ff', crystalDark: '#5a2a8a' },
];

function drawStaff(ctx: DrawCtx<Palette>): void {
  const { p, palette: c } = ctx;
  p.noStroke();
  p.fill(c.staffDark); p.rect(-5, -160, 10, 320, 3);
  p.fill(c.staff); p.rect(-3, -160, 6, 320, 3);
  p.fill(c.staffDark);
  for (let y = -40; y < 80; y += 14) p.rect(-6, y, 12, 4, 1);
  p.fill(c.trim); p.rect(-10, -176, 20, 16, 3);
  p.fill(c.goldDark); p.rect(-10, -162, 20, 4, 1);
  p.push();
  p.translate(0, -200);
  for (let r = 80; r > 12; r -= 12) { p.fill(127, 227, 255, 18); p.circle(0, 0, r); }
  p.fill(c.crystalDark);
  p.beginShape(); p.vertex(-12,22); p.vertex(-16,-10); p.vertex(0,-36); p.vertex(16,-10); p.vertex(12,22); p.endShape(p.CLOSE);
  p.fill(c.crystal);
  p.beginShape(); p.vertex(-8,18); p.vertex(-12,-8); p.vertex(0,-32); p.vertex(12,-8); p.vertex(8,18); p.endShape(p.CLOSE);
  p.fill(c.crystalHi);
  p.beginShape(); p.vertex(-3,14); p.vertex(-6,-6); p.vertex(0,-28); p.vertex(2,-8); p.vertex(2,14); p.endShape(p.CLOSE);
  p.fill(255); p.circle(-2, -16, 3); p.circle(4, 4, 2);
  p.pop();
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c, headTilt } = ctx;
  const staffTilt = symmetric(rng, 30);
  const armBend   = symmetric(rng, 40);
  const hipShift  = symmetric(rng, 6);

  p.push();
  p.translate(40, -20);
  p.rotate(p.radians(staffTilt));
  drawStaff(ctx);
  p.pop();

  p.noStroke();
  p.fill(c.robeShade);
  p.beginShape();
  p.vertex(-60, -20);
  p.bezierVertex(-90, 50, -110, 130, -100, 170);
  p.vertex(100 + hipShift, 170);
  p.bezierVertex(110, 130, 90, 50, 60, -20);
  p.endShape(p.CLOSE);
  p.fill(c.robe);
  p.beginShape();
  p.vertex(-50, -20);
  p.bezierVertex(-78, 50, -90, 130, -80, 168);
  p.vertex(90 + hipShift, 168);
  p.bezierVertex(98, 130, 78, 50, 50, -20);
  p.endShape(p.CLOSE);
  p.fill(c.robeHi);
  p.beginShape();
  p.vertex(-12, -10);
  p.bezierVertex(-18, 60, -14, 130, -8, 168);
  p.vertex(12, 168);
  p.bezierVertex(18, 130, 22, 60, 12, -10);
  p.endShape(p.CLOSE);
  p.fill(c.trim); p.rect(-82, 162, 174, 6, 2);
  p.fill(c.trim); p.rect(-50, 60, 100, 6, 3);
  p.fill(c.goldDark); p.circle(-40, 70, 10); p.circle(-40, 84, 6);

  p.push();
  p.translate(36, -10); p.rotate(p.radians(staffTilt * 0.4));
  p.fill(c.robeShade);
  p.beginShape(); p.vertex(-14,0); p.vertex(-22,70); p.vertex(22,70); p.vertex(14,0); p.endShape(p.CLOSE);
  p.fill(c.robe);
  p.beginShape(); p.vertex(-10,4); p.vertex(-18,66); p.vertex(18,66); p.vertex(10,4); p.endShape(p.CLOSE);
  p.fill(c.trim); p.rect(-22, 68, 44, 4, 1);
  p.fill(c.skinShade); p.ellipse(0, 80, 24, 18);
  p.fill(c.skin); p.ellipse(-2, 78, 18, 14);
  p.pop();

  p.push();
  p.translate(-40, -8); p.rotate(p.radians(-30 + armBend));
  p.fill(c.robeShade);
  p.beginShape(); p.vertex(-14,0); p.vertex(-22,60); p.vertex(22,60); p.vertex(14,0); p.endShape(p.CLOSE);
  p.fill(c.robe);
  p.beginShape(); p.vertex(-10,4); p.vertex(-18,56); p.vertex(18,56); p.vertex(10,4); p.endShape(p.CLOSE);
  p.fill(c.trim); p.rect(-22, 58, 44, 4, 1);
  p.fill(c.skinShade); p.ellipse(0, 70, 22, 16);
  p.fill(c.skin); p.ellipse(-2, 68, 16, 12);
  p.fill(c.crystalHi); p.circle(0, 70, 6);
  p.fill(255, 255, 255, 200); p.circle(0, 70, 3);
  p.pop();

  p.push();
  p.translate(0, -70); p.rotate(p.radians(headTilt));
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-42, -10);
  p.bezierVertex(-60, 30, -54, 80, -40, 70);
  p.vertex(40, 70);
  p.bezierVertex(54, 80, 60, 30, 42, -10);
  p.endShape(p.CLOSE);
  p.fill(c.skinShade); p.rect(-10, -12, 20, 18, 4);
  p.fill(c.skin); p.ellipse(0, -16, 70, 78);
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-36, -28);
  p.bezierVertex(-30, -50, 30, -52, 36, -28);
  p.bezierVertex(20, -22, -20, -22, -36, -28);
  p.endShape(p.CLOSE);
  p.fill(230, 130, 130, 90);
  p.circle(-18, -4, 14); p.circle(18, -4, 14);
  almondEyes(p);
  p.fill('#a83b4e'); p.ellipse(0, 8, 14, 4);
  p.fill('#c84d62'); p.rect(-5, 6, 10, 2, 1);
  p.fill(c.trim); p.rect(-32, -28, 64, 4, 2);
  p.fill(c.crystalHi);
  p.beginShape(); p.vertex(0,-36); p.vertex(-6,-28); p.vertex(6,-28); p.endShape(p.CLOSE);
  p.fill(c.crystal); p.circle(0, -30, 6);
  p.pop();
}

export const mage = defineCharacter({
  id: 'mage',
  name: 'Mage',
  seedOffset: 1337,
  palettes: PALETTES,
  swayRange: 12,
  drawBody,
});
