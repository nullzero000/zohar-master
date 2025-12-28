// src/lib/engine/types.ts

// --- FUERZA OPERATIVA DE LA LETRA ---
export type ForcePolarity = 'STABLE' | 'VOLATILE' | 'DUAL';
export type ForceScope = 'GLOBAL' | 'SYSTEMIC' | 'LOCAL';
export type ForceFunction = 'REGULATE' | 'UNSETTLE' | 'DIRECT' | 'JUDGE' | 'CONTAIN';
export type EmotionalTone = 'COLD' | 'WARM' | 'NEUTRAL' | 'BURNING';
export type CosmicTempo = 'STILL' | 'BREATHING' | 'FLOWING' | 'RAPID' | 'CHAOTIC';

export interface AnimationPhysics {
  duration: number; // ms
  easing: string; // 'easeInOutSine', 'easeOutQuad', etc.
  intensity: number; // 0-1 (Para escala, vibración, opacidad)
  behavior: 'BREATHE' | 'PULSE' | 'ORBIT' | 'COMPRESS' | 'EXPAND';
}

export interface LetterForceField {
  type: 'MOTHER' | 'DOUBLE' | 'SIMPLE';
  polarity: ForcePolarity;
  weight: number; // 0-100 (Impacto en el sistema)
  scope: ForceScope;
  function: ForceFunction;
  tone: EmotionalTone;
  tempo: CosmicTempo;
  physics: AnimationPhysics; // Tu guía de animación técnica
}

// --- ESTADO DEL UNIVERSO (STORE GLOBAL) ---
export interface CosmosState {
  stabilityIndex: number; // 0-100 (Aleph sube, Shin baja)
  entropyLevel: number;   // 0-100 (Caos del sistema)
  tensionLevel: number;   // 0-100 (Carga dramática)
  rhythm: CosmicTempo;    // Velocidad del loop de animación global
  luminosity: number;     // 0-100 (Claridad divina)
  moralField: number;     // -50 (Juicio) a +50 (Misericordia)
  perceptionDepth: number;// 0-100 (Profundidad Z visual)
  
  // Estado de Dominancia
  dominantForce: 'NONE' | 'FIRE' | 'WATER' | 'AIR' | 'EARTH';
  isDivinePresence: boolean; // Flag para YHVH
}