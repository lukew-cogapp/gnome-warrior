// Stylised gnome warrior scene — pure draw fns.
// HMR-friendly: only export drawScene, no module-level state beyond constants.

const PALETTE = {
  skin: '#e6b48a',
  skinShade: '#b8825c',
  beard: '#dee3ea',
  beardShade: '#9aa3b1',
  tunic: '#5a3a2a',
  tunicHi: '#7a4f3a',
  belt: '#2a1c14',
  buckle: '#d8b14a',
  boot: '#33231a',
  hat: '#a83232',
  hatShade: '#6e1f1f',
  wood: '#5b3a22',
  steel: '#c8cdd4',
  steelHi: '#eef1f6',
  steelDark: '#6e757f',
  gold: '#d8b14a',
  goldDark: '#8a6a1c',
  // mage palette
  robe: '#3a2a6e',
  robeHi: '#5a44a3',
  robeShade: '#241752',
  trim: '#d8b14a',
  hair: '#c0392b',
  hairHi: '#e25b3f',
  skinM: '#f1cba0',
  skinMShade: '#c79868',
  staff: '#6b4a2a',
  staffDark: '#3a2614',
  crystal: '#7fe3ff',
  crystalHi: '#e8fbff',
  crystalDark: '#2a8aa8',
};

export function drawScene(p, { W, H, seed }) {
  p.background('#1a1d24');
  drawBackdrop(p, W, H);

  // crystal light glow on ground (cast from mage staff)
  drawCrystalGlow(p, W, H);

  // gnome on left
  p.push();
  p.translate(W / 2 - 130, H / 2 + 60);
  drawShadow(p);
  drawGnome(p, seed);
  p.pop();

  // mage on right, taller — shadow further down to align feet
  p.push();
  p.translate(W / 2 + 140, H / 2 + 60);
  drawShadow(p);
  drawMage(p, seed);
  p.pop();

  drawVignette(p, W, H);
}

function drawCrystalGlow(p, W, H) {
  // Soft cyan halo around mage staff area
  const cx = W / 2 + 230;
  const cy = H / 2 - 90;
  p.noStroke();
  for (let r = 360; r > 40; r -= 40) {
    p.fill(127, 227, 255, 8);
    p.circle(cx, cy, r);
  }
}

function drawBackdrop(p, W, H) {
  for (let y = 0; y < H; y++) {
    const t = y / H;
    const c = p.lerpColor(p.color('#23283a'), p.color('#0e1018'), t);
    p.stroke(c);
    p.line(0, y, W, y);
  }
  p.noStroke();
  p.fill(255, 240, 210, 30); p.circle(W * 0.78, H * 0.22, 320);
  p.fill(255, 240, 210, 60); p.circle(W * 0.78, H * 0.22, 200);
  p.fill(255, 245, 215);     p.circle(W * 0.78, H * 0.22, 130);
  p.fill('#1d2230');
  p.rect(0, H * 0.78, W, H * 0.22);
  p.stroke(0, 60); p.strokeWeight(1);
  for (let x = 0; x < W; x += 60) p.line(x, H * 0.78, x + 90, H);
  for (let y = H * 0.78; y < H; y += 22) p.line(0, y, W, y);
  p.noStroke();
}

function drawVignette(p, W, H) {
  p.noFill();
  for (let i = 0; i < 80; i++) {
    p.stroke(0, 6);
    p.rect(i, i, W - i * 2, H - i * 2, 14);
  }
  p.noStroke();
}

function drawShadow(p) {
  p.noStroke();
  p.fill(0, 90); p.ellipse(0, 165, 240, 36);
  p.fill(0, 50); p.ellipse(0, 165, 320, 50);
}

function drawGnome(p, seed) {
  const c = PALETTE;
  const r = mulberry32(seed);
  const sway       = (r() - 0.5) * 14;
  const axeTilt    = (r() - 0.5) * 60;        // -30 .. +30 deg
  const axeLift    = (r() - 0.5) * 30;        // raise/lower y
  const shieldTilt = (r() - 0.5) * 24;
  const shieldX    = -110 + (r() - 0.5) * 16;
  const armRSpread = (r() - 0.5) * 16;
  const armLSpread = (r() - 0.5) * 16;
  const headTilt   = (r() - 0.5) * 8;

  p.push();
  p.translate(sway, 0);

  // shield (behind body)
  p.push();
  p.translate(shieldX, 10);
  p.rotate(p.radians(-6 + shieldTilt));
  drawShield(p, c);
  p.pop();

  // legs
  p.push();
  p.noStroke();
  p.fill(c.tunic);
  p.rect(-44, 70, 36, 60, 8);
  p.rect(8, 70, 36, 60, 8);
  p.fill(c.boot);
  p.rect(-50, 120, 44, 30, 6);
  p.rect(6, 120, 44, 30, 6);
  p.fill(0, 40);
  p.rect(-50, 142, 44, 8, 4);
  p.rect(6, 142, 44, 8, 4);
  p.pop();

  // body
  p.push();
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
  p.fill(c.belt);
  p.rect(-72, 50, 144, 18, 4);
  p.fill(c.buckle);
  p.rect(-10, 50, 20, 18, 3);
  p.fill(c.goldDark);
  p.rect(-6, 54, 12, 10, 2);
  p.pop();

  // ===== AXE held upright in right hand =====
  // Drawn BEFORE arm so hand sits on top of haft.
  // Axe origin = grip point (gnome's right hand near hip).
  const handR = { x: 78, y: 40 + axeLift };
  p.push();
  p.translate(handR.x, handR.y);
  p.rotate(p.radians(-4 + axeTilt));
  drawAxe(p, c);
  p.pop();

  // right arm (over body, ends at hand on haft)
  p.push();
  p.translate(58, -8);
  p.noStroke();
  p.fill(c.tunicHi);
  p.ellipse(0, 0, 36, 28);
  p.fill(c.tunic);
  p.push();
  p.rotate(p.radians(12 + armRSpread));
  p.rect(-14, 0, 28, 50, 10);
  p.pop();
  p.pop();
  // hand gripping haft (on top of haft + arm)
  p.push();
  p.translate(handR.x, handR.y);
  p.fill(c.skinShade);
  p.ellipse(0, 0, 30, 24);
  p.fill(c.skin);
  p.ellipse(-2, -2, 24, 18);
  // thumb over haft
  p.fill(c.skinShade);
  p.ellipse(-10, 4, 12, 8);
  // knuckle line
  p.stroke(c.skinShade); p.strokeWeight(1.5);
  p.line(-6, -4, 8, -4);
  p.noStroke();
  p.pop();

  // ===== left arm reaching across to shield =====
  // shield boss is at world (-110, 10); left hand grips boss area.
  const handL = { x: -78, y: 30 };
  p.push();
  p.translate(-58, -8);
  p.noStroke();
  p.fill(c.tunicHi);
  p.ellipse(0, 0, 36, 28);
  p.fill(c.tunic);
  p.push();
  p.rotate(p.radians(-14 + armLSpread));
  p.rect(-14, 0, 28, 46, 10);
  p.pop();
  p.pop();
  // hand on shield boss
  p.push();
  p.translate(handL.x, handL.y);
  p.fill(c.skinShade);
  p.ellipse(0, 0, 30, 22);
  p.fill(c.skin);
  p.ellipse(2, -2, 24, 16);
  p.fill(c.skinShade);
  for (let i = -8; i <= 8; i += 5) p.circle(i, -6, 4);
  p.pop();

  // head
  p.push();
  p.translate(0, -60);
  p.rotate(p.radians(headTilt));
  p.noStroke();
  p.fill(c.skinShade);
  p.rect(-14, -8, 28, 18, 5);
  p.fill(c.skin);
  p.ellipse(0, -10, 90, 86);
  p.fill(220, 120, 110, 70);
  p.circle(-22, 6, 22);
  p.circle(22, 6, 22);
  p.fill(c.skinShade);
  p.ellipse(0, 6, 30, 24);
  p.fill(c.skin);
  p.ellipse(-4, 2, 14, 10);
  p.stroke('#1a1208'); p.strokeWeight(3); p.strokeCap(p.ROUND);
  p.line(-22, -10, -10, -8);
  p.line(10, -8, 22, -10);
  p.strokeWeight(4);
  p.line(-26, -20, -10, -16);
  p.line(10, -16, 26, -20);
  p.noStroke();

  // beard
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
  p.ellipse(-14, 16, 28, 12);
  p.ellipse(14, 16, 28, 12);
  // beard texture — short tufts, varied angle
  p.stroke(c.beardShade); p.strokeWeight(1);
  for (let i = 0; i < 24; i++) {
    const x = p.random(-32, 32);
    const y = p.random(35, 95);
    const len = p.random(4, 10);
    const ang = p.random(-0.4, 0.4) + Math.PI / 2;
    p.line(x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len);
  }
  p.noStroke();

  // hat
  p.fill(c.hatShade);
  p.beginShape();
  p.vertex(-50, -38);
  p.vertex(-30, -150);
  p.vertex(50, -38);
  p.endShape(p.CLOSE);
  p.fill(c.hat);
  p.beginShape();
  p.vertex(-44, -38);
  p.vertex(-26, -148);
  p.vertex(46, -38);
  p.endShape(p.CLOSE);
  p.fill(c.hatShade);
  p.ellipse(0, -36, 120, 22);
  p.fill(c.hat);
  p.ellipse(0, -40, 116, 18);
  p.fill(c.gold);
  p.circle(-26, -148, 10);
  p.pop();

  p.pop();
}

function drawAxe(p, c) {
  p.noStroke();
  p.fill(c.wood);
  p.rect(-6, -90, 12, 180, 4);
  p.fill('#2a1c14');
  for (let y = 60; y < 88; y += 6) p.rect(-7, y, 14, 3);
  p.fill(c.steelDark);
  p.circle(0, 92, 16);
  p.fill(c.steel);
  p.circle(-2, 90, 10);

  p.push();
  p.translate(0, -80);
  p.fill(c.steelDark);
  p.beginShape();
  p.vertex(-4, -14); p.vertex(-44, -28); p.vertex(-50, 0);
  p.vertex(-44, 28); p.vertex(-4, 14);
  p.endShape(p.CLOSE);
  p.beginShape();
  p.vertex(4, -14); p.vertex(44, -28); p.vertex(50, 0);
  p.vertex(44, 28); p.vertex(4, 14);
  p.endShape(p.CLOSE);
  p.fill(c.steel);
  p.beginShape();
  p.vertex(-4, -10); p.vertex(-38, -22); p.vertex(-42, 0);
  p.vertex(-38, 22); p.vertex(-4, 10);
  p.endShape(p.CLOSE);
  p.beginShape();
  p.vertex(4, -10); p.vertex(38, -22); p.vertex(42, 0);
  p.vertex(38, 22); p.vertex(4, 10);
  p.endShape(p.CLOSE);
  p.fill(c.steelHi);
  p.triangle(-44, -28, -50, 0, -46, -4);
  p.triangle(44, -28, 50, 0, 46, -4);
  p.fill('#3a2a1a');
  p.rect(-8, -16, 16, 32, 3);
  p.fill('#d8b14a');
  p.rect(-9, -18, 18, 4, 2);
  p.rect(-9, 14, 18, 4, 2);
  p.pop();
}

function drawShield(p, c) {
  p.noStroke();
  p.fill(0, 80);
  p.ellipse(4, 4, 168, 168);
  p.fill('#5b3a22');
  p.circle(0, 0, 162);
  p.fill(c.steel);
  p.circle(0, 0, 152);
  p.noFill();
  p.stroke(c.steelDark); p.strokeWeight(8);
  p.circle(0, 0, 142);
  p.stroke(c.steelHi); p.strokeWeight(2);
  p.circle(0, 0, 142);
  p.noStroke();
  p.fill(c.steelDark);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    p.circle(Math.cos(a) * 65, Math.sin(a) * 65, 8);
  }
  p.fill(c.goldDark);
  p.beginShape();
  p.vertex(-26, 18); p.vertex(0, -42); p.vertex(26, 18);
  p.endShape(p.CLOSE);
  p.fill(c.gold);
  p.beginShape();
  p.vertex(-22, 14); p.vertex(0, -36); p.vertex(22, 14);
  p.endShape(p.CLOSE);
  p.stroke(c.goldDark); p.strokeWeight(4); p.strokeCap(p.ROUND);
  p.line(-18, 24, 18, 44);
  p.line(18, 24, -18, 44);
  p.noStroke();
  p.fill(c.steelDark);
  p.circle(0, 0, 28);
  p.fill(c.steel);
  p.circle(-2, -2, 22);
  p.fill(c.steelHi);
  p.circle(-4, -4, 10);
}

// ============================================================
// Mage — female, tall, robes, staff with crystal
// ============================================================
function drawMage(p, seed) {
  const c = PALETTE;
  // pose seed offsets — bigger swings
  const r = mulberry32(seed + 1337);
  const sway       = (r() - 0.5) * 12;
  const staffTilt  = (r() - 0.5) * 30;        // -15 .. +15 deg
  const armBend    = (r() - 0.5) * 40;        // free hand swing
  const headTilt   = (r() - 0.5) * 8;
  const hipShift   = (r() - 0.5) * 6;

  p.push();
  p.translate(sway, 0);

  // ---- staff (behind body) ----
  p.push();
  p.translate(40, -20);
  p.rotate(p.radians(staffTilt));
  drawStaff(p, c);
  p.pop();

  // ---- robe (long, flares to ground) ----
  p.push();
  p.noStroke();
  // robe shadow side
  p.fill(c.robeShade);
  p.beginShape();
  p.vertex(-60, -20);
  p.bezierVertex(-90, 50, -110, 130, -100, 170);
  p.vertex(100 + hipShift, 170);
  p.bezierVertex(110, 130, 90, 50, 60, -20);
  p.endShape(p.CLOSE);
  // robe main
  p.fill(c.robe);
  p.beginShape();
  p.vertex(-50, -20);
  p.bezierVertex(-78, 50, -90, 130, -80, 168);
  p.vertex(90 + hipShift, 168);
  p.bezierVertex(98, 130, 78, 50, 50, -20);
  p.endShape(p.CLOSE);
  // robe highlight panel down centre
  p.fill(c.robeHi);
  p.beginShape();
  p.vertex(-12, -10);
  p.bezierVertex(-18, 60, -14, 130, -8, 168);
  p.vertex(12, 168);
  p.bezierVertex(18, 130, 22, 60, 12, -10);
  p.endShape(p.CLOSE);
  // gold trim hem
  p.fill(c.trim);
  p.rect(-82, 162, 174, 6, 2);
  // gold trim seams
  p.stroke(c.trim); p.strokeWeight(2); p.noFill();
  p.beginShape();
  p.vertex(-12, -10);
  p.bezierVertex(-18, 60, -14, 130, -8, 168);
  p.endShape();
  p.beginShape();
  p.vertex(12, -10);
  p.bezierVertex(18, 130, 22, 60, 12, -10);
  p.endShape();
  p.noStroke();
  // belt cord
  p.fill(c.trim);
  p.rect(-50, 60, 100, 6, 3);
  p.fill(c.goldDark);
  p.circle(-40, 70, 10);
  p.circle(-40, 84, 6);
  p.pop();

  // ---- right arm holding staff ----
  p.push();
  p.translate(36, -10);
  p.rotate(p.radians(staffTilt * 0.4));
  p.noStroke();
  // sleeve, flared cuff
  p.fill(c.robeShade);
  p.beginShape();
  p.vertex(-14, 0);
  p.vertex(-22, 70);
  p.vertex(22, 70);
  p.vertex(14, 0);
  p.endShape(p.CLOSE);
  p.fill(c.robe);
  p.beginShape();
  p.vertex(-10, 4);
  p.vertex(-18, 66);
  p.vertex(18, 66);
  p.vertex(10, 4);
  p.endShape(p.CLOSE);
  p.fill(c.trim);
  p.rect(-22, 68, 44, 4, 1);
  // hand on staff
  p.fill(c.skinMShade);
  p.ellipse(0, 80, 24, 18);
  p.fill(c.skinM);
  p.ellipse(-2, 78, 18, 14);
  p.pop();

  // ---- left arm — gesture, casts spell, varies with seed ----
  p.push();
  p.translate(-40, -8);
  p.rotate(p.radians(-30 + armBend));
  p.noStroke();
  p.fill(c.robeShade);
  p.beginShape();
  p.vertex(-14, 0);
  p.vertex(-22, 60);
  p.vertex(22, 60);
  p.vertex(14, 0);
  p.endShape(p.CLOSE);
  p.fill(c.robe);
  p.beginShape();
  p.vertex(-10, 4);
  p.vertex(-18, 56);
  p.vertex(18, 56);
  p.vertex(10, 4);
  p.endShape(p.CLOSE);
  p.fill(c.trim);
  p.rect(-22, 58, 44, 4, 1);
  // hand
  p.fill(c.skinMShade);
  p.ellipse(0, 70, 22, 16);
  p.fill(c.skinM);
  p.ellipse(-2, 68, 16, 12);
  // tiny spark in palm (wisp)
  p.fill(c.crystalHi);
  p.circle(0, 70, 6);
  p.fill(255, 255, 255, 200);
  p.circle(0, 70, 3);
  p.pop();

  // ---- head + hair ----
  p.push();
  p.translate(0, -70);
  p.rotate(p.radians(headTilt));

  // long hair behind
  p.noStroke();
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-42, -10);
  p.bezierVertex(-60, 30, -54, 80, -40, 70);
  p.vertex(40, 70);
  p.bezierVertex(54, 80, 60, 30, 42, -10);
  p.endShape(p.CLOSE);
  // hair highlight strands
  p.stroke(c.hairHi); p.strokeWeight(1.5); p.noFill();
  for (let i = 0; i < 6; i++) {
    const x = p.lerp(-30, 30, i / 5);
    p.beginShape();
    p.vertex(x, 0);
    p.bezierVertex(x - 4, 30, x + 4, 60, x - 2, 70);
    p.endShape();
  }
  p.noStroke();

  // neck
  p.fill(c.skinMShade);
  p.rect(-10, -12, 20, 18, 4);

  // face
  p.fill(c.skinM);
  p.ellipse(0, -16, 70, 78);

  // hair fringe in front
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-36, -28);
  p.bezierVertex(-30, -50, 30, -52, 36, -28);
  p.bezierVertex(20, -22, -20, -22, -36, -28);
  p.endShape(p.CLOSE);
  // side locks framing face
  p.fill(c.hair);
  p.beginShape();
  p.vertex(-34, -20);
  p.bezierVertex(-44, 0, -38, 40, -28, 20);
  p.endShape(p.CLOSE);
  p.beginShape();
  p.vertex(34, -20);
  p.bezierVertex(44, 0, 38, 40, 28, 20);
  p.endShape(p.CLOSE);

  // blush
  p.fill(230, 130, 130, 90);
  p.circle(-18, -4, 14);
  p.circle(18, -4, 14);

  // eyes — focused, almond shape
  p.fill('#1a1208');
  p.ellipse(-14, -14, 9, 5);
  p.ellipse(14, -14, 9, 5);
  // eye highlight
  p.fill(255);
  p.circle(-12, -15, 2);
  p.circle(16, -15, 2);
  // brows
  p.stroke('#3a1a08'); p.strokeWeight(2); p.strokeCap(p.ROUND);
  p.line(-22, -22, -8, -20);
  p.line(8, -20, 22, -22);
  p.noStroke();
  // nose hint
  p.stroke(c.skinMShade); p.strokeWeight(1.5);
  p.line(0, -8, -2, 0);
  p.noStroke();
  // lips
  p.fill('#a83b4e');
  p.ellipse(0, 8, 14, 4);
  p.fill('#c84d62');
  p.rect(-5, 6, 10, 2, 1);

  // circlet
  p.fill(c.trim);
  p.rect(-32, -28, 64, 4, 2);
  p.fill(c.crystalHi);
  p.beginShape();
  p.vertex(0, -36);
  p.vertex(-6, -28);
  p.vertex(6, -28);
  p.endShape(p.CLOSE);
  p.fill(c.crystal);
  p.circle(0, -30, 6);

  p.pop();

  p.pop();
}

function drawStaff(p, c) {
  // long shaft
  p.noStroke();
  p.fill(c.staffDark);
  p.rect(-5, -160, 10, 320, 3);
  p.fill(c.staff);
  p.rect(-3, -160, 6, 320, 3);
  // wraps
  p.fill(c.staffDark);
  for (let y = -40; y < 80; y += 14) p.rect(-6, y, 12, 4, 1);
  // gold cap below crystal
  p.fill(c.gold);
  p.rect(-10, -176, 20, 16, 3);
  p.fill(c.goldDark);
  p.rect(-10, -162, 20, 4, 1);
  // crystal cluster on top
  p.push();
  p.translate(0, -200);
  // glow
  for (let r = 80; r > 12; r -= 12) {
    p.fill(127, 227, 255, 18);
    p.circle(0, 0, r);
  }
  // main shard
  p.fill(c.crystalDark);
  p.beginShape();
  p.vertex(-12, 22);
  p.vertex(-16, -10);
  p.vertex(0, -36);
  p.vertex(16, -10);
  p.vertex(12, 22);
  p.endShape(p.CLOSE);
  p.fill(c.crystal);
  p.beginShape();
  p.vertex(-8, 18);
  p.vertex(-12, -8);
  p.vertex(0, -32);
  p.vertex(12, -8);
  p.vertex(8, 18);
  p.endShape(p.CLOSE);
  p.fill(c.crystalHi);
  p.beginShape();
  p.vertex(-3, 14);
  p.vertex(-6, -6);
  p.vertex(0, -28);
  p.vertex(2, -8);
  p.vertex(2, 14);
  p.endShape(p.CLOSE);
  // sparkle
  p.fill(255);
  p.circle(-2, -16, 3);
  p.circle(4, 4, 2);
  p.pop();
}

// Deterministic RNG — used so reroll seeds give big repeatable variation.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
