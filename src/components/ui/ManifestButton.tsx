'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { calculateMiluyLevels } from '@/utils/gematriaEngine';
import { analyzeFrequencyAndColor } from '@/utils/spectralEngine';

export const ManifestButton = () => {
  const { 
    inputText, 
    isManifesting, 
    setManifesting, 
    setCalculationData,
    setOverlayActive,
    school,
    useSofitMode // <--- Leemos el modo del store
  } = useGematriaStore();

  const handleManifest = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }

    if (isManifesting) {
        setManifesting(false);
        setOverlayActive(false);
        return;
    }

    if (!inputText || inputText.trim().length === 0) return;

    try {
        // PASAMOS useSofitMode AL MOTOR
        const levels = calculateMiluyLevels(inputText, 5, useSofitMode);
        
        const rootChars = inputText.split(''); 
        const spectralAnalysis = analyzeFrequencyAndColor(rootChars, school);

        if (!spectralAnalysis) throw new Error("Fallo en análisis espectral");

        const totalGematria = levels[0]?.totalValue || 0;
        const reducedGematria = levels[0]?.reducedValue || 0;

        setCalculationData({
            levels: levels,
            analysis: {
                ...spectralAnalysis,
                total: totalGematria,
                diagnosis: spectralAnalysis.diagnosis
            },
            total: totalGematria,
            reduced: reducedGematria
        });

        setManifesting(true);

    } catch (error) {
        console.error("Error crítico:", error);
    }
  };

  return (
    // ... (El JSX del botón se mantiene igual)
    <button
      onClick={handleManifest}
      disabled={!isManifesting && inputText.length === 0}
      className={`
        relative group overflow-hidden pointer-events-auto
        px-12 py-4 
        border border-white/20 rounded-full 
        transition-all duration-700 ease-out z-[90]
        ${isManifesting 
            ? 'bg-red-900/20 hover:bg-red-900/40 border-red-500/30 w-48' 
            : 'bg-white/5 hover:bg-white/10 w-64'
        }
        ${!isManifesting && inputText.length === 0 ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]'}
      `}
    >
      <span className={`
        relative z-10 
        font-sans text-xs tracking-[0.4em] font-bold uppercase
        transition-colors duration-500
        ${isManifesting ? 'text-red-200' : 'text-white'}
      `}>
        {isManifesting ? 'RETORNAR' : 'MANIFESTAR'}
      </span>
      
      {!isManifesting && (
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10" />
      )}
    </button>
  );
};