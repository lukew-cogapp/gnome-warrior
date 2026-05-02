import p5 from 'p5';
import { drawScene, reseedBats } from './scene.js';

const W = 720, H = 800;
let p5Instance;
let seed = 7;
let frame = 0;

const sketch = (p) => {
  p.setup = () => {
    const c = p.createCanvas(W, H);
    c.parent('sketch');
    p.frameRate(30);
    p.randomSeed(seed);
    reseedBats(W, H, seed);
  };

  p.draw = () => {
    frame = p.frameCount;
    p.randomSeed(seed); // keep beard tufts stable per seed
    drawScene(p, { W, H, seed, frame });
  };

  p.redrawScene = (newSeed) => {
    seed = newSeed;
    reseedBats(W, H, seed);
  };
};

p5Instance = new p5(sketch);

document.getElementById('reroll').addEventListener('click', () => {
  p5Instance.redrawScene(Math.floor(Math.random() * 99999));
});
document.getElementById('save').addEventListener('click', () => {
  p5Instance.saveCanvas('gnome_warrior', 'png');
});

if (import.meta.hot) {
  import.meta.hot.accept('./scene.js', () => {
    // module reloads itself; loop picks up new draw fns next frame
  });
}
