'use client';

import { useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor } from '@/lib/gematriaUtils';

export const InterferenceField = () => {
    const { inputText, school } = useGematriaStore();
    const chars = useMemo(() => inputText.split('').slice(0, 7), [inputText]);

    const emitters = useMemo(() => {
        return chars.map((char, index) => {
            const angle = (index * (360 / chars.length) * Math.PI) / 180;
            const radius = 30; // Distancia desde el centro
            return {
                char,
                cx: 50 + radius * Math.cos(angle),
                cy: 50 + radius * Math.sin(angle),
                color: getHebrewColor(char, school),
            };
        });
    }, [chars, school]);

    return (
        <div className="interference-layer">
            <svg viewBox="0 0 100 100" className="interference-svg">
                <defs>
                    <filter id="wave-glow">
                        <feGaussianBlur stdDeviation="0.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {emitters.map((emitter, eIdx) => (
                    <g key={eIdx} style={{ color: emitter.color }}>
                        {[...Array(6)].map((_, cIdx) => (
                            <circle
                                key={cIdx}
                                cx={emitter.cx}
                                cy={emitter.cy}
                                r={0}
                                className="interference-wave"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="0.15"
                                style={{
                                    animationDelay: `${(eIdx * 0.2) + (cIdx * 0.8)}s`
                                } as React.CSSProperties}
                            />
                        ))}
                        <text x={emitter.cx} y={emitter.cy} className="emitter-text" fill="currentColor">
                            {emitter.char}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};