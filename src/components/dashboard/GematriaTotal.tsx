'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, getHebrewValue, getRecursiveExpansion, isOntologicalBlack } from '@/lib/gematriaUtils';

export const GematriaTotal = () => {
  const { inputText, school, expansionLevel } = useGematriaStore();

  const expandedText = getRecursiveExpansion(inputText || '', expansionLevel);

  // 1. Calcular valor total
  const totalValue = expandedText.split('').reduce((acc, char) => {
    return acc + getHebrewValue(char, true);
  }, 0);

  // 2. Calcular Mispar Katan (número pequeño)
  const misparKatan = String(totalValue)
    .split('')
    .reduce((acc, digit) => {
      let sum = acc + parseInt(digit);
      while (sum > 9) {
        sum = String(sum).split('').reduce((a, b) => a + parseInt(b), 0);
      }
      return sum;
    }, 0);

  // 3. Lógica de Frecuencias Áureas (Top 5 Count Distinct)
  const frequencyMap = expandedText.split('').reduce((acc: Record<string, number>, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  const topFrequencies = Object.entries(frequencyMap)
    .map(([char, count]) => ({
      char,
      count,
      color: getHebrewColor(char, school)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="gematria-total-root fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.03)', // Tu estilo original
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '380px',
      margin: '0 auto', // Centrado dentro del Dossier
      position: 'relative',
      gap: '15px'
    }}>

      {/* SECCIÓN SUPERIOR: GEMATRÍA Y MISPAR KATAN */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '5px', fontWeight: 'bold' }}>
            GEMATRÍA (LVL {expansionLevel})
          </span>
          <span style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1, color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
            {totalValue}
          </span>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '8px', marginTop: '10px', opacity: 0.8 }}>
            {expandedText.slice(0, 7).split('').map((char, i) => {
              const val = getHebrewValue(char, false);
              const color = getHebrewColor(char, school);
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontFamily: 'Times New Roman', fontWeight: 'bold', color: color, textShadow: isOntologicalBlack(color) ? '0 0 5px white' : 'none' }}>
                    {char}
                  </span>
                  <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)' }}>{val}</span>
                </div>
              );
            })}
            {expandedText.length > 7 && <span style={{ alignSelf: 'center', fontSize: '0.8rem' }}>...</span>}
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)', margin: '0 20px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '5px', fontWeight: 'bold', textAlign: 'center' }}>
            MISPAR KATAN
          </span>
          <span style={{ fontSize: '2rem', fontWeight: '400', color: 'rgba(255,255,255,0.9)' }}>
            {misparKatan}
          </span>
        </div>
      </div>

      {/* BLOQUE DE FRECUENCIAS ÁUREAS (Top 5 Count Distinct) */}
      <div style={{
        paddingTop: '15px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        width: '100%'
      }}>
        <span style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', display: 'block', textAlign: 'center', marginBottom: '8px' }}>
          DOMINANT FREQUENCIES (TOP 5 / {new Set(expandedText).size} CHARS)
        </span>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', gap: '15px' }}>
          {topFrequencies.map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{
                fontSize: '1.2rem', fontWeight: 'bold', color: f.color,
                textShadow: isOntologicalBlack(f.color) ? '0 0 5px white' : 'none'
              }}>
                {f.char}
              </span>
              <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Courier New' }}>
                x{f.count}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};