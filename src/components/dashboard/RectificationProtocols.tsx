'use client';

import { useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { useCosmicEngine } from '@/hooks/useCosmicEngine';
import { getRecursiveExpansion, getHebrewColor } from '@/lib/gematriaUtils';
import { NORMALIZE_MAP } from '@/lib/constants';
import { PROTOCOLS_DB } from '@/data/rectificationData';
import '@/styles/RectificationProtocols.css';

export const RectificationProtocols = () => {
  const { inputText, expansionLevel, school } = useGematriaStore();
  const activeText = getRecursiveExpansion(inputText || '', expansionLevel);
  const cosmos = useCosmicEngine(activeText);

  // 1. Detección de Letra Dominante (Frecuencia de Análisis)
  const dominantChar = useMemo(() => {
    if (!activeText) return 'א';
    const counts: Record<string, number> = {};
    let max = 0;
    let dom = activeText[0];
    activeText.split('').forEach(c => {
      const norm = NORMALIZE_MAP[c] || c;
      if (c.trim()) {
        counts[norm] = (counts[norm] || 0) + 1;
        if (counts[norm] > max) { max = counts[norm]; dom = norm; }
      }
    });
    return dom;
  }, [activeText]);

  const data = PROTOCOLS_DB[dominantChar] || PROTOCOLS_DB['א'];
  const domColor = getHebrewColor(dominantChar, school);

  if (!inputText) return <div className="proto-waiting">AWAITING FREQUENCY...</div>;

  return (
    <div className="proto-operative-container custom-scrollbar">
      
      {/* 1. MÓDULO COSMO-BIOLÓGICO (SEFER YETZIRAH) */}
      <section className="proto-module" style={{ borderColor: domColor }}>
        <div className="module-label">COSMO-BIOLOGY // SY</div>
        <div className="proto-header-main">
          <span className="proto-glyph" style={{ color: domColor }}>{dominantChar}</span>
          <div className="proto-meta">
            <div className="meta-line"><span>MONTH:</span> <strong>{data.month}</strong></div>
            <div className="meta-line"><span>SIGN:</span> <strong>{data.zodiac}</strong></div>
            <div className="meta-line"><span>ORGAN:</span> <strong>{data.organ}</strong></div>
          </div>
        </div>
        <div className="proto-faculty">
          FACULTY OF <span>{data.faculty.toUpperCase()}</span>: Rectificar el uso de esta función biológica.
        </div>
      </section>

      {/* 2. MÓDULO SCRIPTURAL (SALMOS & TORÁ) */}
      <section className="proto-module border-amber-900/50">
        <div className="module-label">SCRIPTURAL CODE // TORAH</div>
        <div className="psalm-card">
          <div className="psalm-verses">PSALM 119: {data.psalmVerses}</div>
          <p className="psalm-intent">"{data.psalmIntent}"</p>
        </div>
        <div className="torah-root">
          <span className="root-label">ORIGIN WORD:</span>
          <span className="root-val">{data.torahFirstWord}</span>
        </div>
      </section>

      {/* 3. MÓDULO DE RECTIFICACIÓN (ZOHAR) */}
      <section className="proto-module border-purple-900/50">
        <div className="module-label">SOUL RECTIFICATION // ZOHAR</div>
        <div className="attribute-card">
          <div className="attr-title">{data.attributeOfMercy}</div>
          <p className="attr-wisdom">{data.zoharWisdom}</p>
        </div>
        <div className="divine-resonance">
          <span>RESONANCE:</span> <strong>{data.divineName}</strong>
        </div>
      </section>

      {/* 4. ANÁLISIS DE ENTROPÍA (ESTADO DINÁMICO) */}
      <div className="proto-diagnosis-footer">
        <div className="diag-row">
          <span>ENTROPY IMPACT:</span>
          <span style={{ color: cosmos.entropyLevel > 50 ? '#f87171' : '#4ade80' }}>
            {cosmos.entropyLevel.toFixed(1)}%
          </span>
        </div>
        <p className="diag-advice">
          {cosmos.entropyLevel > 50 
            ? "ALERTA: Alta dispersión. Se requiere meditación en el Atributo de Misericordia para estabilizar la vasija."
            : "FLUJO ÓPTIMO: La frecuencia es coherente. Proceder con la Kavanah del Salmo 119."}
        </p>
      </div>
    </div>
  );
};