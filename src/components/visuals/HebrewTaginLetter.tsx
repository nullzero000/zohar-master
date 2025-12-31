'use client';

import React from 'react';
import '@/styles/HebrewTaginLetter.css';

interface Props {
    char: string;
    color: string;
    showTagin: boolean;
    whiteMode: boolean;
}

// Mapeo Halájico: 3 (Sha'atnez Gatz), 1 (Bedek Chayah), 0 (Resto)
const TAGIN_MAP: Record<string, number> = {
    'ש': 3, 'ע': 3, 'ט': 3, 'נ': 3, 'ז': 3, 'ג': 3, 'צ': 3, 'ץ': 3, 'ן': 3,
    'ב': 1, 'ד': 1, 'ק': 1, 'ח': 1, 'י': 1, 'ה': 1
};

export const HebrewTaginLetter: React.FC<Props> = ({ char, color, showTagin, whiteMode }) => {
    const tagCount = TAGIN_MAP[char] || 0;

    return (
        <div className={`hebrew-structure-unit ${whiteMode ? 'mode-white' : 'mode-void'}`}>
            
            {/* CAPA DE ENERGÍA (TAGIN - PLASMA) */}
            {showTagin && tagCount > 0 && (
                <div className={`tagin-rack count-${tagCount}`}>
                    {Array.from({ length: tagCount }).map((_, i) => (
                        <div 
                            key={i} 
                            className="plasma-needle"
                            style={{ 
                                '--needle-color': color,
                                animationDelay: `${i * 0.15}s` 
                            } as React.CSSProperties}
                        >
                            {/* Núcleo denso */}
                            <div className="plasma-core" />
                            {/* Halo radiante */}
                            <div className="plasma-aura" />
                        </div>
                    ))}
                </div>
            )}

            {/* CAPA DE MATERIA (LETRA) */}
            <div 
                className="letter-glyph-main"
                style={{ 
                    color: color,
                    // En modo blanco quitamos el brillo difuso para contraste
                    textShadow: whiteMode ? 'none' : `0 0 20px ${color}`
                }}
            >
                {char}
            </div>
        </div>
    );
};