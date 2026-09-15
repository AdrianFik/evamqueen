export const trilogyOverview = {
  title: "TIERRA · METAL · SANGRE",
  sectionTitle: "Materia de lo que somos",
  tagline: "Hay materiales con los que construimos casas. Y otros con los que terminamos construyéndonos a nosotros mismos.",
  coreQuestion: "¿Hasta qué punto podemos elegir quiénes seremos cuando otros comenzaron a construirnos antes de que pudiéramos decidir?",
  protagonists: [
    {
      name: "Anna",
      origin: "Alemania · Europa",
      image: "/assets/ana_personaje.jpg",
      quote: "Busca orden, pero vive atravesada por la emoción. Desea pertenecer y al mismo tiempo teme depender.",
      description: "Llega al mundo en una Europa dividida por fronteras visibles e invisibles. Su infancia transcurre entre casas prestadas, ausencias y una búsqueda silenciosa de pertenencia. Aprende muy pronto que un hogar no siempre es el lugar donde uno vive y que ser cuidado no significa necesariamente sentirse elegido. Su viaje no consiste solamente en descubrir dónde quiere vivir, sino qué significa para ella quedarse."
    },
    {
      name: "Shady",
      origin: "Siria · Oriente",
      image: "/assets/shady_personaje.jpg",
      quote: "Construir puede ser una forma de supervivencia.",
      description: "Nace en Siria, en una tierra atravesada por el conflicto, dentro de una familia donde amor, violencia, religión, miedo y supervivencia conviven demasiado cerca. Su primer refugio será su madre; su primera arquitectura, la tierra que moldea con las manos imaginando lugares a salvo. Con el tiempo, esa intuición encuentra otro lenguaje: la arquitectura. Pero algunas estructuras levantadas para protegernos terminan convirtiéndose en cárceles."
    }
  ],
  materials: [
    {
      name: "TIERRA",
      concept: "ORIGEN Y PERTENENCIA",
      color: "#9B7558",
      image: "/assets/materia_tierra.png",
      description: "La primera materia que tocamos y el lugar al que regresamos. Conserva huellas, permite construir, pero también puede deshacerse bajo nuestros pies. Es infancia, casa, memoria: aquello de lo que venimos."
    },
    {
      name: "METAL",
      concept: "ESTRUCTURA Y RESISTENCIA",
      color: "#B84F2E",
      image: "/assets/materia_metal.png",
      description: "Se forja mediante fuego y golpes. Puede sostener cargas extraordinarias, pero también fatigarse, oxidarse o volverse rígido hasta quebrarse. Es carácter, defensa, supervivencia: aquello que aprendemos a ser para mantenernos en pie."
    },
    {
      name: "SANGRE",
      concept: "VÍNCULO Y MOVIMIENTO",
      color: "#842A27",
      image: "/assets/materia_sangre.png",
      description: "Lo heredado y lo transmitido. Familia, cuerpo, deseo, heridas que pasan de una generación a otra y afectos capaces de alterar el rumbo de una vida. Es pertenencia, herencia, amor: aquello que circula dentro de nosotros aunque intentemos detenerlo."
    }
  ],
  conflictQuote: "En el fondo, no se pregunta únicamente si Anna y Shady podrán amarse. La pregunta es más difícil: ¿podemos construir algo nuevo sin comprender primero aquello con lo que fuimos construidos?"
};

export const booksData = [
  {
    id: "book1",
    roman: "I",
    element: "Tierra",
    title: "Casas de una vida",
    subtitle: "Una novela inspiradora sobre arquitectura y misión de vida.",
    status: "Publicado · Edición especial",
    statusBadge: "bg-stone-100 text-stone-800 border-stone-300",
    quote: "Hay lugares que dejamos atrás. Otros continúan construyéndonos.",
    synopsis: "Dos niños crecen a miles de kilómetros de distancia sin saber que sus vidas terminarán encontrándose. Anna llega al mundo en una Alemania dividida. La enfermedad de su madre transforma sus primeros años en un peregrinaje por casas ajenas, brazos prestados y lugares en los que aprenderá demasiado pronto la diferencia entre tener un techo y sentirse en casa. Shady crece en Siria, en un entorno atravesado por el miedo, la violencia y las heridas de una familia que apenas sabe cómo protegerlo. Mientras el mundo adulto se resquebraja a su alrededor, encuentra refugio en su madre y en una intuición que todavía no sabe nombrar: construir lugares puede ser una manera de salvarse.",
    closingNote: "Casas de una vida no habla solamente de cómo se llega a ser arquitecto. Habla de las personas que nos construyen. De las casas que dejan una huella en nosotros. De las heridas que aprendemos a convertir en estructura. Y de esa búsqueda universal de un lugar —físico o humano— al que algún día podamos llamar hogar.",
    themes: ["infancia", "pertenencia", "abandono", "familia", "vocación", "arquitectura", "resiliencia", "memoria"],
    textures: {
      front: "/assets/book1_front.png",
      spine: "/assets/book1_spine.png",
      back: "/assets/book1_back.png",
      paper: "/assets/paper_edge.png"
    },
    hasChapter: true,
    chapterId: "book1",
    primaryCtaText: "Comprar ejemplar",
    primaryCtaLink: "https://amzn.to/4hsIjqG",
    secondaryCtaText: "Leer primer capítulo",
    accentColor: "#9B7558",
    yearLabel: "Volumen I · Publicado"
  },
  {
    id: "book2",
    roman: "II",
    element: "Metal y fuego",
    title: "Rutas de fuego y viento",
    subtitle: "La arquitectura de las heridas",
    status: "Publicado",
    statusBadge: "bg-stone-100 text-stone-800 border-stone-300",
    quote: "Hay rutas que elegimos. Otras comienzan justo donde algo en nosotros se rompe.",
    synopsis: "Anna llega a Roma con la intuición de que algunas ciudades pueden enseñarnos a mirar de nuevo. Shady intenta construir en Berlín una vida lejos de las heridas que dejó atrás. Dos destinos aparentemente separados. Dos maneras de entender la arquitectura. Y un encuentro que había quedado suspendido entre ambos como una promesa todavía sin nombre. Cuando sus caminos vuelven a cruzarse, las certezas empiezan a resquebrajarse.",
    closingNote: "Entre ciudades que conservan las cicatrices de su historia, proyectos que obligan a mirar las heridas en lugar de ocultarlas y vínculos que dejan una huella mucho más profunda de lo esperado, Anna y Shady descubrirán que también las personas están hechas de estratos, juntas y fisuras. Algunas resisten. Otras ceden. Y hay encuentros capaces de modificar para siempre una estructura que creíamos inamovible.",
    themes: ["amor", "deseo", "memoria", "heridas familiares", "ciudades", "arquitectura", "primer amor", "pertenencia", "transformación"],
    textures: {
      front: "/assets/book2_front.png",
      spine: "/assets/book2_spine.png",
      back: "/assets/book2_back.png",
      paper: "/assets/paper_edge.png"
    },
    hasChapter: true,
    chapterId: "book2",
    primaryCtaText: "Comprar ejemplar",
    primaryCtaLink: "https://amzn.to/4rcOQJB",
    secondaryCtaText: "Leer primer capítulo",
    accentColor: "#B84F2E",
    yearLabel: "Volumen II · Publicado"
  },
  {
    id: "book3",
    roman: "III",
    element: "Estructura y sangre",
    title: "Arquitectos del destino",
    subtitle: "La vida que no estaba en los planos",
    status: "En proyecto · En escritura",
    statusBadge: "bg-amber-800/10 text-amber-800 border-amber-800/30",
    quote: "¿Qué ocurre cuando consigues la vida que soñabas y descubres que también puedes desaparecer dentro de ella?",
    synopsis: "Anna y Shady consiguieron llegar hasta aquello que un día parecía un sueño: convertirse en arquitectos y construir una vida propia. Pero ejercer una vocación no siempre significa poder habitarla. Con los años descubrirán que algunas de las estructuras más difíciles de sostener no se levantan con hormigón, acero o piedra. Se construyen con decisiones, renuncias, afectos, expectativas y silencios. Y que la vida adulta tiene una extraña manera de modificar los planos justo cuando creemos haber encontrado nuestro lugar.",
    closingNote: "Para Anna, la arquitectura comenzará a medirse también en aquello que no puede dibujarse: el espacio que ocupa frente al que cede. Shady conocerá el peso de haber llegado muy alto y descubrir que el éxito tampoco sostiene todas las cargas. Ambos tendrán que enfrentarse a una pregunta que ningún plano puede responder: ¿qué permanece de nosotros cuando la vida modifica el proyecto que habíamos diseñado originalmente?",
    themes: ["madurez", "vocación", "amor", "cuidado", "identidad", "elecciones", "destino"],
    textures: {
      front: "/assets/book3_front.png",
      spine: "/assets/book3_spine.png",
      back: "/assets/book3_back.png",
      paper: "/assets/paper_edge.png"
    },
    hasChapter: false,
    chapterId: null,
    primaryCtaText: "Avisarme al publicar",
    primaryCtaLink: "https://evamqueen.substack.com/",
    secondaryCtaText: "Seguir proceso en Substack",
    accentColor: "#C87552",
    yearLabel: "Volumen III · En planos / escritura"
  }
];
