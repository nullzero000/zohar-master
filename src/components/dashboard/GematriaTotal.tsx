'use client';

import { useEffect, useState } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getSemanticsFromRGB } from '@/utils/spectralEngine'; // Asegúrate de tener esta util o usa un fallback
import '@/styles/GematriaTotal.css'; // Usa el CSS que subiste (asegúrate de moverlo a src/styles)

export const GematriaTotal = () => {
  const { total, reduced, analysis } = useGematriaStore();
  
  // Fallback seguro si no hay análisis aún
  const mixedColor = analysis?.mixedColor || 'rgb(212, 175, 55)';
  const [semanticColor, setSemanticColor] = useState('Vibración Latente');
  
  // Extraer valores RGB para CSS dinámico
  const rgbValues = mixedColor.match(/\d+/g);
  const colorBase = rgbValues ? rgbValues.join(',') : '212, 175, 55';

  useEffect(() => {
    if (rgbValues && rgbValues.length === 3) {
        // Si no tienes spectralEngine, puedes comentar esto o crear la función
        // const name = getSemanticsFromRGB(parseInt(rgbValues[0]), parseInt(rgbValues[1]), parseInt(rgbValues[2]));
        // setSemanticColor(name);
        setSemanticColor("Resonancia Activa"); // Placeholder temporal
    }
  }, [mixedColor]);

  if (total === 0) return null;

  return (
    <div className="core-wrapper">
      <style>{`
        @keyframes deepBreathe {
            0% { 
                box-shadow: inset 0 0 20px rgba(${colorBase}, 0.2), 0 0 40px rgba(${colorBase}, 0.3);
                transform: scale(1); border-color: rgba(255,255,255,0.1);
            }
            50% { 
                box-shadow: inset 0 0 50px rgba(${colorBase}, 0.4), 0 0 80px rgba(${colorBase}, 0.5), 0 0 150px rgba(${colorBase}, 0.3);
                transform: scale(1.03); border-color: rgba(${colorBase}, 0.5);
            }
            100% { 
                box-shadow: inset 0 0 20px rgba(${colorBase}, 0.2), 0 0 40px rgba(${colorBase}, 0.3);
                transform: scale(1); border-color: rgba(255,255,255,0.1);
            }
        }
        .living-orb { animation: deepBreathe 6s infinite ease-in-out; }
        .orb-value, .essence-value { text-shadow: 0 0 30px rgba(${colorBase}, 0.8); }
        .connection-line { background: linear-gradient(to bottom, rgba(${colorBase}, 0), rgba(${colorBase}, 1), rgba(${colorBase}, 0)); }
      `}</style>

      {/* 1. NÚCLEO */}
      <div className="living-orb">
          <span className="orb-value">{total}</span>
          <span className="orb-label">GEMATRÍA</span>
      </div>

      {/* 2. CONEXIÓN */}
      <div className="connection-line" />

      {/* 3. REDUCCIÓN */}
      <div className="essence-value" style={{ color: mixedColor }}>
          {reduced}
      </div>

      {/* 4. IDENTIDAD */}
      <div className="semantic-block">
          <span className="semantic-label">FRECUENCIA DOMINANTE</span>
          <span className="semantic-value" style={{ color: mixedColor }}>
            {semanticColor}
          </span>
      </div>
    </div>
  );
};