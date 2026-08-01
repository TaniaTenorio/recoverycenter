import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactLocationMap from "@/components/ContactLocationMap";
import { companyProfile } from "@/data/companyProfile";

export const metadata: Metadata = {
  title: `Contacto | ${companyProfile.name}`,
  description:
    "Solicita un diagnostico inicial para tu caso de recuperacion de datos.",
};

export default function ContactoPage() {
  return (
    <main className="section section-light">
      <div className="container contact-page-grid">
        <section className="detail-block">
          <p className="eyebrow">Contacto directo</p>
          <h1 className="section-title">Hablemos de tu caso</h1>
          <p className="lead service-detail-lead">
            Cuéntanos el tipo de equipo afectado, síntomas y urgencia. Te
            responderemos con los siguientes pasos para diagnóstico.
          </p>

          <ul className="contact-list">
            <li>
              Teléfono: <a href={companyProfile.phoneHref}>{companyProfile.phoneDisplay}</a>
            </li>
            <li>
              Email: <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
            </li>
          </ul>

          <ContactLocationMap />
        </section>

        <ContactForm />
      </div>
    </main>
  );
}
