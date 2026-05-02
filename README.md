# Adventurers — Pick Your Party

Stylised D&D-themed scene with two character slots. Built with Vite + TypeScript + p5.js, deployed to GitHub Pages.

Live: https://lukew-cogapp.github.io/gnome-warrior/

## Characters

Gnome Warrior, Mage, Rogue, Paladin, Ranger, Bard, Druid. Each has 4 colour palette variants — picked at random on every reroll alongside pose changes.

## Features

- Two character slots, ◀ ▶ to cycle
- Day / night backdrop toggle
- Animated bats at night, occasional dragon silhouette
- Reroll changes pose + palette (bats keep flying)
- Save scene as PNG
- State persists in `localStorage`

## Run locally

```bash
npm install
npm run dev      # vite dev server with HMR
npm run build    # tsc + vite build → dist/
npm run preview  # serve built dist/
npm run typecheck
npm run check    # biome lint + format
npm run test     # vitest
```

## Project layout

```
src/
  characters/
    base.ts       defineCharacter() factory — handles seeding, palette pick, sway, head tilt
    bard.ts druid.ts gnomeWarrior.ts mage.ts paladin.ts ranger.ts rogue.ts
    index.ts      registry + lookup
  helpers.ts      shared draw primitives (legs, eyes, belt, glow)
  palette.ts      colour tokens
  rng.ts          mulberry32 PRNG + range helpers
  scene.ts        backdrop, bats, dragon, vignette, drawScene
  main.ts         p5 instance, UI wiring, persistence
  types.ts
```

## Adding a character

1. New file `src/characters/<name>.ts`
2. Export `defineCharacter({ id, name, seedOffset, palettes, drawBody })`
3. Register in `src/characters/index.ts`

## Deploy

Push to `main` → GitHub Actions builds + deploys via Pages.
