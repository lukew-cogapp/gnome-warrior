import type p5 from 'p5';
import { findCharacter } from './characters';
import { mulberry32 } from './rng';

export type DayNight = 'night' | 'day';

export interface SceneOpts {
  W: number;
  H: number;
  seed: number;
  frame: number;
  leftId: string;
  rightId: string;
  mode: DayNight;
}

// ============================================================
// Bats
// ============================================================
interface Bat {
  x: number;
  y: number;
  vx: number;
  yBase: number;
  yAmp: number;
  flapSpeed: number;
  flapPhase: number;
  bobPhase: number;
  size: number;
  dir: 1 | -1;
}

// Survives HMR module reloads by caching on import.meta.hot.data.
type HotCache = { bats: Bat[] | null; gulls: Gull[] | null; dragon: Dragon | null };
const hotCache: HotCache = (import.meta.hot?.data?.['flockCache'] as HotCache | undefined) ?? {
  bats: null,
  gulls: null,
  dragon: null,
};
if (import.meta.hot) {
  import.meta.hot.data['flockCache'] = hotCache;
}

let bats: Bat[] | null = hotCache.bats;

function initBats(W: number, H: number, seed: number): void {
  const r = mulberry32(seed);
  bats = [];
  for (let i = 0; i < 9; i++) {
    bats.push({
      x: r() * W,
      y: 60 + r() * (H * 0.4),
      vx: 0.6 + r() * 1.4,
      yBase: 60 + r() * (H * 0.4),
      yAmp: 18 + r() * 26,
      flapSpeed: 0.18 + r() * 0.18,
      flapPhase: r() * Math.PI * 2,
      bobPhase: r() * Math.PI * 2,
      size: 16 + r() * 22,
      dir: r() < 0.5 ? 1 : -1,
    });
  }
  hotCache.bats = bats;
}

function drawBats(p: p5, W: number, frame: number): void {
  if (!bats) return;
  for (const b of bats) {
    b.x += b.vx * b.dir;
    if (b.dir > 0 && b.x > W + 60) b.x = -60;
    if (b.dir < 0 && b.x < -60) b.x = W + 60;
    b.y = b.yBase + Math.sin(frame * 0.04 + b.bobPhase) * b.yAmp;
    const flap = Math.sin(frame * b.flapSpeed + b.flapPhase);
    drawBat(p, b.x, b.y, b.size, flap, b.dir);
  }
}

function drawBat(p: p5, x: number, y: number, size: number, flap: number, dir: 1 | -1): void {
  p.push();
  p.translate(x, y);
  p.scale(dir, 1);
  p.noStroke();
  p.fill(10, 10, 14, 230);
  const s = size / 24;
  const wingY = -8 * s + flap * 6 * s;
  const wingTipY = flap * 10 * s;
  p.ellipse(0, 0, 10 * s, 14 * s);
  p.ellipse(0, -8 * s, 8 * s, 7 * s);
  p.triangle(-3 * s, -11 * s, -1 * s, -14 * s, -1 * s, -10 * s);
  p.triangle(3 * s, -11 * s, 1 * s, -14 * s, 1 * s, -10 * s);
  p.beginShape();
  p.vertex(-2 * s, -2 * s);
  p.bezierVertex(-12 * s, wingY, -22 * s, -2 * s + wingTipY, -28 * s, 4 * s + wingTipY);
  p.bezierVertex(-22 * s, 4 * s + wingTipY * 0.5, -16 * s, 6 * s, -10 * s, 6 * s);
  p.bezierVertex(-8 * s, 4 * s, -4 * s, 2 * s, -2 * s, 2 * s);
  p.endShape(p.CLOSE);
  p.beginShape();
  p.vertex(2 * s, -2 * s);
  p.bezierVertex(12 * s, wingY, 22 * s, -2 * s + wingTipY, 28 * s, 4 * s + wingTipY);
  p.bezierVertex(22 * s, 4 * s + wingTipY * 0.5, 16 * s, 6 * s, 10 * s, 6 * s);
  p.bezierVertex(8 * s, 4 * s, 4 * s, 2 * s, 2 * s, 2 * s);
  p.endShape(p.CLOSE);
  p.pop();
}

// ============================================================
// Dragon — occasional silhouette, large + slow
// ============================================================
interface Dragon {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  flapPhase: number;
  dir: 1 | -1;
  cooldown: number; // frames until next spawn
}

let dragon: Dragon | null = hotCache.dragon;

const DRAGON_FORCE = typeof window !== 'undefined' && window.location.search.includes('dragon=1');

function ensureDragon(W: number, H: number, seed: number): void {
  if (dragon) return;
  const r = mulberry32(seed + 9001);
  dragon = {
    active: DRAGON_FORCE,
    x: DRAGON_FORCE ? -200 : -300,
    y: H * 0.18,
    vx: 1.6,
    flapPhase: 0,
    dir: 1,
    cooldown: DRAGON_FORCE ? 0 : Math.floor(r() * 600 + 600),
  };
  hotCache.dragon = dragon;
  void W;
}

function drawDragon(p: p5, W: number, H: number, frame: number): void {
  if (!dragon) return;
  if (!dragon.active) {
    dragon.cooldown -= 1;
    if (dragon.cooldown <= 0) {
      dragon.active = true;
      dragon.dir = Math.random() < 0.5 ? 1 : -1;
      dragon.x = dragon.dir > 0 ? -300 : W + 300;
      dragon.y = H * (0.12 + Math.random() * 0.18);
      dragon.vx = 1.4 + Math.random() * 1.6;
    }
    return;
  }
  dragon.x += dragon.vx * dragon.dir;
  dragon.flapPhase += 0.08;
  // off-screen → reset
  if ((dragon.dir > 0 && dragon.x > W + 320) || (dragon.dir < 0 && dragon.x < -320)) {
    dragon.active = false;
    dragon.cooldown = Math.floor(600 + Math.random() * 1200);
    return;
  }
  drawDragonBody(p, dragon.x, dragon.y, dragon.dir, dragon.flapPhase);
  void frame;
}

function drawDragonBody(p: p5, x: number, y: number, dir: 1 | -1, phase: number): void {
  p.push();
  p.translate(x, y);
  p.scale(dir, 1);
  p.noStroke();
  p.fill(10, 10, 14, 220);

  const flap = Math.sin(phase);
  const wingTipY = flap * 30;

  // tail
  p.beginShape();
  p.vertex(60, 0);
  p.bezierVertex(120, -10, 180, 0, 220, -10);
  p.vertex(220, -4);
  p.bezierVertex(180, 6, 120, 14, 60, 12);
  p.endShape(p.CLOSE);
  // body
  p.ellipse(40, 0, 80, 26);
  // neck + head
  p.beginShape();
  p.vertex(0, -2);
  p.bezierVertex(-30, -20, -60, -30, -90, -20);
  p.bezierVertex(-100, -6, -80, 6, -50, 6);
  p.bezierVertex(-30, 8, -10, 6, 0, 4);
  p.endShape(p.CLOSE);
  // head crest
  p.triangle(-86, -22, -78, -36, -72, -22);
  p.triangle(-78, -22, -70, -34, -64, -22);
  // legs underneath
  p.ellipse(20, 14, 16, 22);
  p.ellipse(54, 14, 16, 22);

  // wings — front + back, flapping
  p.fill(18, 18, 22, 230);
  p.beginShape();
  p.vertex(20, -8);
  p.bezierVertex(40, -50 - wingTipY, 80, -80 - wingTipY, 110, -40 - wingTipY * 0.6);
  p.bezierVertex(80, -30, 50, -10, 28, -2);
  p.endShape(p.CLOSE);
  p.beginShape();
  p.vertex(40, -8);
  p.bezierVertex(70, -40 - wingTipY * 0.8, 110, -60 - wingTipY * 0.8, 140, -30 - wingTipY * 0.5);
  p.bezierVertex(110, -22, 70, -8, 48, -2);
  p.endShape(p.CLOSE);

  p.pop();
}

// ============================================================
// Gulls — small day-mode bird silhouettes
// ============================================================
interface Gull {
  x: number;
  y: number;
  vx: number;
  size: number;
  flapPhase: number;
  flapSpeed: number;
  bobPhase: number;
  yBase: number;
  yAmp: number;
  dir: 1 | -1;
}

let gulls: Gull[] | null = hotCache.gulls;

function initGulls(W: number, H: number, seed: number): void {
  const r = mulberry32(seed + 4242);
  gulls = [];
  for (let i = 0; i < 6; i++) {
    gulls.push({
      x: r() * W,
      y: 0,
      vx: 0.5 + r() * 1.0,
      size: 14 + r() * 14,
      flapPhase: r() * Math.PI * 2,
      flapSpeed: 0.06 + r() * 0.08,
      bobPhase: r() * Math.PI * 2,
      yBase: 50 + r() * (H * 0.32),
      yAmp: 6 + r() * 14,
      dir: r() < 0.5 ? 1 : -1,
    });
  }
  hotCache.gulls = gulls;
}

function drawGulls(p: p5, W: number, frame: number): void {
  if (!gulls) return;
  for (const g of gulls) {
    g.x += g.vx * g.dir;
    if (g.dir > 0 && g.x > W + 40) g.x = -40;
    if (g.dir < 0 && g.x < -40) g.x = W + 40;
    g.y = g.yBase + Math.sin(frame * 0.03 + g.bobPhase) * g.yAmp;
    const flap = Math.sin(frame * g.flapSpeed + g.flapPhase);
    drawGull(p, g.x, g.y, g.size, flap, g.dir);
  }
}

function drawGull(p: p5, x: number, y: number, size: number, flap: number, dir: 1 | -1): void {
  // Classic "M" gull silhouette — two arched wings, tiny body in middle.
  p.push();
  p.translate(x, y);
  p.scale(dir, 1);
  p.noStroke();
  p.fill(20, 20, 28, 200);
  const s = size / 24;
  const arch = (1 - Math.abs(flap)) * 6 * s + 2 * s;
  p.beginShape();
  p.vertex(-22 * s, 0);
  p.bezierVertex(-14 * s, -arch * 1.6, -6 * s, -arch * 0.8, 0, 0);
  p.bezierVertex(6 * s, -arch * 0.8, 14 * s, -arch * 1.6, 22 * s, 0);
  p.bezierVertex(14 * s, -arch * 0.4, 6 * s, -arch * 0.2, 0, arch * 0.2);
  p.bezierVertex(-6 * s, -arch * 0.2, -14 * s, -arch * 0.4, -22 * s, 0);
  p.endShape(p.CLOSE);
  p.pop();
}

// ============================================================
// Backdrop
// ============================================================
function drawBackdrop(p: p5, W: number, H: number, mode: DayNight): void {
  if (mode === 'night') {
    for (let y = 0; y < H; y++) {
      const t = y / H;
      const c = p.lerpColor(p.color('#23283a'), p.color('#0e1018'), t);
      p.stroke(c);
      p.line(0, y, W, y);
    }
    p.noStroke();
    // moon
    p.fill(255, 240, 210, 30);
    p.circle(W * 0.78, H * 0.22, 320);
    p.fill(255, 240, 210, 60);
    p.circle(W * 0.78, H * 0.22, 200);
    p.fill(255, 245, 215);
    p.circle(W * 0.78, H * 0.22, 130);
    // floor
    p.fill('#1d2230');
    p.rect(0, H * 0.78, W, H * 0.22);
    p.stroke(0, 60);
    p.strokeWeight(1);
    for (let x = 0; x < W; x += 60) p.line(x, H * 0.78, x + 90, H);
    for (let y2 = H * 0.78; y2 < H; y2 += 22) p.line(0, y2, W, y2);
    p.noStroke();
  } else {
    // day
    for (let y = 0; y < H; y++) {
      const t = y / H;
      const c = p.lerpColor(p.color('#7ec0ee'), p.color('#fdd7a8'), t);
      p.stroke(c);
      p.line(0, y, W, y);
    }
    p.noStroke();
    // sun
    p.fill(255, 240, 180, 30);
    p.circle(W * 0.78, H * 0.22, 320);
    p.fill(255, 230, 150, 70);
    p.circle(W * 0.78, H * 0.22, 200);
    p.fill(255, 235, 170);
    p.circle(W * 0.78, H * 0.22, 130);
    // distant hills
    p.fill('#4a7a4a');
    p.beginShape();
    p.vertex(0, H * 0.62);
    for (let x = 0; x <= W; x += 40) {
      const yy = H * 0.62 + Math.sin(x * 0.012) * 18 + Math.sin(x * 0.04) * 6;
      p.vertex(x, yy);
    }
    p.vertex(W, H);
    p.vertex(0, H);
    p.endShape(p.CLOSE);
    // grass floor
    p.fill('#5a8a3a');
    p.rect(0, H * 0.78, W, H * 0.22);
    p.stroke(58, 106, 26, 60);
    p.strokeWeight(1);
    for (let x = 0; x < W; x += 8) {
      const h = 4 + (x % 13);
      p.line(x, H * 0.78, x + 1, H * 0.78 - h);
    }
    p.noStroke();
  }
}

function drawVignette(p: p5, W: number, H: number): void {
  p.noFill();
  for (let i = 0; i < 80; i++) {
    p.stroke(0, 6);
    p.rect(i, i, W - i * 2, H - i * 2, 14);
  }
  p.noStroke();
}

function drawShadow(p: p5): void {
  p.noStroke();
  p.fill(0, 90);
  p.ellipse(0, 165, 240, 36);
  p.fill(0, 50);
  p.ellipse(0, 165, 320, 50);
}

function drawCrystalGlow(p: p5, W: number, H: number): void {
  // Soft cyan halo around mage staff. Only when mage on the right.
  const cx = W / 2 + 230;
  const cy = H / 2 - 90;
  p.noStroke();
  for (let r = 360; r > 40; r -= 40) {
    p.fill(127, 227, 255, 8);
    p.circle(cx, cy, r);
  }
  void H;
}

// ============================================================
// Public scene API
// ============================================================
export function reseedFlocks(W: number, H: number, seed: number): void {
  initBats(W, H, seed);
  initGulls(W, H, seed);
}

export function drawScene(p: p5, opts: SceneOpts): void {
  const { W, H, seed, frame, leftId, rightId, mode } = opts;
  if (!bats) initBats(W, H, seed);
  if (!gulls) initGulls(W, H, seed);
  ensureDragon(W, H, seed);

  drawBackdrop(p, W, H, mode);

  if (mode === 'night') {
    // Dragon + bats only at night.
    drawDragon(p, W, H, frame);
    drawBats(p, W, frame);
  } else {
    drawGulls(p, W, frame);
  }

  // Mage staff glow — restored from original scene.
  if (rightId === 'mage' || leftId === 'mage') {
    drawCrystalGlow(p, W, H);
  }

  const left = findCharacter(leftId);
  const right = findCharacter(rightId);

  p.push();
  p.translate(W / 2 - 130, H / 2 + 60);
  drawShadow(p);
  left.draw(p, seed);
  p.pop();

  p.push();
  p.translate(W / 2 + 140, H / 2 + 60);
  drawShadow(p);
  right.draw(p, seed);
  p.pop();

  drawVignette(p, W, H);
}
