'use client';

import { useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getRecursiveExpansion, getHebrewColor } from '@/lib/gematriaUtils';
import '@/styles/RawManifestView.css';

export const RawManifestView = () => {
  const { inputText, expansionLevel, school } = useGematriaStore();
  
  // 1. Obtener el texto expandido completo
  const expandedText = useMemo(() => {
    return getRecursiveExpansion(inputText || '', expansionLevel);
  }, [inputText, expansionLevel]);

  // 2. Cálculo de Frecuencias (Distinct Count)
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    const chars = expandedText.split('');
    
    chars.forEach(char => {
      if (char.trim()) {
        counts[char] = (counts[char] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([char, count]) => ({
        char,
        count,
        percentage: ((count / chars.length) * 100).toFixed(1),
        color: getHebrewColor(char, school)
      }))
      .sort((a, b) => b.count - a.count); // Ordenar de mayor a menor frecuencia
  }, [expandedText, school]);

  if (!inputText) return null;

  return (
    <div className="raw-manifest-container fade-in">
      
      {/* SECCIÓN 1: SECUENCIA COMPLETA */}
      <div className="raw-section">
        <h3 className="raw-subtitle">FULL SEQUENCE EXPANSION (LENGTH: {expandedText.length})</h3>
        <div className="raw-text-box">
          {expandedText}
        </div>
      </div>

      {/* SECCIÓN 2: TABLA TÉCNICA DE FRECUENCIAS */}
      <div className="raw-section">
        <h3 className="raw-subtitle">CHARACTER FREQUENCY ANALYSIS</h3>
        <div className="raw-table-wrapper">
          <table className="raw-table">
            <thead>
              <tr>
                <th>CHAR</th>
                <th>COUNT</th>
                <th>DISTRIBUTION</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item, i) => (
                <tr key={i}>
                  <td className="char-cell" style={{ color: item.color }}>
                    {item.char}
                  </td>
                  <td className="mono-val">{item.count}</td>
                  <td>
                    <div className="dist-container">
                      <span className="dist-perc">{item.percentage}%</span>
                      <div className="dist-bar-bg">
                        <div 
                          className="dist-bar-fill" 
                          style={{ width: `${item.percentage}%`, background: item.color }} 
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};