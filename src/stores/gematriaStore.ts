import { create } from 'zustand';
import { KabbalahMode } from '@/lib/types';
import { getHebrewValue } from '@/lib/gematriaUtils';

// 1. DEFINICIÓN DE LA INTERFAZ DE ESTADO (El Contrato)
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

  // --- Niveles de Expansión (Nefesh -> Atzilut) ---
  expansionLevel: number; // 0 a 5

  // --- Acciones (Setters) ---
  setInputText: (text: string) => void;
  setSchool: (school: KabbalahMode) => void;
  setSofitMode: (active: boolean) => void;
  setManifesting: (active: boolean) => void;
  setOverlayActive: (active: boolean) => void;
  setManifestView: (view: 'dossier' | 'tree' | 'vector') => void;
  setExpansionLevel: (level: number) => void;
}

// 2. HELPERS DE CÁLCULO (Lógica Pura)
// Suma dígitos recursivamente hasta obtener un solo dígito (1-9)
const calculateReduction = (n: number): number => {
  if (n === 0) return 0;
  return (n - 1) % 9 + 1;
};

// Cálculo Maestro de Gematría
const calculateGematria = (text: string, useSofit: boolean) => {
  if (!text) return { total: 0, reduced: 0 };

  // Suma Total (Ragil)
  const total = text.split('').reduce((acc, char) => {
    return acc + getHebrewValue(char, useSofit);
  }, 0);

  // Reducción (Katan)
  const reduced = calculateReduction(total);

  return { total, reduced };
};

// 3. CREACIÓN DEL STORE (Implementación)
export const useGematriaStore = create<GematriaState>((set, get) => ({
  // --- Valores Iniciales ---
  inputText: '',
  school: 'Gra-Canon', // Default estricto
  useSofitMode: false,
  total: 0,
  reduced: 0,
  
  isManifesting: false,
  isOverlayActive: false,
  manifestView: 'dossier',
  
  expansionLevel: 0, // Inicia en Base (Nefesh)

  // --- Acciones ---
  
  setInputText: (text: string) => {
    // Al escribir, recalculamos automáticamente la gematría
    const { useSofitMode } = get();
    const { total, reduced } = calculateGematria(text, useSofitMode);
    set({ inputText: text, total, reduced });
  },

  setSchool: (school: KabbalahMode) => {
    set({ school });
  },

  setSofitMode: (useSofitMode: boolean) => {
    // Al cambiar sofit, recalculamos valores numéricos
    const { inputText } = get();
    const { total, reduced } = calculateGematria(inputText, useSofitMode);
    set({ useSofitMode, total, reduced });
  },

  setManifesting: (isManifesting: boolean) => set({ isManifesting }),
  setOverlayActive: (isOverlayActive: boolean) => set({ isOverlayActive }),
  setManifestView: (manifestView) => set({ manifestView }),
  
  // Acción para cambiar el nivel de expansión (Nav Bar)
  setExpansionLevel: (level: number) => set({ expansionLevel: level }),
}));