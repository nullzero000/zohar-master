'use client';

import React, { useCallback } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';
import { KEYBOARD_LAYOUT, LETTER_HIERARCHY } from '@/lib/constants';
import '@/styles/HebrewKeyboard.css';

export const HebrewKeyboard = () => {
  const { school, inputText, setInputText } = useGematriaStore();

  const handleCharClick = useCallback((char: string) => {
    setInputText(inputText + char);
  }, [inputText, setInputText]);

  return (
    <div className="keyboard-engine" dir="rtl">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="engine-row">
          {row.split('').map((char) => {
            // 1. Datos Ontológicos
            const rawColor = getHebrewColor(char, school);
            const hierarchy = LETTER_HIERARCHY[char] || 'SIMPLE';
            
            // 2. Lógica de Tinta Negra (Visibilidad en botón oscuro)
            const isBlack = isOntologicalBlack ? isOntologicalBlack(rawColor) : (rawColor === '#000000');
            
            // Si es negra, el "glow" decorativo del botón debe ser blanco para que se vea
            const glowColor = isBlack ? 'rgba(255, 255, 255, 0.6)' : rawColor;
            
            // La letra en sí es negra, pero necesita un text-shadow sutil para separarse del fondo
            const textShadow = isBlack ? '0 0 4px rgba(255,255,255,0.5)' : `0 0 8px ${glowColor}`;

            return (
              <button
                key={`key-${char}`}
                className={`key-node type-${hierarchy.toLowerCase()}`}
                onClick={() => handleCharClick(char)}
                style={{
                  '--letter-color': rawColor,
                  '--glow-color': glowColor,
                  color: rawColor,
                  textShadow: textShadow
                } as React.CSSProperties}
                aria-label={`Insertar letra ${char} (${hierarchy})`}
              >
                <span className="char-glyph">{char}</span>
                
                {/* ORNAMENTOS JERÁRQUICOS (Madres tienen órbita, Dobles tienen tensión) */}
                {hierarchy === 'MOTHER' && <div className="orbit-mother" />}
                {hierarchy === 'DOUBLE' && <div className="tension-line" />}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};