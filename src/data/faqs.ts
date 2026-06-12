export interface FAQ {
  id: string;
  category: "materiales" | "tiempos" | "instalacion" | "pagos" | "diseno" | "general";
  question: string;
  answer: string;
  keywords: string[];
}

export const FAQS_DATA: FAQ[] = [
  {
    id: "lonas-materiales",
    category: "materiales",
    question: "¿Qué tipo de lonas ofrecen y cuál es la diferencia?",
    answer: "Ofrecemos tres tipos principales de lonas de primera calidad: \n\n1. **Lonas Frontlight**: Las más comunes, se iluminan desde el frente con reflectores flotantes. Son muy brillantes, duraderas y perfectas para carteles comerciales estándar.\n2. **Lonas Backlight**: Translúcidas, diseñadas especialmente para carteles cajón con iluminación interna desde atrás. Distribuyen la luz de forma uniforme.\n3. **Lonas Mesh (Microperforada)**: Tienen pequeñas perforaciones que permiten el paso del viento, ideales para zonas altas, fachadas grandes o andamios, evitando el efecto vela.",
    keywords: ["lonas", "frontlight", "backlight", "mesh", "microperforada", "tela", "cartel", "material"]
  },
  {
    id: "corporeas-materiales",
    category: "materiales",
    question: "¿De qué materiales se pueden hacer las Letras Corpóreas?",
    answer: "Fabricamos letras corpóreas en una gran variedad de materiales premium:\n\n* **Polyfan**: Telgopor extruido de alta densidad, económico, liviano y termoformable. Se entrega pintado con látex para exteriores.\n* **Acrílico**: Elegancia y brillo máximo. Excelente durabilidad y terminación de alta gama en diversos colores.\n* **PVC espumado**: Superficie lisa de terminación mate, rígida y muy formal.\n* **MDF (Madera)**: Ideal para interiores rústicos o elegantes.\n* **Acero inoxidable**: Sofisticación pura, eterno y de altísima resistencia bajo la intemperie.\n* **Iluminación LED**: Se pueden retroiluminar (luz hacia la pared, efecto difuso) o iluminar frontalmente.",
    keywords: ["letras", "corporeas", "letras 3d", "polyfan", "acrilico", "pvc", "mdf", "acero", "led", "iluminacion"]
  },
  {
    id: "vinilos-tipos",
    category: "materiales",
    question: "¿Qué opciones de vinilos y rotulaciones tienen disponibles?",
    answer: "Trabajamos con vinilos de marca líder (como Avery u Oracal) en distintas especificaciones:\n\n* **Vinilo de Corte**: Colores plenos autoadhesivos ideales para logotipos vectoriales, formas simples y textos en vidrieras.\n* **Vinilo Impreso**: Impresión digital de alta resolución, ideal para fotografías o diseños con degradees. Se puede laminar para extra duración.\n* **Microperforado**: Ideal para lunetas de vehículos o vidrieras comerciales; permite ver hacia afuera y muestra la publicidad hacia el exterior.\n* **Esmerilado**: Brinda privacidad en oficinas, salas de reuniones o vidrieras sin tapar el ingreso de luz natural.\n* **Vehicular (Ploteo)**: Vinilo calandrado de alta performance para amoldarse a las curvas de autos, camionetas y furgones.",
    keywords: ["vinilo", "rotulacion", "ploteo", "esmerilado", "corte", "impreso", "microperforado", "vehicular", "vidriera", "auto"]
  },
  {
    id: "tiempos-entrega",
    category: "tiempos",
    question: "¿Cuáles son los plazos y tiempos de entrega de los trabajos?",
    answer: "Los plazos de entrega promedio (desde que se aprueba el diseño final y se recibe la seña de ingreso) son los siguientes:\n\n* **Imprenta Comercial** (Folletería, tarjetas, menús, etiquetas): 5 a 7 días hábiles.\n* **Vinilos y Ploteos pequeños** (sin colocación compleja): 3 a 5 días hábiles.\n* **Lonas y Cartelería flexible simple**: 4 a 6 días hábiles.\n* **Letras Corpóreas y Cartelería Estructural**: 10 a 15 días hábiles, dependiendo de la envergadura del proyecto y el clima si requiere instalación externa.",
    keywords: ["tiempos", "demora", "plazo", "entrega", "dias", "cuanto tarda", "rapido"]
  },
  {
    id: "instalacion-servicios",
    category: "instalacion",
    question: "¿Incluyen el servicio de instalación o colocación?",
    answer: "Sí, contamos con un equipo propio y profesional de instaladores calificados que cubren la provincia de **Catamarca** (principalmente la capital, San Fernando del Valle de Catamarca, y localidades aledañas).\n\nInstalamos letras corpóreas, tensado de lonas gigantes en vallas publicitarias, marquesinas comerciales avanzadas, señalética vial, vinilos en vidrieras elevadas y ploteo vehicular completo. Los costos de instalación se presupuestan por separado según altura, accesibilidad y distancia.",
    keywords: ["colocacion", "instalacion", "colocar", "montaje", "altura", "poner", "catamarca"]
  },
  {
    id: "metodos-pagos",
    category: "pagos",
    question: "¿Cuáles son los métodos de pago aceptados y condiciones?",
    answer: "Nuestros métodos de pago admitidos son:\n\n* **Efectivo** directamente en nuestro local.\n* **Transferencia Bancaria o Depósito** (enviando comprobante por WhatsApp/Email).\n* **Mercado Pago**: Aceptamos dinero en cuenta, tarjetas de débito y crédito o links de pago rápidos.\n\n**Condición comercial**: Todo trabajo se inicia con una **seña previa del 50%**. El saldo remanente debe abonarse obligatoriamente al momento de retirar el pedido en imprenta, o antes de subirse a realizar la cuadrilla de colocación.",
    keywords: ["pago", "precio", "pagar", "tarjeta", "transferencia", "mercado pago", "efectivo", "seña", "deposito", "financiacion"]
  },
  {
    id: "diseno-pautas",
    category: "diseno",
    question: "¿Tengo que enviar mi propio diseño gráfico u ofrecen ese servicio?",
    answer: "¡Ofrecemos ambas opciones!\n\n1. **Si ya tenés tu diseño**: Por favor, envialo en formatos vectoriales como Illustrator (`.ai`), CorelDraw (`.cdr`) o como `.pdf` con fuentes convertidas a curvas. Si es imagen (JPG o PNG), debe estar a tamaño real de impresión con al menos 150 a 300 DPI de resolución mínima para evitar pixelados.\n2. **Si NO tenés diseño**: Nuestro equipo de diseño gráfico profesional puede crearlo desde cero para vos. Te cotizamos el servicio de diseño según la complejidad del banner, tarjetas o identidad corporativa que necesites.",
    keywords: ["diseno", "diseño", "archivo", "formato", "resolucion", "crear", "logo", "pdf", "illustrator", "editable"]
  },
  {
    id: "presupuestos-sin-cargo",
    category: "general",
    question: "¿Los presupuestos tienen algún costo?",
    answer: "No, en **Nannu Desing** todos los presupuestos son **100% sin cargo ni obligación de compra** para asesoramientos básicos. Podés utilizar nuestra calculadora interactiva web para conocer un estimado orientativo de inmediato, o detallarnos tu proyecto por WhatsApp para darte un presupuesto exacto con las especificaciones correctas.",
    keywords: ["presupuesto", "costo", "gratis", "cotizar", "precio", "cuanto sale", "cobran", "cargo"]
  }
];

export const CLIENT_FALLBACK_ANSWER = "No dispongo de esa información. Comuníquese por WhatsApp para recibir asesoramiento personalizado de forma directa llamando o enviando mensaje al +54 9 3834033343.";
