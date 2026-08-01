import type { Metadata } from "next";
import { features, processSteps } from "@/data/siteContent";
import { companyProfile } from "@/data/companyProfile";

export const metadata: Metadata = {
  title: `Nosotros | ${companyProfile.name}`,
  description:
    "Conoce nuestro enfoque técnico, procesos de recuperación y compromiso con la confidencialidad.",
};

export default function NosotrosPage() {
  return (
    <main className="section section-light">
      <div className="container service-detail">
        <p className="eyebrow">¿Quiénes somos?</p>
        <h1 className="section-title">Equipo y Metodología</h1>
        <p className="lead service-detail-lead">
          Somos un equipo orientado a la recuperación de información crítica con
          procesos claros, trazables y enfocados en continuidad operativa.
        </p>

        <section className="detail-block">
          <h2>Nuestros pilares</h2>
          <div className="faq-grid">
            {features.map((feature) => (
              <article key={feature.title} className="faq-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-block">
          <h2>¿Cómo trabajamos?</h2>
          <ol className="about-process-list">
            {processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
