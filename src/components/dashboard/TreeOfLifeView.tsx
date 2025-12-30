'use client';

import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, getRecursiveExpansion } from '@/lib/gematriaUtils';
import { TORAH_FIRST_WORDS } from '@/lib/constants';
import '@/styles/TreeOfLife.css';

// --- CONSTANTES DE DEFINICIÓN DEL ÁRBOL ---
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

// --- LÓGICA DE POSICIONAMIENTO ROBUSTA (4 LÍMITES) ---
const getTooltipStyle = (x: number, y: number) => {
    // SSR Check
    if (typeof window === 'undefined') return { top: y, left: x };

    // Dimensiones y Márgenes
    const TOOLTIP_W = 320; 
    const TOOLTIP_H = 180; 
    const CURSOR_GAP = 20;
    const SAFETY_MARGIN = 15; // Mínima distancia con el borde de pantalla

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // --- EJE X (Horizontal) ---
    // 1. Intentar derecha
    let left = x + CURSOR_GAP;

    // 2. Si se desborda por la derecha -> Probar izquierda
    if (left + TOOLTIP_W > winW - SAFETY_MARGIN) {
        left = x - TOOLTIP_W - CURSOR_GAP;
    }

    // 3. Si AHORA se desborda por la izquierda (negativo) -> Forzar al margen izquierdo
    if (left < SAFETY_MARGIN) {
        left = SAFETY_MARGIN;
    }

    // --- EJE Y (Vertical) ---
    // 1. Intentar abajo
    let top = y + CURSOR_GAP;

    // 2. Si se desborda por abajo -> Probar arriba
    if (top + TOOLTIP_H > winH - SAFETY_MARGIN) {
        top = y - TOOLTIP_H - CURSOR_GAP;
    }

    // 3. Si AHORA se desborda por arriba -> Forzar al margen superior
    if (top < SAFETY_MARGIN) {
        top = SAFETY_MARGIN;
    }

    return { top, left };
};

export const TreeOfLifeView = () => {
  const { inputText, school, expansionLevel } = useGematriaStore();
  const [hoverData, setHoverData] = useState<{ path: string | null, x: number, y: number }>({ path: null, x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const activeText = getRecursiveExpansion(inputText || '', expansionLevel);
  const { activeLetters, pathIntensity } = useMemo(() => {
    const letters = new Set(activeText.split(''));
    const intensity: Record<string, number> = {};
    activeText.split('').forEach(char => { if(char.trim()) intensity[char] = (intensity[char] || 0) + 1; });
    return { activeLetters: letters, pathIntensity: intensity };
  }, [activeText]);

  const handleMouseMove = (e: React.MouseEvent, letter: string) => {
    setHoverData({ path: letter, x: e.clientX, y: e.clientY });
  };
  const clearHover = () => setHoverData(prev => ({ ...prev, path: null }));
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <div className={`tree-wrapper fade-in-panel ${isFullScreen ? 'fullscreen' : ''}`}>
      
      {/* Botones de Control */}
      {isFullScreen ? (
        <button className="tree-control-btn close-btn" onClick={toggleFullScreen}>✕ REGRESAR</button>
      ) : (
        <button className="tree-control-btn expand-btn" onClick={toggleFullScreen} title="Pantalla Completa">⤢</button>
      )}

      <div className="tree-glass-panel">
        <svg viewBox="0 0 600 1100" preserveAspectRatio="xMidYMid meet" className="kabbalah-svg">
            <defs>
                <filter id="glow-sefira">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {Object.entries(PATHS).map(([letter, [startKey, endKey]]) => {
                const start = SEFIROT[startKey]; const end = SEFIROT[endKey];
                if (!start || !end) return null;
                const isActive = activeLetters.has(letter);
                const color = getHebrewColor(letter, school);
                const stroke = isActive ? color : '#444'; 
                const width = isActive ? 6 : 2; 
                const opacity = isActive ? 1 : 0.6;

                return (
                    <g key={letter}>
                        {/* Zona Hover Invisible y Grande */}
                        <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                            stroke="rgba(0,0,0,0)" strokeWidth={60} 
                            onMouseMove={(e) => isActive && handleMouseMove(e, letter)} 
                            onMouseLeave={clearHover}
                            style={{ cursor: isActive ? 'crosshair' : 'default' }} 
                        />
                        {/* Glow Activo */}
                        {isActive && (
                            <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                                stroke={color} strokeWidth={12} strokeOpacity={0.3} strokeLinecap="round" 
                                className="path-pulse" style={{ pointerEvents: 'none' }} 
                            />
                        )}
                        {/* Línea Base */}
                        <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                            stroke={stroke} strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round" 
                            style={{ pointerEvents: 'none' }}
                        />
                    </g>
                );
            })}

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

      {mounted && hoverData.path && TORAH_FIRST_WORDS[hoverData.path] && createPortal(
        (() => {
            const pos = getTooltipStyle(hoverData.x, hoverData.y);
            return (
                <div className="slicer-tooltip-cursor" style={{ top: pos.top, left: pos.left }}>
                    <div className="slicer-tooltip-content">
                        <div className="tooltip-header">
                            <span className="t-label">PATH: {PATHS[hoverData.path].join(' - ')}</span>
                            <span className="t-label">FREQ: {pathIntensity[hoverData.path]}</span>
                        </div>
                        <div className="tooltip-body">
                            <span className="tooltip-char-big" style={{ color: getHebrewColor(hoverData.path, school) }}>{hoverData.path}</span>
                            <div className="tooltip-info">
                                <span className="t-val t-gold">{TORAH_FIRST_WORDS[hoverData.path].firstWord}</span>
                                <span className="t-sub">{TORAH_FIRST_WORDS[hoverData.path].symbolicMeaning}</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '4px', textAlign: 'right' }}><span className="t-label">{TORAH_FIRST_WORDS[hoverData.path].bodyPart}</span></div>
                    </div>
                </div>
            );
        })(), 
        document.body
      )}
    </div>
  );
};