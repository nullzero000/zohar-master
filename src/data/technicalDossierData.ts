export interface MercyAttribute {
  hebrew: string;
  transliteration: string;
  translation: string;
  definition: string;
  operationalWork: string;
}

export interface ZodiacLetter {
  letter: string;
  sign: string;
  month: string;
  organ: string;
  tikkun: string;
}

export interface SefiraPsych {
  name: string;
  aspect: "Intellectual" | "Emotional" | "Action";
  light: string;
  shadow: string;
  work: string;
}

export interface PsalmMapping {
  letter: string;
  verses: string;
  intention: string;
}

export const attributesOfMercy: MercyAttribute[] = [
  {
    hebrew: "מִי אֵל כָּמוֹךָ",
    transliteration: "Mi El Kamocha",
    translation: "¿Quién es Dios como Tú?",
    definition: "La capacidad de soportar el insulto.",
    operationalWork: "Tolerar la ofensa sin cortar el flujo de bondad hacia el ofensor en el momento de la crisis."
  },
  {
    hebrew: "נֹשֵׂא עָוֹן",
    transliteration: "Nose Avon",
    translation: "Que perdona/carga la iniquidad",
    definition: "Asumir la carga del daño.",
    operationalWork: "Aceptar el sufrimiento causado por el otro como rectificación propia, sin devolver el golpe."
  },
  {
    hebrew: "וְעֹבֵר עַל פֶּשַׁע",
    transliteration: "V'over al Pesha",
    translation: "Y pasa por alto la transgresión",
    definition: "No lavar las heridas ni guardar rencor.",
    operationalWork: "Actuar como si la ofensa no hubiera ocurrido para facilitar la reintegración."
  },
  {
    hebrew: "לִשְׁאֵרִית נַחֲלָתוֹ",
    transliteration: "Lish'erit Nachalato",
    translation: "Al remanente de su heredad",
    definition: "Ver al otro como un pariente consanguíneo.",
    operationalWork: "Ver la venganza como absurda al reconocer al otro como parte de la propia alma."
  },
  // ... (Se pueden añadir los 13 completos siguiendo este patrón)
];

export const zodiacLetters: ZodiacLetter[] = [
  { letter: "ה", sign: "Aries (Taleh)", month: "Nisán", organ: "Pie Derecho / Habla", tikkun: "Rectificación de la palabra; iniciar el movimiento." },
  { letter: "ו", sign: "Tauro (Shor)", month: "Iyar", organ: "Riñón Der. / Pensamiento", tikkun: "Contemplación fija; rectificar pensamientos obsesivos." },
  { letter: "ז", sign: "Géminis (Teomim)", month: "Siván", organ: "Pie Izq. / Movimiento", tikkun: "La dualidad y conexión; caminar hacia la meta correcta." },
  { letter: "ח", sign: "Cáncer (Sartan)", month: "Tamuz", organ: "Mano Der. / Vista", tikkun: "Custodia de los ojos; protegerse de imágenes negativas." },
  { letter: "ט", sign: "Leo (Arieh)", month: "Av", organ: "Riñón Izq. / Oído", tikkun: "Escucha profunda; filtrar el ruido y la calumnia." },
  { letter: "י", sign: "Virgo (Betulah)", month: "Elul", organ: "Mano Izq. / Acción", tikkun: "Rectificación del acto; servicio meticuloso." },
  { letter: "ל", sign: "Libra (Moznayim)", month: "Tishrei", organ: "Vesícula / Coito", tikkun: "Equilibrio en el deseo y la conexión íntima." },
  { letter: "נ", sign: "Escorpio (Akrav)", month: "Jeshván", organ: "Intestino / Olfato", tikkun: "Discernimiento intuitivo; procesar lo visceral." },
  { letter: "ס", sign: "Sagitario (Keshet)", month: "Kislev", organ: "Estómago / Sueño", tikkun: "Confianza y apoyo; rectificar el subconsciente." },
  { letter: "ע", sign: "Capricornio (Gedi)", month: "Tevet", organ: "Hígado / Ira", tikkun: "Transformar la bilis en empuje constructivo." },
  { letter: "צ", sign: "Acuario (Dli)", month: "Shevat", organ: "Esófago / Gusto", tikkun: "Encontrar placer en lo espiritual." },
  { letter: "ק", sign: "Piscis (Dagim)", month: "Adar", organ: "Bazo / Risa", tikkun: "La alegría que trasciende la lógica." },
];

export const sefirotPsych: SefiraPsych[] = [
  {
    name: "Chochmah (Sabiduría)",
    aspect: "Intellectual",
    light: "Bitul (Anulación), intuición pura, estado de 'no saber'.",
    shadow: "Nihilismo, desconexión de la realidad práctica.",
    work: "Aprender sin prejuicios."
  },
  {
    name: "Chesed (Bondad)",
    aspect: "Emotional",
    light: "Amor expansivo, dar sin límite.",
    shadow: "Amor sofocante, facilitar el vicio del otro.",
    work: "Dar con propósito, no por necesidad de agradar."
  },
  {
    name: "Gevurah (Rigor)",
    aspect: "Emotional",
    light: "Límites saludables, disciplina, justicia.",
    shadow: "Crueldad, juicio excesivo, ira, miedo paralizante.",
    work: "Suavizar el juicio con amor; proteger, no castigar."
  },
  {
    name: "Tiferet (Belleza)",
    aspect: "Emotional",
    light: "Equilibrio, armonía, empatía, verdad integradora.",
    shadow: "Orgullo espiritual, vanidad, tibieza.",
    work: "Cultivar humildad en el éxito; verdad objetiva."
  },
  // ... Añadir Netzach, Hod, Yesod, Malchut aquí
];

export const psalm119Mapping: PsalmMapping[] = [
  { letter: "א", verses: "1-8", intention: "Eliminar maldiciones, abrir caminos, inicios puros." },
  { letter: "ב", verses: "9-16", intention: "Memoria, construcción del hogar, sabiduría (Binah)." },
  { letter: "ד", verses: "25-32", intention: "Salir de la depresión, abrir puertas cerradas." },
  // ... Añadir el resto del alfabeto
];