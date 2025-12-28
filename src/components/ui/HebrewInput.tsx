'use client';

import { useEffect, useRef } from 'react';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils'; // Asegúrate de tener isOntologicalBlack exportado en utils
import { KabbalahMode } from '@/lib/types';
import '@/styles/HebrewInput.css';

// AXIOMA: Tipos para el modo de manifestación
export type ManifestationBg = 'COSMOS' | 'BLACK_HOLE' | 'NEBULA' | 'VOID';

interface HebrewInputProps {
  value: string;
  school: KabbalahMode;
  onDelete: () => void;
  mode?: 'ORIGIN' | 'MANIFESTATION';
  manifestBg?: ManifestationBg | string;
}

export const HebrewInput = ({ 
  value, 
  school, 
  onDelete, 
  mode = 'ORIGIN', 
  manifestBg 
}: HebrewInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isManifesting = mode === 'MANIFESTATION';

  // Auto-scroll (RTL)
  useEffect(() => {
    if (containerRef.current && !isManifesting) {
      containerRef.current.scrollLeft = -containerRef.current.scrollWidth;
    }
  }, [value, isManifesting]);

  return (
    <div className={`input-wrapper ${isManifesting ? 'manifest-mode' : 'origin-mode'}`}>
      
      {/* CAPA DE LUZ DIVINA (Solo en modo origen o sin fondo específico) */}
      {!manifestBg && (
        <>
            <div className="ein-sof-layer" />
            <div className="rays-layer" />
        </>
      )}

      {/* DISPLAY */}
      <div className="hebrew-display-container" ref={containerRef}>
        {value.length === 0 ? (
            <div className="empty-state-breathing">ESPERANDO SECUENCIA...</div>
        ) : (
            <div className="letters-flex-container">
                {value.split('').map((char, index) => {
                  // 1. Obtener Color Ontológico
                  const rawColor = getHebrewColor(char, school);
                  
                  // 2. Detección de "Fuego Negro" (Ortodoxia Gra/Ari)
                  // Usamos el helper o la lógica inline si el helper no existiera aún
                  const isBlack = isOntologicalBlack ? isOntologicalBlack(rawColor) : (rawColor === '#000000' || rawColor === 'rgb(0,0,0)');

                  // 3. Definir Estilos Dinámicos
                  let textShadowStyle = '';
                  let transformStyle = '';
                  let finalColor = rawColor;

                  // Lógica de Halo para letras negras (Or Makif)
                  if (isBlack) {
                      // El color se mantiene negro absoluto (Kelim), el shadow es luz blanca (Emanación)
                      textShadowStyle = `0 0 4px rgba(255, 255, 255, 0.6), 0 0 12px rgba(255, 255, 255, 0.3)`;
                  } else {
                      // Glow normal del color de la letra
                      textShadowStyle = `0 0 15px ${rawColor}, 0 0 25px ${rawColor}60`;
                  }

                  // MODO MANIFESTACIÓN (Overrides de ambiente)
                  if (isManifesting && manifestBg) {
                      const glowBase = isBlack ? 'white' : rawColor;
                      switch (manifestBg) {
                          case 'BLACK_HOLE':
                              // En agujero negro, la luz se curva y estira
                              textShadowStyle = `0 0 20px ${glowBase}, 0 0 50px rgba(255, 69, 0, 0.6)`;
                              const curve = (index - value.length / 2) * 6;
                              transformStyle = `translateY(${Math.abs(curve)}px) rotate(${curve}deg)`;
                              break;
                          case 'COSMOS':
                          default:
                              textShadowStyle = isBlack 
                                ? `0 0 40px white, 0 0 80px rgba(255,255,255,0.5)`
                                : `0 0 40px ${glowBase}, 0 0 80px white`;
                              break;
                      }
                  } 

                  return (
                    <span 
                        key={`${char}-${index}`} 
                        className={`hebrew-char ${isManifesting ? 'manifesting' : ''}`}
                        style={{ 
                            color: finalColor,
                            textShadow: textShadowStyle,
                            transform: transformStyle,
                            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {char}
                    </span>
                  );
                })}
            </div>
        )}
      </div>

      {/* BOTÓN BORRAR */}
      {value.length > 0 && !isManifesting && (
        <button 
            className="delete-btn-premium" 
            onClick={onDelete}
            aria-label="Borrar última letra"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
      )}
    </div>
  );
};