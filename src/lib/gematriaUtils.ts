// [MODIFICADO] Importamos la nueva Tabla de Colores Maestra
import { LETTER_COLOR_TABLE, LetterColorProfile } from '@/data/letterColors'; 
// [MODIFICADO] Eliminamos SCHOOL_PALETTES porque la lógica ahora vive en LETTER_COLOR_TABLE
import { HEBREW_DATA, MILUY_MAP, NORMALIZE_MAP } from '@/lib/constants';
import { HebrewLetterData, KabbalahMode } from '@/lib/types';

// [MANTENIDO] Conjunto de caracteres Sofit
const SOFIT_CHARS = new Set(['ך', 'ם', 'ן', 'ף', 'ץ']);

// [NUEVO] Mapeo para traducir tu "KabbalahMode" (del Store) a las columnas de nuestra Tabla de Colores
// Esto conecta el botón "Akashica" con la columna 'akashic' que tiene tus RGBs correctos.
const SCHOOL_TO_TABLE_KEY: Record<KabbalahMode, keyof Omit<LetterColorProfile, 'letter' | 'value'>> = {
  'Gra-Canon': 'gra',
  'ari': 'gra',          // Ari usa base Gra (Fuego Negro)
  'akashic': 'akashic',  // <-- AQUÍ SE ACTIVA TU LISTA DE COLORES
  'Traditional-Pure': 'traditional',
  'SeferYetzirah-Standard': 'esoteric', 
  'Esoteric-Expanded': 'esoteric'
};

/**
 * ------------------------------------------------------------------
 * 1. LÓGICA DE COLOR (Visualización)
 * [REESCRITO PARA SOPORTAR AKASHICA Y GRA CORRECTAMENTE]
 * ------------------------------------------------------------------
 */
export const getHebrewColor = (char: string, school: KabbalahMode): string => {
  if (!char || char.trim() === '') return 'transparent';

  // 1. Normalización
  const normalized = NORMALIZE_MAP[char] || char;

  // [NUEVA LÓGICA] Buscamos primero en la Tabla de Colores Maestra (LetterColors.ts)
  // Esto asegura que si eliges Akashica, obtengas el 'rgb(173, 255, 47)' exacto.
  const found = LETTER_COLOR_TABLE.find(l => l.letter === normalized);
  
  if (found) {
    // Determinamos qué columna leer (gra, traditional, akashic...)
    const tableKey = SCHOOL_TO_TABLE_KEY[school] || 'esoteric';
    return found[tableKey];
  }

  // [FALLBACK / LÓGICA ANTIGUA] Si la letra no está en la nueva tabla, usamos el sistema viejo
  // Esto previene errores si entra un caracter raro.
  const dataRef = HEBREW_DATA[normalized];
  if (dataRef) {
     const baseData = 'ref' in dataRef ? HEBREW_DATA[dataRef.ref] : dataRef;
     return baseData.color || 'rgba(255,255,255,0.5)';
  }

  return 'rgba(255, 255, 255, 0.5)';
};

/**
 * ------------------------------------------------------------------
 * 2. LÓGICA DE VALOR (Cálculo)
 * [MANTENIDO INTACTO]
 * ------------------------------------------------------------------
 */
export const getHebrewValue = (char: string, useSofitMode: boolean): number => {
    if (!char) return 0;

    // 1. Búsqueda Directa
    const entry = HEBREW_DATA[char];
    if (!entry) return 0;

    // 2. Resolver Referencia
    const masterData = 'ref' in entry 
        ? HEBREW_DATA[entry.ref] as HebrewLetterData 
        : entry as HebrewLetterData;

    if (!masterData) return 0;

    // 3. Lógica Sofit (500-900)
    if (useSofitMode && SOFIT_CHARS.has(char) && masterData.sofitValue) {
        return masterData.sofitValue;
    }

    // 4. Valor Estándar
    return masterData.value;
};

/**
 * ------------------------------------------------------------------
 * 3. LÓGICA DE EXPANSIÓN (Miluy)
 * [MANTENIDO INTACTO]
 * ------------------------------------------------------------------
 */
export const getMiluyExpansion = (char: string): string[] => {
    if (!char || char.trim() === '') return [];

    // 1. Normalizar
    const normalized = NORMALIZE_MAP[char] || char;

    // 2. Búsqueda en mapa de Miluy
    const expansion = MILUY_MAP[normalized];

    // 3. Auditoría de seguridad
    if (!expansion) {
        if (HEBREW_DATA[normalized]) {
            console.warn(`[System Audit] MILUY_MAP missing expansion for: ${char}`);
        }
        return []; 
    }

    return expansion;
};

/**
 * [MANTENIDO Y REFORZADO]
 * Detecta si un color es ontológicamente "Oscuridad" (Negro o muy cercano).
 * Crítico para escuela GRA/ARI.
 */
export const isOntologicalBlack = (colorString: string): boolean => {
  if (!colorString) return false; // Protección contra undefined
  
  // Normalizar input
  const c = colorString.replace(/\s/g, '').toLowerCase();
  
  // Detección Hex y RGB estricta
  if (c === '#000' || c === '#000000') return true;
  if (c === 'rgb(0,0,0)' || c === 'rgba(0,0,0,1)') return true;
  
  // Detección de "Casi Negro" (Ej: Ayin en Gra rgb(16,16,16))
  const rgbMatch = c.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    // Si la suma de canales es muy baja, es oscuridad visual
    if (parseInt(r) + parseInt(g) + parseInt(b) < 50) return true;
  }

  return false;
};