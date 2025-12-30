'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { getRecursiveExpansion } from '@/lib/gematriaUtils';
import { GematriaTotal } from './GematriaTotal';
import '@/styles/TechnicalDossier.css';

// Función interna o importada
const getKabbalisticInsight = (stability: number, entropy: number, luminosity: number) => {
    if (stability > 80) return "Frecuencia en estado de coherencia armónica. La estructura geométrica interna refleja una alineación óptima.";
    if (entropy > 60) return "Alta entropía detectada. La dispersión energética requiere una rectificación intencional.";
    return "Configuración en proceso de balance. La luminosidad indica una apertura hacia estados superiores.";
};

export const TechnicalDossier = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  const safeText = inputText || '';
  const expandedText = getRecursiveExpansion(safeText, expansionLevel);
  const cosmos = useCosmicEngine(expandedText);

  return (
    <div className="dossier-container fade-in-panel">
      
      {/* HEADER: Gematría Total movida aquí dentro */}
      <div className="dossier-header-section">
        <GematriaTotal />
      </div>

      <div className="dossier-grid">
        
        {/* STABILITY */}
        <div className="metric-row">
            <div className="metric-info">
                <span>STABILITY INDEX</span>
                <span>{Math.round(cosmos.stabilityIndex)}%</span>
            </div>
            <div className="bar-track">
                <div className="bar-fill stability" style={{ width: `${cosmos.stabilityIndex}%` }} />
            </div>
        </div>

        {/* ENTROPY */}
        <div className="metric-row">
            <div className="metric-info">
                <span>ENTROPY LEVEL</span>
                <span>{Math.round(cosmos.entropyLevel)}%</span>
            </div>
            <div className="bar-track">
                <div className="bar-fill entropy" style={{ width: `${cosmos.entropyLevel}%` }} />
            </div>
        </div>

        {/* LUMINOSITY */}
        <div className="metric-row">
            <div className="metric-info">
                <span>LUMINOSITY</span>
                <span>{Math.round(cosmos.luminosity)}%</span>
            </div>
            <div className="bar-track">
                <div className="bar-fill luminosity" style={{ width: `${cosmos.luminosity}%` }} />
            </div>
        </div>

        {/* INSIGHT PANEL */}
        <div className="tikkun-insight-panel">
            <div className="insight-title">SÍNTESIS DE RECTIFICACIÓN</div>
            <p className="insight-text">
                {getKabbalisticInsight(cosmos.stabilityIndex, cosmos.entropyLevel, cosmos.luminosity)}
            </p>
        </div>
      </div>

      <div className="dossier-footer">
        <span>DOMINANT FORCE:</span>
        <span className={`footer-val force-${cosmos.dominantForce.toLowerCase()}`}>
            {cosmos.dominantForce || 'VOID'}
        </span>
      </div>
    </div>
  );
};