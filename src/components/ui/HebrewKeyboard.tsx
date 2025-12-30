'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';
import '@/styles/HebrewKeyboard.css';

const ALEPH_BET_LAYOUT = [
  [{ char: 'א', val: 1 }, { char: 'ב', val: 2 }, { char: 'ג', val: 3 }, { char: 'ד', val: 4 }, { char: 'ה', val: 5 }, { char: 'ו', val: 6 }, { char: 'ז', val: 7 }, { char: 'ח', val: 8 }, { char: 'ט', val: 9 }],
  [{ char: 'י', val: 10 }, { char: 'כ', val: 20 }, { char: 'ל', val: 30 }, { char: 'מ', val: 40 }, { char: 'נ', val: 50 }, { char: 'ס', val: 60 }, { char: 'ע', val: 70 }, { char: 'פ', val: 80 }, { char: 'צ', val: 90 }],
  [{ char: 'ק', val: 100 }, { char: 'ר', val: 200 }, { char: 'ש', val: 300 }, { char: 'ת', val: 400 }, { char: 'ך', val: 500 }, { char: 'ם', val: 600 }, { char: 'ן', val: 700 }, { char: 'ף', val: 800 }, { char: 'ץ', val: 900 }]
];

export const HebrewKeyboard = () => {
  const { inputText, setInputText, school } = useGematriaStore();

  const handleKeyPress = (char: string) => {
    setInputText(inputText + char);
  };

  return (
    <div className="hebrew-keyboard-container">
      {ALEPH_BET_LAYOUT.map((row, rIdx) => (
        <div key={rIdx} className="keyboard-row">
          {row.map(({ char, val }) => {
            const color = getHebrewColor(char, school);
            const isBlack = isOntologicalBlack(color);
            
            // Inyectamos variable CSS para que el archivo .css pueda usarla
            const dynamicStyle = {
                '--key-color': color
            } as React.CSSProperties;

            return (
              <button
                key={char}
                onClick={() => handleKeyPress(char)}
                className="keyboard-key"
                style={dynamicStyle}
              >
                <span className="key-char">{char}</span>
                <span className="key-val">{val}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};