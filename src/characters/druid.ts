import { PALETTE } from '../palette';
import { symmetric } from '../rng';
import { type DrawCtx, defineCharacter } from './base';

interface Palette {
  robe: string;
  robeHi: string;
  robeShade: string;
  sash: string;
  skin: string;
  skinShade: string;
  hair: string;
  leaf: string;
  leafDark: string;
  wood: string;
  woodDark: string;
  glow: [number, number, number];
}

const PALETTES: readonly Palette[] = [
  {
    robe: '#3a5a2a',
    robeHi: '#5a7a3a',
    robeShade: '#1e3a16',
    sash: '#a86838',
    skin: PALETTE.skinTan,
    skinShade: PALETTE.skinTanShade,
    hair: '#3a2618',
    leaf: '#6a9a3a',
    leafDark: '#3a5a1a',
    wood: '#6a4a2a',
    woodDark: PALETTE.woodDark,
    glow: [180, 230, 120],
  },
  {
    robe: '#5a4a2a',
    robeHi: '#7a6638',
    robeShade: '#3a2e16',
    sash: '#a85a30',
    skin: PALETTE.skinFair,
    skinShade: PALETTE.skinFairShade,
    hair: PALETTE.hairBlonde,
    leaf: '#e09030',
    leafDark: '#a86010',
    wood: '#5a3818',
    woodDark: '#2a1a08',
    glow: [255, 180, 80],
  },
  {
    robe: '#2a4a5a',
    robeHi: '#3e6a7a',
    robeShade: '#162a3a',
    sash: '#88a8c8',
    skin: PALETTE.skinTan,
    skinShade: PALETTE.skinTanShade,
    hair: '#cdd2dc',
    leaf: '#88c8e0',
    leafDark: '#3a7088',
    wood: '#3a4858',
    woodDark: '#1a2230',
    glow: [136, 200, 255],
  },
  {
    robe: '#3a2a4a',
    robeHi: '#5a4470',
    robeShade: '#1c1430',
    sash: '#a87bd8',
    skin: PALETTE.skinDark,
    skinShade: PALETTE.skinDarkShade,
    hair: '#1a1208',
    leaf: '#c898ff',
    leafDark: '#5a3a8a',
    wood: '#3a2a4a',
    woodDark: '#1c1430',
    glow: [200, 152, 255],
  },
];

function drawAntlerStaff(ctx: DrawCtx<Palette>): void {
  const { p, palette: c } = ctx;
  p.noStroke();
  p.fill(c.woodDark);
  p.rect(-6, -160, 12, 320, 4);
  p.fill(c.wood);
  p.rect(-3, -160, 6, 320, 3);
  p.fill(c.woodDark);
  for (let y = -140; y < 140; y += 30) p.ellipse(y % 60 ? -6 : 6, y, 8, 6);
  p.stroke(c.woodDark);
  p.strokeWeight(6);
  p.strokeCap(p.ROUND);
  p.noFill();
  p.beginShape();
  p.vertex(0, -160);
  p.bezierVertex(-10, -180, -20, -210, -30, -220);
  p.endShape();
  p.beginShape();
  p.vertex(0, -160);
  p.bezierVertex(10, -180, 20, -210, 30, -220);
  p.endShape();
  p.line(-22, -202, -34, -208);
  p.line(22, -202, 34, -208);
  p.line(-26, -212, -36, -198);
  p.line(26, -212, 36, -198);
  p.noStroke();
  for (let r = 36; r > 8; r -= 8) {
    p.fill(c.glow[0], c.glow[1], c.glow[2], 24);
    p.circle(0, -160, r);
  }
  p.fill(c.leafDark);
  p.circle(0, -160, 18);
  p.fill(c.leaf);
  p.circle(-2, -162, 14);
  p.fill(255);
  p.circle(-4, -164, 6);
}

function drawBody(ctx: DrawCtx<Palette>): void {
  const { p, rng, palette: c, headTilt } = ctx;
  const staffTilt = symmetric(rng, 16);

  p.push();
  p.translate(-44, -10);
  p.rotate(p.radians(staffTilt));
  drawAntlerStaff(ctx);
  p.pop();

  p.noStroke();
  p.fill(c.robeShade);
  p.beginShape();
  p.vertex(-52, -20);
  p.bezierVertex(-80, 50, -90, 130, -80, 168);
  p.vertex(80, 168);
  p.bezierVertex(90, 130, 80, 50, 52, -20);
  p.endShape(p.CLOSE);
  p.fill(c.robe);
  p.beginShape();
  p.vertex(-44, -16);
  p.bezierVertex(-72, 50, -78, 130, -68, 162);
  p.vertex(68, 162);
  p.bezierVertex(78, 130, 72, 50, 44, -16);
  p.endShape(p.CLOSE);
  p.fill(c.sash);
  p.rect(-46, 30, 92, 14, 3);

  p.fill(c.leafDark);
  for (let i = -3; i <= 3; i++) {
    const x = i * 14;
    p.beginShape();
    p.vertex(x, -22);
    p.bezierVertex(x - 8, -10, x - 6, 14, x, 18);
    p.bezierVertex(x + 6, 14, x + 8, -10, x, -22);
    p.endShape(p.CLOSE);
  }
  p.fill(c.leaf);
  for (let i = -2; i <= 2; i++) {
    const x = i * 14 + 4;
    p.beginShape();
    p.vertex(x, -18);
    p.bezierVertex(x - 5, -8, x - 4, 10, x, 14);
    p.bezierVertex(x + 4, 10, x + 5, -8, x, -18);
    p.endShape(p.CLOSE);
  }

  p.fill(c.robe);
  p.push();
  p.translate(-32, -6);
  p.rotate(p.radians(-20 + staffTilt * 0.4));
  p.rect(-12, 0, 24, 60, 8);
  p.pop();
  p.push();
  p.translate(32, -6);
  p.rotate(p.radians(20));
  p.rect(-12, 0, 24, 50, 8);
  p.pop();
  p.fill(c.skin);
  p.push();
  p.translate(-50, 50);
  p.ellipse(0, 0, 20, 16);
  p.pop();
  p.push();
  p.translate(50, 38);
  p.ellipse(0, 0, 20, 16);
  p.pop();
  p.fill(c.leaf);
  p.circle(54, 38, 12);
  p.fill(c.glow[0], c.glow[1], c.glow[2], 200);
  p.circle(54, 38, 18);

  p.fill(c.skinShade);
  p.ellipse(-22, 162, 28, 12);
  p.fill(c.skin);
  p.ellipse(-22, 160, 24, 8);
  p.fill(c.skinShade);
  p.ellipse(22, 162, 28, 12);
  p.fill(c.skin);
  p.ellipse(22, 160, 24, 8);

  p.push();
  p.translate(0, -78);
  p.rotate(p.radians(headTilt));
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-40, -10);
  p.bezierVertex(-58, 30, -50, 90, -36, 80);
  p.vertex(36, 80);
  p.bezierVertex(50, 90, 58, 30, 40, -10);
  p.endShape(p.CLOSE);
  p.fill(c.skinShade);
  p.rect(-10, 8, 20, 16, 4);
  p.fill(c.skin);
  p.ellipse(0, -8, 68, 78);
  p.fill(c.leafDark);
  p.rect(-22, 0, 8, 3);
  p.rect(14, 0, 8, 3);
  p.fill(c.leaf);
  p.rect(-3, -4, 6, 2);
  p.fill('#1a1208');
  p.ellipse(-13, -8, 9, 6);
  p.ellipse(13, -8, 9, 6);
  p.fill(c.leaf);
  p.circle(-13, -8, 4);
  p.circle(13, -8, 4);
  p.fill('#fff');
  p.circle(-12, -9, 2);
  p.circle(14, -9, 2);
  p.stroke('#1a1208');
  p.strokeWeight(2);
  p.line(-22, -18, -8, -16);
  p.line(8, -16, 22, -18);
  p.noStroke();
  p.fill('#5a3030');
  p.rect(-8, 8, 16, 2, 1);
  p.stroke(c.woodDark);
  p.strokeWeight(4);
  p.strokeCap(p.ROUND);
  p.noFill();
  p.line(-20, -32, -34, -54);
  p.line(-30, -48, -42, -50);
  p.line(-30, -48, -32, -64);
  p.line(20, -32, 34, -54);
  p.line(30, -48, 42, -50);
  p.line(30, -48, 32, -64);
  p.noStroke();
  p.fill(c.leaf);
  p.circle(-42, -50, 6);
  p.circle(42, -50, 6);
  p.circle(-32, -64, 6);
  p.circle(32, -64, 6);
  p.pop();
}

export const druid = defineCharacter({
  id: 'druid',
  name: 'Druid',
  seedOffset: 59,
  palettes: PALETTES,
  swayRange: 12,
  headTiltRange: 6,
  drawBody,
});
