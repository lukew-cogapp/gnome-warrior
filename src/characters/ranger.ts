import { slimLegs } from '../helpers';
import { PALETTE } from '../palette';
import { type DrawCtx, defineCharacter } from './base';

interface Palette {
  cloak: string;
  cloakHi: string;
  cloakShade: string;
  tunic: string;
  tunicHi: string;
  leather: string;
  skin: string;
  skinShade: string;
  hair: string;
  feather: string;
}

const PALETTES: readonly Palette[] = [
  {
    cloak: '#2a4a2a',
    cloakHi: '#3e6a3e',
    cloakShade: '#16321a',
    tunic: '#5a4a30',
    tunicHi: '#7a6440',
    leather: '#3a2818',
    skin: PALETTE.skinTan,
    skinShade: PALETTE.skinTanShade,
    hair: PALETTE.hairBlonde,
    feather: '#aa3030',
  },
  {
    cloak: '#2a3a5a',
    cloakHi: '#3e5a8a',
    cloakShade: '#162244',
    tunic: '#3a3a4a',
    tunicHi: '#5a5a6a',
    leather: '#1a1a2a',
    skin: PALETTE.skinFair,
    skinShade: PALETTE.skinFairShade,
    hair: PALETTE.hairBlack,
    feather: '#88bbff',
  },
  {
    cloak: '#5a3a2a',
    cloakHi: '#7a5440',
    cloakShade: '#3a1c14',
    tunic: '#3a2a1a',
    tunicHi: '#5a4030',
    leather: '#2a1a08',
    skin: PALETTE.skinDark,
    skinShade: PALETTE.skinDarkShade,
    hair: PALETTE.hairBrown,
    feather: '#e8c878',
  },
  {
    cloak: '#3a2a4a',
    cloakHi: '#5a4470',
    cloakShade: '#1c1430',
    tunic: '#2a223a',
    tunicHi: '#4a3a5a',
    leather: '#1a1228',
    skin: PALETTE.skinTan,
    skinShade: PALETTE.skinTanShade,
    hair: '#e8e0d0',
    feather: '#c898ff',
  },
];

function drawBow(p: import('p5'), drawDist: number): void {
  p.noFill();
  p.stroke(PALETTE.woodDark);
  p.strokeWeight(8);
  p.strokeCap(p.ROUND);
  p.beginShape();
  p.vertex(0, -90);
  p.bezierVertex(-30, -60, -30, 60, 0, 90);
  p.endShape();
  p.stroke(PALETTE.wood);
  p.strokeWeight(4);
  p.beginShape();
  p.vertex(0, -90);
  p.bezierVertex(-26, -60, -26, 60, 0, 90);
  p.endShape();
  p.stroke('#e0e0e0');
  p.strokeWeight(1.5);
  p.line(0, -90, 16 + drawDist, 0);
  p.line(0, 90, 16 + drawDist, 0);
  p.noStroke();
  p.fill('#3a2618');
  p.rect(0, -2, 60, 3);
  p.fill(PALETTE.steel);
  p.triangle(60, -4, 70, 0, 60, 4);
  p.fill('#aa3030');
  p.triangle(-2, -6, 8, 0, -2, 6);
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c, headTilt } = ctx;
  const bowDraw = rng() * 14;

  slimLegs(p, c.tunic, c.leather);

  p.noStroke();
  p.fill(c.cloakShade);
  p.beginShape();
  p.vertex(-50, -40);
  p.bezierVertex(-90, 30, -80, 130, -40, 140);
  p.vertex(40, 140);
  p.bezierVertex(80, 130, 90, 30, 50, -40);
  p.endShape(p.CLOSE);

  p.fill(c.tunic);
  p.beginShape();
  p.vertex(-44, -20);
  p.bezierVertex(-52, 20, -48, 60, -38, 70);
  p.vertex(38, 70);
  p.bezierVertex(48, 60, 52, 20, 44, -20);
  p.endShape(p.CLOSE);
  p.fill(c.tunicHi);
  p.beginShape();
  p.vertex(-12, -15);
  p.bezierVertex(-16, 30, -10, 60, 0, 68);
  p.vertex(2, 68);
  p.bezierVertex(-2, 30, -4, -10, -6, -15);
  p.endShape(p.CLOSE);
  p.fill(c.leather);
  p.rect(-44, 36, 88, 10, 2);
  p.fill(PALETTE.gold);
  p.rect(-6, 36, 12, 10, 2);

  p.push();
  p.translate(38, -30);
  p.rotate(p.radians(15));
  p.fill(c.leather);
  p.rect(-10, 0, 20, 80, 4);
  p.fill('#5a3a1a');
  p.rect(-8, 4, 16, 6, 1);
  for (let i = -1; i <= 1; i++) {
    p.fill(c.feather);
    p.triangle(-2 + i * 5, -14, 2 + i * 5, -14, 0 + i * 5, -2);
    p.fill('#3a2618');
    p.rect(-1 + i * 5, -14, 2, 4);
  }
  p.pop();

  p.push();
  p.translate(-50, 0);
  p.rotate(p.radians(-8));
  drawBow(p, bowDraw);
  p.pop();

  p.fill(c.tunic);
  p.push();
  p.translate(-38, -8);
  p.rotate(p.radians(-30));
  p.rect(-10, 0, 22, 50, 6);
  p.pop();
  p.push();
  p.translate(28, -10);
  p.rotate(p.radians(60));
  p.rect(-10, 0, 22, 38, 6);
  p.pop();
  p.fill(c.leather);
  p.push();
  p.translate(-58, 18);
  p.ellipse(0, 0, 22, 16);
  p.pop();
  p.push();
  p.translate(20, 30);
  p.ellipse(0, 0, 20, 16);
  p.pop();

  p.push();
  p.translate(0, -68);
  p.rotate(p.radians(headTilt));
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-38, -10);
  p.bezierVertex(-50, 10, -48, 30, -38, 30);
  p.vertex(38, 30);
  p.bezierVertex(48, 30, 50, 10, 38, -10);
  p.endShape(p.CLOSE);
  p.fill(c.skinShade);
  p.rect(-10, 8, 20, 16, 4);
  p.fill(c.skin);
  p.ellipse(0, -6, 70, 76);
  p.fill(c.skin);
  p.beginShape();
  p.vertex(-34, -8);
  p.vertex(-46, -22);
  p.vertex(-30, 4);
  p.endShape(p.CLOSE);
  p.beginShape();
  p.vertex(34, -8);
  p.vertex(46, -22);
  p.vertex(30, 4);
  p.endShape(p.CLOSE);
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-32, -22);
  p.bezierVertex(-26, -42, 26, -42, 32, -22);
  p.bezierVertex(20, -28, -20, -28, -32, -22);
  p.endShape(p.CLOSE);
  p.fill('#5a3a1a');
  p.rect(-32, -22, 64, 6, 2);
  p.stroke('#1a1208');
  p.strokeWeight(3);
  p.strokeCap(p.ROUND);
  p.line(-20, -12, -8, -10);
  p.line(8, -10, 20, -12);
  p.strokeWeight(2);
  p.line(-22, -18, -8, -16);
  p.line(8, -16, 22, -18);
  p.noStroke();
  p.fill('#7a3030');
  p.rect(-6, 8, 12, 2, 1);
  p.pop();

  p.fill(c.cloak);
  p.beginShape();
  p.vertex(-44, -76);
  p.bezierVertex(-50, -110, 50, -110, 44, -76);
  p.bezierVertex(30, -90, -30, -90, -44, -76);
  p.endShape(p.CLOSE);
}

export const ranger = defineCharacter({
  id: 'ranger',
  name: 'Ranger',
  seedOffset: 33,
  palettes: PALETTES,
  swayRange: 12,
  headTiltRange: 6,
  drawBody,
});
