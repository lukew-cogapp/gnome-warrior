import p5 from 'p5';
import { drawScene, reseedBats, type DayNight } from './scene';
import { CHARACTERS } from './characters';

const W = 720;
const H = 800;

interface SketchInstance extends p5 {
  redrawScene: (newSeed: number) => void;
}

const STORE_KEY = 'gnome-warrior-state-v1';

interface PersistedState {
  leftId: string;
  rightId: string;
  mode: DayNight;
  seed: number;
}

function loadState(): PersistedState {
  const fallback: PersistedState = {
    leftId: 'gnome',
    rightId: 'mage',
    mode: 'night',
    seed: 7,
  };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      leftId: parsed.leftId ?? fallback.leftId,
      rightId: parsed.rightId ?? fallback.rightId,
      mode: parsed.mode === 'day' ? 'day' : 'night',
      seed: typeof parsed.seed === 'number' ? parsed.seed : fallback.seed,
    };
  } catch {
    return fallback;
  }
}

function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / disabled storage
  }
}

const state = loadState();

const sketch = (p: p5): void => {
  p.setup = () => {
    const c = p.createCanvas(W, H);
    c.parent('sketch');
    p.frameRate(30);
    p.randomSeed(state.seed);
    reseedBats(W, H, state.seed);
  };

  p.draw = () => {
    p.randomSeed(state.seed);
    drawScene(p, {
      W, H,
      seed: state.seed,
      frame: p.frameCount,
      leftId: state.leftId,
      rightId: state.rightId,
      mode: state.mode,
    });
  };

  (p as SketchInstance).redrawScene = (newSeed: number) => {
    state.seed = newSeed;
    saveState(state);
  };
};

const p5Instance = new p5(sketch) as SketchInstance;

// =====================================================================
// UI wiring — character selectors, day/night, reroll, save
// =====================================================================
function findIndex(id: string): number {
  const idx = CHARACTERS.findIndex((c) => c.id === id);
  return idx < 0 ? 0 : idx;
}

function cycle(side: 'left' | 'right', delta: number): void {
  const currentId = side === 'left' ? state.leftId : state.rightId;
  const idx = findIndex(currentId);
  const next = (idx + delta + CHARACTERS.length) % CHARACTERS.length;
  const nextId = CHARACTERS[next]!.id;
  if (side === 'left') state.leftId = nextId;
  else state.rightId = nextId;
  saveState(state);
  updateLabels();
}

function updateLabels(): void {
  const l = document.getElementById('leftName');
  const r = document.getElementById('rightName');
  if (l) l.textContent = CHARACTERS[findIndex(state.leftId)]!.name;
  if (r) r.textContent = CHARACTERS[findIndex(state.rightId)]!.name;
  const mode = document.getElementById('modeBtn');
  if (mode) mode.textContent = state.mode === 'night' ? '☾ Night' : '☀ Day';
}

document.getElementById('leftPrev')?.addEventListener('click', () => cycle('left', -1));
document.getElementById('leftNext')?.addEventListener('click', () => cycle('left', +1));
document.getElementById('rightPrev')?.addEventListener('click', () => cycle('right', -1));
document.getElementById('rightNext')?.addEventListener('click', () => cycle('right', +1));

document.getElementById('reroll')?.addEventListener('click', () => {
  p5Instance.redrawScene(Math.floor(Math.random() * 99999));
});

document.getElementById('save')?.addEventListener('click', () => {
  p5Instance.saveCanvas('adventurers', 'png');
});

document.getElementById('modeBtn')?.addEventListener('click', () => {
  state.mode = state.mode === 'night' ? 'day' : 'night';
  saveState(state);
  updateLabels();
});

updateLabels();
