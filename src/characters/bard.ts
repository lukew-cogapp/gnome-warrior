import { symmetric } from '../rng';
import { PALETTE } from '../palette';
import { defineCharacter, type DrawCtx } from './base';

interface Palette {
  tunic: string; tunicHi: string;
  trim: string;
  pant: string; pantHi: string;
  boot: string;
  skin: string; skinShade: string;
  hair: string;
  lute: string; luteDark: string;
  feather: string;
}

const PALETTES: readonly Palette[] = [
  { tunic: '#5a2a8a', tunicHi: '#7a44a8', trim: PALETTE.gold, pant: '#a87038', pantHi: '#c89058', boot: '#3a2618', skin: PALETTE.skinFair, skinShade: PALETTE.skinFairShade, hair: PALETTE.hairBrown, lute: '#a86838', luteDark: '#6a3818', feather: '#d04848' },
  { tunic: '#3a8a6a', tunicHi: '#5aa888', trim: PALETTE.gold, pant: '#5a3a2a', pantHi: '#7a5440', boot: '#2a1a08', skin: PALETTE.skinTan, skinShade: PALETTE.skinTanShade, hair: PALETTE.hairRed, lute: '#aa6038', luteDark: '#5a2818', feather: '#e8c878' },
  { tunic: '#a8403a', tunicHi: '#d06464', trim: '#f0d488', pant: '#3a3a4a', pantHi: '#5a5a6a', boot: '#1a1a2a', skin: PALETTE.skinFair, skinShade: PALETTE.skinFairShade, hair: PALETTE.hairBlonde, lute: '#a86838', luteDark: '#5a2818', feather: '#e0e0e0' },
  { tunic: '#1c2444', tunicHi: '#3a3a6a', trim: '#88aaff', pant: '#0e1c30', pantHi: '#1c3a5a', boot: '#0a0e18', skin: PALETTE.skinDark, skinShade: PALETTE.skinDarkShade, hair: '#e8e8f0', lute: '#5a4030', luteDark: '#2a1c14', feather: '#88ddff' },
];

function drawLute(ctx: DrawCtx<Palette>): void {
  const { p, palette: c } = ctx;
  p.noStroke();
  p.fill(c.luteDark); p.ellipse(0, 0, 96, 110);
  p.fill(c.lute); p.ellipse(-2, -2, 88, 102);
  p.fill(c.luteDark); p.circle(0, 0, 20);
  p.fill(c.trim); p.circle(0, 0, 16);
  p.fill('#1a0e08'); p.circle(0, 0, 12);
  p.fill(c.luteDark); p.rect(-14, 24, 28, 4, 1);
  p.stroke('#e0e0e0'); p.strokeWeight(1);
  for (let i = -3; i <= 3; i++) p.line(i*3, -50, i*3, 26);
  p.noStroke();
  p.fill(c.luteDark); p.rect(-8, -120, 16, 70, 3);
  p.fill(c.lute); p.rect(-6, -118, 12, 66, 2);
  p.stroke(c.trim); p.strokeWeight(1);
  for (let y = -110; y < -54; y += 8) p.line(-6, y, 6, y);
  p.noStroke();
  p.fill(c.luteDark);
  p.beginShape(); p.vertex(-12,-130); p.vertex(-14,-156); p.vertex(14,-156); p.vertex(12,-130); p.endShape(p.CLOSE);
  p.fill(c.trim);
  for (let i = 0; i < 3; i++) {
    p.circle(-8, -136 - i*6, 4); p.circle(8, -136 - i*6, 4);
  }
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c, headTilt } = ctx;
  const luteTilt = symmetric(rng, 16);

  p.noStroke();
  p.fill(c.pant);
  p.ellipse(-18, 90, 38, 70);
  p.ellipse(18, 90, 38, 70);
  p.fill(c.pantHi);
  p.ellipse(-22, 80, 14, 30); p.ellipse(14, 80, 14, 30);
  p.fill(c.boot);
  p.rect(-30, 130, 26, 24, 4); p.rect(4, 130, 26, 24, 4);

  p.fill(c.tunic);
  p.beginShape();
  p.vertex(-44, -20);
  p.bezierVertex(-52, 20, -50, 60, -40, 70);
  p.vertex(40, 70);
  p.bezierVertex(50, 60, 52, 20, 44, -20);
  p.endShape(p.CLOSE);
  p.fill(c.tunicHi);
  for (let x = -30; x <= 30; x += 12) p.rect(x - 2, 0, 4, 50, 1);
  p.fill(c.trim); p.rect(-30, -22, 60, 6, 2);
  p.fill('#3a2618'); p.rect(-44, 36, 88, 10, 2);
  p.fill(c.trim); p.rect(-6, 36, 12, 10, 2);

  p.push();
  p.translate(20, 20); p.rotate(p.radians(-25 + luteTilt));
  drawLute(ctx);
  p.pop();

  p.fill(c.tunic);
  p.push(); p.translate(-32, -8); p.rotate(p.radians(40)); p.rect(-12, 0, 24, 44, 8); p.pop();
  p.push(); p.translate(34, -8); p.rotate(p.radians(-40)); p.rect(-12, 0, 24, 44, 8); p.pop();
  p.fill(c.skin);
  p.push(); p.translate(0, 30); p.ellipse(0, 0, 20, 16); p.pop();
  p.push(); p.translate(54, 30); p.ellipse(0, 0, 18, 14); p.pop();

  p.push();
  p.translate(0, -76); p.rotate(p.radians(headTilt));
  p.fill(c.hair); p.ellipse(0, -2, 86, 70);
  p.fill(c.skinShade); p.rect(-10, 18, 20, 14, 4);
  p.fill(c.skin); p.ellipse(0, -8, 68, 76);
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-32, -28);
  p.bezierVertex(-26, -42, -10, -34, 0, -28);
  p.bezierVertex(10, -34, 26, -42, 32, -28);
  p.bezierVertex(20, -22, -20, -22, -32, -28);
  p.endShape(p.CLOSE);
  p.fill(220, 130, 120, 80);
  p.circle(-18, 4, 14); p.circle(18, 4, 14);
  p.fill('#1a1208');
  p.ellipse(-14, -8, 8, 6);
  p.stroke('#1a1208'); p.strokeWeight(2.5); p.strokeCap(p.ROUND);
  p.line(8, -8, 20, -8);
  p.noStroke();
  p.fill(255); p.circle(-12, -10, 2);
  p.stroke('#5a3a1a'); p.strokeWeight(2);
  p.line(-22, -16, -8, -14); p.line(8, -14, 22, -16);
  p.strokeWeight(2); p.noFill();
  p.beginShape(); p.vertex(-12, 6); p.bezierVertex(-6, 4, -2, 8, 0, 6); p.endShape();
  p.beginShape(); p.vertex(12, 6); p.bezierVertex(6, 4, 2, 8, 0, 6); p.endShape();
  p.noStroke();
  p.fill('#1a1208'); p.arc(0, 14, 22, 14, 0, Math.PI);
  p.fill('#fff'); p.rect(-8, 14, 16, 3, 1);
  p.pop();

  p.push();
  p.translate(0, -126); p.rotate(p.radians(headTilt));
  p.fill(c.tunicHi); p.ellipse(0, 4, 130, 24);
  p.fill(c.tunic); p.ellipse(0, 0, 130, 18);
  p.fill(c.tunic);
  p.beginShape();
  p.vertex(-30, 0);
  p.bezierVertex(-30, -40, 30, -40, 30, 0);
  p.endShape(p.CLOSE);
  p.fill(c.trim); p.rect(-30, -2, 60, 4, 1);
  p.fill(c.feather);
  p.push();
  p.translate(20, -10); p.rotate(p.radians(-30));
  p.beginShape();
  p.vertex(0, 0); p.bezierVertex(-6, -30, 14, -50, 24, -60);
  p.bezierVertex(20, -40, 6, -10, 0, 0);
  p.endShape(p.CLOSE);
  p.stroke('#7a1c1c'); p.strokeWeight(1);
  p.line(0, 0, 22, -56);
  p.noStroke();
  p.pop();
  p.pop();
}

export const bard = defineCharacter({
  id: 'bard',
  name: 'Bard',
  seedOffset: 47,
  palettes: PALETTES,
  swayRange: 12,
  drawBody,
});
