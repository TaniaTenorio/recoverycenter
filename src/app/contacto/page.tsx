import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactLocationMap from "@/components/ContactLocationMap";
import { companyProfile } from "@/data/companyProfile";

export const metadata: Metadata = {
  title: `Contacto | ${companyProfile.name}`,
  description:
    "Solicita un diagnostico inicial para tu caso de recuperación de datos.",
};

export default function ContactoPage() {
  return (
    <main className="section section-light">
      <div className='container service-detail'>
         <p className="eyebrow">Contacto directo</p>
        <h1 className="section-title">Hablemos de tu caso</h1>
      </div>
      <div className="container contact-page-grid">
        <section className="detail-block">
          <p className="lead service-detail-lead">
            Cuéntanos el tipo de equipo afectado, síntomas y urgencia. Te
            responderemos con los siguientes pasos para diagnóstico.
          </p>

          <ul className="contact-list">
            <li className="lead service-detail-lead">
              Teléfono: <a href={companyProfile.phoneHref}>{companyProfile.phoneDisplay}</a>
            </li>
            <li className="lead service-detail-lead">
              Email: <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
            </li>
            <li className="lead service-detail-lead">
              Horario de atención: Lunes a Viernes, 9:00 a 18:00 hrs.
            </li>
          </ul>

          <ContactLocationMap mapSize='small'/>
        </section>

        <ContactForm />
      </div>
    </main>
  );
}
