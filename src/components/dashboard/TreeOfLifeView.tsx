'use client';

import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom'; // IMPORTANTE: Portal
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, getRecursiveExpansion } from '@/lib/gematriaUtils';
import { TORAH_FIRST_WORDS } from '@/lib/constants';
import '@/styles/TreeOfLife.css';

// --- CONFIGURACIÓN DE SEFIROT ---
interface SefiraDef { id: string; x: number; y: number; label: string; sub: string; color: string; hidden?: boolean; }
const SEFIROT: Record<string, SefiraDef> = {
  KETER:   { id: 'KETER',   x: 300, y: 80,  label: 'KETER',   sub: 'CROWN',         color: '#FFFFFF' },
  CHOCHMA: { id: 'CHOCHMA', x: 500, y: 220, label: 'CHOCHMA', sub: 'WISDOM',        color: '#E0E0E0' },
  BINAH:   { id: 'BINAH',   x: 100, y: 220, label: 'BINAH',   sub: 'UNDERSTANDING', color: '#CCCCCC' },
  DAAT:    { id: 'DAAT',    x: 300, y: 290, label: 'DAAT',    sub: 'KNOWLEDGE',     color: '#A8A8FF', hidden: true },
  CHESED:  { id: 'CHESED',  x: 500, y: 400, label: 'CHESED',  sub: 'MERCY',         color: '#0000FF' },
  GEVURAH: { id: 'GEVURAH', x: 100, y: 400, label: 'GEVURAH', sub: 'SEVERITY',      color: '#FF0000' },
  TIFERET: { id: 'TIFERET', x: 300, y: 550, label: 'TIFERET', sub: 'BEAUTY',        color: '#FFFF00' },
  NETZACH: { id: 'NETZACH', x: 500, y: 700, label: 'NETZACH', sub: 'VICTORY',       color: '#00FF00' },
  HOD:     { id: 'HOD',     x: 100, y: 700, label: 'HOD',     sub: 'GLORY',         color: '#FF8C00' },
  YESOD:   { id: 'YESOD',   x: 300, y: 850, label: 'YESOD',   sub: 'FOUNDATION',    color: '#8A2BE2' },
  MALCHUT: { id: 'MALCHUT', x: 300, y: 1000, label: 'MALCHUT', sub: 'KINGDOM',       color: '#CD7F32' },
};

const PATHS: Record<string, [string, string]> = {
  'א': ['KETER', 'CHOCHMA'], 'ב': ['KETER', 'BINAH'], 'ג': ['KETER', 'TIFERET'], 'ד': ['CHOCHMA', 'BINAH'],
  'ה': ['CHOCHMA', 'TIFERET'], 'ו': ['CHOCHMA', 'CHESED'], 'ז': ['BINAH', 'TIFERET'], 'ח': ['BINAH', 'GEVURAH'],
  'ט': ['CHESED', 'GEVURAH'], 'י': ['CHESED', 'TIFERET'], 'כ': ['CHESED', 'NETZACH'], 'ל': ['GEVURAH', 'TIFERET'],
  'מ': ['GEVURAH', 'HOD'], 'נ': ['TIFERET', 'NETZACH'], 'ס': ['TIFERET', 'HOD'], 'ע': ['TIFERET', 'YESOD'],
  'פ': ['NETZACH', 'HOD'], 'צ': ['NETZACH', 'YESOD'], 'ק': ['NETZACH', 'MALCHUT'], 'ר': ['HOD', 'YESOD'],
  'ש': ['HOD', 'MALCHUT'], 'ת': ['YESOD', 'MALCHUT'],
};

export const TreeOfLifeView = () => {
  const { inputText, school, expansionLevel } = useGematriaStore();
  const [hoverData, setHoverData] = useState<{ path: string | null, x: number, y: number }>({ path: null, x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Aseguramos que estamos en el cliente para usar Portals
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeText = getRecursiveExpansion(inputText || '', expansionLevel);
  const { activeLetters, pathIntensity } = useMemo(() => {
    const letters = new Set(activeText.split(''));
    const intensity: Record<string, number> = {};
    activeText.split('').forEach(char => { if(char.trim()) intensity[char] = (intensity[char] || 0) + 1; });
    return { activeLetters: letters, pathIntensity: intensity };
  }, [activeText]);

  const handleMouseMove = (e: React.MouseEvent, letter: string) => {
    // Actualizamos posición del mouse global
    setHoverData({ path: letter, x: e.clientX, y: e.clientY });
  };

  const clearHover = () => setHoverData(prev => ({ ...prev, path: null }));

  return (
    <div className="tree-wrapper fade-in-panel">
      <div className="tree-glass-panel">
        
        <svg viewBox="0 0 600 1100" preserveAspectRatio="xMidYMid meet" className="kabbalah-svg">
            <defs>
                <filter id="glow-sefira">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* SENDEROS */}
            {Object.entries(PATHS).map(([letter, [startKey, endKey]]) => {
                const start = SEFIROT[startKey]; const end = SEFIROT[endKey];
                if (!start || !end) return null;
                const isActive = activeLetters.has(letter);
                const color = getHebrewColor(letter, school);
                
                // Colores
                const stroke = isActive ? color : '#333';
                const width = isActive ? 4 : 1;
                const opacity = isActive ? 1 : 0.3;

                return (
                    <g key={letter}>
                        {/* ZONA DE DETECCIÓN (Invisible pero gruesa) */}
                        <line 
                            x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                            stroke="rgba(0,0,0,0)" // Transparente seguro
                            strokeWidth={50} // Muy grueso para facilitar hover
                            onMouseMove={(e) => isActive && handleMouseMove(e, letter)} 
                            onMouseLeave={clearHover}
                            style={{ cursor: isActive ? 'crosshair' : 'default' }} 
                        />
                        
                        {/* LÍNEA VISUAL (Estética) */}
                        {isActive && (
                            <line 
                                x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                                stroke={color} strokeWidth={8} strokeOpacity={0.2} strokeLinecap="round" 
                                className="path-pulse" 
                                style={{ pointerEvents: 'none' }} // Ignora mouse, deja pasar a la zona de detección
                            />
                        )}
                        <line 
                            x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                            stroke={stroke} strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round" 
                            style={{ pointerEvents: 'none' }}
                        />
                    </g>
                );
            })}

            {/* SEFIROT */}
            {Object.values(SEFIROT).map(sefira => (
                <g key={sefira.id} style={{ opacity: sefira.hidden ? 0.6 : 1 }}>
                    <circle cx={sefira.x} cy={sefira.y} r={sefira.hidden ? 15 : 35} fill={sefira.color} fillOpacity="0.15" filter="url(#glow-sefira)" />
                    <circle cx={sefira.x} cy={sefira.y} r={sefira.hidden ? 8 : 25} fill="#000" stroke={sefira.color} strokeWidth={sefira.hidden ? 1 : 2} />
                    {!sefira.hidden && (
                        <>
                            <text x={sefira.x} y={sefira.y + 40} className="sefirah-label-name" fill={sefira.color}>{sefira.label}</text>
                            <text x={sefira.x} y={sefira.y + 55} className="sefirah-label-sub" fill="#888">{sefira.sub}</text>
                        </>
                    )}
                </g>
            ))}
        </svg>

      </div>

      {/* PORTAL PARA TOOLTIP FLOTANTE (Renderizado en el body) */}
      {mounted && hoverData.path && TORAH_FIRST_WORDS[hoverData.path] && createPortal(
        <div 
            className="slicer-tooltip-cursor" 
            style={{ 
                // Ajuste de posición: un poco desplazado del cursor para no taparlo
                top: hoverData.y + 15, 
                left: hoverData.x + 15 
            }}
        >
            <div className="slicer-tooltip-content">
                <div className="tooltip-header">
                    <span className="t-label">PATH: {PATHS[hoverData.path].join(' - ')}</span>
                    <span className="t-label">FREQ: {pathIntensity[hoverData.path]}</span>
                </div>
                <div className="tooltip-body">
                    <span className="tooltip-char-big" style={{ color: getHebrewColor(hoverData.path, school) }}>
                        {hoverData.path}
                    </span>
                    <div className="tooltip-info">
                        <span className="t-val t-gold">{TORAH_FIRST_WORDS[hoverData.path].firstWord}</span>
                        <span className="t-sub">{TORAH_FIRST_WORDS[hoverData.path].symbolicMeaning}</span>
                    </div>
                </div>
                <div style={{ marginTop: '4px', textAlign: 'right' }}>
                        <span className="t-label">{TORAH_FIRST_WORDS[hoverData.path].bodyPart}</span>
                </div>
            </div>
        </div>,
        document.body // Destino del portal: Body (encima de todo)
      )}

    </div>
  );
};