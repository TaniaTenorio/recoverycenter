import { companyProfile } from "@/data/companyProfile";

export default function MobileQuickActions() {
  return (
    <div className="mobile-quick-actions" aria-label="Acciones rapidas">
      <a
        href={companyProfile.whatsappHref}
        className="mobile-action mobile-action-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          forum
        </span>
        WhatsApp
      </a>
      <a href={companyProfile.phoneHref} className="mobile-action mobile-action-call">
        <span className="material-symbols-outlined" aria-hidden="true">
          call
        </span>
        Llamar
      </a>
      <a href="/contacto" className="mobile-action mobile-action-contact">
        <span className="material-symbols-outlined" aria-hidden="true">
          chat
        </span>
        Contacto
      </a>
    </div>
  );
}
