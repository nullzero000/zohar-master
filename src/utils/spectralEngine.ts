import { HEBREW_DATA, NORMALIZE_MAP } from '@/lib/constants';
import { type KabbalahMode } from '@/lib/types';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
};

const rgbToString = (r: number, g: number, b: number) => `rgb(${r}, ${g}, ${b})`;

export const getSemanticsFromRGB = (r: number, g: number, b: number): string => {
  if (r > 200 && g > 200 && b > 200) return 'LUZ BLANCA (KETER)';
  if (r < 30 && g < 30 && b < 30) return 'VACÍO PRIMORDIAL (AIN)';
  if (r > 200 && g < 100 && b < 100) return 'FUEGO (GEVURAH)';
  if (b > 200 && r < 100) return 'AGUA (CHESED)';
  if (g > 150 && r < 150) return 'TIERRA (NETZACH)';
  if (r > 200 && g > 150) return 'ORO (TIFERET)';
  return 'ESPECTRO COMPLEJO';
};

export const analyzeFrequencyAndColor = (chars: string[], school: KabbalahMode) => {
  const frequencyMap: Record<string, number> = {};
  let maxFreq = 0;
  let dominantChar = 'Aleph'; 
  
  let totalR = 0, totalG = 0, totalB = 0;
  let validCharCount = 0;

  chars.forEach(char => {
    if (!char || char === ' ') return;
    const normalized = NORMALIZE_MAP[char] || char;
    
    frequencyMap[normalized] = (frequencyMap[normalized] || 0) + 1;
    if (frequencyMap[normalized] > maxFreq) {
      maxFreq = frequencyMap[normalized];
      dominantChar = normalized;
    }

    const data = HEBREW_DATA[normalized];
    if (data && data.color) {
      const rgb = hexToRgb(data.color);
      totalR += rgb.r;
      totalG += rgb.g;
      totalB += rgb.b;
      validCharCount++;
    }
  });

  // BLINDAJE ANTI-CRASH
  if (validCharCount === 0) {
    return {
      mixedColor: 'rgb(30, 30, 30)',
      mixedColorName: 'VACÍO ESTÁTICO',
      frequencyMap: {},
      dominant: 'Aleph',
      total: 0,
      diagnosis: "SECUENCIA VACÍA. SISTEMA EN REPOSO."
    };
  }

  const avgR = Math.round(totalR / validCharCount);
  const avgG = Math.round(totalG / validCharCount);
  const avgB = Math.round(totalB / validCharCount);
  
  const domData = HEBREW_DATA[dominantChar];

  return {
    mixedColor: rgbToString(avgR, avgG, avgB),
    mixedColorName: getSemanticsFromRGB(avgR, avgG, avgB),
    frequencyMap,
    dominant: dominantChar,
    total: validCharCount,
    diagnosis: `ARQUETIPO: ${dominantChar} (${domData?.meaning || '?'})\nINTENSIDAD: ${validCharCount} NODOS`
  };
};