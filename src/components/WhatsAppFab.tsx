import { companyProfile } from "@/data/companyProfile";

export default function WhatsAppFab() {
  return (
    <a
      href={companyProfile.whatsappHref}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversacion por WhatsApp"
    >
      <svg
        className="whatsapp-fab__icon"
        viewBox="0 0 32 32"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M16.03 3C8.88 3 3.07 8.78 3.07 15.89c0 2.27.6 4.48 1.75 6.43L3 29l6.88-1.8a13.02 13.02 0 0 0 6.15 1.57h.01c7.15 0 12.96-5.79 12.96-12.89A12.86 12.86 0 0 0 16.03 3Zm7.55 18.17c-.31.86-1.79 1.64-2.48 1.74-.64.1-1.45.14-2.34-.13-.54-.17-1.24-.4-2.13-.78-3.74-1.6-6.19-5.53-6.38-5.8-.18-.26-1.51-2-1.51-3.81 0-1.8.95-2.69 1.29-3.05.34-.35.74-.44.98-.44h.71c.23 0 .54-.08.85.67.31.74 1.06 2.57 1.15 2.76.09.18.15.4.03.66-.12.26-.18.4-.36.62-.18.22-.38.48-.54.65-.18.18-.38.37-.16.73.22.35 1 1.63 2.13 2.64 1.46 1.29 2.69 1.69 3.05 1.88.36.18.57.15.78-.09.22-.25.92-1.06 1.16-1.43.25-.36.49-.31.82-.18l2.64 1.04c.78.31 1.29.46 1.49.72.2.26.2 1.52-.11 2.39Z"
          fill="currentColor"
        />
      </svg>
      <span className="whatsapp-fab__tooltip" aria-hidden="true">
        Atendemos via WhatsApp
      </span>
      <span className="whatsapp-fab__label">WhatsApp</span>
    </a>
  );
}
