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

export const ManifestationSequence = ({ onComplete }: Props) => {
    const { inputText, school } = useGematriaStore();
    const chars = inputText.split('');

    // ESTADOS INDEPENDIENTES: Permiten activar varias capas a la vez
    const [showDivine, setShowDivine] = useState(false);
    const [showVortex, setShowVortex] = useState(false);
    const [showResonance, setShowResonance] = useState(false);
    const [showSacred, setShowSacred] = useState(false);

    const [vortexType, setVortexType] = useState<VortexType>('DENSE');
    const [cymaticShape, setCymaticShape] = useState<CymaticShape>('FULL');

    const { vortexBg, paletteStr } = useMemo(() => {
        if (chars.length === 0) return { vortexBg: '#000', paletteStr: '#fff, #000' };
        const allColors = chars.map(c => getHebrewColor(c, school));
        const counts: Record<string, number> = {};
        let maxCount = 0;
        let dominant = allColors[0];
        for (const c of allColors) {
            counts[c] = (counts[c] || 0) + 1;
            if (counts[c] > maxCount) { maxCount = counts[c]; dominant = c; }
        }
        const bg = dominant.replace('rgb', 'rgba').replace(')', ', 0.5)');
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
        <div className="manifestation-sequence-container">
            
            {/* CAPA 1: LUZ DIVINA (Fondo Profundo) */}
            <div className="divine-source-wrapper" style={{ opacity: showDivine ? 1 : 0 }}>
                <div className="source-rays" />
                <div className="source-core" />
            </div>

            {/* CAPA 2: VÓRTICE (Estructura de Color) */}
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

            {/* CAPA 3: RESONANCIA (Ondas) */}
            {showResonance && <InterferenceField />}

            {/* CAPA 4: GEOMETRÍA SAGRADA (Malla Superior) */}
            {showSacred && <SacredGeometry />}

            {/* PARTÍCULAS SUTILES */}
            <div className="source-particles" style={{ opacity: showDivine ? 0.4 : 0 }} />

            {/* LETRAS (Siempre al frente) */}
            <div className="seq-word-container">
                {chars.map((char, index) => {
                    const color = getHebrewColor(char, school);
                    const isBlack = isOntologicalBlack(color);
                    const glowColor = isBlack ? 'rgba(255, 255, 255, 0.7)' : color;
                    return (
                        <span key={index} className="seq-char" style={{ 
                            '--char-color': color,
                            '--char-glow': glowColor,
                            '--delay': `${index * 0.3}s`
                        } as React.CSSProperties}>
                            {char}
                        </span>
                    );
                })}
            </div>

            {/* CONTROLES CON AUTO-HIDE */}
            <div className="seq-controls-auto-hide">
                <div className="seq-controls">
                    <button onClick={onComplete} className="btn-action-divine">
                        INICIAR ANÁLISIS
                    </button>

                    <div className="mode-toggles">
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