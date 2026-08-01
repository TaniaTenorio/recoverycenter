export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tone: "indigo" | "teal" | "orange" | "violet";
  image: string;
    width: number;
    height: number;
    marginLeft?: string;
  summary: string;
  intro: string;
  bullets: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "recuperacion-discos-duros",
    title: "Recuperación de Discos Duros",
    shortTitle: "Discos Duros",
    icon: "storage",
    tone: "indigo",
    image: "/images/hard-drive-full.jpeg",
    width: 500,
    height: 500,
    summary:
      "Recuperamos información de discos duros mecánicos con fallas lógicas, físicas y electrónicas.",
    intro:
      "Atendemos casos de discos internos y externos con pérdida de datos por golpes, sobrecalentamiento, sectores dañados o corrupción de sistema de archivos.",
    bullets: [
      "Diagnóstico técnico inicial y estimación de recuperabilidad",
      "Procedimientos de clonación y extracción segura de datos",
      "Recuperación para Windows, macOS, Linux y sistemas mixtos",
    ],
    faqs: [
      {
        question: "¿Cuánto tarda la recuperación?",
        answer:
          "Depende del daño y la capacidad del disco. Normalmente entre 2 y 7 días hábiles.",
      },
      {
        question: "¿Puedo seguir usando el disco afectado?",
        answer:
          "No es recomendable. Usarlo puede reducir la posibilidad de recuperación completa.",
      },
    ],
  },
  {
    slug: "recuperacion-ssd-nvme",
    title: "Recuperación de SSD y NVMe",
    shortTitle: "SSD y NVMe",
    icon: "memory",
    tone: "teal",
    image: "/images/ssd.jpg",
    width: 500,
    height: 500,
    summary:
      "Servicio especializado para unidades de estado sólido con fallas de firmware o controlador.",
    intro:
      "Los SSD requieren técnicas específicas por su arquitectura. Aplicamos procesos orientados a preservar la integridad de celdas y metadatos.",
    bullets: [
      "Análisis de fallas de firmware y controladora",
      "Extracción de datos en escenarios de no detección",
      "Soporte para interfaces SATA, M.2 y NVMe",
    ],
    faqs: [
      {
        question: "Siempre se puede recuperar un SSD?",
        answer:
          "No siempre. La viabilidad depende del tipo de fallo y del nivel de degradación interna.",
      },
      {
        question: "¿Pierdo garantía al intentar repararlo?",
        answer:
          "Intervenir hardware puede afectar garantías. Recomendamos diagnóstico previo antes de abrir unidad.",
      },
    ],
  },
  {
    slug: "recuperacion-servidores",
    title: "Recuperación de Servidores",
    shortTitle: "Servidores",
    icon: "dns",
    tone: "orange",
    image: "/images/server.jpg",
    width: 500,
    height: 500,
    summary:
      "Recuperación de datos para entornos empresariales con infraestructura crítica.",
    intro:
      "Trabajamos con sistemas de archivos y configuraciones empresariales para restaurar información de servidores físicos o virtualizados.",
    bullets: [
      "Recuperación en entornos Windows Server y Linux",
      "Atención de fallas por malware, borrado o corrupción",
      "Flujos de trabajo con prioridad para continuidad operativa",
    ],
    faqs: [
      {
        question: "¿Atienden urgencias empresariales?",
        answer:
          "Sí, podemos definir ventanas de atención prioritaria según criticidad del caso.",
      },
      {
        question: "¿Firman acuerdo de confidencialidad?",
        answer:
          "Sí, podemos trabajar bajo NDA y políticas de seguridad del cliente.",
      },
    ],
  },
  {
    slug: "recuperacion-ransomware",
    title: "Recuperación por Ransomware",
    shortTitle: "Ransomware",
    icon: "hub",
    tone: "violet",
    image: "/images/ransomware.jpg",
    width: 500,
    height: 500,
    summary:
      "Respuesta técnica para sistemas cifrados por ransomware y pérdida crítica de información.",
    intro:
      "Atendemos incidentes de ransomware con diagnóstico especializado, preservación de evidencia y estrategias de recuperación orientadas a minimizar la interrupción operativa.",
    bullets: [
      "Diagnóstico inicial para identificar el alcance del cifrado y los activos comprometidos",
      "Recuperación de archivos, bases de datos y servidores sin alterar la evidencia del incidente",
      "Acompañamiento técnico para continuidad operativa, contención y priorización de casos críticos",
    ],
    faqs: [
      {
        question: "Debemos pagar el rescate para recuperar la información?",
        answer:
          "No lo recomendamos. Primero evaluamos opciones técnicas de recuperación y el estado real de los datos antes de tomar cualquier decisión.",
      },
      {
        question: "Pueden atender servidores o equipos afectados por ransomware?",
        answer:
          "Sí. Podemos revisar escenarios de equipos aislados, servidores y entornos empresariales para determinar el mejor camino de recuperación.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}
