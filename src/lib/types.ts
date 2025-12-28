// src/lib/types.ts

export type KabbalahMode = 
  | 'Gra-Canon' 
  | 'ari' 
  | 'akashic' 
  | 'SeferYetzirah-Standard'  // <--- FALTABA ESTE
  | 'Traditional-Pure'
  | 'Esoteric-Expanded';      // Agregado por seguridad si lo usas en el futuro

// --- HEBREW DATA STRUCTURES ---
export interface HebrewLetterData {
    name: string;
    color: string;
    meaning: string;
    value: number;
    sofitValue?: number;
    planet: string;
}

export interface HebrewReference {
    ref: string;
}

export type HebrewDataEntry = HebrewLetterData | HebrewReference;

// --- GRAPH / WISDOM STRUCTURES ---

export interface WisdomNode {
  type: 'node';
  id: number | string;
  name_he: string;
  name_en: string;
}

export interface WisdomEdge {
  type: 'edge';
  id: number | string;
  source_node_id: number | string;
  target_node_id: number | string;
  hebrew_char: string;
  class?: string; 
  letter?: string;
  app_function?: string;
}

export type WisdomItem = WisdomNode | WisdomEdge;