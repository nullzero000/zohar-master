'use client';

import { useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { getRecursiveExpansion } from '@/lib/gematriaUtils';
import '@/styles/VectorDataView.css';

export const VectorDataView = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  // 1. Procesamiento de Texto
  const activeText = useMemo(() => {
    return getRecursiveExpansion(inputText || '', expansionLevel);
  }, [inputText, expansionLevel]);

  const cosmos = useCosmicEngine(activeText);

  if (!inputText) return null;

  // 2. CÁLCULO DE RADAR CORREGIDO (Clamped)
  const blipAngle = (activeText.length * 137.5) % 360; 
  // Forzamos que el radio nunca sea mayor a 45 para que no toque el borde (48)
  const blipRadius = Math.min(45, 10 + (cosmos.stabilityIndex / 3)); 
  
  // Posición Cartesiana centrada en 50,50
  const blipX = 50 + (blipRadius * Math.cos(blipAngle * Math.PI / 180));
  const blipY = 50 + (blipRadius * Math.sin(blipAngle * Math.PI / 180));

  const blipColor = cosmos.stabilityIndex > 70 ? '#4cd137' : '#e84118';

  return (
    <div className="vector-container fade-in-panel">
      
      <div className="vector-header">
        <span className="vector-title">VECTOR FIELD // LVL {expansionLevel}</span>
        <span className="vector-id">ID: {activeText.length}-VEC</span>
      </div>

      <div className="vector-grid">
        <div className="vector-scope-section">
            <svg viewBox="0 0 100 100" className="radar-svg">
                <circle cx="50" cy="50" r="48" className="radar-circle" />
                <circle cx="50" cy="50" r="30" className="radar-circle dashed" />
                <line x1="50" y1="4" x2="50" y2="96" className="radar-axis" />
                <line x1="4" y1="50" x2="96" y2="50" className="radar-axis" />
                
                <line 
                    x1="50" y1="50" x2="50" y2="2" 
                    className="radar-sweep" 
                    style={{ animationDuration: '4s' }} 
                />
                
                {/* BLIP CON COORDENADAS SEGURAS */}
                <circle cx={blipX} cy={blipY} r="3" fill={blipColor} className="radar-blip" />
            </svg>
        </div>

        <div className="vector-metrics-section">
            <div className="v-metric-card" style={{ borderLeftColor: '#00a8ff' }}>
                <span className="v-label">MAGNITUDE</span>
                <span className="v-value val-vector">{activeText.length} <span className="v-unit">UNITS</span></span>
            </div>

            <div className="v-metric-card" style={{ borderLeftColor: blipColor }}>
                <div className="v-row-between">
                    <span className="v-label">COHERENCE</span>
                    <span className="v-value-small">{cosmos.stabilityIndex.toFixed(1)}%</span>
                </div>
                <div className="v-bar-bg">
                    <div className="v-bar-fill" style={{ width: `${cosmos.stabilityIndex}%`, background: blipColor }} />
                </div>
            </div>

            <div className="v-metric-card" style={{ borderLeftColor: '#fff' }}>
                <span className="v-label">DOMINANT FORCE</span>
                <span className="v-value" style={{ color: '#fff' }}>{cosmos.dominantForce}</span>
            </div>
        </div>
      </div>

      <div className="vector-footer">
          RAW: {activeText.substring(0, 100)}...
      </div>
    </div>
  );
};