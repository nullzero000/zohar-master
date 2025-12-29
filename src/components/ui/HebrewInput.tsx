'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';

interface Props {
    value: string;
    school: any;
    onDelete: () => void;
    mode: 'ORIGIN' | 'MANIFESTATION';
    manifestBg?: 'COSMOS' | 'BLACK_HOLE';
}

export const HebrewInput = ({ value, school, onDelete, mode }: Props) => {
    
    return (
        <div style={{
            position: 'relative', width: '100%', maxWidth: '600px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '80px', margin: '10px 0'
        }}>
            {/* DISPLAY DE LETRAS */}
            <div style={{
                display: 'flex', flexDirection: 'row-reverse', // Hebreo RTL
                gap: '4px', flexWrap: 'wrap', justifyContent: 'center',
                width: '100%'
            }}>
                {value.split('').map((char, idx) => {
                    const color = getHebrewColor(char, school);
                    const isBlack = isOntologicalBlack(color);

                    return (
                        <span key={idx} style={{
                            color: color,
                            fontSize: '2.5rem',
                            fontFamily: 'Times New Roman, serif',
                            fontWeight: 'bold',
                            lineHeight: 1,
                            
                            // LA CORRECCIÓN VISUAL:
                            // Si la letra es negra, le damos un contorno de luz.
                            textShadow: isBlack 
                                ? '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.5)' 
                                : `0 0 15px ${color}, 0 0 30px ${color}`,
                                
                            transition: 'all 0.3s ease',
                            animation: 'pulseLetter 2s infinite ease-in-out'
                        }}>
                            {char}
                        </span>
                    );
                })}
                
                {/* Cursor parpadeante */}
                <span style={{
                    width: '2px', height: '40px', background: '#d4af37',
                    animation: 'blink 1s infinite', alignSelf: 'center',
                    marginLeft: '5px', opacity: 0.7
                }} />
            </div>

            {/* Botón Borrar (Backspace) */}
            <button 
                onClick={onDelete}
                style={{
                    position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)',
                    fontSize: '1.5rem', cursor: 'pointer', padding: '10px'
                }}
            >
                ⌫
            </button>

            <style jsx>{`
                @keyframes blink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
                @keyframes pulseLetter { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.3); } }
            `}</style>
        </div>
    );
};