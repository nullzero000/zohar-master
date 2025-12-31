// src/lib/engine/types.ts

export type ForcePolarity = 'STABLE' | 'VOLATILE' | 'DUAL';
export type ForceScope = 'GLOBAL' | 'SYSTEMIC' | 'LOCAL';

// Nuevas Funciones Operativas (Sección 3.2 del documento)
export type ForceFunction = 
  | 'EQUILIBRIUM' // Aleph
  | 'DAMPEN'      // Mem (Amortiguar)
  | 'ACCELERATE'  // Shin
  | 'GATE_OPEN'   // Bet
  | 'AMPLIFY'     // Gimel
  | 'TRANSMIT'    // Dalet
  | 'MOLD'        // Kaf
  | 'EXPRESS'     // Pe
  | 'SUSTAIN'     // Resh/Samej
  | 'SEAL'        // Tav
  | 'DIRECT'      // Simples (Dirección)
  | 'CONNECT'     // Vav
  | 'SEED'        // Yud
  | 'JUDGE';      // Finales/Duras

export type CosmicTempo = 'STILL' | 'BREATHING' | 'FLOWING' | 'RAPID' | 'CHAOTIC';
export type ElementalRoot = 'FIRE' | 'WATER' | 'AIR' | 'EARTH';

export interface AnimationPhysics {
  duration: number;
  easing: string;
  intensity: number;
  behavior: 'BREATHE' | 'PULSE' | 'ORBIT' | 'COMPRESS' | 'EXPAND';
}

export interface LetterForceField {
  type: 'MOTHER' | 'DOUBLE' | 'SIMPLE' | 'FINAL';
  elementalRoot: ElementalRoot;
  weight: number;       // 1-100 (Inercia espiritual)
  tensionLevel: number; // 0-100 (Contribución a entropía/Din)
  stabilityIndex: number; // 0-100 (Capacidad de anclaje)
  function: ForceFunction;
  tone: 'COLD' | 'WARM' | 'NEUTRAL' | 'BURNING';
  physics: AnimationPhysics;
}

// Estado Global del Motor
export interface CosmosState {
  stabilityIndex: number;
  entropyLevel: number;
  tensionLevel: number;
  rhythm: CosmicTempo;
  luminosity: number;
  moralField: number;
  perceptionDepth: number;
  dominantForce: ElementalRoot | 'NONE';
  isDivinePresence: boolean;
  
  // Diagnóstico de Sombras (Sección 5)
  shadowDiagnosis: {
    hasShadow: boolean;
    type: 'NONE' | 'EXCESS_GEVURAH' | 'EMPTY_VESSEL' | 'SHEVIRAH';
    message: string;
    rectification: string;
  };
}