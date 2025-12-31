import { getHebrewColor as getCentralHebrewColor } from '@/lib/gematriaUtils';
import { type KabbalahMode } from '@/lib/types';

export const getHebrewColor = (char: string, school: KabbalahMode): string => {
  return getCentralHebrewColor(char, school);
};