import { ServiceItem, PortfolioItem, BenefitItem, Testimony } from "../types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "lonas",
    title: "Impresión en Lonas",
    shortDescription: "Gigantografías en alta resolución con terminaciones reforzadas y ojales, listas para colocar.",
    iconName: "Maximize2",
    details: [
      "Lona Frontlight: La opción estándar para carteles retroiluminados externamente o banners.",
      "Lona Backlight: Lona translúcida especial para marquesinas con cajón de luz interno.",
      "Lona Mesh (Microperforada): Ideal para zonas de viento fuerte o coberturas de fachadas gigantes."
    ],
    bannerUrl: "/assets/images/1.jpeg",
    colorName: "cyan"
  },
  {
    id: "corporeas",
    title: "Letras Corpóreas",
    shortDescription: "Volumen, elegancia e identificación premium con formatos tallados y retroiluminados.",
    iconName: "Layers",
    details: [
      "Polyfan (Alta Densidad): La opción más liviana y económica para interiores y exteriores comerciales.",
      "Acrílico Macizo: Terminación brillante de lujo, ideal para recepción o marquesina premium.",
      "MDF, PVC y Acero Inoxidable: Para estéticas rústicas, corporativas o eternamente sofisticadas.",
      "Retroiluminación LED: Para máxima visibilidad nocturna con bajo consumo eléctrico."
    ],
    bannerUrl: "/assets/images/2.jpeg",
    colorName: "fuchsia"
  },
  {
    id: "estructuras",
    title: "Estructuras y Marquesinas",
    shortDescription: "Diseño, herrería pesada, soldadura e instalación de frentes comerciales robustos.",
    iconName: "Hammer",
    details: [
      "Marquesinas con cajón de herrería y lona tensada del mejor gramaje.",
      "Estructuras dobles reforzadas resistentes para carteles monumentales.",
      "Montaje en altura seguro con perfiles de acero anticorrosión."
    ],
    bannerUrl: "/assets/images/3.jpeg",
    colorName: "violet"
  },
  {
    id: "senaletica",
    title: "Señalética Vial y Comercial",
    shortDescription: "Sistemas informativos de seguridad, rutas, estacionamiento y carteles reguladores.",
    iconName: "Compass",
    details: [
      "Carteles retroreflectivos norma vial para rutas y plantas industriales.",
      "Señaladores internos de acrílico y PVC para oficinas, sanitarios y salidas.",
      "Tótem exterior autoportante corporativo de alta gama."
    ],
    bannerUrl: "/assets/images/4.jpeg",
    colorName: "amber"
  },
  {
    id: "vinilos",
    title: "Vinilos y Rotulación",
    shortDescription: "Ploteos decorativos, publicitarios o de privacidad para todo tipo de superficies.",
    iconName: "Activity",
    details: [
      "Vinilos de Corte: Ideal para logotipos vectoriales de tienda, textos y promociones.",
      "Vinilos Impresos de Alta Resolución: Murales, ploteos completos de paredes y cuadros.",
      "Esmerilados Profesionales: Privacidad perfecta en oficinas y vidrieras comerciales.",
      "Microperforados Certificados: Publicidad exterior perfecta manteniendo visibilidad interior.",
      "Rotulación Vehicular: Ploteos de vehículos particulares, comerciales o flotas corporativas."
    ],
    bannerUrl: "/assets/images/5.png",
    colorName: "emerald"
  },
  {
    id: "eventos",
    title: "Eventos y Publicidad",
    shortDescription: "Banners móviles, estructuras livianas para prensa y stands promocionales.",
    iconName: "Gift",
    details: [
      "Roll-Ups de aluminio premium con bolso de transporte.",
      "Banderas promocionales (tipo gota o vela) de tela de viento sublimada.",
      "Backdrops (Backs de prensa/fotocromos) con estructura desarmable ágil.",
      "Stands promocionales de PVC reforzados de armado rápido."
    ],
    bannerUrl: "/assets/images/6.jpg",
    colorName: "cyan"
  },
  {
    id: "imprenta",
    title: "Imprenta Comercial",
    shortDescription: "Papelería tradicional con la mejor definición y acabados premium.",
    iconName: "Printer",
    details: [
      "Tarjetas personales con laminado mate, brillante o laca UV sectorizada.",
      "Flyers, dípticos y trípticos promocionales en papel ilustración de gramaje selecto.",
      "Etiquetas troqueladas personalizadas en bobina o plancha, perfectas para packaging.",
      "Menús gastronómicos resistentes al agua y manteles individuales impresos."
    ],
    bannerUrl: "/assets/images/7.webp",
    colorName: "violet"
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "work-1",
    title: "Marquesina de Acrílico Retroiluminado",
    category: "Carteles",
    imageUrl: "/assets/images/a.jpeg",
    description: "Letras corpóreas de acrílico premium con iluminación LED indirecta para fachada gastronómica."
  },
  {
    id: "work-2",
    title: "Gigantografía Lona Mesh en Altura",
    category: "Lonas",
    imageUrl: "/assets/images/b.jpeg",
    description: "Impresión y tensado de lona microperforada mesh de 12x4 metros para fachada de edificio corporativo."
  },
  {
    id: "work-3",
    title: "Ploteo Integral de Flota de Distribución",
    category: "Vehículos",
    imageUrl: "/assets/images/c.jpeg",
    description: "Rotulación completa con vinilo fundido de alta adherencia para camioneta de reparto."
  },
  {
    id: "work-4",
    title: "Esmerilado de Privacidad para Oficinas",
    category: "Vinilos",
    imageUrl: "/assets/images/d.jpeg",
    description: "Aplicación de vinilo esmerilado con diseño de bandas horizontales en salas de reuniones corporativas."
  },
  {
    id: "work-5",
    title: "Stand Promocional y Backdrop de Prensa",
    category: "Eventos",
    imageUrl: "/assets/images/e.jpeg",
    description: "Fondo de prensa con lona tensada libre de arrugas y banners roll-ups coordinados para congreso."
  },
  {
    id: "work-6",
    title: "Tarjetas Premium con Laca UV Sectorizada",
    category: "Papelería",
    imageUrl: "/assets/images/f.jpeg",
    description: "Tarjetas de presentación en papel ilustración de 350g con acabado mate y laca UV sectorizada en relieves."
  },
  {
    id: "work-7",
    title: "Letras de Polyfan Corporativas",
    category: "Carteles",
    imageUrl: "/assets/images/g.jpg",
    description: "Monograma en corpóreo de polyfan pintado a tono para recepción de estudio contable."
  },
  {
    id: "work-8",
    title: "Ploteo de Vidrieras Microperforado",
    category: "Vinilos",
    imageUrl: "/assets/images/h.jpg",
    description: "Vinilo microperforado impreso en alta calidad cubriendo vidriera exterior de tienda deportiva."
  }
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    id: "benefit-1",
    title: "Atención Personalizada",
    description: "Te asesoramos en cada paso del proceso, desde la idea inicial hasta los acabados finales del producto.",
    iconName: "UserCheck"
  },
  {
    id: "benefit-2",
    title: "Diseños Exclusivos",
    description: "Contamos con un equipo creativo propio listo para crear piezas únicas que destaquen a tu negocio del resto.",
    iconName: "Palette"
  },
  {
    id: "benefit-3",
    title: "Materiales de Calidad",
    description: "Solo utilizamos sustratos, tintas y vinilos importados que aseguran colores vividos y alta durabilidad al sol.",
    iconName: "ShieldCheck"
  },
  {
    id: "benefit-4",
    title: "Instalación Profesional",
    description: "Nosotros nos hacemos cargo de colgar, montar y plotear con precisión técnica en altura y seguridad.",
    iconName: "Wrench"
  },
  {
    id: "benefit-5",
    title: "Entregas Rápidas",
    description: "Entendemos lo valioso que es tu tiempo comercial. Cumplimos con plazos de entrega estrictos y veloces.",
    iconName: "Zap"
  },
  {
    id: "benefit-6",
    title: "Presupuestos Sin Cargo",
    description: "Ideamos y cotizamos tu proyecto comercial sin ningún costo inicial ni obligaciones ocultas.",
    iconName: "FileSpreadsheet"
  }
];

export const TESTIMONIALS_DATA: Testimony[] = [
  {
    id: "test-1",
    name: "María Eugenia Rodríguez",
    role: "Propia de local",
    text: "Excelente servicio de letras corpóreas para mi local. El polyfan pintado tiene una terminación impecable y las luces LED llaman muchísimo la atención de noche. ¡Muy recomendados!",
    company: "Boutique Glam Catamarca",
    rating: 5
  },
  {
    id: "test-2",
    name: "Alejandro Soria",
    role: "Gerente de Logística",
    text: "Les encargamos el ploteado completo de tres camionetas de reparto y quedamos asombrados con la velocidad y la calidad del vinilo. El microperforado en los vidrios traseros quedó perfecto.",
    company: "Distribuidora Del Valle",
    rating: 5
  },
  {
    id: "test-3",
    name: "Guillermo Carrizo",
    role: "Director General",
    text: "La lona mesh gigante y la cartelería exterior para nuestra constructora fueron instaladas con todas las normas de seguridad. Da un profesionalismo enorme al edificio.",
    company: "Constructora SFV",
    rating: 5
  },
  {
    id: "test-4",
    name: "Laura Toledo",
    role: "Socia Fundadora",
    text: "La papelería comercial (tarjetas con laca UV sectorizada y folletos trípticos) nos dio una presencia de altísima gama en la feria de diseño. Son detallistas y muy amables de trato.",
    company: "Gourmet Catamarca",
    rating: 5
  }
];
