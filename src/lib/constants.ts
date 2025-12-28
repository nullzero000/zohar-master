// src/lib/constants.ts
import { KabbalahMode } from '@/lib/types';

// --- 1. MODOS DE ESCUELA (PARA EL SELECTOR UI) ---
export const SCHOOL_MODES: { id: KabbalahMode; label: string }[] = [
    { id: 'Gra-Canon', label: 'GRA (VILNA)' },
    { id: 'ari', label: 'LURIANIC (ARI)' },
    { id: 'akashic', label: 'AKASHICA' },
    { id: 'Traditional-Pure', label: 'TRADICIONAL' }
];

// --- 2. MAPA DE NORMALIZACIÓN (Formas finales a estándar) ---
export const NORMALIZE_MAP: Record<string, string> = {
  'ך': 'כ',
  'ם': 'מ',
  'ן': 'נ',
  'ף': 'פ',
  'ץ': 'צ'
};

// --- 3. PALETAS DE COLORES POR ESCUELA (SISTEMA MAESTRO) ---
// Reemplaza al antiguo GRA_OVERRIDES para dar soporte total a todas tus escuelas.
export const SCHOOL_PALETTES: Record<KabbalahMode, Record<string, string> | null> = {
  // A. ESCUELA GRA / TORAH (Estricta: Rojo, Oro, Blanco, Negro)
  'Gra-Canon': {
    'Aleph': '#FFD700', // Oro
    'Bet': '#FFFFFF',   // Blanco
    'Gimel': '#FFFFFF', 
    'Dalet': '#FFFFFF',
    'He': '#800000',    // Rojo Oscuro
    'Vav': '#FFFFFF',
    'Zayin': '#FFFFFF',
    'Chet': '#FFFFFF',
    'Tet': '#FFFFFF',
    'Yod': '#000000',   // Negro
    'Kaf': '#FFFFFF',
    'Lamed': '#FFFFFF',
    'Mem': '#FFFFFF',
    'Nun': '#FFFFFF',
    'Samekh': '#FFFFFF',
    'Ayin': '#101010',  // Negro Profundo
    'Pe': '#FFFFFF',
    'Tzadik': '#FFFFFF',
    'Qof': '#FFFFFF',
    'Resh': '#FFFFFF',
    'Shin': '#FF0000',  // Rojo Vivo
    'Tav': '#FFFFFF'
  },

  // B. LURIÁNICA (ARI)
  // Hereda la estructura estricta. Puedes ajustar diferencias sutiles si las hay.
  'ari': {
    'Aleph': '#FFD700', 
    'He': '#FF4444', 
    'Yod': '#000000',
    'Vav': '#FFFFFF',
    // (El resto se inferirá o se puede explícitar si es distinto al Gra)
  },

  // C. AKÁSHICA (Tu sistema personalizado)
  'akashic': {
    'Aleph': '#E0FFFF', // Luz Cian Etéreo
    'Mem': '#00008B',   // Azul Profundo
    'Shin': '#FF4500',  // Fuego Naranja
    'Yod': '#9ACD32',   // Verde Lima (Luz vital)
    'He': '#FF1493',    // Rosa Profundo (Recepción)
    // Agrega aquí el resto de tus códigos HEX específicos
  },

  // D. MODOS QUE USAN EL COLOR BASE (HEBREW_DATA)
  'SeferYetzirah-Standard': null, 
  'Traditional-Pure': null,
  'Esoteric-Expanded': null
};

// --- 4. DATOS HEBREOS MAESTROS ---
export const HEBREW_DATA: Record<string, any> = {
  'Aleph': { name: 'Aleph', color: '#E6B800', meaning: 'Buey / Unidad', value: 1, planet: 'Urano' },
  'Bet': { name: 'Bet', color: '#FFFF00', meaning: 'Casa', value: 2, planet: 'Saturno' },
  'Gimel': { name: 'Gimel', color: '#0000FF', meaning: 'Camello', value: 3, planet: 'Júpiter' },
  'Dalet': { name: 'Dalet', color: '#008000', meaning: 'Puerta', value: 4, planet: 'Marte' },
  'He': { name: 'He', color: '#FF0000', meaning: 'Ventana', value: 5, planet: 'Aries' },
  'Vav': { name: 'Vav', color: '#FFA500', meaning: 'Gancho', value: 6, planet: 'Tauro' },
  'Zayin': { name: 'Zayin', color: '#FF8C00', meaning: 'Arma', value: 7, planet: 'Géminis' },
  'Chet': { name: 'Chet', color: '#8B4513', meaning: 'Valla', value: 8, planet: 'Cáncer' },
  'Tet': { name: 'Tet', color: '#FFFFE0', meaning: 'Serpiente', value: 9, planet: 'Leo' },
  'Yod': { name: 'Yod', color: '#9ACD32', meaning: 'Mano', value: 10, planet: 'Virgo' },
  
  // LETRAS KAF - TAV
  'Kaf': { name: 'Kaf', color: '#EE82EE', meaning: 'Palma', value: 20, sofitValue: 500, planet: 'Júpiter' },
  'Lamed': { name: 'Lamed', color: '#808080', meaning: 'Aguijón', value: 30, planet: 'Libra' },
  'Mem': { name: 'Mem', color: '#000080', meaning: 'Agua', value: 40, sofitValue: 600, planet: 'Agua' },
  'Nun': { name: 'Nun', color: '#2E8B57', meaning: 'Pez', value: 50, sofitValue: 700, planet: 'Escorpio' },
  'Samekh': { name: 'Samekh', color: '#4169E1', meaning: 'Sostén', value: 60, planet: 'Sagitario' },
  'Ayin': { name: 'Ayin', color: '#800080', meaning: 'Ojo', value: 70, planet: 'Capricornio' },
  'Pe': { name: 'Pe', color: '#FF4500', meaning: 'Boca', value: 80, sofitValue: 800, planet: 'Venus' },
  'Tzadik': { name: 'Tzadik', color: '#9370DB', meaning: 'Anzuelo', value: 90, sofitValue: 900, planet: 'Acuario' },
  'Qof': { name: 'Qof', color: '#DC143C', meaning: 'Nuca', value: 100, planet: 'Piscis' },
  'Resh': { name: 'Resh', color: '#FFA07A', meaning: 'Cabeza', value: 200, planet: 'Sol' },
  'Shin': { name: 'Shin', color: '#B22222', meaning: 'Diente', value: 300, planet: 'Fuego' },
  'Tav': { name: 'Tav', color: '#4B0082', meaning: 'Marca', value: 400, planet: 'Luna' },

  // Mapeo inverso (Punteros)
  'א': { ref: 'Aleph' }, 'ב': { ref: 'Bet' }, 'ג': { ref: 'Gimel' }, 'ד': { ref: 'Dalet' }, 'ה': { ref: 'He' },
  'ו': { ref: 'Vav' }, 'ז': { ref: 'Zayin' }, 'ח': { ref: 'Chet' }, 'ט': { ref: 'Tet' }, 'י': { ref: 'Yod' },
  'כ': { ref: 'Kaf' }, 'ל': { ref: 'Lamed' }, 'מ': { ref: 'Mem' }, 'נ': { ref: 'Nun' }, 'ס': { ref: 'Samekh' },
  'ע': { ref: 'Ayin' }, 'פ': { ref: 'Pe' }, 'צ': { ref: 'Tzadik' }, 'ק': { ref: 'Qof' }, 'ר': { ref: 'Resh' },
  'ש': { ref: 'Shin' }, 'ת': { ref: 'Tav' },
  // Sofit maps
  'ך': { ref: 'Kaf' }, 'ם': { ref: 'Mem' }, 'ן': { ref: 'Nun' }, 'ף': { ref: 'Pe' }, 'ץ': { ref: 'Tzadik' }
};

// --- 5. MAPA DE MILUY (EXPANSIÓN ORTOGRÁFICA) ---
export const MILUY_MAP: Record<string, string[]> = {
  'א': ['א', 'ל', 'ף'],
  'ב': ['ב', 'י', 'ת'],
  'ג': ['ג', 'מ', 'ל'],
  'ד': ['ד', 'ל', 'ת'],
  'ה': ['ה', 'א'],
  'ו': ['ו', 'א', 'ו'], // Vav Aleph Vav (13) - Shem MaH
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
  'ת': ['ת', 'י', 'ו']
};

export const PATHS_OF_WISDOM = { paths_of_wisdom: [] }; // Rellena con tus datos de senderos si los tienes

// --- JERARQUÍA DEL SEFER YETZIRAH ---
export const LETTER_HIERARCHY: Record<string, 'MOTHER' | 'DOUBLE' | 'SIMPLE'> = {
  // 3 MADRES (Elementos Primordiales)
  'א': 'MOTHER', 'מ': 'MOTHER', 'ש': 'MOTHER',
  'ם': 'MOTHER', // Mem Sofit es extensión de Mem

  // 7 DOBLES (Planetas / Dualidad Vida-Muerte) - Beged Kefet + Resh
  'ב': 'DOUBLE', 'ג': 'DOUBLE', 'ד': 'DOUBLE', 
  'כ': 'DOUBLE', 'פ': 'DOUBLE', 'ר': 'DOUBLE', 'ת': 'DOUBLE',
  'ך': 'DOUBLE', 'ף': 'DOUBLE', // Sofits asociadas

  // 12 SIMPLES (Zodiaco / Funciones Elementales)
  'ה': 'SIMPLE', 'ו': 'SIMPLE', 'ז': 'SIMPLE', 'ח': 'SIMPLE', 
  'ט': 'SIMPLE', 'י': 'SIMPLE', 'ל': 'SIMPLE', 'נ': 'SIMPLE', 
  'ס': 'SIMPLE', 'ע': 'SIMPLE', 'צ': 'SIMPLE', 'ק': 'SIMPLE',
  'ן': 'SIMPLE', 'ץ': 'SIMPLE' // Sofits asociadas
};

// --- LAYOUT CORREGIDO (ORDEN ALEFATO ESTÁNDAR) ---
// Ordenamos de Aleph (derecha) a Tav (izquierda) siguiendo lectura hebrea.
export const KEYBOARD_LAYOUT = [
  // Fila Superior (Aleph a Yod)
  "אבגדהוזחטי", 
  // Fila Media (Kaf a Tzadik - incluye sofit de Kaf, Mem, Nun)
  "כלמםנןסעפף", 
  // Fila Inferior (Tzadik Sofit a Tav - incluye sofit de Pe, Tzadik)
  "צץקרשתך" 
];