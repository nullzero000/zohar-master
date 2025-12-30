'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack, getHebrewValue } from '@/lib/gematriaUtils';
import '@/styles/HebrewInput.css';

interface Props {
    value: string;
    school: any;
    onDelete: () => void;
    mode: 'ORIGIN' | 'MANIFESTATION';
}

export const HebrewInput = ({ value, school, onDelete }: Props) => {
    
    return (
        <div className="input-wrapper">
            
            <div className="input-display">
                
                {/* 1. LAS LETRAS (Se renderizan primero, o sea a la derecha visual) */}
                {value.split('').map((char, idx) => {
                    const color = getHebrewColor(char, school);
                    const isBlack = isOntologicalBlack(color);
                    const gematriaVal = getHebrewValue(char, false);

                    const styleVars = {
                        '--char-color': color,
                        '--char-glow': isBlack 
                            ? 'rgba(255, 255, 255, 0.6)' 
                            : color.replace('rgb', 'rgba').replace(')', ', 0.5)')
                    } as React.CSSProperties;

                    return (
                        <div key={idx} className="input-char-unit" style={styleVars}>
                            <span className="char-glyph-main">{char}</span>
                            <span className="char-value-sub">{gematriaVal}</span>
                        </div>
                    );
                })}

                {/* 2. EL CURSOR (Al final del array = Izquierda visual en RTL) */}
                <div className="input-cursor" />

            </div>

            <button 
                onClick={onDelete} 
                className="delete-btn"
                aria-label="Borrar letra"
            >
                ⌫
            </button>
        </div>
    );
};