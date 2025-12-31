// src/data/rectificationData.ts

export interface DetailedProtocol {
  letter: string;
  name: string;
  // --- Sefer Yetzirah (Formación) ---
  month: string;
  zodiac: string;
  organ: string;
  faculty: string;
  // --- Torá (Código Operativo) ---
  psalmVerses: string;
  psalmIntent: string;
  torahFirstWord: string;
  // --- Zohar (Rectificación Profunda) ---
  attributeOfMercy: string;
  zoharWisdom: string; 
  divineName: string;
}

export const PROTOCOLS_DB: Record<string, DetailedProtocol> = {
  // ==========================================
  // LAS TRES MADRES (IMMOT)
  // ==========================================
  'א': {
    letter: 'א', name: 'Aleph',
    month: 'Atemporal', zodiac: 'Aire (Ruach)', organ: 'Pecho / Pulmones', faculty: 'Equilibrio Vital',
    psalmVerses: '1-8', psalmIntent: 'Retorno a la unidad y apertura de caminos bloqueados.',
    torahFirstWord: 'Elohim (אֱלֹהִים)',
    attributeOfMercy: 'Mi El Kamocha (¿Quién como Tú?)',
    zoharWisdom: 'La paciencia absoluta que soporta el insulto sin interrumpir el flujo de luz.',
    divineName: 'EHYEH (אֶהְיֶה)'
  },
  'מ': {
    letter: 'מ', name: 'Mem',
    month: 'Atemporal', zodiac: 'Agua (Mayim)', organ: 'Vientre / Abdomen', faculty: 'Cohesión / Frío',
    psalmVerses: '97-104', psalmIntent: 'Purificación emocional y sabiduría superior (Mayim Chaim).',
    torahFirstWord: 'Merachefet (Incubaba)',
    attributeOfMercy: 'Titen Emet (Darás Verdad)', // Variación según sistema, aquí usamos Emet para Agua
    zoharWisdom: 'Inmersión del ego en las aguas de la bondad. El Mikve cósmico.',
    divineName: 'MELECH (Rey)'
  },
  'ש': {
    letter: 'ש', name: 'Shin',
    month: 'Atemporal', zodiac: 'Fuego (Esh)', organ: 'Cabeza', faculty: 'Transformación',
    psalmVerses: '161-168', psalmIntent: 'Protección contra poderosos y paz mental.',
    torahFirstWord: 'Shamayim (Cielos)',
    attributeOfMercy: 'Lo Hechezik (No retuvo ira)',
    zoharWisdom: 'El Fuego Sagrado que incinera la ilusión y separa la verdad de la mentira.',
    divineName: 'SHADDAI (שַׁדַּי)'
  },
  'ם': { // Mem Sofit
    letter: 'ם', name: 'Mem Sofit',
    month: 'Final', zodiac: 'Agua Profunda', organ: 'Matriz (Útero)', faculty: 'Gestación',
    psalmVerses: '97-104', psalmIntent: 'Sabiduría oculta y sellada.',
    torahFirstWord: 'Merachefet',
    attributeOfMercy: 'Titen Emet',
    zoharWisdom: 'El agua cerrada que gesta la vida oculta.',
    divineName: 'MELECH'
  },

  // ==========================================
  // LAS SIETE DOBLES (BEGED KEFET)
  // ==========================================
  'ב': {
    letter: 'ב', name: 'Bet',
    month: '---', zodiac: 'Saturno / Luna', organ: 'Ojo Derecho', faculty: 'Sabiduría / Vida',
    psalmVerses: '9-16', psalmIntent: 'Construcción del hogar y memoria sagrada.',
    torahFirstWord: 'Bereshit (En el principio)',
    attributeOfMercy: 'V\'Over Al Pesha (Pasa por alto)',
    zoharWisdom: 'Elegir la Vida sobre el vacío. La casa (Bayit) que recibe la luz.',
    divineName: 'ELOHIM'
  },
  'ג': {
    letter: 'ג', name: 'Guimel',
    month: '---', zodiac: 'Júpiter', organ: 'Oído Derecho', faculty: 'Riqueza / Paz',
    psalmVerses: '17-24', psalmIntent: 'Retribución justa y flujo de abundancia (Gomel).',
    torahFirstWord: 'Gan (Jardín)',
    attributeOfMercy: 'L\'She\'erit Nachalato',
    zoharWisdom: 'La bondad que corre para ayudar al pobre (Dalet).',
    divineName: 'GADOL (Grande)'
  },
  'ד': {
    letter: 'ד', name: 'Dalet',
    month: '---', zodiac: 'Marte', organ: 'Fosa Nasal Derecha', faculty: 'Fertilidad / Semilla',
    psalmVerses: '25-32', psalmIntent: 'Salir de la depresión ("mi alma pegada al polvo").',
    torahFirstWord: 'Derech (Camino)',
    attributeOfMercy: 'Lo Hechezik',
    zoharWisdom: 'La puerta que se abre humildemente para recibir la luz.',
    divineName: 'DAAT'
  },
  'כ': {
    letter: 'כ', name: 'Kaf',
    month: '---', zodiac: 'Venus', organ: 'Ojo Izquierdo', faculty: 'Vida / Muerte',
    psalmVerses: '81-88', psalmIntent: 'La capacidad de moldear la realidad (Kli).',
    torahFirstWord: 'Ki (Porque)',
    attributeOfMercy: 'Ki Chafetz Chesed',
    zoharWisdom: 'La palma que sostiene y da forma a la energía.',
    divineName: 'KABIR'
  },
  'ך': { // Kaf Sofit
    letter: 'ך', name: 'Kaf Sofit',
    month: 'Final', zodiac: 'Venus Exaltado', organ: 'Ojo Izq. Profundo', faculty: 'Realización',
    psalmVerses: '81-88', psalmIntent: 'Materialización final.',
    torahFirstWord: 'Ki',
    attributeOfMercy: 'Ki Chafetz Chesed',
    zoharWisdom: 'El molde final donde la luz se asienta.',
    divineName: 'KABIR'
  },
  'פ': {
    letter: 'פ', name: 'Pe',
    month: '---', zodiac: 'Mercurio', organ: 'Oído Izquierdo', faculty: 'Dominio / Habla',
    psalmVerses: '129-136', psalmIntent: 'Iluminación y apertura de la boca en plegaria.',
    torahFirstWord: 'Pnei (Rostro)',
    attributeOfMercy: 'Yashuv Yerachamenu',
    zoharWisdom: 'La boca que habla rectitud rompe cadenas.',
    divineName: 'PELE (Maravilla)'
  },
  'ף': { // Pe Sofit
    letter: 'ף', name: 'Pe Sofit',
    month: 'Final', zodiac: 'Mercurio', organ: 'Boca (Cierre)', faculty: 'Silencio',
    psalmVerses: '129-136', psalmIntent: 'El poder del silencio final.',
    torahFirstWord: 'Pnei',
    attributeOfMercy: 'Yashuv Yerachamenu',
    zoharWisdom: 'La boca cerrada que guarda el secreto.',
    divineName: 'PELE'
  },
  'ר': {
    letter: 'ר', name: 'Resh',
    month: '---', zodiac: 'Saturno', organ: 'Fosa Nasal Izquierda', faculty: 'Paz / Guerra',
    psalmVerses: '153-160', psalmIntent: 'Rescate de la persecución y ver la aflicción.',
    torahFirstWord: 'Ruach (Espíritu)',
    attributeOfMercy: 'Yichbosh Avonoteinu',
    zoharWisdom: 'La cabeza inclinada en humildad para comenzar de nuevo (Rosh).',
    divineName: 'ROFE (Sanador)'
  },
  'ת': {
    letter: 'ת', name: 'Tav',
    month: '---', zodiac: 'Júpiter', organ: 'Boca', faculty: 'Gracia / Fealdad',
    psalmVerses: '169-176', psalmIntent: 'Integridad total, sello de la verdad.',
    torahFirstWord: 'Tohu (Abismo)',
    attributeOfMercy: 'Titen Emet L\'Yaakov',
    zoharWisdom: 'El sello de la Verdad (Emet) que finaliza la creación.',
    divineName: 'TAMIM (Íntegro)'
  },

  // ==========================================
  // LAS DOCE SIMPLES (PESHUTOT)
  // ==========================================
  'ה': {
    letter: 'ה', name: 'He',
    month: 'Nisán', zodiac: 'Aries', organ: 'Pie Derecho', faculty: 'Habla',
    psalmVerses: '33-40', psalmIntent: 'Entendimiento profundo y retorno (Teshuvá).',
    torahFirstWord: 'HaShamayim',
    attributeOfMercy: 'Noseh Avon (Carga iniquidad)', 
    zoharWisdom: 'La ventana del aliento divino. El mundo fue creado con He.',
    divineName: 'YHVH'
  },
  'ו': {
    letter: 'ו', name: 'Vav',
    month: 'Iyar', zodiac: 'Tauro', organ: 'Riñón Derecho', faculty: 'Pensamiento',
    psalmVerses: '41-48', psalmIntent: 'Conexión cielo-tierra y verdad interior.',
    torahFirstWord: 'VeHaAretz',
    attributeOfMercy: 'V\'Over Al Pesha',
    zoharWisdom: 'El pilar de la verdad que conecta los mundos (Yesod).',
    divineName: 'VADAI'
  },
  'ז': {
    letter: 'ז', name: 'Zayin',
    month: 'Siván', zodiac: 'Géminis', organ: 'Pie Izquierdo', faculty: 'Movimiento',
    psalmVerses: '49-56', psalmIntent: 'Protección y fundamentación.',
    torahFirstWord: 'Zera',
    attributeOfMercy: 'L\'She\'erit Nachalato',
    zoharWisdom: 'La corona sobre la cabeza del Justo. Movimiento dirigido.',
    divineName: 'ZAKAR'
  },
  'ח': {
    letter: 'ח', name: 'Chet',
    month: 'Tamuz', zodiac: 'Cáncer', organ: 'Mano Derecha', faculty: 'Vista',
    psalmVerses: '57-64', psalmIntent: 'Gracia divina y fortalecimiento.',
    torahFirstWord: 'Choshech',
    attributeOfMercy: 'Lo Hechezik',
    zoharWisdom: 'La vida (Chai) que trasciende los límites naturales.',
    divineName: 'CHAI'
  },
  'ט': {
    letter: 'ט', name: 'Tet',
    month: 'Av', zodiac: 'Leo', organ: 'Riñón Izquierdo', faculty: 'Oído',
    psalmVerses: '65-72', psalmIntent: 'Bondad oculta y embarazo (Tet tiene forma de útero).',
    torahFirstWord: 'Tov',
    attributeOfMercy: 'Ki Chafetz Chesed',
    zoharWisdom: 'La bondad oculta reservada para los justos.',
    divineName: 'TAHOR'
  },
  'י': {
    letter: 'י', name: 'Yod',
    month: 'Elul', zodiac: 'Virgo', organ: 'Mano Izquierda', faculty: 'Acción',
    psalmVerses: '73-80', psalmIntent: 'Rectificación del ser y propósito.',
    torahFirstWord: 'Yehi',
    attributeOfMercy: 'Yashuv Yerachamenu',
    zoharWisdom: 'El punto infinitesimal que contiene el todo.',
    divineName: 'YAH'
  },
  'ל': {
    letter: 'ל', name: 'Lamed',
    month: 'Tishrei', zodiac: 'Libra', organ: 'Vesícula Biliar', faculty: 'Coito / Equilibrio',
    psalmVerses: '89-96', psalmIntent: 'Estabilidad eterna y éxito en juicios.',
    torahFirstWord: 'Layla (Noche)',
    attributeOfMercy: 'Lish’erit Nachalato (Al remanente de su heredad)',
    zoharWisdom: 'El equilibrio del juicio que perdona al remanente que se rectifica.',
    divineName: 'LIMMUD'
  },
  'נ': {
    letter: 'נ', name: 'Nun',
    month: 'Jeshván', zodiac: 'Escorpio', organ: 'Intestinos', faculty: 'Olfato',
    psalmVerses: '105-112', psalmIntent: 'Guía en la oscuridad ("Lámpara es a mis pies").',
    torahFirstWord: 'Nefesh',
    attributeOfMercy: 'Nosei Avon (Carga con la iniquidad)',
    zoharWisdom: 'La capacidad de elevar las chispas caídas (Nun) cargando con el peso del error para transformarlo.',
    divineName: 'NORA'
  },
  'ן': { // Nun Sofit
    letter: 'ן', name: 'Nun Sofit',
    month: 'Final', zodiac: 'Escorpio Profundo', organ: 'Recto', faculty: 'Finalización',
    psalmVerses: '105-112', psalmIntent: 'Redención final del alma.',
    torahFirstWord: 'Nefesh',
    attributeOfMercy: 'Nosei Avon',
    zoharWisdom: 'La extensión de la fe hasta el abismo.',
    divineName: 'NORA'
  },
  'ס': {
    letter: 'ס', name: 'Samech',
    month: 'Kislev', zodiac: 'Sagitario', organ: 'Estómago', faculty: 'Sueño',
    psalmVerses: '113-120', psalmIntent: 'Apoyo divino y eliminación de dudas.',
    torahFirstWord: 'Saviv',
    attributeOfMercy: 'V\'Tashlich',
    zoharWisdom: 'El círculo de protección divina que sostiene a los caídos.',
    divineName: 'SOMECH'
  },
  'ע': {
    letter: 'ע', name: 'Ayin',
    month: 'Tevet', zodiac: 'Capricornio', organ: 'Hígado', faculty: 'Ira / Visión',
    psalmVerses: '121-128', psalmIntent: 'Justicia legal y visión clara.',
    torahFirstWord: 'Al (Sobre)',
    attributeOfMercy: 'Ve-over Al Pesha (Pasa por alto la transgresión)',
    zoharWisdom: 'La visión (Ayin) que no se detiene en la falta, sino que mira "sobre" (Al) ella para ver el potencial del alma.',
    divineName: 'ELYON'
  },
  'צ': {
    letter: 'צ', name: 'Tzadi',
    month: 'Shevat', zodiac: 'Acuario', organ: 'Esófago', faculty: 'Gusto',
    psalmVerses: '137-144', psalmIntent: 'Justicia divina y rectitud.',
    torahFirstWord: 'Tzelem',
    attributeOfMercy: 'Vetashlich Bimtzulot Yam (Y arrojarás a las profundidades del mar)',
    zoharWisdom: 'La rectitud (Tzadi) que sumerge la negatividad en el "Mar de la Sabiduría" para su disolución.',
    divineName: 'TZVAOT'
  },
  'ץ': { // Tzadi Sofit
    letter: 'ץ', name: 'Tzadi Sofit',
    month: 'Final', zodiac: 'Acuario Profundo', organ: 'Esófago Final', faculty: 'Justicia Final',
    psalmVerses: '137-144', psalmIntent: 'La luz del Justo en el mundo venidero.',
    torahFirstWord: 'Tzelem',
    attributeOfMercy: 'Vetashlich Bimtzulot Yam',
    zoharWisdom: 'La rectitud que alcanza las raíces más profundas.',
    divineName: 'TZVAOT'
  },
  'ק': {
    letter: 'ק', name: 'Qof',
    month: 'Adar', zodiac: 'Piscis', organ: 'Bazo', faculty: 'Risa',
    psalmVerses: '145-152', psalmIntent: 'Ser escuchado y cercanía de Dios.',
    torahFirstWord: 'Kara',
    attributeOfMercy: 'Mimei Kedem (Desde los días de antaño)',
    zoharWisdom: 'La conexión de la santidad (Qof) con el origen primordial anterior a la existencia del mal.',
    divineName: 'KADOSH'
  },
};

// --- ARRAYS DE COMPATIBILIDAD ---
export const zodiacLetters = Object.values(PROTOCOLS_DB).filter(x => x.month !== 'Atemporal' && x.month !== '---' && !x.month.includes('Final'));

export const attributesOfMercy = Object.values(PROTOCOLS_DB)
  .filter((v, i, a) => a.findIndex(t => t.attributeOfMercy === v.attributeOfMercy) === i) // Unicos
  .map(x => ({ hebrew: x.attributeOfMercy, trans: '', meaning: x.attributeOfMercy, work: x.zoharWisdom }));

export const psalm119Mapping = Object.values(PROTOCOLS_DB).map(x => ({ letter: x.letter, verses: x.psalmVerses, intent: x.psalmIntent }));

export const sefirotPsych = [
    { name: "Chochmah", aspect: "Sabiduría", light: "Bitul (Anulación)", shadow: "Nihilismo / Desconexión", work: "Aprender sin prejuicios, recibir la luz pura." },
    { name: "Binah", aspect: "Entendimiento", light: "Estructura / Alegría", shadow: "Juicio Severo / Bloqueo", work: "Teshuvá: Análisis del error para el retorno." },
    { name: "Daat", aspect: "Conocimiento", light: "Unión / Conexión", shadow: "Disociación", work: "Integrar mente y emoción en una sola experiencia." },
    { name: "Chesed", aspect: "Bondad", light: "Amor Expansivo", shadow: "Amor Sofocante / Vicio", work: "Dar con propósito, no por necesidad de aprobación." },
    { name: "Gevurah", aspect: "Rigor", light: "Disciplina / Límites", shadow: "Crueldad / Ira", work: "Suavizar el juicio con amor (Hamtakat HaDin)." },
    { name: "Tiferet", aspect: "Belleza", light: "Armonía / Verdad", shadow: "Orgullo / Vanidad", work: "Cultivar la humildad dentro del éxito." },
    { name: "Netzach", aspect: "Victoria", light: "Perseverancia / Confianza", shadow: "Obsesión / Dominación", work: "Dirigir la tenacidad hacia metas sagradas." },
    { name: "Hod", aspect: "Esplendor", light: "Humildad / Gratitud", shadow: "Baja Autoestima / Mentira", work: "Reconocer la verdad (Hoda'ah) y rendirse al flujo." },
    { name: "Yesod", aspect: "Fundamento", light: "Conexión / Lealtad", shadow: "Perversión / Ruptura", work: "Santificar el deseo y mantener la palabra." },
    { name: "Malchut", aspect: "Reino", light: "Receptividad / Dignidad", shadow: "Depresión / Vacío", work: "Liderazgo como servicio. Ser vasija para la luz." }
];