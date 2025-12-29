'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';

// Layout Alef-Bet Sagrado
const ALEPH_BET_LAYOUT = [
  // FILA 1: UNIDADES (1-9) -> Se verán de Derecha a Izquierda (Alef a la Derecha)
  [
    { char: 'א', val: 1 }, { char: 'ב', val: 2 }, { char: 'ג', val: 3 }, 
    { char: 'ד', val: 4 }, { char: 'ה', val: 5 }, { char: 'ו', val: 6 }, 
    { char: 'ז', val: 7 }, { char: 'ח', val: 8 }, { char: 'ט', val: 9 }
  ],
  // FILA 2: DECENAS (10-90)
  [
    { char: 'י', val: 10 }, { char: 'כ', val: 20 }, { char: 'ל', val: 30 }, 
    { char: 'מ', val: 40 }, { char: 'נ', val: 50 }, { char: 'ס', val: 60 }, 
    { char: 'ע', val: 70 }, { char: 'פ', val: 80 }, { char: 'צ', val: 90 }
  ],
  // FILA 3: CENTENAS (100-900)
  [
    { char: 'ק', val: 100 }, { char: 'ר', val: 200 }, { char: 'ש', val: 300 }, 
    { char: 'ת', val: 400 }, { char: 'ך', val: 500 }, { char: 'ם', val: 600 }, 
    { char: 'ן', val: 700 }, { char: 'ף', val: 800 }, { char: 'ץ', val: 900 }
  ]
];

export const HebrewKeyboard = () => {
  const { inputText, setInputText, school } = useGematriaStore();

  const handleKeyPress = (char: string) => {
    setInputText(inputText + char);
  };

  return (
    <div className="hebrew-keyboard" style={{
      display: 'flex', flexDirection: 'column', gap: '8px',
      padding: '10px', background: 'transparent',
      borderRadius: '12px', width: '100%', maxWidth: '650px'
    }}>
      {ALEPH_BET_LAYOUT.map((row, rIdx) => (
        <div key={rIdx} style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '4px',
            // CORRECCIÓN CRÍTICA:
            // Usamos row-reverse para que el array [Alef, Bet...] se pinte de Derecha a Izquierda.
            // Alef quedará a la derecha, Tet a la izquierda.
            flexDirection: 'row-reverse' 
        }}>
          {row.map(({ char, val }) => {
            const color = getHebrewColor(char, school);
            const isBlack = isOntologicalBlack(color);
            
            const glowStyle = isBlack 
                ? '0 0 4px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.5)' 
                : `0 0 10px ${color}`;

            return (
              <button
                key={char}
                onClick={() => handleKeyPress(char)}
                className="keyboard-key"
                style={{
                  color: color,
                  textShadow: glowStyle,
                  borderColor: isBlack ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  
                  background: 'rgba(15, 15, 20, 0.85)',
                  borderWidth: '1px', borderStyle: 'solid',
                  borderRadius: '6px', 
                  
                  width: '42px', height: '52px', 
                  
                  cursor: 'pointer', transition: 'all 0.1s',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(5px)',
                  padding: '2px 0'
                }}
              >
                <span style={{ 
                    fontSize: '1.4rem', 
                    fontFamily: 'Times New Roman', 
                    fontWeight: 'bold',
                    lineHeight: '1.1'
                }}>
                    {char}
                </span>

                <span style={{ 
                    fontSize: '0.6rem', 
                    fontFamily: 'Courier New', 
                    opacity: 0.8,
                    marginTop: '2px',
                    color: isBlack ? '#fff' : color,
                    textShadow: 'none'
                }}>
                    {val}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};