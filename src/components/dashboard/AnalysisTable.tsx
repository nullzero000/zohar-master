'use client';

import { useState, Fragment } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/AnalysisTable.css'; 

export const AnalysisTable = () => {
  const { levels } = useGematriaStore();
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  if (!levels || levels.length === 0) return null;

  const toggleExpand = (lvl: number) => {
    setExpandedLevel(expandedLevel === lvl ? null : lvl);
  };

  return (
    <div className="analysis-container">
      <div className="table-wrapper">
        <table className="miluy-table">
          <thead>
            <tr>
              <th>NIVEL</th>
              <th>SECUENCIA</th>
              <th>VAL</th>
              <th>RED</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level) => (
              /* KEY CORREGIDA AQUÍ */
              <Fragment key={level.level}>
                <tr 
                  className={`clickable-row ${expandedLevel === level.level ? 'expanded-row' : ''}`}
                  onClick={() => toggleExpand(level.level)}
                >
                  <td className="level-cell">
                    <span className="expand-icon">{expandedLevel === level.level ? '▼' : '▶'}</span>
                    NV{level.level}
                  </td>
                  <td style={{ letterSpacing: '2px', opacity: 0.8 }}>
                    {level.chars.length > 12 
                        ? level.chars.slice(0, 12).join(' ') + '...' 
                        : level.chars.join(' ')}
                  </td>
                  <td className="value-cell">{level.totalValue}</td>
                  <td className="reduced-cell">{level.reducedValue}</td>
                </tr>
                
                {expandedLevel === level.level && (
                    <tr className="detail-row">
                        <td colSpan={4}>
                            <div className="frequency-panel">
                                <div className="freq-header">MATRIZ COMPLETA</div>
                                <div className="freq-grid">
                                    {level.chars.map((char, i) => (
                                        <div key={`${level.level}-char-${i}`} className="freq-chip">
                                            <span className="freq-char">{char}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};