import p5 from 'p5';
import { drawScene } from './scene.js';

const W = 720, H = 800;
let p5Instance;
let seed = 7;

const sketch = (p) => {
  p.setup = () => {
    const c = p.createCanvas(W, H);
    c.parent('sketch');
    p.noLoop();
    p.randomSeed(seed);
    drawScene(p, { W, H, seed });
  };

  p.redrawScene = (newSeed) => {
    seed = newSeed;
    p.randomSeed(seed);
    drawScene(p, { W, H, seed });
    p.redraw();
  };
};

p5Instance = new p5(sketch);

document.getElementById('reroll').addEventListener('click', () => {
  p5Instance.redrawScene(Math.floor(Math.random() * 99999));
});
document.getElementById('save').addEventListener('click', () => {
  p5Instance.saveCanvas('gnome_warrior', 'png');
});

// Vite HMR — re-import scene module and redraw
if (import.meta.hot) {
  import.meta.hot.accept('./scene.js', (mod) => {
    if (!mod) return;
    mod.drawScene(p5Instance, { W, H, seed });
    p5Instance.redraw();
  });
}
