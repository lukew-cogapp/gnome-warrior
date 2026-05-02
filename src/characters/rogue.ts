import { slimLegs } from '../helpers';
import { PALETTE } from '../palette';
import { symmetric } from '../rng';
import { type DrawCtx, defineCharacter } from './base';

interface Palette {
  cloth: string;
  clothHi: string;
  clothShade: string;
  leather: string;
  leatherHi: string;
  buckle: string;
  eye: string;
}

const PALETTES: readonly Palette[] = [
  {
    cloth: '#2a2230',
    clothHi: '#3e3344',
    clothShade: '#1a1320',
    leather: '#4a2f1a',
    leatherHi: '#6b4528',
    buckle: PALETTE.gold,
    eye: '#ffd96a',
  },
  {
    cloth: '#3a1414',
    clothHi: '#5a2424',
    clothShade: '#1a0606',
    leather: '#1a0a08',
    leatherHi: '#3a1c14',
    buckle: PALETTE.gold,
    eye: '#ff5050',
  },
  {
    cloth: '#1c2e22',
    clothHi: '#2e4a36',
    clothShade: '#0e1a14',
    leather: '#3a2a18',
    leatherHi: '#5a4028',
    buckle: '#88aa44',
    eye: '#88ff88',
  },
  {
    cloth: '#1f1a3a',
    clothHi: '#2e264a',
    clothShade: '#100a20',
    leather: '#2a1a3a',
    leatherHi: '#4a2c5a',
    buckle: '#a87bd8',
    eye: '#c898ff',
  },
];

function drawDagger(p: import('p5')): void {
  p.noStroke();
  p.fill('#1a1208');
  p.circle(0, 38, 12);
  p.fill('#3a2a14');
  p.rect(-4, 12, 8, 24, 2);
  p.fill(PALETTE.gold);
  p.rect(-12, 8, 24, 6, 1);
  p.fill(PALETTE.steelDark);
  p.beginShape();
  p.vertex(-6, 8);
  p.vertex(0, -50);
  p.vertex(6, 8);
  p.endShape(p.CLOSE);
  p.fill(PALETTE.steelHi);
  p.beginShape();
  p.vertex(-2, 8);
  p.vertex(0, -48);
  p.vertex(2, 8);
  p.endShape(p.CLOSE);
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c } = ctx;
  const dagL = symmetric(rng, 30);
  const dagR = symmetric(rng, 30);

  slimLegs(p, c.leather, '#1a0e08');

  p.noStroke();
  p.fill(c.cloth);
  p.beginShape();
  p.vertex(-44, -20);
  p.bezierVertex(-52, 20, -48, 60, -38, 70);
  p.vertex(38, 70);
  p.bezierVertex(48, 60, 52, 20, 44, -20);
  p.endShape(p.CLOSE);
  p.fill(c.leather);
  p.rect(-44, 30, 88, 14, 2);
  p.fill(c.buckle);
  p.rect(-6, 30, 12, 14, 2);
  p.fill(c.leather);
  p.push();
  p.rotate(p.radians(-20));
  p.rect(-6, -20, 12, 90, 2);
  p.pop();

  p.push();
  p.translate(54, 30);
  p.rotate(p.radians(70 + dagR));
  drawDagger(p);
  p.pop();
  p.push();
  p.translate(-54, 30);
  p.rotate(p.radians(-70 + dagL));
  drawDagger(p);
  p.pop();

  p.fill(c.cloth);
  p.push();
  p.translate(40, -10);
  p.rotate(p.radians(35));
  p.rect(-10, 0, 22, 44, 6);
  p.pop();
  p.push();
  p.translate(-40, -10);
  p.rotate(p.radians(-35));
  p.rect(-10, 0, 22, 44, 6);
  p.pop();
  p.fill('#1a0e08');
  p.push();
  p.translate(54, 30);
  p.ellipse(0, 0, 22, 18);
  p.pop();
  p.push();
  p.translate(-54, 30);
  p.ellipse(0, 0, 22, 18);
  p.pop();

  p.push();
  p.translate(0, -70);
  p.fill(c.clothShade);
  p.beginShape();
  p.vertex(-46, 0);
  p.bezierVertex(-50, -50, 50, -50, 46, 0);
  p.bezierVertex(40, 20, -40, 20, -46, 0);
  p.endShape(p.CLOSE);
  p.fill('#2a1a18');
  p.ellipse(0, -8, 60, 64);
  p.fill(c.eye);
  p.ellipse(-12, -10, 9, 5);
  p.ellipse(12, -10, 9, 5);
  p.fill('#fff4c0');
  p.circle(-12, -10, 3);
  p.circle(12, -10, 3);
  p.fill(c.cloth);
  p.beginShape();
  p.vertex(-40, -8);
  p.bezierVertex(-50, -40, 50, -40, 40, -8);
  p.bezierVertex(20, -22, -20, -22, -40, -8);
  p.endShape(p.CLOSE);
  p.fill(c.clothHi);
  p.rect(-22, 0, 44, 22, 6);
  p.pop();

  p.fill(c.clothShade);
  p.beginShape();
  p.vertex(-30, -50);
  p.bezierVertex(-80, 40, -60, 120, -20, 130);
  p.vertex(20, 130);
  p.bezierVertex(60, 120, 80, 40, 30, -50);
  p.endShape(p.CLOSE);
}

export const rogue = defineCharacter({
  id: 'rogue',
  name: 'Rogue',
  seedOffset: 7,
  palettes: PALETTES,
  swayRange: 10,
  drawBody,
});
