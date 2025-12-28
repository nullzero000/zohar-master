import { HEBREW_DATA, MILUY_MAP, NORMALIZE_MAP } from '@/lib/constants';

// --- AUXILIAR: Cálculo de Valor Simple de un Caracter ---
const getCharValue = (char: string, useSofit: boolean = false): number => {
  if (!char || char === ' ') return 0;
  
  // 1. Identificar la letra base
  const dataRef = HEBREW_DATA[char];
  if (!dataRef) return 0;

  const baseData = HEBREW_DATA[dataRef.ref];
  if (!baseData) return 0;

  // 2. Lógica Sofit (Modo Experto)
  const isSofitChar = ['ך', 'ם', 'ן', 'ף', 'ץ'].includes(char);
  
  if (useSofit && isSofitChar && baseData.sofitValue) {
    return baseData.sofitValue; // Retorna 500-900
  }

  // 3. Modo Estándar (Por defecto)
  return baseData.value; // Retorna valor normal (ej. Kaf Sofit = 20)
};

// --- AUXILIAR: Reducción (Suma Digital) ---
const digitalSum = (n: number): number => {
  if (n === 0) return 0;
  // Reducción simple a un dígito (1-9) excepto números maestros si quisieras
  return ((n - 1) % 9) + 1;
};

// --- MOTOR PRINCIPAL: CALCULAR MILUY ---
export const calculateMiluyLevels = (inputText: string, depth: number = 3, useSofitGematria: boolean = false) => {
  let currentLevelChars = inputText.replace(/\s/g, '').split('');
  const levels = [];

  // Nivel 0: Raíz
  let level0Val = 0;
  currentLevelChars.forEach(char => level0Val += getCharValue(char, useSofitGematria));
  
  levels.push({
    level: 0,
    chars: currentLevelChars,
    totalValue: level0Val,
    reducedValue: digitalSum(level0Val)
  });

  // Niveles 1 a Depth
  for (let d = 1; d <= depth; d++) {
    const nextChars: string[] = [];
    let levelValue = 0;

    currentLevelChars.forEach(char => {
      // AXIOMA MILUY: SIEMPRE NORMALIZAR SOFIT A NORMAL ANTES DE EXPANDIR
      const normalizedChar = NORMALIZE_MAP[char] || char;
      const expansion = MILUY_MAP[normalizedChar];

      if (expansion) {
        expansion.forEach(expChar => {
          nextChars.push(expChar);
          // Calculamos valor de la letra expandida (usando la config de sofit del usuario)
          levelValue += getCharValue(expChar, useSofitGematria);
        });
      } else {
        // Si no es hebreo o no tiene expansión, pasa igual (o se ignora)
        nextChars.push(char); 
      }
    });

    levels.push({
      level: d,
      chars: nextChars,
      totalValue: levelValue,
      reducedValue: digitalSum(levelValue)
    });

    currentLevelChars = nextChars;
  }

  return levels;
};