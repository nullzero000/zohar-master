import { create } from 'zustand';
import { type KabbalahMode } from '@/lib/types';

interface MiluyLevel {
  level: number;
  chars: string[];
  totalValue: number;
  reducedValue: number;
}

interface AnalysisData {
  mixedColor: string;
  mixedColorName: string;
  frequencyMap: Record<string, number>;
  dominant: string;
  total: number;
  diagnosis?: string;
}

interface GematriaState {
  inputText: string;
  school: KabbalahMode;
  isManifesting: boolean;
  isOverlayActive: boolean;
  manifestView: 'dossier' | 'tree' | 'vector';
  
  // NUEVO: Modo Gematria Sofit (500-900)
  useSofitMode: boolean; 

  levels: MiluyLevel[];
  analysis: AnalysisData | null;
  total: number;
  reduced: number;

  setInputText: (text: string) => void;
  setSchool: (school: KabbalahMode) => void;
  setManifesting: (isManifesting: boolean) => void;
  setOverlayActive: (active: boolean) => void;
  setManifestView: (view: 'dossier' | 'tree' | 'vector') => void;
  
  // NUEVO ACCIÓN
  setSofitMode: (use: boolean) => void;

  setCalculationData: (data: { 
      levels: MiluyLevel[]; 
      analysis: AnalysisData; 
      total: number; 
      reduced: number 
  }) => void;
}

export const useGematriaStore = create<GematriaState>((set) => ({
  inputText: '',
  school: 'SeferYetzirah-Standard',
  isManifesting: false,
  isOverlayActive: false,
  manifestView: 'dossier',
  
  useSofitMode: false, // Por defecto: Gematría Estándar (No usa 500-900)

  levels: [],
  analysis: null,
  total: 0,
  reduced: 0,

  setInputText: (text) => set({ inputText: text }),
  setSchool: (school) => set({ school }),
  setManifesting: (isManifesting) => set({ isManifesting, isOverlayActive: false }),
  setOverlayActive: (active) => set({ isOverlayActive: active }),
  setManifestView: (view) => set({ manifestView: view }),
  
  setSofitMode: (use) => set({ useSofitMode: use }),

  setCalculationData: (data) => set({
      levels: data.levels,
      analysis: data.analysis,
      total: data.total,
      reduced: data.reduced
  })
}));