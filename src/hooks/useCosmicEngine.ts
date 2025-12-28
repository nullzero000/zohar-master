import { useMemo } from 'react';
import { getLetterPhysics } from '@/lib/engine/rules';
import { CosmosState, LetterForceField, CosmicTempo } from '@/lib/engine/types';

// ESTADO INICIAL (El Vacío / Tzimtzum)
const INITIAL_COSMOS: CosmosState = {
  stabilityIndex: 50,
  entropyLevel: 10,
  tensionLevel: 0,
  rhythm: 'STILL',
  luminosity: 10,
  moralField: 0,
  perceptionDepth: 0,
  dominantForce: 'NONE',
  isDivinePresence: false
};

export const useCosmicEngine = (inputText: string): CosmosState => {
  
  const cosmos = useMemo(() => {
    if (!inputText) return INITIAL_COSMOS;

    // 1. Tipamos explícitamente el estado base para evitar inferencias erróneas
    let state: CosmosState = { ...INITIAL_COSMOS };
    
    const letters = inputText.split('');
    const forces: LetterForceField[] = letters.map(char => getLetterPhysics(char));

    // --- 1. DETECCIÓN DE NOMBRES SAGRADOS (OVERRIDE) ---
    if (inputText.includes('יהוה')) {
      // CORRECCIÓN CRÍTICA:
      // Definimos este objeto explícitamente como CosmosState.
      // Esto fuerza a TS a aceptar 'BREATHING' como CosmicTempo y no como string.
      const divineState: CosmosState = {
        ...state,
        stabilityIndex: 100,
        entropyLevel: 0,
        tensionLevel: 0,
        rhythm: 'BREATHING', // Ahora es válido
        luminosity: 100,
        dominantForce: 'NONE', // Ahora es válido
        isDivinePresence: true
      };
      return divineState;
    }

    // --- 2. CÁLCULO VECTORIAL DE FUERZAS ---
    let totalWeight = 0;
    let stabilityAccumulator = 0;
    let entropyAccumulator = 0;
    let tensionAccumulator = 0;
    let fireCount = 0;
    let waterCount = 0;
    let airCount = 0;

    forces.forEach(f => {
      totalWeight += f.weight;

      // IMPACTO SEGÚN TIPO (Jerarquía Funcional)
      if (f.type === 'MOTHER') {
        if (f.function === 'REGULATE') { stabilityAccumulator += f.weight * 2; airCount++; }
        if (f.function === 'CONTAIN') { stabilityAccumulator += f.weight; entropyAccumulator -= f.weight; waterCount++; }
        if (f.function === 'UNSETTLE') { entropyAccumulator += f.weight * 1.5; tensionAccumulator += f.weight; fireCount++; }
      } 
      else if (f.type === 'DOUBLE') {
        tensionAccumulator += f.weight * 0.8;
        if (f.function === 'JUDGE') state.moralField -= 5;
        if (f.function === 'DIRECT') state.moralField += 5;
      } 
      else {
        state.perceptionDepth += 5;
        entropyAccumulator += 2;
      }
    });

    // --- 3. NORMALIZACIÓN Y APLICACIÓN AL UNIVERSO ---
    state.stabilityIndex = Math.min(100, Math.max(0, 50 + (stabilityAccumulator * 0.2) - (entropyAccumulator * 0.1)));
    state.entropyLevel = Math.min(100, Math.max(0, 10 + (entropyAccumulator * 0.2)));
    state.tensionLevel = Math.min(100, Math.max(0, tensionAccumulator * 0.3));
    state.luminosity = Math.min(100, 20 + (state.stabilityIndex * 0.5) + (state.perceptionDepth * 0.2));

    // --- 4. DETERMINACIÓN DEL RITMO Y DOMINANCIA ---
    if (state.tensionLevel > 80) state.rhythm = 'CHAOTIC';
    else if (state.tensionLevel > 50) state.rhythm = 'RAPID';
    else if (state.stabilityIndex > 70) state.rhythm = 'BREATHING';
    else state.rhythm = 'FLOWING';

    // Dominancia Elemental
    if (fireCount > waterCount && fireCount > airCount) state.dominantForce = 'FIRE';
    else if (waterCount > fireCount && waterCount > airCount) state.dominantForce = 'WATER';
    else if (airCount > 0) state.dominantForce = 'AIR';
    else state.dominantForce = 'EARTH';

    return state;

  }, [inputText]);

  return cosmos;
};