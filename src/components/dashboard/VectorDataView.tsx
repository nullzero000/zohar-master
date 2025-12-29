'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { getRecursiveExpansion } from '@/lib/gematriaUtils';
import '@/styles/VectorDataView.css';

export const VectorDataView = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  // Motor Cósmico
  const safeText = inputText || '';
  const activeText = getRecursiveExpansion(safeText, expansionLevel);
  const cosmos = useCosmicEngine(activeText);

  if (!inputText) {
    return (
        <div className="vector-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ opacity: 0.5, letterSpacing: '0.2em' }}>WAITING FOR VECTOR SIGNAL...</span>
        </div>
    );
  }

  // Calculamos rotación del radar basada en entropía (caos = más rápido/loco)
  const rotationSpeed = cosmos.entropyLevel > 0 ? (100 / cosmos.entropyLevel) + 's' : '4s';
  const blipAngle = (activeText.length * 13) % 360; // Posición "aleatoria" determinista
  const blipRadius = 30 + (cosmos.stabilityIndex / 2); // Distancia del centro

  // Convertimos polar a cartesiano para el puntito (blip)
  const blipX = 50 + (blipRadius / 2) * Math.cos(blipAngle * Math.PI / 180);
  const blipY = 50 + (blipRadius / 2) * Math.sin(blipAngle * Math.PI / 180);

  return (
    <div className="vector-container fade-in-panel">
      
      {/* HEADER */}
      <div className="vector-header">
        <span className="vector-title">VECTOR FIELD // LVL {expansionLevel}</span>
        <span className="vector-id">ID: {activeText.length}-VEC</span>
      </div>

      <div className="vector-grid">
        
        {/* IZQUIERDA: RADAR SCOPE */}
        <div className="vector-scope-section">
            <svg viewBox="0 0 100 100" className="radar-svg">
                {/* Grilla Radar */}
                <circle cx="50" cy="50" r="48" className="radar-circle" strokeOpacity="0.5" />
                <circle cx="50" cy="50" r="35" className="radar-circle" strokeOpacity="0.3" />
                <circle cx="50" cy="50" r="20" className="radar-circle" strokeOpacity="0.1" />
                <line x1="50" y1="2" x2="50" y2="98" className="radar-axis" />
                <line x1="2" y1="50" x2="98" y2="50" className="radar-axis" />
                
                {/* Barrido (Scanner) */}
                <line x1="50" y1="50" x2="50" y2="2" stroke="url(#radar-grad)" strokeWidth="2" className="radar-sweep" style={{ animationDuration: rotationSpeed }} />
                
                {/* Blip (El "Objeto" detectado) */}
                <circle cx={blipX} cy={blipY} r="3" className="radar-blip" fill={cosmos.entropyLevel > 50 ? '#e84118' : '#4cd137'} />

                <defs>
                    <linearGradient id="radar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(76, 209, 55, 0)" />
                        <stop offset="100%" stopColor="rgba(76, 209, 55, 0.8)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>

        {/* DERECHA: DATOS DUROS */}
        <div className="vector-metrics-section">
            
            {/* MAGNITUD */}
            <div className="v-metric-card">
                <span className="v-label">MAGNITUDE (LENGTH)</span>
                <span className="v-value val-vector">{activeText.length} <span style={{fontSize:'0.6rem'}}>UNITS</span></span>
            </div>

            {/* ESTABILIDAD */}
            <div className="v-metric-card">
                <span className="v-label">COHERENCE STABILITY</span>
                <span className={`v-value ${cosmos.stabilityIndex > 80 ? 'val-stable' : 'val-unstable'}`}>
                    {cosmos.stabilityIndex.toFixed(1)}%
                </span>
                <div style={{ width: '100%', height: '2px', background: '#333', marginTop: '5px' }}>
                    <div style={{ width: `${cosmos.stabilityIndex}%`, height: '100%', background: cosmos.stabilityIndex > 80 ? '#4cd137' : '#e84118' }} />
                </div>
            </div>

            {/* LUMINOSIDAD */}
            <div className="v-metric-card">
                <span className="v-label">LUMINOSITY</span>
                <span className="v-value val-luminous">{cosmos.luminosity.toFixed(1)}%</span>
            </div>

            {/* FUERZA DOMINANTE */}
            <div className="v-metric-card" style={{ borderLeftColor: '#00a8ff' }}>
                <span className="v-label">DOMINANT VECTOR</span>
                <span className="v-value" style={{ color: '#fff' }}>{cosmos.dominantForce}</span>
            </div>

        </div>

      </div>

      {/* FOOTER: RAW HASH */}
      <div className="vector-footer">
          RAW: {activeText}
      </div>

    </div>
  );
};