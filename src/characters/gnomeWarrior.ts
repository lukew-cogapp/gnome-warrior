import { symmetric } from '../rng';
import { PALETTE } from '../palette';
import { stockyLegs, belt, squintEyes } from '../helpers';
import { defineCharacter, type DrawCtx } from './base';

interface Palette {
  skin: string; skinShade: string;
  beard: string; beardShade: string;
  tunic: string; tunicHi: string;
  belt: string; buckle: string; boot: string;
  hat: string; hatShade: string;
  wood: string;
  steel: string; steelHi: string; steelDark: string;
  gold: string; goldDark: string;
}

const PALETTES: readonly Palette[] = [
  { // classic red hat
    skin: PALETTE.skinWarm, skinShade: PALETTE.skinWarmShade,
    beard: PALETTE.beard, beardShade: PALETTE.beardShade,
    tunic: '#5a3a2a', tunicHi: '#7a4f3a',
    belt: '#2a1c14', buckle: PALETTE.gold, boot: '#33231a',
    hat: '#a83232', hatShade: '#6e1f1f',
    wood: PALETTE.wood,
    steel: PALETTE.steel, steelHi: PALETTE.steelHi, steelDark: PALETTE.steelDark,
    gold: PALETTE.gold, goldDark: PALETTE.goldDark,
  },
  { // forest green
    skin: PALETTE.skinTan, skinShade: PALETTE.skinTanShade,
    beard: '#a87038', beardShade: '#704820',
    tunic: '#3a4a2a', tunicHi: '#566a3e',
    belt: '#1c2a14', buckle: PALETTE.gold, boot: '#2a1a08',
    hat: '#3a6a3a', hatShade: '#1e3a16',
    wood: '#3a2614',
    steel: PALETTE.steel, steelHi: PALETTE.steelHi, steelDark: PALETTE.steelDark,
    gold: PALETTE.gold, goldDark: PALETTE.goldDark,
  },
  { // royal blue + silver beard
    skin: PALETTE.skinFair, skinShade: PALETTE.skinFairShade,
    beard: '#cdd2dc', beardShade: '#7a8290',
    tunic: '#244a7a', tunicHi: '#3866a0',
    belt: '#0e1c30', buckle: '#cdd2dc', boot: '#0e1c30',
    hat: '#1c3a64', hatShade: '#0e2240',
    wood: '#3a3030',
    steel: PALETTE.steelHi, steelHi: '#ffffff', steelDark: PALETTE.steelDark,
    gold: '#cdd2dc', goldDark: '#7a8290',
  },
  { // dark plate + crimson hat
    skin: PALETTE.skinDark, skinShade: PALETTE.skinDarkShade,
    beard: '#2a2218', beardShade: '#0e0a04',
    tunic: '#1a1014', tunicHi: '#2a1c20',
    belt: '#0a0608', buckle: '#a83232', boot: '#0a0608',
    hat: '#7a1c1c', hatShade: '#3a0a0a',
    wood: '#2a1a14',
    steel: '#888888', steelHi: '#bbbbbb', steelDark: '#3a3a3a',
    gold: '#a83232', goldDark: '#5a1010',
  },
];

function drawAxe(ctx: DrawCtx<Palette>): void {
  const { p, palette: c } = ctx;
  p.noStroke();
  p.fill(c.wood); p.rect(-6, -90, 12, 180, 4);
  p.fill('#2a1c14');
  for (let y = 60; y < 88; y += 6) p.rect(-7, y, 14, 3);
  p.fill(c.steelDark); p.circle(0, 92, 16);
  p.fill(c.steel); p.circle(-2, 90, 10);
  p.push();
  p.translate(0, -80);
  p.fill(c.steelDark);
  p.beginShape(); p.vertex(-4,-14); p.vertex(-44,-28); p.vertex(-50,0); p.vertex(-44,28); p.vertex(-4,14); p.endShape(p.CLOSE);
  p.beginShape(); p.vertex(4,-14); p.vertex(44,-28); p.vertex(50,0); p.vertex(44,28); p.vertex(4,14); p.endShape(p.CLOSE);
  p.fill(c.steel);
  p.beginShape(); p.vertex(-4,-10); p.vertex(-38,-22); p.vertex(-42,0); p.vertex(-38,22); p.vertex(-4,10); p.endShape(p.CLOSE);
  p.beginShape(); p.vertex(4,-10); p.vertex(38,-22); p.vertex(42,0); p.vertex(38,22); p.vertex(4,10); p.endShape(p.CLOSE);
  p.fill(c.steelHi);
  p.triangle(-44,-28,-50,0,-46,-4); p.triangle(44,-28,50,0,46,-4);
  p.fill('#3a2a1a'); p.rect(-8,-16,16,32,3);
  p.fill(c.gold); p.rect(-9,-18,18,4,2); p.rect(-9,14,18,4,2);
  p.pop();
}

function drawShield(ctx: DrawCtx<Palette>): void {
  const { p, palette: c } = ctx;
  p.noStroke();
  p.fill(0, 80); p.ellipse(4, 4, 168, 168);
  p.fill('#5b3a22'); p.circle(0, 0, 162);
  p.fill(c.steel); p.circle(0, 0, 152);
  p.noFill();
  p.stroke(c.steelDark); p.strokeWeight(8); p.circle(0, 0, 142);
  p.stroke(c.steelHi); p.strokeWeight(2); p.circle(0, 0, 142);
  p.noStroke();
  p.fill(c.steelDark);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    p.circle(Math.cos(a)*65, Math.sin(a)*65, 8);
  }
  p.fill(c.goldDark);
  p.beginShape(); p.vertex(-26,18); p.vertex(0,-42); p.vertex(26,18); p.endShape(p.CLOSE);
  p.fill(c.gold);
  p.beginShape(); p.vertex(-22,14); p.vertex(0,-36); p.vertex(22,14); p.endShape(p.CLOSE);
  p.stroke(c.goldDark); p.strokeWeight(4); p.strokeCap(p.ROUND);
  p.line(-18,24,18,44); p.line(18,24,-18,44);
  p.noStroke();
  p.fill(c.steelDark); p.circle(0,0,28);
  p.fill(c.steel); p.circle(-2,-2,22);
  p.fill(c.steelHi); p.circle(-4,-4,10);
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c, headTilt } = ctx;
  const axeTilt    = symmetric(rng, 60);
  const axeLift    = symmetric(rng, 30);
  const shieldTilt = symmetric(rng, 24);
  const shieldX    = -110 + symmetric(rng, 16);
  const armRSpread = symmetric(rng, 16);
  const armLSpread = symmetric(rng, 16);

  p.push();
  p.translate(shieldX, 10);
  p.rotate(p.radians(-6 + shieldTilt));
  drawShield(ctx);
  p.pop();

  stockyLegs(p, c.tunic, c.boot);

  p.noStroke();
  p.fill(c.tunic);
  p.beginShape();
  p.vertex(-70, -10);
  p.bezierVertex(-80, 30, -70, 70, -50, 80);
  p.vertex(50, 80);
  p.bezierVertex(70, 70, 80, 30, 70, -10);
  p.endShape(p.CLOSE);
  p.fill(c.tunicHi);
  p.beginShape();
  p.vertex(-30, -5);
  p.bezierVertex(-35, 30, -28, 60, -10, 70);
  p.vertex(0, 70);
  p.bezierVertex(-5, 30, -8, 0, -10, -5);
  p.endShape(p.CLOSE);
  belt(p, c.belt, c.buckle);

  p.push();
  p.translate(78, 40 + axeLift);
  p.rotate(p.radians(-4 + axeTilt));
  drawAxe(ctx);
  p.pop();

  p.push();
  p.translate(58, -8);
  p.fill(c.tunicHi); p.ellipse(0, 0, 36, 28);
  p.fill(c.tunic);
  p.push(); p.rotate(p.radians(12 + armRSpread)); p.rect(-14, 0, 28, 50, 10); p.pop();
  p.pop();
  p.push();
  p.translate(78, 40 + axeLift);
  p.fill(c.skinShade); p.ellipse(0, 0, 30, 24);
  p.fill(c.skin); p.ellipse(-2, -2, 24, 18);
  p.fill(c.skinShade); p.ellipse(-10, 4, 12, 8);
  p.pop();

  p.push();
  p.translate(-58, -8);
  p.fill(c.tunicHi); p.ellipse(0, 0, 36, 28);
  p.fill(c.tunic);
  p.push(); p.rotate(p.radians(-14 + armLSpread)); p.rect(-14, 0, 28, 46, 10); p.pop();
  p.pop();
  p.push();
  p.translate(-78, 30);
  p.fill(c.skinShade); p.ellipse(0, 0, 30, 22);
  p.fill(c.skin); p.ellipse(2, -2, 24, 16);
  p.pop();

  p.push();
  p.translate(0, -60);
  p.rotate(p.radians(headTilt));
  p.fill(c.skinShade); p.rect(-14, -8, 28, 18, 5);
  p.fill(c.skin); p.ellipse(0, -10, 90, 86);
  p.fill(220, 130, 120, 80);
  p.circle(-22, 6, 22); p.circle(22, 6, 22);
  p.fill(c.skinShade); p.ellipse(0, 6, 30, 24);
  p.fill(c.skin); p.ellipse(-4, 2, 14, 10);
  squintEyes(p);
  p.fill(c.beardShade);
  p.beginShape();
  p.vertex(-44, 8);
  p.bezierVertex(-60, 40, -50, 90, -30, 110);
  p.vertex(30, 110);
  p.bezierVertex(50, 90, 60, 40, 44, 8);
  p.bezierVertex(40, 18, 30, 22, 0, 22);
  p.bezierVertex(-30, 22, -40, 18, -44, 8);
  p.endShape(p.CLOSE);
  p.fill(c.beard);
  p.beginShape();
  p.vertex(-38, 12);
  p.bezierVertex(-52, 38, -42, 82, -26, 100);
  p.vertex(26, 100);
  p.bezierVertex(42, 82, 52, 38, 38, 12);
  p.bezierVertex(34, 22, 24, 26, 0, 26);
  p.bezierVertex(-24, 26, -34, 22, -38, 12);
  p.endShape(p.CLOSE);
  p.fill(c.beardShade);
  p.ellipse(-14, 16, 28, 12); p.ellipse(14, 16, 28, 12);
  p.fill(c.hatShade);
  p.beginShape(); p.vertex(-50, -38); p.vertex(-30, -150); p.vertex(50, -38); p.endShape(p.CLOSE);
  p.fill(c.hat);
  p.beginShape(); p.vertex(-44, -38); p.vertex(-26, -148); p.vertex(46, -38); p.endShape(p.CLOSE);
  p.fill(c.hatShade); p.ellipse(0, -36, 120, 22);
  p.fill(c.hat); p.ellipse(0, -40, 116, 18);
  p.fill(c.gold); p.circle(-26, -148, 10);
  p.pop();
}

export const gnomeWarrior = defineCharacter({
  id: 'gnome',
  name: 'Gnome Warrior',
  seedOffset: 0,
  palettes: PALETTES,
  swayRange: 14,
  drawBody,
});
