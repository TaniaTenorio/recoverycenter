export type Feature = {
  title: string;
  description: string;
};

export type ClientBrand = {
  name: string;
  logoSrc: string;
};

export const services: string[] = [
  "Recuperación de discos duros",
  "Recuperación de SSD y NVMe",
  "Recuperación de servidores",
  "Recuperación de arreglos RAID",
];

export const features: Feature[] = [
  {
    title: "Diagnóstico inicial",
    description: "Evaluación técnica y plan de recuperación sin compromiso.",
  },
  {
    title: "Laboratorio especializado",
    description:
      "Procedimientos controlados para daños lógicos, físicos y electrónicos.",
  },
  {
    title: "Atención nacional",
    description:
      "Recolección y entrega para clientes en CDMX y toda la República.",
  },
  {
    title: "Confidencialidad",
    description:
      "Manejo estricto de la información y protocolos de seguridad de datos.",
  },
];

export const processSteps: string[] = [
  "Envío del dispositivo y recepción en nuestro laboratorio",
  "Diagnóstico técnico, estimación de recuperabilidad y cotización del servicio. ",
  "Aprobación del presupuesto y ejecución de los procedimientos de recuperación",
  "Envío de la información recuperada para su revisión y validación",
  "Pago del servicio: en efectivo, transferencia bancaria o pago con tarjeta (Link de Pago).",
  "Entrega de la información recuperada en el medio de almacenamiento elegido por el cliente.",
];

export const receptionInstructions = {
  title: "Recepción en nuestras instalaciones",
  subtitle: "Envía el disco duro dañado a nuestra dirección.",
  warning: "Importante: no enviar el disco en sobre.",
  intro:
    "Para proteger el dispositivo durante el traslado, sigue estas indicaciones antes de enviarlo:",
  bullets: [
    "El disco debe ir cubierto con plástico burbuja y dentro de una caja de cartón (no sobres), de forma que no tenga movimiento.",
    "Incluye dentro de la caja tus datos de contacto: nombre, teléfono y correo electrónico.",
  ],
  footer: "Atención a clientes en CDMX y toda la Repúiblica Mexicana.",
};

export const clientBrands: ClientBrand[] = [
  { name: "Alpura", logoSrc: "/images/clients/alpura.svg" },
  { name: "Bioresearch", logoSrc: "/images/clients/bioresearch-de-mexico.jpeg" },
  { name: "Cámara de diputados", logoSrc: "/images/clients/Camara_Diputados.png" },
  { name: "Chef Mart", logoSrc: "/images/clients/chef-mart.jpg" },
  { name: "Concretos Cruz Azul", logoSrc: "/images/clients/concretos-cruz-azul.jpeg" },
  { name: "Condumex", logoSrc: "/images/clients/condumex.jpeg" },
  { name: "Dataproducts de México", logoSrc: "/images/clients/dataproducts.png" },
  { name: "Cobama", logoSrc: "/images/clients/cobama.jpeg" },
  { name: "IDEAL", logoSrc: "/images/clients/ideal.jpeg" },
  { name: "Hockey exportprint", logoSrc: "/images/clients/hockey-exportprint.jpeg" },
  { name: "ICA", logoSrc: "/images/clients/icai-infraestructura.jpeg" },
  { name: "IDESA Petroquímica", logoSrc: "/images/clients/idesa-petroquimica.png" },
  { name: "Teleton", logoSrc: "/images/clients/teleton.jpeg" },
  { name: "INAH", logoSrc: "/images/clients/inah.png" },
  { name: "CNEA", logoSrc: "/images/clients/cnea.png" },
  { name: "Intelection", logoSrc: "/images/clients/intelection.png" },
  { name: "Kimberly-Clark", logoSrc: "/images/clients/kimberly-clark.jpeg" },
  { name: "Kyson Warren", logoSrc: "/images/clients/kysor-warren.jpeg" },
  { name: "Sears", logoSrc: "/images/clients/sears.png" },
  { name: "Purpura", logoSrc: "/images/clients/purpura.jpeg" },
  { name: "Steren", logoSrc: "/images/clients/steren.png" },
  { name: "SEMAR", logoSrc: "/images/clients/semar.png" },
  { name: "Mappec", logoSrc: "/images/clients/mappec.png" },
  { name: "TV Azteca", logoSrc: "/images/clients/tv-azteca.png" },
  { name: "Fischer", logoSrc: "/images/clients/fischer.jpeg" },
  { name: "Distroller", logoSrc: "/images/clients/distroller.png" },
  { name: "Joyson", logoSrc: "/images/clients/joyson.jpeg" },
  { name: "Ivonne", logoSrc: "/images/clients/ivonne.png" },
  { name: "Aeropuerto Internacional de Toluca", logoSrc: "/images/clients/aeropuerto-internacional-de-toluca.png" },
];
