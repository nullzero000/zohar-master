import { useMemo } from 'react';
import { getLetterPhysics } from '@/lib/engine/rules';
import { CosmosState, LetterForceField, CosmicTempo } from '@/lib/engine/types';

const INITIAL_COSMOS: CosmosState = {
  stabilityIndex: 50,
  entropyLevel: 10,
  tensionLevel: 0,
  rhythm: 'STILL',
  luminosity: 10,
  moralField: 0,
  perceptionDepth: 0,
  dominantForce: 'NONE',
  isDivinePresence: false,
  shadowDiagnosis: { hasShadow: false, type: 'NONE', message: '', rectification: '' }
};

export const useCosmicEngine = (inputText: string): CosmosState => {
  
  const cosmos = useMemo(() => {
    if (!inputText) return INITIAL_COSMOS;

    let state: CosmosState = { ...INITIAL_COSMOS };
    
    const letters = inputText.split('');
    const forces: LetterForceField[] = letters.map(char => getLetterPhysics(char));

    // --- 1. DETECCIÓN DE SOMBRAS (Lógica de Seguridad) ---
    let fireStreak = 0;
    let vesselStreak = 0; // K, B, P, R
    let hasLightInVessel = false; // A, Y, V

    for (let i = 0; i < letters.length; i++) {
        const char = letters[i];
        const physics = forces[i];

        // Caso A: Sobrecarga de Fuego
        if (physics.elementalRoot === 'FIRE' || physics.tensionLevel > 80) {
            fireStreak++;
        } else {
            fireStreak = 0;
        }

        if (fireStreak >= 3) {
            state.shadowDiagnosis = {
                hasShadow: true,
                type: 'EXCESS_GEVURAH',
                message: 'CRÍTICO: Exceso de Din (Juicio). Riesgo de inflamación.',
                rectification: 'Inyectar Agua (Mem) o Chesed (Yud) inmediatamente.'
            };
        }

        // Caso B: Vasijas Vacías
        if (['כ', 'ב', 'פ', 'ר'].includes(char)) {
            vesselStreak++;
        } else if (['א', 'י', 'ו'].includes(char)) {
            hasLightInVessel = true;
            vesselStreak = 0; // Reset, la vasija recibió luz
        }
    }

    if (vesselStreak > 2 && !hasLightInVessel) {
        state.shadowDiagnosis = {
            hasShadow: true,
            type: 'EMPTY_VESSEL',
            message: 'VACÍO DETECTADO: Estructura sin luz interna.',
            rectification: 'Insertar Aleph (Aire) para equilibrar presión.'
        };
    }

    // --- 2. CÁLCULO VECTORIAL ---
    let stabilityAccumulator = 0;
    let entropyAccumulator = 0;
    let tensionAccumulator = 0;
    let fireCount = 0;
    let waterCount = 0;
    let airCount = 0;

    forces.forEach(f => {
      // Aplicación de Funciones Físicas
      if (f.function === 'EQUILIBRIUM') { stabilityAccumulator += 20; airCount++; }
      if (f.function === 'DAMPEN') { stabilityAccumulator += 15; entropyAccumulator -= 10; waterCount++; }
      if (f.function === 'ACCELERATE') { entropyAccumulator += 20; tensionAccumulator += 20; fireCount++; }
      if (f.function === 'JUDGE') { tensionAccumulator += 30; }
      if (f.function === 'SUSTAIN') { stabilityAccumulator += 30; }
      
      stabilityAccumulator += f.stabilityIndex * 0.1;
      tensionAccumulator += f.tensionLevel * 0.1;
    });

    // --- 3. NORMALIZACIÓN ---
    state.stabilityIndex = Math.min(100, Math.max(0, 50 + stabilityAccumulator - entropyAccumulator));
    state.entropyLevel = Math.min(100, Math.max(0, 10 + entropyAccumulator + (state.shadowDiagnosis.hasShadow ? 40 : 0)));
    state.tensionLevel = Math.min(100, Math.max(0, tensionAccumulator));
    
    // Luminosidad base + penalización por sombra
    state.luminosity = Math.min(100, (state.stabilityIndex * 0.6) + 20);
    if (state.shadowDiagnosis.hasShadow) state.luminosity *= 0.5; // La sombra oscurece

    // --- 4. RITMO Y DOMINANCIA ---
    if (state.tensionLevel > 80) state.rhythm = 'CHAOTIC';
    else if (state.tensionLevel > 50) state.rhythm = 'RAPID';
    else if (state.stabilityIndex > 70) state.rhythm = 'BREATHING';
    else state.rhythm = 'FLOWING';

    if (fireCount > waterCount && fireCount > airCount) state.dominantForce = 'FIRE';
    else if (waterCount > fireCount && waterCount > airCount) state.dominantForce = 'WATER';
    else if (airCount > 0) state.dominantForce = 'AIR';
    else state.dominantForce = 'EARTH';

    return state;

  }, [inputText]);

  return cosmos;
};