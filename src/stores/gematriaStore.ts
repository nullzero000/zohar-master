import { create } from 'zustand';
// Asegúrate de que este archivo exista, si no, cambia 'KabbalahMode' a string temporalmente
import { KabbalahMode } from '@/lib/types'; 
import { getHebrewValue } from '@/lib/gematriaUtils';

// 1. DEFINICIÓN DE LA INTERFAZ DE ESTADO
interface GematriaState {
  // --- Datos de Entrada ---
  inputText: string;
  school: KabbalahMode;
  useSofitMode: boolean;

  // --- Datos Calculados (Salida) ---
  total: number;
  reduced: number;

  // --- Estados de UI (Manifestación) ---
  isManifesting: boolean;
  isOverlayActive: boolean;
  manifestView: 'dossier' | 'tree' | 'vector';

  // --- Niveles de Expansión ---
  expansionLevel: number; 

  // --- Acciones (Setters) ---
  setInputText: (text: string) => void;
  setSchool: (school: KabbalahMode) => void;
  setSofitMode: (active: boolean) => void;
  setManifesting: (active: boolean) => void;
  setOverlayActive: (active: boolean) => void;
  setManifestView: (view: 'dossier' | 'tree' | 'vector') => void;
  setExpansionLevel: (level: number) => void;
  
  // --- AGREGADO PARA CORREGIR EL ERROR EN HOME.TSX ---
  calculate: () => void; 
}

// 2. HELPERS DE CÁLCULO
const calculateReduction = (n: number): number => {
  if (n === 0) return 0;
  return (n - 1) % 9 + 1;
};

const calculateGematria = (text: string, useSofit: boolean) => {
  if (!text) return { total: 0, reduced: 0 };

  const total = text.split('').reduce((acc, char) => {
    return acc + getHebrewValue(char, useSofit);
  }, 0);

  const reduced = calculateReduction(total);

  return { total, reduced };
};

// 3. CREACIÓN DEL STORE
export const useGematriaStore = create<GematriaState>((set, get) => ({
  inputText: '',
  school: 'Gra-Canon',
  useSofitMode: false,
  total: 0,
  reduced: 0,
  
  isManifesting: false,
  isOverlayActive: false,
  manifestView: 'dossier',
  expansionLevel: 0,

  setInputText: (text: string) => {
    const { useSofitMode } = get();
    const { total, reduced } = calculateGematria(text, useSofitMode);
    set({ inputText: text, total, reduced });
  },

  setSchool: (school: KabbalahMode) => set({ school }),

  setSofitMode: (useSofitMode: boolean) => {
    const { inputText } = get();
    const { total, reduced } = calculateGematria(inputText, useSofitMode);
    set({ useSofitMode, total, reduced });
  },

  setManifesting: (isManifesting: boolean) => set({ isManifesting }),
  setOverlayActive: (isOverlayActive: boolean) => set({ isOverlayActive }),
  setManifestView: (manifestView) => set({ manifestView }),
  setExpansionLevel: (level: number) => set({ expansionLevel: level }),

  // --- IMPLEMENTACIÓN DE CALCULATE ---
  calculate: () => {
    // Como ya calculamos en tiempo real, esto solo confirma la acción
    const { inputText, total } = get();
    console.log(`[System] Gematria confirmada para: ${inputText} = ${total}`);
  }
}));