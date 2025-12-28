'use client';

import { useState } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { HEBREW_DATA } from '@/lib/constants';
import { getHebrewColor } from '@/utils/logicHelper';

// INTEGRACIÓN: Tabla de Análisis activada
import { AnalysisTable } from './AnalysisTable'; 
import '@/styles/TechnicalDossier.css';

const LEVEL_META: Record<number, { label: string; world: string; focus: string; desc: string }> = {
    0: { label: 'RAÍZ (NV0)', world: "OLAM HA'ZEH", focus: 'Malchut', desc: 'Realidad Física' },
    1: { label: 'ALMA (NV1)', world: 'YETZIRÁ', focus: 'Ruach', desc: 'Emoción y Forma' },
    2: { label: 'MENTE (NV2)', world: 'BERIÁ', focus: 'Neshamá', desc: 'Intelecto Puro' },
    3: { label: 'LUZ (NV3)', world: 'ATZILUT', focus: 'Chayá', desc: 'Unidad Divina' },
    4: { label: 'VOLUNTAD (NV4)', world: 'ADAM KADMON', focus: 'Yechidá', desc: 'Voluntad Primordial' },
};

export const TechnicalDossier = () => {
  const { levels, school, analysis } = useGematriaStore();
  const [selectedLevel, setSelectedLevel] = useState(0);

  // Validación de seguridad
  if (!levels || levels.length === 0 || !analysis) {
      return <div className="tactical-container"><div className="loading-state">ESPERANDO DATOS DE ENTRADA...</div></div>;
  }

  const currentLevelData = levels[selectedLevel] || levels[0];
  const meta = LEVEL_META[selectedLevel];
  
  // Datos Dominantes del Análisis Global
  const domChar = analysis.dominant;
  const domData = HEBREW_DATA[domChar] || HEBREW_DATA['Aleph'];

  const dynamicStyle = { '--base-color': analysis.mixedColor } as React.CSSProperties;

  return (
    <div className="tactical-container" style={dynamicStyle}>
      
      {/* 1. NAVEGACIÓN DE PESTAÑAS (Niveles) */}
      <div className="tactical-nav-wrapper">
          <div className="tactical-nav">
            {levels.map((_, idx) => (
                <button 
                    key={idx} 
                    className={`tactical-tab ${selectedLevel === idx ? 'active' : ''}`} 
                    onClick={() => setSelectedLevel(idx)}
                >
                    <span className="tab-label">{LEVEL_META[idx]?.label || `NV${idx}`}</span>
                </button>
            ))}
          </div>
      </div>

      <div className="dossier-content">
          
          {/* 2. HUD DE NIVEL */}
          <div className="level-hud-bar">
              <div className="hud-metric">
                  <span className="hud-label">MUNDO</span>
                  <span className="hud-value text-gold">{meta?.world}</span>
              </div>
              <div className="hud-divider"></div>
              <div className="hud-metric">
                  <span className="hud-label">VALOR</span>
                  <span className="hud-value">{currentLevelData.totalValue}</span>
              </div>
              <div className="hud-divider"></div>
              <div className="hud-metric">
                  <span className="hud-label">REDUCCIÓN</span>
                  <span className="hud-value highlight">{currentLevelData.reducedValue}</span>
              </div>
          </div>

          {/* 3. ARQUETIPO DOMINANTE */}
          {domData && (
              <div className="torah-block glass-panel">
                  <div className="panel-header">ARQUETIPO DOMINANTE DEL SISTEMA</div>
                  <div className="torah-layout">
                      <div className="hebrew-display-box">
                          <div className="hebrew-hero">
                              <span 
                                className="hebrew-glyph"
                                style={{ 
                                    color: getHebrewColor(domChar, school), 
                                    textShadow: `0 0 25px ${getHebrewColor(domChar, school)}80`
                                }}
                              >
                                {domChar}
                              </span>
                          </div>
                          <span className="phonetic-tag">{domData.name}</span>
                      </div>

                      <div className="meta-list">
                          <div className="meta-item">
                              <span className="meta-key">SIGNIFICADO</span>
                              <span className="meta-val highlight">{domData.meaning}</span>
                          </div>
                          <div className="meta-item">
                              <span className="meta-key">PLANETA / SIGNO</span>
                              <span className="meta-val">{domData.planet}</span>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* 4. ANÁLISIS CLÍNICO */}
          {domData && domData.sy_data && (
            <div className="clinical-panel glass-panel">
                <div className="panel-header alert-header">
                    <span>MATRIZ CLÍNICA</span>
                    <span className="status-dot">●</span>
                </div>
                <div className="clinical-grid">
                    <div className="clinical-cell">
                        <span className="clin-label">LÓGICA ESTRUCTURAL</span>
                        <span className="clin-val logic">{domData.sy_data.logic}</span>
                    </div>
                    <div className="clinical-cell">
                        <span className="clin-label">DIAGNÓSTICO</span>
                        <span className="clin-val diag">{domData.sy_data.diag}</span>
                    </div>
                    <div className="clinical-cell full-width">
                        <span className="clin-label">PROTOCOLO DE CORRECCIÓN</span>
                        <span className="clin-val fix">{domData.sy_data.fix}</span>
                    </div>
                </div>
            </div>
          )}

          {/* 5. REGISTRO DE EXPANSIÓN (TABLA) */}
          <div className="expansion-registry">
            <div className="registry-header">REGISTRO DE EXPANSIÓN COMPLETO</div>
            <AnalysisTable />
          </div>
          
      </div>
    </div>
  );
};