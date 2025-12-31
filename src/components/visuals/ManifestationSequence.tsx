'use client';

import { useState, useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';
import '@/styles/ManifestationSequence.css';
import { InterferenceField } from '@/components/visuals/InterferenceField';
import { SacredGeometry } from '@/components/visuals/SacredGeometry';

interface Props {
    onComplete: () => void;
}

type VortexType = 'DENSE' | 'SMOOTH';
type CymaticShape = 'FULL' | 'CIRCLE' | 'HEXAGON' | 'DIAMOND' | 'FLOWER';

// Lógica simple de Tagin (Solo conteo)
const TAGIN_3 = new Set(['ש', 'ע', 'ט', 'נ', 'ז', 'ג', 'צ', 'ץ', 'ן']);
const TAGIN_1 = new Set(['ב', 'ד', 'ק', 'ח', 'י', 'ה']);

export const ManifestationSequence = ({ onComplete }: Props) => {
    const { inputText, school } = useGematriaStore();
    const chars = inputText.split('');

    // Estados originales
    const [showDivine, setShowDivine] = useState(false);
    const [showVortex, setShowVortex] = useState(false);
    const [showResonance, setShowResonance] = useState(false);
    const [showSacred, setShowSacred] = useState(false);
    
    // Nuevos estados solicitados
    const [activeTagin, setActiveTagin] = useState(false);
    const [whiteMode, setWhiteMode] = useState(false);

    const [vortexType, setVortexType] = useState<VortexType>('DENSE');
    const [cymaticShape, setCymaticShape] = useState<CymaticShape>('FULL');

    const { vortexBg, paletteStr } = useMemo(() => {
        if (chars.length === 0) return { vortexBg: '#000', paletteStr: '#fff, #000' };
        const allColors = chars.map(c => getHebrewColor(c, school));
        const bg = allColors[0].replace('rgb', 'rgba').replace(')', ', 0.5)');
        let repeatedColors: string[] = [];
        for (let i = 0; i < 5; i++) repeatedColors = [...repeatedColors, ...allColors];
        repeatedColors.push(allColors[0]);
        return { vortexBg: bg, paletteStr: repeatedColors.join(', ') };
    }, [chars, school]);

    const toggleShape = () => {
        const shapes: CymaticShape[] = ['FULL', 'CIRCLE', 'HEXAGON', 'DIAMOND', 'FLOWER'];
        const nextIndex = (shapes.indexOf(cymaticShape) + 1) % shapes.length;
        setCymaticShape(shapes[nextIndex]);
    };

    if (!chars.length) return null;

    return (
        <div className={`manifestation-sequence-container ${whiteMode ? 'mode-white' : ''}`}>
            
            {/* CAPA 1: LUZ DIVINA */}
            {!whiteMode && (
                <div className="divine-source-wrapper" style={{ opacity: showDivine ? 1 : 0 }}>
                    <div className="source-rays" />
                    <div className="source-core" />
                </div>
            )}

            {/* CAPA 2: VÓRTICE */}
            <div className="vortex-container" style={{ 
                opacity: showVortex ? 0.7 : 0,
                '--vortex-bg': vortexBg,
                '--vortex-palette': paletteStr
            } as React.CSSProperties}>
                <div className="vortex-background" />
                <div className={`vortex-shape-mask shape-${cymaticShape.toLowerCase()}`}>
                    <div className={`vortex-flow-dual ${vortexType.toLowerCase()}`} />
                </div>
            </div>

            {/* CAPA 3: RESONANCIA */}
            {showResonance && <InterferenceField />}

            {/* CAPA 4: GEOMETRÍA */}
            {showSacred && <SacredGeometry />}

            {/* PARTÍCULAS */}
            <div className="source-particles" style={{ opacity: showDivine ? 0.4 : 0, filter: whiteMode ? 'invert(1)' : 'none' }} />

            {/* LETRAS */}
            <div className="seq-word-container">
                {chars.map((char, index) => {
                    const color = getHebrewColor(char, school);
                    const isBlack = isOntologicalBlack(color);
                    const glowColor = isBlack ? 'rgba(255, 255, 255, 0.7)' : color;
                    
                    const tagCount = TAGIN_3.has(char) ? 3 : (TAGIN_1.has(char) ? 1 : 0);

                    return (
                        <div key={index} style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/* TAGIN SIMPLE (Sin plasma feo, solo indicadores de luz) */}
                            {activeTagin && tagCount > 0 && (
                                <div className="tagin-simple-container">
                                    {[...Array(tagCount)].map((_, i) => (
                                        <div key={i} className="simple-tag" style={{backgroundColor: color, boxShadow: `0 0 5px ${color}`}}/>
                                    ))}
                                </div>
                            )}
                            
                            <span className="seq-char" style={{ 
                                '--char-color': color,
                                '--char-glow': glowColor,
                                '--delay': `${index * 0.3}s`
                            } as React.CSSProperties}>
                                {char}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* CONTROLES (Manteniendo tu estructura original) */}
            <div className="seq-controls-auto-hide">
                <div className="seq-controls">
                    <button onClick={onComplete} className="btn-action-divine">
                        INICIAR ANÁLISIS
                    </button>

                    <div className="mode-toggles">
                        <button onClick={() => setWhiteMode(!whiteMode)} className={`btn-toggle-mode btn-void ${whiteMode ? 'active' : ''}`}>
                            {whiteMode ? '◉ LIENZO: BLANCO' : '○ LIENZO: VACÍO'}
                        </button>

                        <button onClick={() => setActiveTagin(!activeTagin)} className={`btn-toggle-mode btn-tagin ${activeTagin ? 'active' : ''}`}>
                            {activeTagin ? '♛ TAGIN' : '♕ TAGIN'}
                        </button>

                        <div style={{width: 1, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 5px'}} />

                        <button onClick={() => setShowDivine(!showDivine)} className={`btn-toggle-mode ${showDivine ? 'active' : ''}`}>
                            {showDivine ? '✦ LUZ' : '✧ LUZ'}
                        </button>
                        <button onClick={() => setShowVortex(!showVortex)} className={`btn-toggle-mode ${showVortex ? 'active' : ''}`}>
                            ◎ VÓRTICE
                        </button>
                        <button onClick={() => setShowResonance(!showResonance)} className={`btn-toggle-mode ${showResonance ? 'active' : ''}`}>
                            ֎ RESONANCIA
                        </button>
                        <button onClick={() => setShowSacred(!showSacred)} className={`btn-toggle-mode ${showSacred ? 'active' : ''}`}>
                            ⌬ GEOMETRÍA
                        </button>

                        {showVortex && (
                            <div className="vortex-sub-controls">
                                <button onClick={() => setVortexType(vortexType === 'DENSE' ? 'SMOOTH' : 'DENSE')} className="btn-toggle-mode active">
                                    {vortexType === 'DENSE' ? '↔ DENSO' : '↔ FLUIDO'}
                                </button>
                                <button onClick={toggleShape} className="btn-toggle-mode active">
                                    ⬡ {cymaticShape}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};