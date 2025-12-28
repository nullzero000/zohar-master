'use client';

import { useState, useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { PATHS_OF_WISDOM, HEBREW_DATA, type WisdomEdge } from '@/lib/constants';
import { getHebrewColor } from '@/utils/logicHelper';
import '@/styles/TreeOfLife.css';

// COORDENADAS FIJAS (Layout Árbol Sephirotico)
const SEFIROT_COORDS: Record<number | string, { x: number; y: number; name: string; label: string }> = {
    1: { x: 300, y: 50, name: 'KETER', label: 'Corona' },
    2: { x: 500, y: 150, name: 'CHOCHMAH', label: 'Sabiduría' },
    3: { x: 100, y: 150, name: 'BINAH', label: 'Entendimiento' },
    'DAAT': { x: 300, y: 200, name: 'DAAT', label: 'Conocimiento' },
    4: { x: 500, y: 300, name: 'CHESED', label: 'Misericordia' },
    5: { x: 100, y: 300, name: 'GEVURAH', label: 'Juicio' },
    6: { x: 300, y: 400, name: 'TIFERET', label: 'Belleza' },
    7: { x: 500, y: 500, name: 'NETZACH', label: 'Victoria' },
    8: { x: 100, y: 500, name: 'HOD', label: 'Esplendor' },
    9: { x: 300, y: 600, name: 'YESOD', label: 'Fundamento' },
    10: { x: 300, y: 750, name: 'MALCHUT', label: 'Reino' }
};

export const TreeOfLifeView = () => {
  const { inputText, school, analysis } = useGematriaStore();
  const [hoveredPath, setHoveredPath] = useState<any | null>(null);

  // Procesar Senderos Activos
  const processedPaths = useMemo(() => {
    // --- CORRECCIÓN DE SEGURIDAD ---
    // Si PATHS_OF_WISDOM o .paths_of_wisdom no existen, usamos array vacío.
    const rawData = PATHS_OF_WISDOM?.paths_of_wisdom || [];
    
    // Filtramos con seguridad
    const allEdges = rawData.filter((p: any) => p.type === 'edge') as WisdomEdge[];
    
    const freqMap = analysis?.frequencyMap || {};
    const maxFreq = analysis ? Math.max(...Object.values(analysis.frequencyMap).map(Number)) : 1;

    return allEdges.map(edge => {
        const char = edge.hebrew_char;
        const count = freqMap[char] || 0;
        const isActive = count > 0;
        
        // Intensidad basada en frecuencia relativa
        const intensity = isActive ? (count / maxFreq) : 0;
        const width = isActive ? 2 + (intensity * 4) : 1;
        const opacity = isActive ? 0.4 + (intensity * 0.6) : 0.1;

        const baseColor = getHebrewColor(char, school);
        const displayColor = baseColor.includes('0, 0, 0') ? '#888' : baseColor;

        return {
            ...edge,
            isActive,
            width,
            opacity,
            color: displayColor,
            count,
            start: SEFIROT_COORDS[edge.source_node_id],
            end: SEFIROT_COORDS[edge.target_node_id],
            meaning: HEBREW_DATA[char]?.name || char
        };
    });
  }, [analysis, school]);

  return (
    <div className="tree-wrapper">
      
      {/* CAPA DE VIDRIO */}
      <div className="tree-glass-panel">
        <div className="svg-responsive-container">
            <svg className="kabbalah-svg" viewBox="0 0 600 850" preserveAspectRatio="xMidYMid meet">
                
                <defs>
                    <filter id="glow-intense">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* SENDEROS */}
                {processedPaths.map((path) => {
                    if (!path.start || !path.end) return null;

                    return (
                        <g key={path.id} 
                            onMouseEnter={() => setHoveredPath(path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{ cursor: 'pointer', pointerEvents: 'all' }}
                        >
                            {/* Hitbox invisible grande */}
                            <line
                                x1={path.start.x} y1={path.start.y}
                                x2={path.end.x} y2={path.end.y}
                                stroke="transparent" strokeWidth="40"
                            />
                            
                            {/* Línea Visible */}
                            <line
                                x1={path.start.x} y1={path.start.y}
                                x2={path.end.x} y2={path.end.y}
                                stroke={path.isActive ? path.color : 'rgba(255,255,255,0.05)'}
                                strokeWidth={path.width}
                                strokeOpacity={path.opacity}
                                strokeLinecap="round"
                                filter={path.isActive ? "url(#glow-intense)" : undefined}
                                className="path-line-anim"
                            />
                        </g>
                    );
                })}

                {/* SEFIROT (Nodos) */}
                {Object.entries(SEFIROT_COORDS).map(([id, coords]) => (
                    <g key={id}>
                        <circle cx={coords.x} cy={coords.y} r={25} fill="#050505" />
                        <circle cx={coords.x} cy={coords.y} r={25} 
                                fill="transparent" 
                                stroke="rgba(255,255,255,0.2)" strokeWidth={1} 
                        />
                        <text x={coords.x} y={coords.y} className="sefirah-label-name" fill="#fff" fontSize="10" dy=".3em">
                            {coords.name.substring(0, 3)}
                        </text>
                    </g>
                ))}

            </svg>
        </div>
      </div>

      {/* TOOLTIP SLICER (Flotante) */}
      <div className={`slicer-tooltip-container ${hoveredPath ? 'active' : ''}`}>
         {hoveredPath && (
             <div className="slicer-tooltip-content">
                 <div className="tooltip-section left">
                     <span className="tooltip-label">SENDERO</span>
                     <span className="tooltip-value highlight">{hoveredPath.id}</span>
                 </div>
                 
                 <div className="tooltip-section center">
                     <div className="tooltip-route">
                        {hoveredPath.start.name} <span>➔</span> {hoveredPath.end.name}
                     </div>
                     <div className="tooltip-meaning">{hoveredPath.meaning}</div>
                 </div>

                 <div className="tooltip-section right">
                     <span className="tooltip-char" style={{ color: hoveredPath.color }}>
                        {hoveredPath.hebrew_char}
                     </span>
                     <span className="tooltip-intensity">
                        FREQ: {hoveredPath.count}
                     </span>
                 </div>
             </div>
         )}
      </div>

    </div>
  );
};