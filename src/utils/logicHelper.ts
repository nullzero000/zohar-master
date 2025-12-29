// src/utils/logicHelper.ts

// Importamos el motor centralizado (que ya maneja Fuego Negro, Akashica, etc.)
import { getHebrewColor as getCentralHebrewColor } from '@/lib/gematriaUtils';
import { type KabbalahMode } from '@/lib/types';

/**
 * WRAPPER DE COMPATIBILIDAD
 * ------------------------------------------------------------------
 * Este archivo existía en la versión anterior para calcular colores en la Galaxia.
 * Ahora, para garantizar consistencia doctrinal, delega la tarea al 
 * motor central 'gematriaUtils'.
 * * Esto soluciona el error de SCHOOL_PALETTES missing.
 */
export const getHebrewColor = (char: string, school: KabbalahMode): string => {
  // Redirigimos la llamada al motor maestro
  return getCentralHebrewColor(char, school);
};