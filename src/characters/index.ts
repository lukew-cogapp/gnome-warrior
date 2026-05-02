import type { CharacterDef } from '../types';
import { bard } from './bard';
import { druid } from './druid';
import { gnomeWarrior } from './gnomeWarrior';
import { mage } from './mage';
import { paladin } from './paladin';
import { ranger } from './ranger';
import { rogue } from './rogue';

export const CHARACTERS: readonly CharacterDef[] = [
  gnomeWarrior,
  mage,
  rogue,
  paladin,
  ranger,
  bard,
  druid,
];

export function findCharacter(id: string): CharacterDef {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0]!;
}
