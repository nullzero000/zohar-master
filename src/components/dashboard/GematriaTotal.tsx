'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, getHebrewValue, isOntologicalBlack, getRecursiveExpansion } from '@/lib/gematriaUtils';
import '@/styles/GematriaTotal.css';

export const GematriaTotal = () => {
  const { inputText, school, useSofitMode, expansionLevel } = useGematriaStore();

  if (!inputText) return null;

  // 1. TEXTO ACTIVO
  const activeText = getRecursiveExpansion(inputText, expansionLevel);

  // 2. VALORES
  const activeTotal = activeText.split('').reduce((acc, char) => acc + getHebrewValue(char, useSofitMode), 0);
  const activeReduced = (activeTotal - 1) % 9 + 1;

  // 3. LÓGICA DE FRECUENCIA (DISTINCT COUNT) PARA VISUALIZACIÓN COMPACTA
  const renderEquation = () => {
    // Si es corto, mostramos la ecuación completa
    if (activeText.length <= 20) {
        return activeText.split('').map((char, index) => renderCharNode(char, index, false));
    }

    // Si es largo (Expansiones altas), calculamos el TOP 5
    const frequencyMap: Record<string, number> = {};
    activeText.split('').forEach(char => {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    });

    // Ordenamos por frecuencia descendente
    const top5 = Object.entries(frequencyMap)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5);

    return (
        <div className="frequency-cluster">
            <span className="cluster-label">DOMINANT FREQUENCIES (TOP 5 / {activeText.length} CHARS)</span>
            <div className="cluster-row">
                {top5.map(([char, count], index) => renderCharNode(char, index, true, count))}
            </div>
        </div>
    );
  };

  // Helper para renderizar nodo
  const renderCharNode = (char: string, index: number, isCluster: boolean, count?: number) => {
    const val = getHebrewValue(char, useSofitMode);
    const color = getHebrewColor(char, school);
    const isBlack = isOntologicalBlack(color);

    return (
        <div key={`${char}-${index}`} className="equation-node">
            <span 
                className="eq-char" 
                style={{ 
                    color: color,
                    textShadow: isBlack ? '0 0 4px rgba(255,255,255,0.6)' : `0 0 8px ${color}`,
                    fontSize: isCluster ? '1.5rem' : '1.2rem'
                }}
            >
                {char}
            </span>
            {/* Si es cluster mostramos el conteo, si no, el valor */}
            <span className="eq-val">{isCluster ? `x${count}` : val}</span>
            {!isCluster && index < activeText.length - 1 && <span className="eq-plus">+</span>}
        </div>
    );
  };

  return (
    <div className="total-engine-container fade-in">
      <div className="total-display-wrapper">
        <div className="main-value-group">
            <span className="label-micro">GEMATRÍA (LVL {expansionLevel})</span>
            <span className="value-macro">{activeTotal}</span>
        </div>
        <div className="divider-vertical" />
        <div className="sub-value-group">
            <span className="label-micro">MISPAR KATAN</span>
            <span className="value-midi">{activeReduced === 0 ? 0 : activeReduced}</span>
        </div>
      </div>

      <div className="equation-track">
        {renderEquation()}
      </div>
    </div>
  );
};