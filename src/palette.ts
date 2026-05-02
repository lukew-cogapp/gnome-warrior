// Shared palette tokens. Characters compose their own palette objects from these.
export const PALETTE = {
  // metal / wood
  steel: '#c8cdd4',
  steelHi: '#eef1f6',
  steelDark: '#6e757f',
  gold: '#d8b14a',
  goldDark: '#8a6a1c',
  wood: '#5b3a22',
  woodDark: '#3a2614',

  // skin
  skinWarm: '#e6b48a',
  skinWarmShade: '#b8825c',
  skinFair: '#f1cba0',
  skinFairShade: '#c79868',
  skinTan: '#c89570',
  skinTanShade: '#8c5a3a',
  skinDark: '#7a4a30',
  skinDarkShade: '#4a2a18',

  // hair
  beard: '#dee3ea',
  beardShade: '#9aa3b1',
  hairRed: '#c0392b',
  hairRedHi: '#e25b3f',
  hairBlonde: '#e8c878',
  hairBlondeHi: '#f5e0a0',
  hairBlack: '#1a1208',
  hairBrown: '#5a3a1a',
  hairBrownHi: '#8a5a2a',
} as const;

export type Palette = typeof PALETTE;
