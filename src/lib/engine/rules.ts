// src/lib/engine/rules.ts
import { LetterForceField } from './types';

export const LETTER_PHYSICS: Record<string, LetterForceField> = {
  // --- MADRES ---
  'א': { 
    type: 'MOTHER', elementalRoot: 'AIR', weight: 10, tensionLevel: 0, stabilityIndex: 100, 
    function: 'EQUILIBRIUM', tone: 'NEUTRAL', 
    physics: { duration: 3000, easing: 'easeInOutSine', intensity: 0.05, behavior: 'BREATHE' } 
  },
  'מ': { 
    type: 'MOTHER', elementalRoot: 'WATER', weight: 80, tensionLevel: 10, stabilityIndex: 70, 
    function: 'DAMPEN', tone: 'COLD', 
    physics: { duration: 6000, easing: 'easeOutQuad', intensity: 0.8, behavior: 'COMPRESS' } 
  },
  'ש': { 
    type: 'MOTHER', elementalRoot: 'FIRE', weight: 5, tensionLevel: 90, stabilityIndex: 20, 
    function: 'ACCELERATE', tone: 'BURNING', 
    physics: { duration: 1200, easing: 'easeInExpo', intensity: 1.0, behavior: 'PULSE' } 
  },

  // --- DOBLES (Compuertas) ---
  'ב': { type: 'DOUBLE', elementalRoot: 'EARTH', weight: 50, tensionLevel: 30, stabilityIndex: 60, function: 'GATE_OPEN', tone: 'WARM', physics: { duration: 1500, easing: 'easeInOutBack', intensity: 0.6, behavior: 'EXPAND' } },
  'ג': { type: 'DOUBLE', elementalRoot: 'EARTH', weight: 45, tensionLevel: 40, stabilityIndex: 50, function: 'AMPLIFY', tone: 'NEUTRAL', physics: { duration: 1400, easing: 'easeOutBack', intensity: 0.7, behavior: 'PULSE' } },
  'ד': { type: 'DOUBLE', elementalRoot: 'FIRE', weight: 40, tensionLevel: 50, stabilityIndex: 40, function: 'TRANSMIT', tone: 'WARM', physics: { duration: 1800, easing: 'easeInOutSine', intensity: 0.5, behavior: 'BREATHE' } },
  'כ': { type: 'DOUBLE', elementalRoot: 'EARTH', weight: 70, tensionLevel: 20, stabilityIndex: 80, function: 'MOLD', tone: 'COLD', physics: { duration: 2000, easing: 'linear', intensity: 0.8, behavior: 'COMPRESS' } },
  'פ': { type: 'DOUBLE', elementalRoot: 'AIR', weight: 20, tensionLevel: 60, stabilityIndex: 30, function: 'EXPRESS', tone: 'NEUTRAL', physics: { duration: 900, easing: 'easeInBounce', intensity: 0.9, behavior: 'PULSE' } },
  'ר': { type: 'DOUBLE', elementalRoot: 'EARTH', weight: 60, tensionLevel: 10, stabilityIndex: 90, function: 'SUSTAIN', tone: 'COLD', physics: { duration: 3000, easing: 'linear', intensity: 0.4, behavior: 'ORBIT' } },
  'ת': { type: 'DOUBLE', elementalRoot: 'EARTH', weight: 90, tensionLevel: 50, stabilityIndex: 100, function: 'SEAL', tone: 'COLD', physics: { duration: 4000, easing: 'easeOutExpo', intensity: 1.0, behavior: 'COMPRESS' } },

  // --- SIMPLES (Vectores) ---
  'ה': { type: 'SIMPLE', elementalRoot: 'FIRE', weight: 15, tensionLevel: 40, stabilityIndex: 30, function: 'DIRECT', tone: 'WARM', physics: { duration: 2500, easing: 'easeOutSine', intensity: 0.4, behavior: 'BREATHE' } },
  'ו': { type: 'SIMPLE', elementalRoot: 'AIR', weight: 50, tensionLevel: 10, stabilityIndex: 80, function: 'CONNECT', tone: 'NEUTRAL', physics: { duration: 3000, easing: 'linear', intensity: 0.3, behavior: 'ORBIT' } },
  'ז': { type: 'SIMPLE', elementalRoot: 'AIR', weight: 20, tensionLevel: 30, stabilityIndex: 40, function: 'DIRECT', tone: 'NEUTRAL', physics: { duration: 2200, easing: 'linear', intensity: 0.5, behavior: 'EXPAND' } },
  'ח': { type: 'SIMPLE', elementalRoot: 'WATER', weight: 60, tensionLevel: 20, stabilityIndex: 60, function: 'DIRECT', tone: 'COLD', physics: { duration: 2800, easing: 'easeInOutQuad', intensity: 0.6, behavior: 'COMPRESS' } },
  'ט': { type: 'SIMPLE', elementalRoot: 'FIRE', weight: 25, tensionLevel: 50, stabilityIndex: 40, function: 'DIRECT', tone: 'WARM', physics: { duration: 2000, easing: 'easeInQuad', intensity: 0.5, behavior: 'PULSE' } },
  'י': { type: 'SIMPLE', elementalRoot: 'EARTH', weight: 100, tensionLevel: 0, stabilityIndex: 100, function: 'SEED', tone: 'NEUTRAL', physics: { duration: 1000, easing: 'easeOutExpo', intensity: 1.0, behavior: 'PULSE' } },
  
  // Default seguro para el resto de simples
  'DEFAULT_SIMPLE': { 
    type: 'SIMPLE', elementalRoot: 'AIR', weight: 30, tensionLevel: 20, stabilityIndex: 50, 
    function: 'DIRECT', tone: 'NEUTRAL', 
    physics: { duration: 3500, easing: 'linear', intensity: 0.3, behavior: 'ORBIT' } 
  }
};

export const getLetterPhysics = (char: string): LetterForceField => {
  return LETTER_PHYSICS[char] || LETTER_PHYSICS['DEFAULT_SIMPLE'];
};