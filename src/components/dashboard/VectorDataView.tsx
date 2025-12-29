'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { getRecursiveExpansion } from '@/lib/gematriaUtils';

export const VectorDataView = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  // 1. CÁLCULO DINÁMICO (Reemplaza al viejo state.analysis)
  const safeText = inputText || '';
  const activeText = getRecursiveExpansion(safeText, expansionLevel);
  const cosmos = useCosmicEngine(activeText);

  if (!inputText) {
    return (
        <div style={{ 
            width: '100%', height: '100%', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', 
            fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' 
        }}>
            WAITING FOR VECTOR INPUT...
        </div>
    );
  }

  // Estilos inline para asegurar que no rompa si falta el CSS,
  // ajustado al diseño "Cyber-Mystic"
  const rowStyle = {
      display: 'flex', justifyContent: 'space-between', 
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      padding: '8px 0', fontFamily: 'Courier New', fontSize: '0.8rem'
  };

  const labelStyle = { color: 'rgba(255,255,255,0.5)' };
  const valStyle = { color: '#4cd137', fontWeight: 'bold' };

  return (
    <div className="fade-in-panel" style={{ 
        width: '100%', height: '100%', padding: '20px',
        display: 'flex', flexDirection: 'column', gap: '10px',
        color: '#fff' 
    }}>
      <div style={{ 
          fontSize: '0.7rem', letterSpacing: '0.2em', 
          marginBottom: '10px', color: '#d4af37', borderBottom: '2px solid #d4af37', 
          paddingBottom: '5px', display: 'inline-block'
      }}>
        VECTOR FIELD ANALYSIS // LVL {expansionLevel}
      </div>

      <div style={rowStyle}>
          <span style={labelStyle}>MAGNITUDE (Length)</span>
          <span style={valStyle}>{activeText.length} UNITS</span>
      </div>

      <div style={rowStyle}>
          <span style={labelStyle}>ENTROPY (Chaos)</span>
          <span style={{...valStyle, color: cosmos.entropyLevel > 50 ? '#e84118' : '#4cd137'}}>
              {cosmos.entropyLevel.toFixed(2)}%
          </span>
      </div>

      <div style={rowStyle}>
          <span style={labelStyle}>STABILITY (Coherence)</span>
          <span style={valStyle}>{cosmos.stabilityIndex.toFixed(2)}%</span>
      </div>

      <div style={rowStyle}>
          <span style={labelStyle}>LUMINOSITY (Light)</span>
          <span style={{...valStyle, color: '#fbc531'}}>{cosmos.luminosity.toFixed(2)}%</span>
      </div>

      <div style={rowStyle}>
          <span style={labelStyle}>DOMINANT VECTOR</span>
          <span style={{color: '#fff', fontWeight: 'bold'}}>{cosmos.dominantForce}</span>
      </div>

      <div style={{ 
          marginTop: 'auto', padding: '10px', background: 'rgba(255,255,255,0.05)', 
          borderRadius: '4px', fontSize: '0.6rem', fontFamily: 'monospace', color: '#aaa' 
      }}>
          RAW HASH: {activeText.substring(0, 20)}...
      </div>
    </div>
  );
};