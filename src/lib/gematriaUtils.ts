import { LETTER_COLOR_TABLE, LetterColorProfile } from '@/data/letterColors';
import { HEBREW_DATA, MILUY_MAP, NORMALIZE_MAP } from '@/lib/constants';
import { HebrewLetterData } from '@/lib/types';

const SOFIT_CHARS = new Set(['ך', 'ם', 'ן', 'ף', 'ץ']);

const SCHOOL_TO_TABLE_KEY: Record<string, keyof Omit<LetterColorProfile, 'letter' | 'value'>> = {
  've': 'gra',
  'gra': 'gra',
  'Gra-Canon': 'gra',
  'shefa': 'akashic',
  'akashic': 'akashic',
  'cordovero': 'traditional',
  'traditional': 'traditional',
  'Traditional-Pure': 'traditional',
  'abulafia': 'esoteric',
  'esoteric': 'esoteric',
  'Esoteric-Expanded': 'esoteric',
  'SeferYetzirah-Standard': 'traditional',
  'ari': 'gra'
};

export const getHebrewColor = (char: string, school: string): string => {
  if (!char || char.trim() === '') return 'transparent';
  const normalized = NORMALIZE_MAP[char] || char;
  const found = LETTER_COLOR_TABLE.find(l => l.letter === normalized);
  if (found) {
    const tableKey = SCHOOL_TO_TABLE_KEY[school] || 'esoteric';
    // @ts-ignore - Acceso dinámico seguro por fallback
    return found[tableKey];
  }
  const dataRef = HEBREW_DATA[normalized];
  if (dataRef) {
     const baseData = 'ref' in dataRef ? HEBREW_DATA[dataRef.ref] : dataRef;
     return baseData.color || 'rgba(255,255,255,0.5)';
  }
  return 'rgba(255, 255, 255, 0.5)';
};

export const isOntologicalBlack = (colorString: string): boolean => {
  if (!colorString) return false;
  const c = colorString.replace(/\s/g, '').toLowerCase();
  if (c === '#000' || c === '#000000') return true;
  if (c === 'rgb(0,0,0)' || c === 'rgba(0,0,0,1)') return true;
  const rgbMatch = c.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    if (parseInt(r) + parseInt(g) + parseInt(b) < 60) return true;
  }
  return false;
};

export const getHebrewValue = (char: string, useSofitMode: boolean): number => {
    if (!char) return 0;
    const entry = HEBREW_DATA[char];
    if (!entry) return 0;
    const masterData = 'ref' in entry ? HEBREW_DATA[entry.ref] as HebrewLetterData : entry as HebrewLetterData;
    if (!masterData) return 0;
    if (useSofitMode && SOFIT_CHARS.has(char) && masterData.sofitValue) return masterData.sofitValue;
    return masterData.value;
};

export const getMiluyExpansion = (char: string): string[] => {
    if (!char || char.trim() === '') return [];
    const normalized = NORMALIZE_MAP[char] || char;
    const expansion = MILUY_MAP[normalized];
    return expansion || [];
};

export const getRecursiveExpansion = (text: string, level: number): string => {
  if (level <= 0 || !text) return text;
  let currentText = text;
  for (let i = 0; i < level; i++) {
    currentText = currentText.split('').map((char) => {
        const expansion = getMiluyExpansion(char);
        return expansion.length > 0 ? expansion.join('') : char;
      }).join('');
  }
  return currentText;
};

export const calculateCrystalRGB = (text: string): string => {
  if (!text) return 'rgba(255, 255, 255, 0.1)';
  let rTotal = 0, gTotal = 0, bTotal = 0, count = 0;
  text.split('').forEach(char => {
    const colorStr = getHebrewColor(char, 'shefa');
    const match = colorStr.match(/\d+/g);
    if (match && match.length === 3) {
      rTotal += parseInt(match[0]); gTotal += parseInt(match[1]); bTotal += parseInt(match[2]); count++;
    }
  });
  if (count === 0) return 'rgba(255, 255, 255, 0.1)';
  return `rgb(${Math.round(rTotal / count)}, ${Math.round(gTotal / count)}, ${Math.round(bTotal / count)})`;
};