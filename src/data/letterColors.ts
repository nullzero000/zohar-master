export interface LetterColorProfile {
  letter: string;
  value: number;
  gra: string;
  traditional: string; 
  esoteric: string;   
  akashic: string;
}

export const LETTER_COLOR_TABLE: LetterColorProfile[] = [
  // --- MADRES ---
  { letter: 'א', value: 1, gra: 'rgb(255, 215, 0)', traditional: 'rgb(178, 34, 34)', esoteric: 'rgb(255, 255, 224)', akashic: 'rgb(173, 255, 47)' },
  { letter: 'מ', value: 40, gra: 'rgb(0, 0, 200)', traditional: 'rgb(70, 130, 180)', esoteric: 'rgb(0, 191, 255)', akashic: 'rgb(0, 206, 209)' },
  { letter: 'ם', value: 600, gra: 'rgb(0, 0, 200)', traditional: 'rgb(70, 130, 180)', esoteric: 'rgb(0, 191, 255)', akashic: 'rgb(0, 206, 209)' },
  { letter: 'ש', value: 300, gra: 'rgb(220, 0, 0)', traditional: 'rgb(178, 34, 34)', esoteric: 'rgb(255, 69, 0)', akashic: 'rgb(224, 255, 255)' },

  // --- TETRAGRÁMATON ---
  { letter: 'י', value: 10, gra: 'rgb(0, 0, 0)', traditional: 'rgb(255, 228, 196)', esoteric: 'rgb(255, 239, 213)', akashic: 'rgb(255, 248, 220)' },
  { letter: 'ה', value: 5, gra: 'rgb(180, 0, 0)', traditional: 'rgb(105, 105, 105)', esoteric: 'rgb(176, 224, 230)', akashic: 'rgb(135, 206, 235)' },
  { letter: 'ו', value: 6, gra: 'rgb(255, 255, 255)', traditional: 'rgb(139, 0, 0)', esoteric: 'rgb(255, 69, 0)', akashic: 'rgb(220, 20, 60)' },

  // --- DOBLES ---
  { letter: 'ב', value: 2, gra: 'rgb(255, 255, 255)', traditional: 'rgb(70, 70, 70)', esoteric: 'rgb(72, 61, 139)', akashic: 'rgb(0, 0, 205)' },
  { letter: 'ג', value: 3, gra: 'rgb(255, 255, 255)', traditional: 'rgb(150, 0, 0)', esoteric: 'rgb(220, 20, 60)', akashic: 'rgb(228, 0, 124)' },
  { letter: 'ד', value: 4, gra: 'rgb(255, 255, 255)', traditional: 'rgb(120, 40, 40)', esoteric: 'rgb(205, 92, 92)', akashic: 'rgb(149, 53, 83)' },
  { letter: 'כ', value: 20, gra: 'rgb(255, 255, 255)', traditional: 'rgb(112, 128, 144)', esoteric: 'rgb(123, 104, 238)', akashic: 'rgb(138, 43, 226)' },
  { letter: 'ך', value: 500, gra: 'rgb(255, 255, 255)', traditional: 'rgb(112, 128, 144)', esoteric: 'rgb(123, 104, 238)', akashic: 'rgb(138, 43, 226)' },
  { letter: 'פ', value: 80, gra: 'rgb(255, 255, 255)', traditional: 'rgb(178, 34, 34)', esoteric: 'rgb(219, 112, 147)', akashic: 'rgb(255, 105, 180)' },
  { letter: 'ף', value: 800, gra: 'rgb(255, 255, 255)', traditional: 'rgb(178, 34, 34)', esoteric: 'rgb(219, 112, 147)', akashic: 'rgb(255, 105, 180)' },
  { letter: 'ר', value: 200, gra: 'rgb(255, 255, 255)', traditional: 'rgb(105, 105, 105)', esoteric: 'rgb(216, 191, 216)', akashic: 'rgb(230, 230, 250)' },
  { letter: 'ת', value: 400, gra: 'rgb(255, 255, 255)', traditional: 'rgb(169, 169, 169)', esoteric: 'rgb(255, 250, 240)', akashic: 'rgb(255, 255, 224)' },

  // --- SIMPLES ---
  { letter: 'ז', value: 7, gra: 'rgb(65, 105, 225)', traditional: 'rgb(90, 90, 90)', esoteric: 'rgb(100, 149, 237)', akashic: 'rgb(65, 105, 225)' },
  { letter: 'ח', value: 8, gra: 'rgb(255, 215, 0)', traditional: 'rgb(184, 134, 11)', esoteric: 'rgb(218, 165, 32)', akashic: 'rgb(255, 215, 0)' },
  { letter: 'ט', value: 9, gra: 'rgb(200, 162, 200)', traditional: 'rgb(119, 136, 153)', esoteric: 'rgb(199, 21, 133)', akashic: 'rgb(200, 162, 200)' },
  { letter: 'ל', value: 30, gra: 'rgb(210, 105, 30)', traditional: 'rgb(165, 42, 42)', esoteric: 'rgb(255, 140, 0)', akashic: 'rgb(204, 119, 34)' },
  { letter: 'נ', value: 50, gra: 'rgb(255, 160, 122)', traditional: 'rgb(139, 69, 69)', esoteric: 'rgb(255, 127, 127)', akashic: 'rgb(255, 182, 193)' },
  { letter: 'ן', value: 700, gra: 'rgb(255, 160, 122)', traditional: 'rgb(139, 69, 69)', esoteric: 'rgb(255, 127, 127)', akashic: 'rgb(255, 182, 193)' },
  { letter: 'ס', value: 60, gra: 'rgb(186, 85, 211)', traditional: 'rgb(90, 70, 90)', esoteric: 'rgb(221, 160, 221)', akashic: 'rgb(218, 112, 214)' },
  { letter: 'ע', value: 70, gra: 'rgb(16, 16, 16)', traditional: 'rgb(46, 139, 87)', esoteric: 'rgb(34, 139, 34)', akashic: 'rgb(80, 200, 120)' },
  { letter: 'צ', value: 90, gra: 'rgb(144, 238, 144)', traditional: 'rgb(34, 139, 34)', esoteric: 'rgb(152, 251, 152)', akashic: 'rgb(144, 238, 144)' },
  { letter: 'ץ', value: 900, gra: 'rgb(144, 238, 144)', traditional: 'rgb(34, 139, 34)', esoteric: 'rgb(152, 251, 152)', akashic: 'rgb(144, 238, 144)' },
  { letter: 'ק', value: 100, gra: 'rgb(176, 224, 230)', traditional: 'rgb(70, 130, 180)', esoteric: 'rgb(135, 206, 250)', akashic: 'rgb(175, 238, 238)' },
];