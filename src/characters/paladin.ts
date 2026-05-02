import { PALETTE } from '../palette';
import { symmetric } from '../rng';
import { type DrawCtx, defineCharacter } from './base';

interface Palette {
  plate: string;
  plateHi: string;
  plateDark: string;
  tabard: string;
  tabardDark: string;
  gold: string;
  goldDark: string;
}

const PALETTES: readonly Palette[] = [
  {
    plate: '#d4d8df',
    plateHi: '#f0f3f7',
    plateDark: '#7a8290',
    tabard: '#b03030',
    tabardDark: '#7a1c1c',
    gold: PALETTE.gold,
    goldDark: PALETTE.goldDark,
  },
  {
    plate: '#e8d488',
    plateHi: '#f8e8a8',
    plateDark: '#a88830',
    tabard: '#3878b8',
    tabardDark: '#1c4a7a',
    gold: PALETTE.gold,
    goldDark: PALETTE.goldDark,
  },
  {
    plate: '#a87038',
    plateHi: '#c89058',
    plateDark: '#5a3a18',
    tabard: '#3a8a4a',
    tabardDark: '#1c5a2a',
    gold: PALETTE.gold,
    goldDark: PALETTE.goldDark,
  },
  {
    plate: '#2a2030',
    plateHi: '#4a3848',
    plateDark: '#0e0a14',
    tabard: '#5a2a8a',
    tabardDark: '#2a0e4a',
    gold: '#a87bd8',
    goldDark: '#5a3a8a',
  },
];

function drawTowerShield(ctx: DrawCtx<Palette>): void {
  const { p, palette: c } = ctx;
  p.noStroke();
  p.fill(0, 80);
  p.rect(-58, -90, 116, 200, 14);
  p.fill(c.plateDark);
  p.rect(-60, -94, 120, 200, 14);
  p.fill(c.plate);
  p.rect(-54, -88, 108, 188, 12);
  p.fill(c.tabardDark);
  p.rect(-44, -78, 88, 168, 8);
  p.fill(c.tabard);
  p.rect(-40, -74, 80, 160, 8);
  p.fill(c.gold);
  p.rect(-6, -70, 12, 152, 3);
  p.rect(-30, -10, 60, 12, 3);
  p.fill(c.plateDark);
  for (const y of [-78, -30, 30, 80]) {
    p.circle(-46, y, 6);
    p.circle(46, y, 6);
  }
}

function drawSword(p: import('p5')): void {
  p.noStroke();
  p.fill(PALETTE.gold);
  p.circle(0, 36, 14);
  p.fill('#3a2618');
  p.rect(-4, 8, 8, 28, 2);
  p.fill(PALETTE.gold);
  p.rect(-22, 4, 44, 8, 2);
  p.fill(PALETTE.goldDark);
  p.rect(-22, 8, 44, 4, 1);
  p.fill(PALETTE.steelDark);
  p.beginShape();
  p.vertex(-7, 4);
  p.vertex(0, -130);
  p.vertex(7, 4);
  p.endShape(p.CLOSE);
  p.fill(PALETTE.steel);
  p.beginShape();
  p.vertex(-4, 4);
  p.vertex(0, -126);
  p.vertex(4, 4);
  p.endShape(p.CLOSE);
  p.fill(PALETTE.steelHi);
  p.beginShape();
  p.vertex(-1, 4);
  p.vertex(0, -122);
  p.vertex(1, 4);
  p.endShape(p.CLOSE);
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c, headTilt } = ctx;
  const swordTilt = symmetric(rng, 20);

  p.push();
  p.translate(-100, 20);
  p.rotate(p.radians(-4));
  drawTowerShield(ctx);
  p.pop();

  p.noStroke();
  p.fill(c.plateDark);
  p.rect(-30, 60, 26, 90, 6);
  p.rect(4, 60, 26, 90, 6);
  p.fill(c.plate);
  p.rect(-28, 64, 22, 76, 5);
  p.rect(6, 64, 22, 76, 5);
  p.fill('#3a2618');
  p.rect(-32, 142, 30, 14, 4);
  p.rect(2, 142, 30, 14, 4);

  p.fill(c.plateDark);
  p.beginShape();
  p.vertex(-50, -20);
  p.bezierVertex(-60, 20, -52, 60, -42, 70);
  p.vertex(42, 70);
  p.bezierVertex(52, 60, 60, 20, 50, -20);
  p.endShape(p.CLOSE);
  p.fill(c.plate);
  p.beginShape();
  p.vertex(-44, -16);
  p.bezierVertex(-54, 20, -46, 56, -38, 64);
  p.vertex(38, 64);
  p.bezierVertex(46, 56, 54, 20, 44, -16);
  p.endShape(p.CLOSE);
  p.fill(c.tabardDark);
  p.beginShape();
  p.vertex(-22, -18);
  p.vertex(-26, 90);
  p.vertex(26, 90);
  p.vertex(22, -18);
  p.endShape(p.CLOSE);
  p.fill(c.tabard);
  p.beginShape();
  p.vertex(-18, -14);
  p.vertex(-22, 86);
  p.vertex(22, 86);
  p.vertex(18, -14);
  p.endShape(p.CLOSE);
  p.fill(c.gold);
  p.circle(0, 20, 28);
  p.fill(c.goldDark);
  p.circle(0, 20, 16);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    p.push();
    p.translate(Math.cos(a) * 22, 20 + Math.sin(a) * 22);
    p.rotate(a);
    p.fill(c.gold);
    p.triangle(-3, 0, 0, -8, 3, 0);
    p.pop();
  }
  p.fill('#3a2618');
  p.rect(-50, 60, 100, 10, 2);
  p.fill(c.gold);
  p.rect(-6, 60, 12, 10, 2);
  p.fill(c.plateDark);
  p.ellipse(-50, -14, 38, 30);
  p.ellipse(50, -14, 38, 30);
  p.fill(c.plate);
  p.ellipse(-50, -16, 30, 24);
  p.ellipse(50, -16, 30, 24);

  p.push();
  p.translate(56, 0);
  p.rotate(p.radians(-40 + swordTilt));
  drawSword(p);
  p.pop();
  p.fill(c.plate);
  p.push();
  p.translate(46, -4);
  p.rotate(p.radians(-30 + swordTilt * 0.4));
  p.rect(-12, 0, 24, 50, 8);
  p.pop();
  p.push();
  p.translate(-46, -4);
  p.rotate(p.radians(-12));
  p.rect(-12, 0, 24, 50, 8);
  p.pop();

  p.push();
  p.translate(0, -80);
  p.rotate(p.radians(headTilt));
  p.fill(c.plateDark);
  p.ellipse(0, -10, 86, 96);
  p.fill(c.plate);
  p.ellipse(0, -12, 76, 88);
  p.fill('#0a0a0a');
  p.rect(-30, -14, 60, 6, 2);
  p.fill(c.plateDark);
  p.rect(-3, -14, 6, 28);
  p.fill(c.tabardDark);
  p.rect(-4, -56, 8, 16);
  p.fill(c.tabard);
  p.beginShape();
  p.vertex(-20, -56);
  p.bezierVertex(-30, -40, 30, -40, 20, -56);
  p.bezierVertex(10, -50, -10, -50, -20, -56);
  p.endShape(p.CLOSE);
  p.pop();
}

export const paladin = defineCharacter({
  id: 'paladin',
  name: 'Paladin',
  seedOffset: 21,
  palettes: PALETTES,
  swayRange: 8,
  headTiltRange: 6,
  drawBody,
});
