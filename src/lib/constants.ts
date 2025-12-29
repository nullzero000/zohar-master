import { KabbalahMode } from './types';

// --- DEFINICIONES DE TIPOS ---

export interface TorahWordData {
  bodyPart: string;
  firstWord: string;
  symbolicMeaning: string;
}

// --- BASES DE DATOS ---

// 1. PRIMERAS PALABRAS Y ANATOMÍA MÍSTICA (Tu Data Corregida)
export const TORAH_FIRST_WORDS: Record<string, TorahWordData> = {
  'א': { bodyPart: 'Pecho / Pulmones', firstWord: 'Elohim (אֱלֹהִים)', symbolicMeaning: 'Unidad, inicio divino' },
  'ב': { bodyPart: 'Boca / Sabiduría', firstWord: 'Bereshit (בְּרֵאשִׁית)', symbolicMeaning: 'Casa, dualidad de creación' },
  'ג': { bodyPart: 'Oído Derecho', firstWord: 'Gan (גַּן)', symbolicMeaning: 'Recipiente, canal de recepción' },
  'ד': { bodyPart: 'Oído Izquierdo', firstWord: 'Derech (דֶּרֶךְ)', symbolicMeaning: 'Camino, puerta de paso' },
  'ה': { bodyPart: 'Mano Derecha', firstWord: 'HaShamayim (הַשָּׁמַיִם)', symbolicMeaning: 'Revelación, ventana de conciencia' },
  'ו': { bodyPart: 'Columna Vertebral', firstWord: 'VeHaAretz (וְהָאָרֶץ)', symbolicMeaning: 'Conector, columna de unión' },
  'ז': { bodyPart: 'Pie Derecho', firstWord: 'Zera (זֶרַע)', symbolicMeaning: 'Semilla, potencial de vida' },
  'ח': { bodyPart: 'Mano Izquierda', firstWord: 'Choshech (חֹשֶׁךְ)', symbolicMeaning: 'Límites, frontera del ser' },
  'ט': { bodyPart: 'Riñón Derecho', firstWord: 'Tov (טוֹב)', symbolicMeaning: 'Bondad, fuerza vital' },
  'י': { bodyPart: 'Pie Izquierdo', firstWord: 'Yehi (יְהִי)', symbolicMeaning: 'Punto inicial, chispa divina' },
  'כ': { bodyPart: 'Ojo Derecho', firstWord: 'Ki (כִּי)', symbolicMeaning: 'Palma, receptividad' },
  'ל': { bodyPart: 'Vesícula Biliar', firstWord: 'Layla (לָיְלָה)', symbolicMeaning: 'Aguijón, enseñanza profunda' },
  'מ': { bodyPart: 'Vientre (Agua)', firstWord: 'Merachefet (מְרַחֶפֶת)', symbolicMeaning: 'Matriz, origen de forma' },
  'נ': { bodyPart: 'Intestinos', firstWord: 'Nefesh (נֶפֶשׁ)', symbolicMeaning: 'Alma, caída y reorganización' },
  'ס': { bodyPart: 'Estómago', firstWord: 'Saviv (סָבִיב)', symbolicMeaning: 'Soporte, ciclo de vida' },
  'ע': { bodyPart: 'Hígado', firstWord: 'Al (עַל)', symbolicMeaning: 'Visión, percepción material' },
  'פ': { bodyPart: 'Oído Izquierdo (secundario)', firstWord: 'Pnei (פְּנֵי)', symbolicMeaning: 'Boca, palabra y expresión' },
  'צ': { bodyPart: 'Garganta', firstWord: 'Tzelem (צֶלֶם)', symbolicMeaning: 'Imagen divina, rectitud' },
  'ק': { bodyPart: 'Bazo', firstWord: 'Kara (קָרָא)', symbolicMeaning: 'Llamado, santidad' },
  'ר': { bodyPart: 'Fosa Nasal Izquierda', firstWord: 'Ruach (רוּחַ)', symbolicMeaning: 'Respiración, espíritu' },
  'ש': { bodyPart: 'Cráneo (Fuego Superior)', firstWord: 'Shamayim (שָׁמַיִם)', symbolicMeaning: 'Fuego, juicio y retorno' },
  'ת': { bodyPart: 'Boca (final)', firstWord: 'Tohu (תֹהוּ)', symbolicMeaning: 'Sello, verdad absoluta' },
  
  // SOFITS (Finales) - Mapeadas a su raíz
  'ך': { bodyPart: 'Ojo Derecho', firstWord: 'Ki (כִּי)', symbolicMeaning: 'Palma (Final)' },
  'ם': { bodyPart: 'Vientre (Agua)', firstWord: 'Merachefet (מְרַחֶפֶת)', symbolicMeaning: 'Matriz (Final)' },
  'ן': { bodyPart: 'Intestinos', firstWord: 'Nefesh (נֶפֶשׁ)', symbolicMeaning: 'Alma (Final)' },
  'ף': { bodyPart: 'Oído Izquierdo', firstWord: 'Pnei (פְּנֵי)', symbolicMeaning: 'Boca (Final)' },
  'ץ': { bodyPart: 'Garganta', firstWord: 'Tzelem (צֶלֶם)', symbolicMeaning: 'Imagen (Final)' }
};

// 2. OTROS CONSTANTES NECESARIOS (Que ya deberías tener, asegúrate de no borrarlos)

export const SCHOOL_MODES: { id: KabbalahMode; label: string }[] = [
  { id: 'Gra-Canon', label: 'GRA (ARI)' },
  { id: 'akashic', label: 'AKASHICA' },
  { id: 'Traditional-Pure', label: 'TRADICIONAL' },
  { id: 'SeferYetzirah-Standard', label: 'YETZIRAH' },
];

export const KEYBOARD_LAYOUT = [
  'אבגדהוזחטי',
  'כלמנסעפצקר',
  'שתךםןףץ'
];

export const LETTER_HIERARCHY: Record<string, 'MOTHER' | 'DOUBLE' | 'SIMPLE'> = {
  'א': 'MOTHER', 'מ': 'MOTHER', 'ש': 'MOTHER', 'ם': 'MOTHER',
  'ב': 'DOUBLE', 'ג': 'DOUBLE', 'ד': 'DOUBLE', 'כ': 'DOUBLE', 'פ': 'DOUBLE', 'ר': 'DOUBLE', 'ת': 'DOUBLE',
  'ך': 'DOUBLE', 'ף': 'DOUBLE',
  'ה': 'SIMPLE', 'ו': 'SIMPLE', 'ז': 'SIMPLE', 'ח': 'SIMPLE', 'ט': 'SIMPLE', 'י': 'SIMPLE', 
  'ל': 'SIMPLE', 'נ': 'SIMPLE', 'ס': 'SIMPLE', 'ע': 'SIMPLE', 'צ': 'SIMPLE', 'ק': 'SIMPLE',
  'ן': 'SIMPLE', 'ץ': 'SIMPLE'
};

// MAPAS DE NORMALIZACIÓN (Necesarios para el motor)
export const NORMALIZE_MAP: Record<string, string> = {
  'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ'
};

export const MILUY_MAP: Record<string, string[]> = {
  'א': ['א', 'ל', 'ף'],
  'ב': ['ב', 'י', 'ת'],
  'ג': ['ג', 'מ', 'ל'],
  'ד': ['ד', 'ל', 'ת'],
  'ה': ['ה', 'א'], 
  'ו': ['ו', 'ו'], 
  'ז': ['ז', 'י', 'ן'],
  'ח': ['ח', 'י', 'ת'],
  'ט': ['ט', 'י', 'ת'],
  'י': ['י', 'ו', 'ד'],
  'כ': ['כ', 'ף'],
  'ל': ['ל', 'מ', 'ד'],
  'מ': ['מ', 'ם'],
  'נ': ['נ', 'ו', 'ן'],
  'ס': ['ס', 'מ', 'ך'],
  'ע': ['ע', 'י', 'ן'],
  'פ': ['פ', 'א'],
  'צ': ['צ', 'ד', 'י'],
  'ק': ['ק', 'ו', 'ף'],
  'ר': ['ר', 'י', 'ש'],
  'ש': ['ש', 'י', 'ן'],
  'ת': ['ת', 'ו'],
  // SOFITS Mapeados a su raíz
  'ך': ['כ', 'ף'],
  'ם': ['מ', 'ם'],
  'ן': ['נ', 'ו', 'ן'],
  'ף': ['פ', 'א'],
  'ץ': ['צ', 'ד', 'י']
};

export const HEBREW_DATA: Record<string, any> = {
  // Aquí va tu base de datos de valores (1, 2, 3...) que ya tenías.
  // Si la necesitas completa dímelo, pero asumo que esa parte no daba error.
  'א': { value: 1, name: 'Aleph' },
  'ב': { value: 2, name: 'Bet' },
  'ג': { value: 3, name: 'Gimel' },
  'ד': { value: 4, name: 'Dalet' },
  'ה': { value: 5, name: 'He' },
  'ו': { value: 6, name: 'Vav' },
  'ז': { value: 7, name: 'Zayin' },
  'ח': { value: 8, name: 'Chet' },
  'ט': { value: 9, name: 'Tet' },
  'י': { value: 10, name: 'Yod' },
  'כ': { value: 20, name: 'Kaf', sofitValue: 500 },
  'ך': { ref: 'כ' },
  'ל': { value: 30, name: 'Lamed' },
  'מ': { value: 40, name: 'Mem', sofitValue: 600 },
  'ם': { ref: 'מ' },
  'נ': { value: 50, name: 'Nun', sofitValue: 700 },
  'ן': { ref: 'נ' },
  'ס': { value: 60, name: 'Samech' },
  'ע': { value: 70, name: 'Ayin' },
  'פ': { value: 80, name: 'Pe', sofitValue: 800 },
  'ף': { ref: 'פ' },
  'צ': { value: 90, name: 'Tzadi', sofitValue: 900 },
  'ץ': { ref: 'צ' },
  'ק': { value: 100, name: 'Qof' },
  'ר': { value: 200, name: 'Resh' },
  'ש': { value: 300, name: 'Shin' },
  'ת': { value: 400, name: 'Tav' }
};