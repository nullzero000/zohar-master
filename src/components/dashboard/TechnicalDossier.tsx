'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { LETTER_HIERARCHY } from '@/lib/constants';
import { getRecursiveExpansion } from '@/lib/gematriaUtils'; // IMPORTANTE: Nueva utilidad
import '@/styles/TechnicalDossier.css';

export const TechnicalDossier = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  // 1. OBTENER EL TEXTO REAL DEL NIVEL (Base o Expandido)
  const activeText = getRecursiveExpansion(inputText, expansionLevel);

  // 2. ALIMENTAR EL MOTOR CON EL TEXTO EXPANDIDO
  // El motor físico ahora analiza la "realidad expandida", no solo la semilla.
  const cosmos = useCosmicEngine(activeText);

  // 3. CÁLCULO DE JERARQUÍA SOBRE EL TEXTO EXPANDIDO
  const stats = activeText.split('').reduce((acc, char) => {
    const type = LETTER_HIERARCHY[char] || 'SIMPLE';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, { MOTHER: 0, DOUBLE: 0, SIMPLE: 0 } as Record<string, number>);

  if (!inputText) return null;

  return (
    <div className="dossier-container fade-in-panel">
      
      {/* CABECERA TÉCNICA */}
      <div className="dossier-header">
        <span className="dossier-title">
            SYSTEM STATUS // {expansionLevel === 0 ? 'BASE SEQUENCE' : `EXPANSION LVL.${expansionLevel}`}
        </span>
        <div className="dossier-id">ID: {cosmos.isDivinePresence ? 'YHVH-OVERRIDE' : 'STD-SEQ'}</div>
      </div>

      <div className="dossier-grid">
        
        {/* COLUMNA 1: MÉTRICAS DE CAMPO (Engine Output) */}
        <div className="dossier-section">
          <h4 className="section-label">COSMIC METRICS</h4>
          
          {/* Estabilidad (Aleph/Aire) */}
          <div className="metric-row">
            <div className="metric-info">
                <span>STABILITY INDEX</span>
                <span className="metric-val">{Math.round(cosmos.stabilityIndex)}%</span>
            </div>
            <div className="bar-track">
                <div 
                    className="bar-fill stability" 
                    style={{ width: `${cosmos.stabilityIndex}%` }} 
                />
            </div>
          </div>

          {/* Entropía (Shin/Fuego/Caos) */}
          <div className="metric-row">
            <div className="metric-info">
                <span>ENTROPY LEVEL</span>
                <span className="metric-val text-alert">{Math.round(cosmos.entropyLevel)}%</span>
            </div>
            <div className="bar-track">
                <div 
                    className="bar-fill entropy" 
                    style={{ width: `${cosmos.entropyLevel}%` }} 
                />
            </div>
          </div>

          {/* Luminosidad (Claridad Divina) */}
          <div className="metric-row">
            <div className="metric-info">
                <span>LUMINOSITY</span>
                <span className="metric-val">{Math.round(cosmos.luminosity)}%</span>
            </div>
            <div className="bar-track">
                <div 
                    className="bar-fill luminosity" 
                    style={{ width: `${cosmos.luminosity}%` }} 
                />
            </div>
          </div>
        </div>

        {/* COLUMNA 2: COMPOSICIÓN ONTOLÓGICA (Hierarchy) */}
        <div className="dossier-section">
          <h4 className="section-label">STRUCTURE COMPOSITION</h4>
          
          <div className="composition-grid">
            <div className="comp-card mother">
                <span className="comp-count">{stats.MOTHER}</span>
                <span className="comp-label">MOTHERS</span>
                {/* Usamos activeText.length para calcular el porcentaje real de la expansión */}
                <div className="comp-bar" style={{ height: `${(stats.MOTHER / activeText.length) * 100}%` }} />
            </div>
            <div className="comp-card double">
                <span className="comp-count">{stats.DOUBLE}</span>
                <span className="comp-label">DOUBLES</span>
                <div className="comp-bar" style={{ height: `${(stats.DOUBLE / activeText.length) * 100}%` }} />
            </div>
            <div className="comp-card simple">
                <span className="comp-count">{stats.SIMPLE}</span>
                <span className="comp-label">SIMPLES</span>
                <div className="comp-bar" style={{ height: `${(stats.SIMPLE / activeText.length) * 100}%` }} />
            </div>
          </div>
        </div>

      </div>
      
      {/* FOOTER: DOMINANCIA ELEMENTAL */}
      <div className="dossier-footer">
        <span className="footer-label">DOMINANT FORCE:</span>
        <span className={`footer-val force-${cosmos.dominantForce.toLowerCase()}`}>
            [{cosmos.dominantForce}]
        </span>
      </div>

    </div>
  );
};