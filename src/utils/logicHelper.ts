// src/utils/logicHelper.ts

import { HEBREW_DATA, NORMALIZE_MAP, SCHOOL_PALETTES } from '@/lib/constants';
import { type KabbalahMode } from '@/lib/types';

/**
 * Obtiene el color de una letra hebrea basándose en la escuela seleccionada.
 * Soporta Gra, Ari, Akashica y modos estándar.
 */
export const getHebrewColor = (char: string, school: KabbalahMode): string => {
  if (!char || char.trim() === '') return 'transparent';

  // 1. Normalización (Mapear sofit a normal para buscar en la base de datos)
  const normalized = NORMALIZE_MAP[char] || char;
  
  // 2. Buscar datos base (Puntero)
  const dataRef = HEBREW_DATA[normalized];
  if (!dataRef) return 'rgba(255, 255, 255, 0.5)';

  // 3. Obtener la referencia maestra (Resolver el puntero a 'Aleph', 'Bet', etc.)
  // Si 'ref' existe, usamos eso; si no, usamos el objeto directo.
  const baseData = 'ref' in dataRef ? HEBREW_DATA[dataRef.ref] : dataRef;
  
  if (!baseData) return 'rgba(255, 255, 255, 0.5)';

  // 4. LÓGICA DE PALETAS MAESTRAS
  // Verificamos si la escuela actual tiene un esquema de color forzado en SCHOOL_PALETTES.
  const palette = SCHOOL_PALETTES[school];

  if (palette) {
      // Intentamos buscar el color específico para esta letra (ej. 'Aleph') en la paleta de la escuela.
      const override = palette[baseData.name];
      if (override) return override;
      
      // Si la paleta existe pero no tiene esta letra definida, podrías querer un fallback.
      // Por ahora, retornamos el color base si no hay override explícito.
      return baseData.color; 
  }

  // 5. MODOS ESTÁNDAR / SEFER YETZIRAH
  // Si la escuela no tiene paleta definida (es null), usamos el color "planetario" por defecto.
  return baseData.color;
};