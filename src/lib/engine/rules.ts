// src/lib/engine/rules.ts
import { LetterForceField } from './types';

export const LETTER_PHYSICS: Record<string, LetterForceField> = {
  // --- TRES MADRES (AXIOMAS) ---
  'א': {
    type: 'MOTHER',
    polarity: 'STABLE',
    weight: 100, // Máxima autoridad
    scope: 'GLOBAL',
    function: 'REGULATE',
    tone: 'NEUTRAL',
    tempo: 'BREATHING',
    physics: { duration: 3000, easing: 'easeInOutSine', intensity: 0.05, behavior: 'BREATHE' }
  },
  'מ': {
    type: 'MOTHER',
    polarity: 'STABLE',
    weight: 90,
    scope: 'GLOBAL',
    function: 'CONTAIN',
    tone: 'COLD',
    tempo: 'FLOWING',
    physics: { duration: 6000, easing: 'easeOutQuad', intensity: 0.8, behavior: 'COMPRESS' }
  },
  'ש': {
    type: 'MOTHER',
    polarity: 'VOLATILE',
    weight: 95,
    scope: 'GLOBAL',
    function: 'UNSETTLE',
    tone: 'BURNING',
    tempo: 'CHAOTIC',
    physics: { duration: 1200, easing: 'easeInExpo', intensity: 1.0, behavior: 'PULSE' }
  },
  'ם': { // Mem Sofit (Variación de Mem)
     type: 'MOTHER', polarity: 'STABLE', weight: 95, scope: 'GLOBAL', function: 'CONTAIN', tone: 'COLD', tempo: 'STILL',
     physics: { duration: 7000, easing: 'linear', intensity: 0.9, behavior: 'COMPRESS' }
  },

  // --- SIETE DOBLES (DUALIDAD) ---
  'ב': {
    type: 'DOUBLE', polarity: 'DUAL', weight: 70, scope: 'SYSTEMIC', function: 'JUDGE', tone: 'WARM', tempo: 'FLOWING',
    physics: { duration: 1500, easing: 'easeInOutBack', intensity: 0.6, behavior: 'EXPAND' }
  },
  // (He resumido algunas dobles para brevedad, usando un arquetipo genérico de tensión)
  'ג': { type: 'DOUBLE', polarity: 'DUAL', weight: 65, scope: 'SYSTEMIC', function: 'DIRECT', tone: 'NEUTRAL', tempo: 'RAPID', physics: { duration: 1400, easing: 'easeOutBack', intensity: 0.7, behavior: 'PULSE' } },
  'ד': { type: 'DOUBLE', polarity: 'DUAL', weight: 60, scope: 'SYSTEMIC', function: 'REGULATE', tone: 'COLD', tempo: 'FLOWING', physics: { duration: 1800, easing: 'easeInOutSine', intensity: 0.5, behavior: 'BREATHE' } },
  'כ': { type: 'DOUBLE', polarity: 'DUAL', weight: 75, scope: 'SYSTEMIC', function: 'JUDGE', tone: 'WARM', tempo: 'STILL', physics: { duration: 2000, easing: 'linear', intensity: 0.8, behavior: 'COMPRESS' } },
  'פ': { type: 'DOUBLE', polarity: 'VOLATILE', weight: 80, scope: 'SYSTEMIC', function: 'UNSETTLE', tone: 'BURNING', tempo: 'CHAOTIC', physics: { duration: 900, easing: 'easeInBounce', intensity: 0.9, behavior: 'PULSE' } },
  'ר': { type: 'DOUBLE', polarity: 'DUAL', weight: 60, scope: 'SYSTEMIC', function: 'UNSETTLE', tone: 'NEUTRAL', tempo: 'RAPID', physics: { duration: 1600, easing: 'easeInOutQuad', intensity: 0.6, behavior: 'ORBIT' } },
  'ת': { type: 'DOUBLE', polarity: 'STABLE', weight: 85, scope: 'GLOBAL', function: 'JUDGE', tone: 'COLD', tempo: 'STILL', physics: { duration: 4000, easing: 'easeOutExpo', intensity: 1.0, behavior: 'COMPRESS' } },

  // --- DOCE SIMPLES (TRAYECTORIA) ---
  // Arquetipo genérico para las simples: movimiento orbital, peso bajo
  'DEFAULT_SIMPLE': {
    type: 'SIMPLE',
    polarity: 'STABLE',
    weight: 30,
    scope: 'LOCAL',
    function: 'DIRECT',
    tone: 'NEUTRAL',
    tempo: 'FLOWING',
    physics: { duration: 3500, easing: 'linear', intensity: 0.3, behavior: 'ORBIT' }
  }
};

// Helper para obtener datos seguros (fallback a simple)
export const getLetterPhysics = (char: string): LetterForceField => {
  return LETTER_PHYSICS[char] || LETTER_PHYSICS['DEFAULT_SIMPLE'];
};