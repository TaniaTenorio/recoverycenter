const DEFAULT_WHATSAPP_NUMBER = "5215551851551";
const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, quiero información sobre recuperación de datos.";
const DEFAULT_WHATSAPP_DISPLAY = "+52 1 55 5185 1551";

const configuredWhatsAppNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
const normalizedWhatsAppNumber = configuredWhatsAppNumber.replace(/\D+/g, "");
const whatsappNumber =
  normalizedWhatsAppNumber.length > 0
    ? normalizedWhatsAppNumber
    : DEFAULT_WHATSAPP_NUMBER;
const whatsappMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || DEFAULT_WHATSAPP_MESSAGE;

export const companyProfile = {
  name: "Recovery Center",
  tagline: "Expertos en recuperación",
  logoSrc: "/images/recovery-center-logo.jpg",
  logoWidth: 200,
  logoHeight: 77,
  phoneDisplay: "5550175645",
  phoneHref: "tel:5550175645",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || DEFAULT_WHATSAPP_DISPLAY,
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  email: "contacto@recoverycenter.com.mx",
  location: "CDMX y República Mexicana",
};

export const mainNav = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/servicios",
    label: "Servicios",
  },
  {
    href: "/nosotros",
    label: "Nosotros",
  },
  {
    href: "/contacto",
    label: "Contacto",
  },
];
