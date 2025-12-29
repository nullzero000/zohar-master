'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { calculateCrystalRGB, getRecursiveExpansion } from '@/lib/gematriaUtils';
import { TORAH_FIRST_WORDS, NORMALIZE_MAP } from '@/lib/constants';
import '@/styles/AnalysisSliders.css';

export const AnalysisSliders = () => {
  const { inputText, expansionLevel } = useGematriaStore();
  
  // 1. EJECUCIÓN INCONDICIONAL DE HOOKS (LA REGLA DE ORO)
  // Calculamos todo SIEMPRE, incluso si está vacío (usamos '' como fallback)
  const safeText = inputText || ''; 
  const activeText = getRecursiveExpansion(safeText, expansionLevel);
  
  // El motor cósmico siempre debe rodar, aunque esté en vacío
  const cosmos = useCosmicEngine(activeText);
  
  // 2. CÁLCULOS DETERMINISTAS
  const crystalColor = calculateCrystalRGB(activeText);

  // Frecuencia
  const charFrequency: Record<string, number> = {};
  activeText.split('').forEach(char => {
      if (char.trim()) charFrequency[char] = (charFrequency[char] || 0) + 1;
  });
  const sortedChars = Object.entries(charFrequency).sort(([, countA], [, countB]) => countB - countA);
  const dominantChar = sortedChars.length > 0 ? sortedChars[0][0] : (safeText.charAt(0) || '?');
  const dominantCount = sortedChars.length > 0 ? sortedChars[0][1] : 0;

  // Datos Torá
  const normalizedDom = NORMALIZE_MAP[dominantChar] || dominantChar;
  const torahData = TORAH_FIRST_WORDS[normalizedDom];

  // Sliders
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

  // 3. RETORNO CONDICIONAL (AHORA ES SEGURO)
  // Si no hay texto, no renderizamos nada, pero los hooks YA corrieron.
  if (!inputText) return null;

  return (
    <div className="analysis-panel fade-in-panel">
      {/* ... (El resto del JSX se mantiene IDÉNTICO al anterior) ... */}
      
      <div className="sliders-section">
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

      <div className="crystal-section">
        <div className="crystal-display">
            <div 
                className="crystal-core"
                style={{ 
                    backgroundColor: crystalColor,
                    boxShadow: `0 0 ${20 + (expansionLevel * 15)}px ${crystalColor}`,
                    animation: cosmos.entropyLevel > 50 ? 'pulse-core 2s infinite' : 'none',
                    transform: `scale(${1 + (expansionLevel * 0.15)})`
                }}
            />
            <div className="crystal-label">
                SPECTRAL AVG<br/>
                <span style={{ color: crystalColor, fontWeight: 'bold' }}>{crystalColor}</span>
            </div>
        </div>

        <div className="location-display">
            <span className="loc-label">LOCALIZACIÓN SOMÁTICA</span>
            <span className="loc-value">{getBodyLocation()}</span>
        </div>

        {torahData ? (
             <div className="torah-word-display" style={{ 
                 marginTop: '20px', 
                 textAlign: 'center', 
                 borderTop: '1px solid rgba(255,255,255,0.1)',
                 paddingTop: '10px',
                 width: '100%'
             }}>
                <span className="loc-label" style={{ display: 'block', marginBottom: '4px', fontSize: '0.6rem', color: '#888' }}>
                    DOMINANT VIBRATION ({normalizedDom}) x{dominantCount}
                </span>
                <div style={{ fontSize: '1.1rem', fontFamily: 'Times New Roman', fontWeight: 'bold', color: '#d4af37' }}>
                    {torahData.firstWord}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px', fontStyle: 'italic' }}>
                    {torahData.symbolicMeaning}
                </div>
            </div>
        ) : (
            <div className="torah-word-display" style={{ marginTop: '20px', opacity: 0.3, fontSize: '0.7rem', textAlign: 'center' }}>
                NO DATA FOR: {dominantChar}
            </div>
        )}
      </div>
    </div>
  );
};