'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { calculateCrystalRGB, getRecursiveExpansion } from '@/lib/gematriaUtils';
import { TORAH_FIRST_WORDS, NORMALIZE_MAP } from '@/lib/constants';
import '@/styles/AnalysisSliders.css';

export const AnalysisSliders = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  const safeText = inputText || ''; 
  const activeText = getRecursiveExpansion(safeText, expansionLevel);
  const cosmos = useCosmicEngine(activeText);
  const crystalColor = calculateCrystalRGB(activeText);

  const charFrequency: Record<string, number> = {};
  activeText.split('').forEach(char => {
      if (char.trim()) charFrequency[char] = (charFrequency[char] || 0) + 1;
  });
  const sortedChars = Object.entries(charFrequency).sort(([, countA], [, countB]) => countB - countA);
  const dominantChar = sortedChars.length > 0 ? sortedChars[0][0] : (safeText.charAt(0) || '?');
  const dominantCount = sortedChars.length > 0 ? sortedChars[0][1] : 0;

  const normalizedDom = NORMALIZE_MAP[dominantChar] || dominantChar;
  const torahData = TORAH_FIRST_WORDS[normalizedDom];

  const bioValue = Math.min(100, (cosmos.stabilityIndex * 0.6) + (cosmos.luminosity * 0.4));
  const lightShadowValue = Math.min(100, Math.max(0, 50 + cosmos.moralField + (cosmos.luminosity * 0.3) - (cosmos.entropyLevel * 0.3)));
  const alephCount = activeText.split('').filter(c => c === 'א').length;
  const torahConnValue = Math.min(100, (alephCount / Math.max(1, activeText.length * 0.15)) * 100);

  const getBodyLocation = () => {
    if (cosmos.dominantForce === 'FIRE') return 'HEAD / CEREBRO';
    if (cosmos.dominantForce === 'WATER') return 'TORSO / CORAZÓN';
    if (cosmos.dominantForce === 'EARTH') return 'PIERNAS / FUNDAMENTO';
    return 'ALIENTO / PULMONES';
  };

  if (!inputText) {
    return (
        <div style={{ 
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', opacity: 0.5 
        }}>
            <div style={{
                width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div style={{ width: '4px', height: '4px', background: '#d4af37', borderRadius: '50%' }} />
            </div>
            <span style={{ fontFamily: 'Courier New', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                WAITING FOR INPUT SIGNAL...
            </span>
        </div>
    );
  }

  return (
    <div className="analysis-panel fade-in-panel" style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        padding: '10px 5px', // Padding interno para que no toque bordes
        justifyContent: 'space-between' // Distribuye elementos arriba, centro y abajo
    }}>
      
      {/* 1. SECCIÓN SUPERIOR: SLIDERS */}
      <div className="sliders-section" style={{ zIndex: 5, flexShrink: 0 }}>
        <div className="slider-group">
            <div className="slider-label">
                <span>DENSIDAD BIOLÓGICA (LVL {expansionLevel})</span>
                <span>{Math.round(bioValue)}%</span>
            </div>
            <div className="slider-track">
                <div className="slider-fill biological" style={{ width: `${bioValue}%` }} />
                <div className="slider-thumb" style={{ left: `${bioValue}%` }} />
            </div>
        </div>

        <div className="slider-group">
            <div className="slider-label">
                <span>POLARIDAD</span>
                <span>{Math.round(lightShadowValue)}%</span>
            </div>
            <div className="slider-track dual-track">
                <div className="slider-thumb light-shadow" style={{ left: `${lightShadowValue}%` }} />
            </div>
        </div>

        <div className="slider-group">
            <div className="slider-label">
                <span>CONEXIÓN BERESHIT (ALEPHS)</span>
                <span>{Math.round(torahConnValue)}%</span>
            </div>
            <div className="slider-track">
                <div className="slider-fill torah" style={{ width: `${torahConnValue}%` }} />
            </div>
        </div>
      </div>

      {/* 2. SECCIÓN CENTRAL: CRISTAL (Ocupa todo el espacio sobrante) */}
      <div className="crystal-section" style={{ 
          position: 'relative', 
          flex: 1, // CRÍTICO: Esto hace que crezca para llenar el hueco
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '180px', // Reducido un poco para pantallas pequeñas
          margin: '10px 0'
      }}>
        {/* CRISTAL ANIMADO */}
        <div className="crystal-display" style={{ zIndex: 1, position: 'relative' }}>
            <div 
                className="crystal-core"
                style={{ 
                    backgroundColor: crystalColor,
                    boxShadow: `0 0 ${20 + (expansionLevel * 15)}px ${crystalColor}`,
                    animation: cosmos.entropyLevel > 50 ? 'pulse-core 2s infinite' : 'none',
                    transform: `scale(${1 + (expansionLevel * 0.15)})`,
                    position: 'relative',
                    zIndex: 1
                }}
            />
            <div className="crystal-label" style={{ 
                position: 'relative', zIndex: 10, marginTop: '15px',
                textShadow: '0 0 10px rgba(0,0,0,0.9)', textAlign: 'center'
            }}>
                SPECTRAL AVG<br/>
                <span style={{ color: crystalColor, fontWeight: 'bold' }}>{crystalColor}</span>
            </div>
        </div>
      </div>

      {/* 3. SECCIÓN INFERIOR: DATOS (Siempre pegado abajo) */}
      <div style={{ flexShrink: 0, width: '100%', zIndex: 5 }}>
        
        <div className="location-display" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
            <span className="loc-label">LOCALIZACIÓN SOMÁTICA</span>
            <span className="loc-value">{getBodyLocation()}</span>
        </div>

        {torahData ? (
             <div className="torah-word-display" style={{ 
                 marginTop: '15px', 
                 textAlign: 'center', 
                 borderTop: '1px solid rgba(255,255,255,0.1)',
                 paddingTop: '10px',
                 width: '100%'
             }}>
                <span className="loc-label" style={{ display: 'block', marginBottom: '4px', fontSize: '0.6rem', color: '#888' }}>
                    DOMINANT VIBRATION ({normalizedDom}) x{dominantCount}
                </span>
                <div style={{ fontSize: '1.2rem', fontFamily: 'Times New Roman', fontWeight: 'bold', color: '#d4af37' }}>
                    {torahData.firstWord}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px', fontStyle: 'italic' }}>
                    {torahData.symbolicMeaning}
                </div>
            </div>
        ) : (
            <div className="torah-word-display" style={{ marginTop: '15px', opacity: 0.3, fontSize: '0.7rem', textAlign: 'center' }}>
                NO DATA FOR: {dominantChar}
            </div>
        )}
      </div>
      
    </div>
  );
};