import { HEBREW_DATA, MILUY_MAP, NORMALIZE_MAP } from '@/lib/constants';

const getCharValue = (char: string, useSofit: boolean = false): number => {
  if (!char || char === ' ') return 0;
  const dataRef = HEBREW_DATA[char];
  if (!dataRef) return 0;
  const baseData = HEBREW_DATA[dataRef.ref] || dataRef;
  const isSofitChar = ['ך', 'ם', 'ן', 'ף', 'ץ'].includes(char);
  if (useSofit && isSofitChar && baseData.sofitValue) {
    return baseData.sofitValue;
  }
  return baseData.value;
};

const digitalSum = (n: number): number => {
  if (n === 0) return 0;
  return ((n - 1) % 9) + 1;
};

export const calculateMiluyLevels = (inputText: string, depth: number = 3, useSofitGematria: boolean = false) => {
  let currentLevelChars = inputText.replace(/\s/g, '').split('');
  const levels = [];

  // Nivel 0
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
      const normalizedChar = NORMALIZE_MAP[char] || char;
      const expansion = MILUY_MAP[normalizedChar];

      if (expansion) {
        expansion.forEach(expChar => {
          nextChars.push(expChar);
          levelValue += getCharValue(expChar, useSofitGematria);
        });
      } else {
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